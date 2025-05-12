import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/">
            🏠 Home
          </Link>
          <Link to="/emojis">
            😊 Emojis
          </Link>
          <Link to="/try">
            🎲 Try Your Luck
          </Link>
        </nav>
      </div>
    </header>
);
}

