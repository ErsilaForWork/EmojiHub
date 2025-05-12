import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import SearchBar from '../components/SearchBar';
import CategoryNav from '../components/CategoryNav';
import SkinToneFilter from '../components/SkinToneFilter';
import SortOrderSelect from '../components/SortOrderSelect';
import EmojiCard from '../components/EmojiCard';
import CartBar from '../components/CartBar';

const CATEGORY_DEFS = [
  { id: 'smileys_and_people', label: 'Smileys & People', icon: '😃', keys: ['smileys and people', 'people'] },
  { id: 'animals_and_nature', label: 'Animals & Nature',  icon: '🐻', keys: ['animals and nature'] },
  { id: 'food_and_drink',     label: 'Food & Drink',      icon: '🍔', keys: ['food and drink'] },
  { id: 'travel_and_places',  label: 'Travel & Places',   icon: '✈️', keys: ['travel and places'] },
  { id: 'activities',         label: 'Activities',        icon: '⚽️', keys: ['activities'] },
  { id: 'objects',            label: 'Objects',           icon: '💡', keys: ['objects'] },
  { id: 'symbols',            label: 'Symbols',           icon: '🔣', keys: ['symbols'] },
  { id: 'flags',              label: 'Flags',             icon: '🏳️', keys: ['flags'] },
];

export default function EmojiListPage() {
  const [emojis, setEmojis]           = useState([]);
  const [search, setSearch]           = useState('');
  const [skinTone, setSkinTone]       = useState(-1);
  const [selectedCat, setSelectedCat] = useState(null);
  const [sortOrder, setSortOrder]     = useState('none'); // 'none' | 'asc' | 'desc'
  const sectionsRef = useRef({});
  const navigate     = useNavigate();

  CATEGORY_DEFS.forEach(def => {
    if (!sectionsRef.current[def.id]) {
      sectionsRef.current[def.id] = React.createRef();
    }
  });

  useEffect(() => {
    let canceled = false;
    async function load() {
      try {
        const params = { search, skinTone };
        const res = await client.get('/emojis', { params });
        if (!canceled) setEmojis(res.data);
      } catch (err) {
        console.error(err);
        if (!canceled) setEmojis([]);
      }
    }
    load();
    return () => { canceled = true; };
  }, [search, skinTone]);

  const grouped = CATEGORY_DEFS.map(def => {
    const items = emojis
      .filter(e => def.keys.includes(e.category) || def.keys.includes(e.group));
    if (sortOrder !== 'none') {
      items.sort((a, b) => {
        const nameA = a.name.split('≊')[0].trim().toLowerCase();
        const nameB = b.name.split('≊')[0].trim().toLowerCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return { ...def, items };
  });

  let displayed, noMatches;
  if (selectedCat === null) {
    displayed = grouped.filter(sec => sec.items.length > 0);
    noMatches = displayed.length === 0;
  } else {
    displayed = grouped.filter(sec => sec.id === selectedCat);
    noMatches = (displayed[0]?.items.length === 0);
  }

  const handleNavSelect = id => setSelectedCat(id);
  const handleInfo = id => navigate(`/emojis/${id}`);

  return (
    <div className="container">
      <CartBar />

      <CategoryNav
        defs={CATEGORY_DEFS}
        selected={selectedCat}
        onSelect={handleNavSelect}
      />

      <SearchBar value={search} onChange={setSearch} />

      <SkinToneFilter selected={skinTone} onSelect={setSkinTone} />

      <SortOrderSelect order={sortOrder} onChange={setSortOrder} />

      {noMatches ? (
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '1.2rem',
        }}>
          No Matches…
        </div>
      ) : (
        displayed.map(section => (
          <section
            key={section.id}
            ref={sectionsRef.current[section.id]}
            style={{ marginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem' }}>
              {section.icon} {section.label}
            </h2>
            <div className="grid-emojis">
              {section.items.map(e => (
                <EmojiCard
                  key={e.id}
                  emoji={e}
                  onInfo={handleInfo}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
