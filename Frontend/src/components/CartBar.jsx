import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import './CartBar.css';

export default function CartBar() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const res = await client.get('/cart');
      setItems(res.data);
    } catch (err) {
      console.error('Load cart error:', err);
    }
  };

  useEffect(() => {
    loadCart();
    const handler = () => loadCart();
    window.addEventListener('cart-updated', handler);
    return () => window.removeEventListener('cart-updated', handler);
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      await client.delete(`/cart/${id}`);
      loadCart();
    } catch (err) {
      console.error('Remove cart error:', err);
    }
  };

  const handleInfo = (id, e) => {
    e.preventDefault();
    navigate(`/emojis/${id}`);
  };

  return (
    <div className="cart-bar container">
      <strong>Cart:</strong> {items.length}
      <div className="cart-items">
        {items.map(item => {
          const char = item.unicode?.length
            ? item.unicode.map(u => String.fromCodePoint(
                parseInt(u.replace('U+', ''), 16)
              )).join('')
            : item.htmlCode.map(h => {
                const num = h.match(/\d+/)[0];
                return String.fromCodePoint(parseInt(num, 10));
              }).join('');
          return (
            <div className="cart-item" key={item.id}>
              <span className="cart-emoji">{char}</span>
              <a
                href="#"
                className="cart-link"
                onClick={e => handleInfo(item.id, e)}
              >
                Info
              </a>
              <a
                href="#"
                className="cart-link"
                onClick={e => handleDelete(item.id, e)}
              >
                Delete
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
