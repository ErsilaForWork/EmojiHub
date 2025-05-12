import React, { useState, useEffect, useRef } from 'react';
import client from '../api/client';
import './EmojiCard.css';

export default function EmojiCard({ emoji, onInfo }) {
  const char = emoji.unicode?.length
    ? emoji.unicode
        .map(u => String.fromCodePoint(parseInt(u.replace('U+', ''), 16)))
        .join('')
    : emoji.htmlCode
        .map(h => {
          const num = h.match(/\d+/)[0];
          return String.fromCodePoint(parseInt(num, 10));
        })
        .join('');

  const cleanName = emoji.name.split('≊')[0].trim();

  const [showActions, setShowActions] = useState(false);
  const [added, setAdded]             = useState(false);
  const [copied, setCopied]           = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handler = e => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowActions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAdd = async e => {
    e.stopPropagation();
    try {
      await client.post('/cart', { emojiId: emoji.id });
      setAdded(true);
      setTimeout(() => setAdded(false), 600);
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      console.error('Add to cart failed', err);
    }
  };

  const handleCopy = e => {
    e.stopPropagation();
    navigator.clipboard.writeText(char).catch(console.error);
    setCopied(true);
    setTimeout(() => setCopied(false), 600);
  };

  return (
    <div
      className="emoji-card"
      ref={cardRef}
      onClick={() => setShowActions(v => !v)}
    >
      <div className="emoji-char">{char}</div>
      <div className="emoji-name">{cleanName}</div>

      {showActions && (
        <>
          <button
            className={`plus-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
          >
            <span className="plus-icon-text">+</span>
          </button>

          <div className="emoji-actions">
            <button
              className={`action-btn ${copied ? 'added' : ''}`}
              onClick={handleCopy}
            >
              Copy
            </button>
            <button className="action-btn" onClick={() => onInfo(emoji.id)}>
              Info
            </button>
          </div>
        </>
      )}
    </div>
  );
}
