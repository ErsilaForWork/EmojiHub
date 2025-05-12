import React from 'react';

const TONES = [
  { id: 1, color: '#f3f300' },
  { id: 2, color: '#F4B183' },
  { id: 3, color: '#D58F65' },
  { id: 4, color: '#B57457' },
  { id: 5, color: '#8C4F3A' },
  { id: 6, color: '#5C2F1D' },
];

export default function SkinToneFilter({ selected, onSelect }) {
  return (
    <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span>Skin Tone:</span>
      {TONES.map(t => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: selected === t.id ? '2px solid var(--color-primary)' : '2px solid transparent',
            background: t.color,
            cursor: 'pointer',
            padding: 0,
          }}
        />
      ))}
      <button
        onClick={() => onSelect(-1)}
        style={{
          marginLeft: '1rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--color-primary)',
          cursor: 'pointer',
          textDecoration: selected == null ? 'underline' : 'none'
        }}
      >
        Reset
      </button>
    </div>
  );
}
