import React, { useEffect, useRef } from 'react';
import ResultsList from './ResultsList';
import { CircularProgress, Typography } from '@mui/material';
import '../index.css';

export default function ChatHistory({ conversation, onSelect }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversation]);

  const makeReplySentence = (turn) => {
    if (turn.replyText) return turn.replyText;

    const first = turn.results && turn.results[0];
    const restaurantName = first?.name;
    const speciality = first?.speciality || first?.cuisine || 'specialty';
    const userQuery = turn.query?.trim();

    if (restaurantName && userQuery) {
      return `Try "${restaurantName}" because you asked for "${userQuery}" — their ${speciality}.`;
    } else if (restaurantName) {
      return `Try "${restaurantName}" — they have a great "${speciality}".`;
    } else if (userQuery) {
      return `Try these restaurants because you asked for "${userQuery}".`;
    } else {
      return `Try these restaurants — I found some good matches for your request.`;
    }
  };

  return (
    <div className="chat-history">
      {conversation.map((turn, index) => (
        <div key={index} className="chat-turn-container">

          <div className="user-query-message">
            {turn.query}
          </div>
          <div className="ai-response-area">
            {turn.isFetching && (
              <div className="ai-loading-message">
                <CircularProgress size={20} sx={{ color: '#ffdd00', mr: 1 }} />
                SmartDine is thinking...
              </div>
            )}

            {turn.error && (
              <Typography variant="body2" className="ai-message error-message">
                🚨 Error: {turn.error}
              </Typography>
            )}

            {!turn.isFetching && !turn.error && turn.results && (
              <>
                {turn.results.length > 0 ? (
                  <>
                    <Typography variant="body1" className="ai-message intro-message">
                      {makeReplySentence(turn)}
                    </Typography>

                    <ResultsList results={turn.results} onSelect={onSelect} />
                  </>
                ) : (
                  <Typography variant="body1" className="ai-message intro-message">
                    Sorry, no restaurants matched your query.
                  </Typography>
                )}
              </>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
