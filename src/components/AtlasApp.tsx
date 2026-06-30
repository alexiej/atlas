import { useState, useEffect } from 'react';
import Header     from './Header';
import FilterBar  from './FilterBar';
import AppGrid    from './AppGrid';
import RightPanel from './RightPanel';
import Footer     from './Footer';
import { APPS, type AppData, type Category } from '../data/apps';

export type Theme     = 'dark' | 'light';
export type ActiveCat = Category | 'ALL';

export default function AtlasApp() {
  const [theme,     setTheme]     = useState<Theme>('dark');
  const [activeCat, setActiveCat] = useState<ActiveCat>('ALL');
  const [searchQ,   setSearchQ]   = useState('');
  const [activeApp, setActiveApp] = useState<AppData | null>(null);

  // Apply theme from localStorage on mount (avoids FOUC)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('atlas-theme') as Theme | null;
      const system: Theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      const t = saved ?? system;
      setTheme(t);
      document.documentElement.dataset.theme = t;
    } catch (_) {}
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('atlas-theme', next); } catch (_) {}
  }

  // Filtered apps
  const visibleApps = APPS.filter(a => {
    const matchCat    = activeCat === 'ALL' || a.cat === activeCat;
    const q           = searchQ.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) ||
                        a.sub.toLowerCase().includes(q) ||
                        a.tags.join(' ').includes(q);
    return matchCat && matchSearch;
  });

  function handleCardClick(app: AppData) {
    // Toggle: clicking same card closes panel
    setActiveApp(prev => (prev?.id === app.id ? null : app));
  }

  function closePanel() {
    setActiveApp(null);
  }

  function handleFilter(cat: ActiveCat) {
    setActiveCat(cat);
    closePanel();
  }

  function handleSearch(q: string) {
    setSearchQ(q);
    closePanel();
  }

  return (
    <>
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        searchQ={searchQ}
        onSearch={handleSearch}
      />

      <FilterBar
        activeCat={activeCat}
        onFilter={handleFilter}
      />

      <div className={`layout ${activeApp ? 'panel-open' : ''}`}>
        <main className="main">
          <AppGrid
            apps={visibleApps}
            activeId={activeApp?.id ?? null}
            isDark={theme === 'dark'}
            onCardClick={handleCardClick}
          />
        </main>
      </div>

      <RightPanel
        app={activeApp}
        isDark={theme === 'dark'}
        onClose={closePanel}
      />

      {/* Backdrop overlay */}
      <div
        className={`overlay ${activeApp ? 'open' : ''}`}
        onClick={closePanel}
      />

      <Footer theme={theme} />
    </>
  );
}
