import React, { useState, useEffect, useRef } from 'react'

const STAGE_META = [
  {
    key: 'iDo',
    icon: '👁️',
    label: 'I Do',
    sub: 'Watch & Listen',
    color: '#3b82f6',
    bgGradient: 'rgba(59,130,246,0.15)',
    nextLabel: 'Start We Do',
    nextClass: 'we-do',
    approxMins: 5,
  },
  {
    key: 'weDo',
    icon: '🤝',
    label: 'We Do',
    sub: 'Practise Together',
    color: '#10b981',
    bgGradient: 'rgba(16,185,129,0.15)',
    nextLabel: 'Start You Do',
    nextClass: 'you-do',
    approxMins: 7,
  },
  {
    key: 'youDo',
    icon: '✏️',
    label: 'You Do',
    sub: 'Independent Practice',
    color: '#f97316',
    bgGradient: 'rgba(249,115,22,0.15)',
    nextLabel: 'Finish Lesson',
    nextClass: 'you-do',
    approxMins: 8,
  },
]

// ── Fullscreen TV overlay ─────────────────────────────────────────────────────
function FullscreenOverlay({ item, label, accentColor, dayColour, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Replace <u> with styled span using dayColour, <strong> with accentColor
  function styledHtml(html) {
    if (!html) return html
    return html
      .replace(/<u>(.*?)<\/u>/g, `<u style="text-decoration-color:${dayColour};text-decoration-thickness:4px;color:${dayColour};text-underline-offset:6px">$1</u>`)
      .replace(/<strong>(.*?)<\/strong>/g, `<strong style="color:${accentColor}">$1</strong>`)
  }

  const isBonus = typeof item === 'string' && item.startsWith('✦')

  // Estimate content length to pick an appropriate font size
  const rawText = typeof item === 'string' ? item.replace(/<[^>]+>/g, '') : ''
  const charCount = rawText.length
  const fontSize = charCount > 400 ? '1.15rem'
    : charCount > 200 ? '1.45rem'
    : charCount > 100 ? '1.9rem'
    : charCount > 50  ? 'clamp(2rem, 3.5vw, 3rem)'
    : 'clamp(2.5rem, 4.5vw, 4.5rem)'

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0a0812',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 4rem',
        cursor: 'pointer',
        animation: 'fsIn 200ms ease',
        // Guarantee nothing bleeds through
        isolation: 'isolate',
      }}
    >
      <style>{`
        @keyframes fsIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Colour glow behind text */}
      <div style={{
        position: 'absolute',
        width: '70%',
        height: '50%',
        background: `radial-gradient(ellipse, ${dayColour}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: dayColour,
        marginBottom: '2rem',
        opacity: 0.85,
        flexShrink: 0,
      }}>
        {label}
      </div>

      {/* Main text — scrollable if somehow still too long */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize,
          fontWeight: 600,
          color: '#f0eeff',
          lineHeight: 1.55,
          textAlign: 'center',
          width: '100%',
          maxWidth: '1400px',
          position: 'relative',
          zIndex: 1,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 12rem)',
          padding: '0 1rem',
        }}
        dangerouslySetInnerHTML={{ __html: styledHtml(item) }}
      />

      {/* Dismiss hint */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2.5rem',
        fontFamily: 'var(--font-body)',
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(240,238,255,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{
          border: '1px solid rgba(240,238,255,0.2)',
          borderRadius: '4px',
          padding: '2px 6px',
          fontSize: '0.65rem',
        }}>ESC</span>
        or tap anywhere to close
      </div>

      {/* Colour bar at bottom — same as header */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '4px',
        background: `linear-gradient(90deg,
          #e63946 0%, #e63946 20%,
          #f4a261 20%, #f4a261 40%,
          #2ec4b6 40%, #2ec4b6 60%,
          #a855f7 60%, #a855f7 80%,
          #facc15 80%, #facc15 100%)`,
      }} />
    </div>
  )
}

// ── Fade wrapper ──────────────────────────────────────────────────────────────
function FadeSlide({ children, stageKey }) {
  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState(children)
  const [leaving, setLeaving] = useState(false)
  const prevKey = useRef(stageKey)

  useEffect(() => {
    if (stageKey !== prevKey.current) {
      setLeaving(true)
      const exitTimer = setTimeout(() => {
        setContent(children)
        setLeaving(false)
        setVisible(false)
        prevKey.current = stageKey
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true))
        })
      }, 500)
      return () => clearTimeout(exitTimer)
    } else {
      const t = setTimeout(() => setVisible(true), 50)
      return () => clearTimeout(t)
    }
  }, [stageKey]) // eslint-disable-line

  const style = {
    transition: 'opacity 500ms ease, transform 500ms ease',
    opacity: leaving ? 0 : visible ? 1 : 0,
    transform: leaving ? 'translateY(-14px)' : visible ? 'translateY(0)' : 'translateY(18px)',
  }

  return <div style={style}>{content}</div>
}

// ── Timer ─────────────────────────────────────────────────────────────────────
function StageTimer({ totalSeconds }) {
  const [remaining, setRemaining] = useState(totalSeconds)

  useEffect(() => { setRemaining(totalSeconds) }, [totalSeconds])

  useEffect(() => {
    if (remaining <= 0) return
    const t = setInterval(() => setRemaining(r => r - 1), 1000)
    return () => clearInterval(t)
  }, [remaining])

  const pct = Math.max(0, (remaining / totalSeconds) * 100)
  const mins = Math.floor(remaining / 60)
  const secs = String(remaining % 60).padStart(2, '0')
  const colour = pct > 40 ? '#3b82f6' : pct > 15 ? '#facc15' : '#e63946'

  return (
    <div className="lesson-timer">
      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
        {mins}:{secs}
      </span>
      <div className="lesson-timer__bar">
        <div className="lesson-timer__fill" style={{ width: `${pct}%`, background: colour }} />
      </div>
    </div>
  )
}

// ── Clickable item wrapper ────────────────────────────────────────────────────
function Expandable({ children, html, label, accentColor, dayColour, style: extraStyle }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        title="Click to show full screen"
        style={{
          cursor: 'pointer',
          position: 'relative',
          transition: 'opacity 0.15s',
          ...extraStyle,
        }}
        onMouseEnter={e => {
          e.currentTarget.querySelector('.fs-hint') && (e.currentTarget.querySelector('.fs-hint').style.opacity = '1')
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector('.fs-hint') && (e.currentTarget.querySelector('.fs-hint').style.opacity = '0')
        }}
      >
        {children}
        {/* Fullscreen hint badge */}
        <span className="fs-hint" style={{
          position: 'absolute',
          top: '0.4rem',
          right: '0.5rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.58rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: accentColor,
          background: 'var(--bg)',
          border: `1px solid ${accentColor}44`,
          borderRadius: '3px',
          padding: '2px 6px',
          opacity: 0,
          transition: 'opacity 0.15s',
          pointerEvents: 'none',
        }}>⛶ Full screen</span>
      </div>

      {open && (
        <FullscreenOverlay
          item={html}
          label={label}
          accentColor={accentColor}
          dayColour={dayColour}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

// ── I Do content ──────────────────────────────────────────────────────────────
function IDoContent({ data, accentColor, dayColour }) {
  return (
    <div className="stage-card__body">
      <p className="instruction-block">{data.instruction}</p>

      {data.example && (
        <Expandable html={data.example} label="Example" accentColor={accentColor} dayColour={dayColour}>
          <div className="example-box" style={{ borderLeftColor: accentColor }}>
            <div className="example-box__label">Example — click to enlarge</div>
            <span style={{ color: 'var(--text)' }} dangerouslySetInnerHTML={{ __html: data.example }} />
          </div>
        </Expandable>
      )}

      {data.demonstration && (
        <Expandable html={data.demonstration} label="Demonstration" accentColor={accentColor} dayColour={dayColour}>
          <div className="demo-box">
            <div className="demo-box__label">🎬 Demonstration — click to enlarge</div>
            <span dangerouslySetInnerHTML={{ __html: data.demonstration }} />
          </div>
        </Expandable>
      )}

      {data.tip && (
        <div className="tip-box">
          <span className="tip-box__icon">💡</span>
          <span><strong>Teaching Tip: </strong>{data.tip}</span>
        </div>
      )}
    </div>
  )
}

// ── We Do content ─────────────────────────────────────────────────────────────
function WeDoContent({ data, accentColor, dayColour }) {
  return (
    <div className="stage-card__body">
      <p className="instruction-block">{data.instruction}</p>

      {data.sentences && data.sentences.length > 0 && (
        <ul className="sentence-list">
          {data.sentences.map((s, i) => (
            <Expandable key={i} html={s} label={`Sentence ${i + 1}`} accentColor={accentColor} dayColour={dayColour}>
              <li style={{ listStyle: 'none' }} dangerouslySetInnerHTML={{ __html: s }} />
            </Expandable>
          ))}
        </ul>
      )}

      {data.prompt && (
        <div className="prompt-box">
          <span className="prompt-box__icon">💬</span>
          <span><strong>Discussion: </strong>{data.prompt}</span>
        </div>
      )}
    </div>
  )
}

// ── You Do content ────────────────────────────────────────────────────────────
function YouDoContent({ data, accentColor, dayColour }) {
  return (
    <div className="stage-card__body">
      <p className="instruction-block">{data.instruction}</p>

      {data.tasks && data.tasks.length > 0 && (
        <ul className="task-list">
          {data.tasks.map((t, i) => {
            const isBonus = t.startsWith('✦')
            return (
              <Expandable key={i} html={t} label={isBonus ? 'Bonus Task' : `Task ${i + 1}`} accentColor={accentColor} dayColour={dayColour}>
                <li className={isBonus ? 'bonus' : ''} style={{ listStyle: 'none' }}>
                  {!isBonus && <span className="task-num">{i + 1}</span>}
                  <span dangerouslySetInnerHTML={{ __html: t }} />
                </li>
              </Expandable>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// ── Main StageDisplay ─────────────────────────────────────────────────────────
export default function StageDisplay({ lesson, dayColour, onComplete }) {
  const [stageIdx, setStageIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setStageIdx(0)
    setDone(false)
  }, [lesson])

  const meta = STAGE_META[stageIdx]
  const stageData = lesson[meta.key]

  function nextStage() {
    if (stageIdx < 2) setStageIdx(s => s + 1)
    else { setDone(true); onComplete?.() }
  }

  function prevStage() {
    if (stageIdx > 0) setStageIdx(s => s - 1)
  }

  if (done) {
    return (
      <div className="complete-screen">
        <span className="complete-screen__icon">🎉</span>
        <h2 className="complete-screen__heading">Lesson Complete!</h2>
        <p className="complete-screen__sub">
          Great work! You've finished the I&nbsp;Do, We&nbsp;Do, and You&nbsp;Do stages.
          Time to put down those pencils.
        </p>
        <button
          className="complete-screen__btn"
          onClick={() => { setStageIdx(0); setDone(false) }}
        >
          ↩ Restart Lesson
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Stage progress */}
      <div className="stage-progress">
        {STAGE_META.map((s, i) => (
          <button
            key={s.key}
            className={`stage-progress__step ${i === stageIdx ? 'active' : ''} ${i < stageIdx ? 'done' : ''}`}
            style={{ color: i === stageIdx ? s.color : 'var(--text-muted)' }}
            onClick={() => setStageIdx(i)}
            title={`Jump to ${s.label}`}
          >
            <span className="stage-progress__icon">{i < stageIdx ? '✅' : s.icon}</span>
            <div>
              <span className="stage-progress__label">{s.label}</span>
              <span className="stage-progress__sub" style={{ display: 'block' }}>{s.sub} · ~{s.approxMins} min</span>
            </div>
          </button>
        ))}
      </div>

      {/* Stage card */}
      <FadeSlide stageKey={meta.key}>
        <div className="stage-card">
          <div className="stage-card__header" style={{ background: meta.bgGradient, borderLeft: `3px solid ${meta.color}` }}>
            <span className="stage-card__header-icon">{meta.icon}</span>
            <div className="stage-card__header-text">
              <h2 style={{ color: meta.color }}>{stageData?.title || `${meta.label} — ${meta.sub}`}</h2>
              <p>Stage {stageIdx + 1} of 3 · approximately {meta.approxMins} minutes</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <StageTimer totalSeconds={meta.approxMins * 60} />
            </div>
          </div>

          {stageIdx === 0 && stageData && (
            <IDoContent data={stageData} accentColor={meta.color} dayColour={dayColour} />
          )}
          {stageIdx === 1 && stageData && (
            <WeDoContent data={stageData} accentColor={meta.color} dayColour={dayColour} />
          )}
          {stageIdx === 2 && stageData && (
            <YouDoContent data={stageData} accentColor={meta.color} dayColour={dayColour} />
          )}

          {!stageData && (
            <div className="stage-card__body">
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No content for this stage yet. Check back after connecting to Supabase.
              </p>
            </div>
          )}
        </div>
      </FadeSlide>

      {/* Navigation */}
      <div className="stage-nav">
        <button
          className="stage-nav__btn stage-nav__btn--prev"
          onClick={prevStage}
          disabled={stageIdx === 0}
          style={{ opacity: stageIdx === 0 ? 0.3 : 1, cursor: stageIdx === 0 ? 'not-allowed' : 'pointer' }}
        >
          ← Back
        </button>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          {stageIdx + 1} / 3
        </span>

        {stageIdx < 2 ? (
          <button
            className="stage-nav__btn stage-nav__btn--next"
            onClick={nextStage}
            style={{ background: STAGE_META[stageIdx + 1]?.color }}
          >
            {meta.nextLabel} →
          </button>
        ) : (
          <button className="stage-nav__btn stage-nav__btn--complete" onClick={nextStage}>
            ✓ Complete Lesson
          </button>
        )}
      </div>
    </div>
  )
}
