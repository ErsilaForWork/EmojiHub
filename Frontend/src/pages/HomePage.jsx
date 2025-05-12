import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const nav = useNavigate();
  return (
    <main className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Welcome to Emoji Hub
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#4b5563' }}>
        Here you can search and collect your favorite emojis.
      </p>
      <button
        className="primary"
        onClick={() => nav('/emojis')}
        style={{ marginTop: '2rem' }}
      >
        Go to emojis
      </button>

    </main>
  );
}

