import { CAT_COLOR, CAT_GRAD_DARK, CAT_GRAD_LIGHT, getEmoji, type AppData } from '../data/apps';
import type { Theme } from './AtlasApp';

interface Props {
  app:      AppData;
  selected: boolean;
  isDark:   boolean;
  onClick:  () => void;
}

export default function AppCard({ app, selected, isDark, onClick }: Props) {
  const col   = CAT_COLOR[app.cat];
  const grad  = isDark ? CAT_GRAD_DARK[app.cat] : CAT_GRAD_LIGHT[app.cat];
  const ready = app.status === 'ready';

  const sizeClass =
    app.size === 'large' ? 'gc-large' :
    app.size === 'wide'  ? 'gc-wide'  :
    app.size === 'tall'  ? 'gc-tall'  : '';

  return (
    <div
      className={`gc ${sizeClass} ${selected ? 'selected' : ''}`.trim()}
      style={{ '--gc-col': col, '--gc-grad': grad } as React.CSSProperties}
      onClick={onClick}
    >
      {/* Background */}
      {app.cover
        ? <div className="gc-img" style={{ backgroundImage: `url('${app.cover}')` }} />
        : <>
            <div className="gc-bg" />
            <div className="gc-emoji">{getEmoji(app)}</div>
          </>
      }

      {/* Scrim */}
      <div className="gc-scrim" />

      {/* Status chip */}
      <span className={`gc-chip ${ready ? 'chip-ready' : 'chip-soon'}`}>
        {ready ? '● READY' : 'SOON'}
      </span>

      {/* Info at bottom */}
      <div className="gc-info">
        <div className="gc-cat">{app.cat}</div>
        <div className="gc-title">{app.title}</div>
        <div className="gc-sub">{app.sub}</div>
      </div>

      {/* Hover play button */}
      <div className="gc-play">
        <div className="gc-play-btn">{ready ? '▶' : '○'}</div>
      </div>
    </div>
  );
}
