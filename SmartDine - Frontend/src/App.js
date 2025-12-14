import { useState, useEffect, createContext, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Home from './components/Home';
import ChatHistory from './components/ChatHistory';
import RestaurantModal from './components/RestaurantModal';
import About from './pages/About';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import './index.css';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {}
});

export default function App() {
  const [conversation, setConversation] = useState([]);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const hasSearched = conversation.length > 0;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    setConversation([]); 
    navigate("/"); 
  }, [navigate]);

  useEffect(() => {
    const handleUnload = () => {
      logout();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [logout]);

  const handleSearch = (query) => {
    if (!query) return;
    setConversation(prev => [...prev, { query, results: [], isFetching: true }]);
    axios.post('http://localhost:8080/api/ai/suggest', { message: query })
      .then(res => {
        setConversation(prev => {
          const updated = [...prev];
          const last = updated.pop();
          return [...updated, { ...last, results: res.data || [], isFetching: false }];
        });
      })
      .catch(err => {
        console.error('Search error', err);
        setConversation(prev => {
          const updated = [...prev];
          const last = updated.pop();
          return [...updated, { ...last, error: 'Search failed', isFetching: false }];
        });
      });
  };

  const handleSurprise = () => {
    setConversation(prev => [...prev, { query: 'Surprise me!', results: [], isFetching: true }]);
    axios.get('http://localhost:8080/api/restaurants/surprise')
      .then(res => {
        setConversation(prev => {
          const updated = [...prev];
          const last = updated.pop();
          return [...updated, { ...last, results: [res.data], isFetching: false }];
        });
        setSelected(res.data);
      })
      .catch(err => {
        console.error('Surprise error', err);
        setConversation(prev => {
          const updated = [...prev];
          const last = updated.pop();
          return [...updated, { ...last, error: 'Surprise fetch failed', isFetching: false }];
        });
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      <div className="app-container">
        <Header />
        <Routes>

          <Route path="/" element={<About />} />

          <Route path="/about" element={<About />} />

          <Route path="/home" element={
            user ? (
              <>
                <Home onSearch={handleSearch} onSurprise={handleSurprise} hasSearched={hasSearched} />
                <main className="main-content-chat">
                  <ChatHistory conversation={conversation} onSelect={setSelected} />
                </main>
                <RestaurantModal open={!!selected} onClose={() => setSelected(null)} restaurant={selected} />
              </>
            ) : (
              <LoginPage />
            )
          } />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
