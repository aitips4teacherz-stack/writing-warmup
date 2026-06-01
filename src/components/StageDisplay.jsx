import React, { useState, useEffect, useRef } from 'react'

const STAGE_META = [
  {
    key: 'iDo',
    icon: '👁️',
    label: 'I Do',
    sub: 'Watch & Listen',
    color: '#1e40af',
    bgGradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
    nextLabel: 'Start We Do',
    nextClass: 'we-do',
    approxMins: 5,
  },
  {
    key: 'weDo',
    icon: '🤝',
    label: 'We Do',
    sub: 'Practise Together',
    color: '#065f46',
    bgGradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
    nextLabel: 'Start You Do',
    nextClass: 'you-do',
    approxMins: 7,
  },
  {
    key: 'youDo',
    icon: '✏️',
    label: 'You Do',
    sub: 'Independent Practice',
    color: '#7c2d12',
    bgGradient: 'linear-gradient(135deg, #6b1f0a 0%, #9a3412 100%)',
    nextLabel: 'Finish Lesson',
    nextClass: 'you-do',
    approxMins: 8,
  },
]

// ── Fade wrapper ──────────────────────────────────────────────────────────────
function FadeSlide({ children, stageKey }) {
  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState(children)
  const [leaving, setLeaving] = useState(false)
  const prevKey = useRef(stageKey)

  useEffect(() => {
    if (stageKey !== prevKey.current) {
      // Start exit
      setLeaving(true)
      const exitTimer = setTimeout(() => {
        setContent(children)
        setLeaving(false)
        setVisible(false)
        prevKey.current = stageKey
        // Slight delay then enter
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true))
        })
      }, 500)
      return () => clearTimeout(exitTimer)
    } else {
      // Initial mount
      const t = setTimeout(() => setVisible(true), 50)
      return () => clearTimeout(t)
    }
  }, [stageKey]) // eslint-disable-line

  const style = {
    transition: 'opacity 500ms ease, transform 500ms ease',
    opacity: leaving ? 0 : visible ? 1 : 0,
    transform: leaving
      ? 'translateY(-14px)'
      : visible
      ? 'translateY(0)'
      : 'translateY(18px)',
  }

  return <div style={style}>{content}</div>
}

// ── Timer display ─────────────────────────────────────────────────────────────
function StageTimer({ totalSeconds, onExpire }) {
  const [remaining, setRemaining] = useState(totalSeconds)

  useEffect(() => {
    setRemaining(totalSeconds)
  }, [totalSeconds])

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.()
      return
    }
    const t = setInterval(() => setRemaining(r => r - 1), 1000)
    return () => clearInterval(t)
  }, [remaining, onExpire])

  const pct = Math.max(0, (remaining / totalSeconds) * 100)
  const mins = Math.floor(remaining / 60)
  const secs = String(remaining % 60).padStart(2, '0')
  const colour = pct > 40 ? '#1d4ed8' : pct > 15 ? '#f59e0b' : '#dc2626'

  return (
    <div className="lesson-timer">
      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
        {mins}:{secs}
      </span>
      <div className="lesson-timer__bar">
        <div
          className="lesson-timer__fill"
          style={{ width: `${pct}%`, background: colour }}
        />
      </div>
    </div>
  )
}

// ── I Do content ──────────────────────────────────────────────────────────────
function IDoContent({ data, accentColor }) {
  return (
    <div className="stage-card__body">
      <p className="instruction-block">{data.instruction}</p>

      {data.example && (
        <div className="example-box" style={{ borderLeftColor: accentColor, color: accentColor }}>
          <div className="example-box__label">Example</div>
          <span
            style={{ color: 'var(--ink)' }}
            dangerouslySetInnerHTML={{ __html: data.example }}
          />
        </div>
      )}

      {data.demonstration && (
        <div className="demo-box">
          <div className="demo-box__label">🎬 Demonstration</div>
          <span dangerouslySetInnerHTML={{ __html: data.demonstration }} />
        </div>
      )}

      {data.tip && (
        <div className="tip-box">
          <span className="tip-box__icon">💡</span>
          <span>
            <strong>Teaching Tip: </strong>
            {data.tip}
          </span>
        </div>
      )}
    </div>
  )
}

// ── We Do content ─────────────────────────────────────────────────────────────
function WeDoContent({ data, accentColor }) {
  return (
    <div className="stage-card__body">
      <p className="instruction-block">{data.instruction}</p>

      {data.sentences && data.sentences.length > 0 && (
        <ul className="sentence-list">
          {data.sentences.map((s, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: s }} />
          ))}
        </ul>
      )}

      {data.prompt && (
        <div className="prompt-box">
          <span className="prompt-box__icon">💬</span>
          <span>
            <strong>Discussion: </strong>
            {data.prompt}
          </span>
        </div>
      )}
    </div>
  )
}

// ── You Do content ────────────────────────────────────────────────────────────
function YouDoContent({ data }) {
  return (
    <div className="stage-card__body">
      <p className="instruction-block">{data.instruction}</p>

      {data.tasks && data.tasks.length > 0 && (
        <ul className="task-list">
          {data.tasks.map((t, i) => {
            const isBonus = t.startsWith('✦')
            return (
              <li key={i} className={isBonus ? 'bonus' : ''}>
                {!isBonus && (
                  <span className="task-num">{i + 1}</span>
                )}
                <span dangerouslySetInnerHTML={{ __html: t }} />
              </li>
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

  // Reset when lesson changes
  useEffect(() => {
    setStageIdx(0)
    setDone(false)
  }, [lesson])

  const meta = STAGE_META[stageIdx]

  function nextStage() {
    if (stageIdx < 2) {
      setStageIdx(s => s + 1)
    } else {
      setDone(true)
      onComplete?.()
    }
  }

  function prevStage() {
    if (stageIdx > 0) setStageIdx(s => s - 1)
  }

  const stageData = lesson[meta.key]

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
      {/* Stage progress pills */}
      <div className="stage-progress">
        {STAGE_META.map((s, i) => (
          <button
            key={s.key}
            className={`stage-progress__step ${i === stageIdx ? 'active' : ''} ${i < stageIdx ? 'done' : ''}`}
            style={{ color: i === stageIdx ? s.color : 'var(--ink-soft)' }}
            onClick={() => setStageIdx(i)}
            title={`Jump to ${s.label}`}
          >
            <span className="stage-progress__icon">{i < stageIdx ? '✅' : s.icon}</span>
            <span className="stage-progress__label">{s.label}</span>
            <span className="stage-progress__sub">{s.sub}<br />~{s.approxMins} min</span>
          </button>
        ))}
      </div>

      {/* Stage card with fade */}
      <FadeSlide stageKey={meta.key}>
        <div className="stage-card">
          {/* Card header */}
          <div className="stage-card__header" style={{ background: meta.bgGradient }}>
            <span className="stage-card__header-icon">{meta.icon}</span>
            <div className="stage-card__header-text">
              <h2>{stageData?.title || `${meta.label} — ${meta.sub}`}</h2>
              <p>Stage {stageIdx + 1} of 3 · approximately {meta.approxMins} minutes</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <StageTimer totalSeconds={meta.approxMins * 60} />
            </div>
          </div>

          {/* Stage-specific content */}
          {stageIdx === 0 && stageData && (
            <IDoContent data={stageData} accentColor={meta.color} />
          )}
          {stageIdx === 1 && stageData && (
            <WeDoContent data={stageData} accentColor={meta.color} />
          )}
          {stageIdx === 2 && stageData && (
            <YouDoContent data={stageData} />
          )}

          {!stageData && (
            <div className="stage-card__body">
              <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>
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
          style={{ opacity: stageIdx === 0 ? 0.35 : 1, cursor: stageIdx === 0 ? 'not-allowed' : 'pointer' }}
        >
          ← Back
        </button>

        <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
          {stageIdx + 1} / 3
        </span>

        {stageIdx < 2 ? (
          <button
            className={`stage-nav__btn stage-nav__btn--next ${STAGE_META[stageIdx + 1]?.nextClass ?? ''}`}
            onClick={nextStage}
            style={{ background: STAGE_META[stageIdx + 1]?.color }}
          >
            {meta.nextLabel} →
          </button>
        ) : (
          <button
            className="stage-nav__btn stage-nav__btn--complete"
            onClick={nextStage}
          >
            ✓ Complete Lesson
          </button>
        )}
      </div>
    </div>
  )
}
