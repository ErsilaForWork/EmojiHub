import React, { useState } from 'react';
import client from '../api/client';
import './TryYourLuckPage.css';

export default function TryYourLuckPage() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const roll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await client.get('/emojis/random');
      setData(res.data);   
    } catch (err) {
      console.error(err);
      setError('Failed to get a lucky emoji');
    } finally {
      setLoading(false);
    }
  };

  const renderChar = emoji => {
    if (!emoji) return '';
    return emoji.unicode?.length
      ? emoji.unicode.map(u => String.fromCodePoint(parseInt(u.replace('U+', ''),16))).join('')
      : emoji.htmlCode.map(h => String.fromCodePoint(parseInt(h.match(/\d+/)[0],10))).join('');
  };

  return (
    <div className="try-wrapper">
      <h1>Try Your Luck</h1>

      <button
        className="dice-btn"
        onClick={roll}
        disabled={loading}
        title="Roll the dice"
      >
        🎲
      </button>

      {loading && <p className="status-text">Rolling…</p>}
      {error   && <p className="status-text error">{error}</p>}

      {data && (
        <div className="lucky-card">
          <h2>Your Lucky Emoji:</h2>
          <div className="emoji-display">{renderChar(data.emoji)}</div>
          <div className="info-block">
            <div><strong>Name:</strong> {data.emoji.name.split('≊')[0].trim()}</div>
            <div><strong>HTML Code:</strong> {data.emoji.htmlCode.join(', ')}</div>
            <div><strong>Unicode:</strong> {data.emoji.unicode.join(', ')}</div>
            <div><strong>Category:</strong> {data.emoji.category}</div>
            <div><strong>Group:</strong> {data.emoji.group}</div>
            <div className="interesting"><strong>Interesting Info:</strong> {data.aiResponse.trim()}</div>
          </div>
          <button className="dice-btn small" onClick={roll} disabled={loading}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
