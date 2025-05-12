import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import './InfoPage.css';

export default function InfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [emojiData, setEmojiData] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [copied, setCopied]       = useState(false);

  useEffect(() => {
    let canceled = false;
    async function fetchEmoji() {
      try {
        const res = await client.get(`/emojis/${id}`);
        if (!canceled) {
          setEmojiData(res.data);
          setLoading(false);
        }
      } catch (err) {
        if (!canceled) {
          setError('Failed to load emoji');
          setLoading(false);
        }
      }
    }
    fetchEmoji();
    return () => { canceled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="info-wrapper">
        <div className="info-container">
          Loading…
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="info-wrapper">
        <div className="info-container info-error">
          {error}
        </div>
      </div>
    );
  }

  const { emoji, aiResponse } = emojiData;
  const char = emoji.unicode?.length
    ? emoji.unicode
        .map(u => String.fromCodePoint(parseInt(u.replace('U+', ''), 16)))
        .join('')
    : emoji.htmlCode
        .map(h => String.fromCodePoint(parseInt(h.match(/\d+/)[0], 10)))
        .join('');
  const cleanName = emoji.name.split('≊')[0].trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(char).catch(console.error);
    setCopied(true);
  };

  return (
    <div className="info-wrapper">
      <div className="info-container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="info-content">
          <div className="info-left">
            <div className="info-char">{char}</div>
          </div>
          <div className="info-right">
            <h1 className="info-name">{cleanName}</h1>
            <div className="info-field"><strong>HTML Code:</strong> {emoji.htmlCode.join(', ')}</div>
            <div className="info-field"><strong>Unicode:</strong> {emoji.unicode.join(', ')}</div>
            <div className="info-field"><strong>Category:</strong> {emoji.category}</div>
            <div className="info-field"><strong>Group:</strong> {emoji.group}</div>
            <div className="info-field"><strong>Interesting Info:</strong> {aiResponse.trim()}</div>

            <button className={`action-btn ${copied ? 'added' : ''}`} onClick={handleCopy}>
              Copy Emoji
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
