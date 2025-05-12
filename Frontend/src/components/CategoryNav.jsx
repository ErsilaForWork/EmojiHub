import React from 'react';

export default function CategoryNav({ defs, selected, onSelect }) {
  return (
    <div className="category-nav">
      <button
        className={selected === null ? 'active' : ''}
        onClick={() => onSelect(null)}
        title="All"
      >
        All
      </button>
      {defs.map(def => (
        <button
          key={def.id}
          className={selected === def.id ? 'active' : ''}
          onClick={() => onSelect(def.id)}
          title={def.label}
        >
          {def.icon}
        </button>
      ))}
    </div>
  );
}
