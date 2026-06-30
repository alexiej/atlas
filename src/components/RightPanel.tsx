import { useState } from 'react';
import { CAT_COLOR, CAT_GRAD_DARK, CAT_GRAD_LIGHT, getEmoji, type AppData } from '../data/apps';

interface Props {
  app:     AppData | null;
  isDark:  boolean;
  onClose: () => void;
}

export default function RightPanel({ app, isDark, onClose }: Props) {
  const [metaOpen,   setMetaOpen]   = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  // Reset accordion state when a new app is selected
  const col   = app ? CAT_COLOR[app.cat]  : '#888';
  const grad  = app ? (isDark ? CAT_GRAD_DARK[app.cat] : CAT_GRAD_LIGHT[app.cat]) : '';
  const ready = app?.status === 'ready';

  return (
    <div
      className={`rpanel ${app ? 'open' : ''}`}
      style={{ '--rp-col': col, '--rp-grad': grad } as React.CSSProperties}
    >
      {/* Top bar */}
      <div className="rp-topbar">
        <span className="rp-topbar-cat">{app?.cat ?? '—'}</span>
        <button className="rp-close" onClick={onClose} aria-label="Close panel">✕</button>
      </div>

      <div className="rp-scroll">
        {/* Cover image */}
        <div className="rp-cover">
          {app?.cover
            ? <img src={app.cover} alt={app.title} />
            : <div className="rp-cover-ph">{app ? getEmoji(app) : ''}</div>
          }
        </div>

        <div className="rp-body">
          {/* Badges */}
          <div className="rp-badges">
            {app && <span className="rp-badge-cat">{app.cat}</span>}
            {ready
              ? <span className="rp-badge-ready">● Ready</span>
              : <span className="rp-badge-soon">Coming Soon</span>
            }
          </div>

          {/* Title + desc */}
          <h2 className="rp-title pixel">{app?.title}</h2>
          <p  className="rp-desc">{app?.desc}</p>

          {/* Tags */}
          <div className="rp-tags">
            {app?.tags.map(t => <span key={t} className="rp-tag">{t}</span>)}
          </div>

          {/* CTA */}
          <div className="rp-cta">
            {ready && app?.url
              ? <a className="rp-play" href={app.url} target="_blank" rel="noopener noreferrer">▶ &nbsp; Play / Open</a>
              : <div className="rp-play-dis">○ &nbsp; Coming Soon</div>
            }
            {ready && app?.download && (
              <a
                className="rp-download"
                href={app.download}
                download
                title="Download as .zip — single HTML file, works offline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download .zip
              </a>
            )}
          </div>

          {/* Generation Info (only for apps with meta) */}
          {app?.meta && (
            <div className="rp-meta">
              <div className="rp-meta-grid">
                  <div>
                    <div className="rp-mi-key">Source</div>
                    <div className="rp-mi-val">{app.meta.source}</div>
                  </div>
                  <div>
                    <div className="rp-mi-key">Date</div>
                    <div className="rp-mi-val">{app.meta.date}</div>
                  </div>
                  <div>
                    <div className="rp-mi-key">Model</div>
                    <div className="rp-mi-val">{app.meta.model}</div>
                  </div>
                  <div>
                    <div className="rp-mi-key">Generated in</div>
                    <div className="rp-mi-val">{app.meta.time}</div>
                  </div>

                  {/* Expandable prompt */}
                  <div className="rp-prompt">
                    <div
                      className={`rp-prompt-hd ${promptOpen ? 'open' : ''}`}
                      onClick={() => setPromptOpen(o => !o)}
                    >
                      Prompt <span className="rp-prompt-arr">▼</span>
                    </div>
                    <div className={`rp-prompt-text ${promptOpen ? 'open' : ''}`}>
                      <div
                        className="rp-prompt-inner"
                        dangerouslySetInnerHTML={{ __html: app.meta.prompt }}
                      />
                    </div>
                  </div>
                </div>
                </div>
         
          )}
        </div>
      </div>
    </div>
  );
}
