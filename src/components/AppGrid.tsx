import AppCard from './AppCard';
import type { AppData } from '../data/apps';

interface Props {
  apps:        AppData[];
  activeId:    string | null;
  isDark:      boolean;
  onCardClick: (app: AppData) => void;
}

export default function AppGrid({ apps, activeId, isDark, onCardClick }: Props) {
  if (apps.length === 0) {
    return <div className="grid-empty">No tools found.</div>;
  }

  return (
    <div id="grid">
      {apps.map(app => (
        <AppCard
          key={app.id}
          app={app}
          selected={activeId === app.id}
          isDark={isDark}
          onClick={() => onCardClick(app)}
        />
      ))}
    </div>
  );
}
