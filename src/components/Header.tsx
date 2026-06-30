import type { Theme } from './AtlasApp';

interface Props {
  theme:         Theme;
  onThemeToggle: () => void;
  searchQ:       string;
  onSearch:      (q: string) => void;
}

export default function Header({ theme, onThemeToggle, searchQ, onSearch }: Props) {
  return (
    <header className="atlas-header">
      <div className="brand">
        <div className="brand-logo">ATLAS</div>
        <div className="brand-sub">All Tools Locally Accessible and Simple</div>
      </div>

      <div className="header-right">
        <div className="search-wrap">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <circle cx="9" cy="9" r="6" />
            <path d="M15 15l3 3" />
          </svg>
          <input
            type="text"
            placeholder="Search tools…"
            autoComplete="off"
            value={searchQ}
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        <button className="theme-btn" onClick={onThemeToggle} aria-label="Toggle theme">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>
  );
}
