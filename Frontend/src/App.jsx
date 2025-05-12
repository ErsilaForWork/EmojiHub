import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EmojiListPage from './pages/EmojiListPage';
import InfoPage from './pages/InfoPage';
import TryYourLuckPage from './pages/TryYourLuckPage';
import HomePage from './pages/HomePage';
export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emojis" element={<EmojiListPage />} />
        <Route path="/emojis/:id" element={<InfoPage />} />
        <Route path="/try" element={<TryYourLuckPage />} />
      </Routes>
    </>
  );
}
