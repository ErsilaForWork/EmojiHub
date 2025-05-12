import React from 'react';

export default function SortOrderSelect({ order, onChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '1rem 0'
    }}>
      <label htmlFor="sortOrder" style={{ fontWeight: 'bold' }}>Sort:</label>
      <select
        id="sortOrder"
        value={order}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: '0.3rem 0.6rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          background: 'white',
          cursor: 'pointer'
        }}
      >
        <option value="none">No</option>
        <option value="asc">A → Z</option>
        <option value="desc">Z → A</option>
      </select>
    </div>
  );
}
