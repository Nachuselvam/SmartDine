import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import '../index.css';

export default function Home({ onSearch, onSurprise, hasSearched }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const el = inputRef.current;
        if (!el) return;
        if (typeof el.focus === 'function') {
          el.focus();
          const val = el.value || '';
          if (typeof el.setSelectionRange === 'function') el.setSelectionRange(val.length, val.length);
        } else {
          const nested = el.querySelector?.('input');
          if (nested) {
            nested.focus();
            const val = nested.value || '';
            nested.setSelectionRange?.(val.length, val.length);
          }
        }
      } catch (err) {}
    }, 60);

    return () => clearTimeout(t);
  }, [hasSearched]);

  const doSearch = (val) => {
    const q = (val ?? query).trim();
    if (!q) return;
    onSearch(q);
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') doSearch();
  };

  const createConfetti = () => {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    const pieces = 36;
    const colors = ['#ff6b6b', '#f59e0b', '#6ee7b7', '#60a5fa', '#a78bfa', '#f472b6', '#ffd166'];

    for (let i = 0; i < pieces; i++) {
      const p = document.createElement('span');
      p.className = 'confetti-piece';
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.background = color;
      p.style.left = `${30 + Math.random() * 40}%`;
      p.style.top = `${8 + Math.random() * 12}%`;
      p.style.width = `${8 + Math.random() * 14}px`;
      p.style.height = `${10 + Math.random() * 14}px`;
      p.style.opacity = `${0.85 - Math.random() * 0.25}`;
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      p.style.animationDelay = `${Math.random() * 0.12}s`;
      container.appendChild(p);
    }

    document.body.appendChild(container);
    setTimeout(() => {
      container.classList.add('confetti-fadeout');
      setTimeout(() => { try { container.remove(); } catch (e) {} }, 900);
    }, 1400);
  };

  const handleSurprise = () => {
    createConfetti();
    if (onSurprise) onSurprise();
  };

  if (!hasSearched) {
    return (
      <Box className="header-box initial" role="region" aria-label="hero-search">
        <div className="header-logo"><h2>SmartDine</h2></div>

        <div className="search-container-wrapper">
          <Box className="search-container" sx={{ gap: 1 }}>
            <TextField
              inputRef={inputRef}
              label="What do you feel like eating?"
              placeholder="Try: cheesy pizza, sushi, biriyani..."
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                width: '60%',
                '& .MuiInputBase-input': { color: '#ffffff' }, 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }, 
                '& .MuiInputLabel-root': { color: '#ffffff' }, 
                '& .MuiInputLabel-root.Mui-focused': { color: '#ffffff' }, 
                '& .MuiInputBase-input::placeholder': { color: '#ddd', opacity: 1 } 
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
            />
            <Button variant="contained" onClick={() => doSearch()}>Search</Button>
            <Button variant="contained" onClick={handleSurprise} className="surprise-btn">Surprise Me</Button>
          </Box>
        </div>
      </Box>
    );
  }

  return (
    <Box className="header-box fixed-bottom" role="region" aria-label="chat-input">
      <div className="fixed-inner">
        <Box className="search-container" sx={{ gap: 1, width: '100%', alignItems: 'center' }}>
          <TextField
            inputRef={inputRef}
            placeholder="Ask another query..."
            variant="outlined"
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              width: '72%',
              '& .MuiInputBase-input': { color: '#ffffff' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
              '& .MuiInputBase-input::placeholder': { color: '#ddd', opacity: 1 }
            }}
            InputLabelProps={{ shrink: false }}
            autoComplete="off"
          />
          <Button variant="contained" onClick={() => doSearch()}>Send</Button>
          <Button variant="contained" onClick={handleSurprise} className="surprise-btn">Surprise me!</Button>
        </Box>
      </div>
    </Box>
  );
}
