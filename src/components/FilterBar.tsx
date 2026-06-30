import { CATEGORIES, CAT_COLOR, type Category } from '../data/apps';

type ActiveCat = Category | 'ALL';

interface Props {
  activeCat: ActiveCat;
  onFilter:  (cat: ActiveCat) => void;
}

export default function FilterBar({ activeCat, onFilter }: Props) {
  return (
    <nav className="filter-bar">
      <button
        className={`f-btn ${activeCat === 'ALL' ? 'active' : ''}`}
        onClick={() => onFilter('ALL')}
      >
        All
      </button>

      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={`f-btn ${activeCat === cat ? 'active' : ''}`}
          style={{ '--fc': CAT_COLOR[cat] } as React.CSSProperties}
          onClick={() => onFilter(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
