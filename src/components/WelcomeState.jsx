import React from 'react'
import { DAY_COLOURS, DAILY_FOCUS } from '../lib/lessonData.js'

export default function WelcomeState() {
  return (
    <div className="welcome-state">
      <h1 className="welcome-state__heading">
        Ready for your<br />
        <em>writing warm-up?</em>
      </h1>
      <p className="welcome-state__sub">
        Select a term, week, and day above then press{' '}
        <strong>Go</strong> to load today's lesson.
      </p>

      <div className="day-legend">
        {Object.entries(DAILY_FOCUS).map(([day, focus]) => (
          <div key={day} className="day-legend__item">
            <span
              className="day-legend__dot"
              style={{ background: DAY_COLOURS[day] || '#666' }}
            />
            <span>
              <strong>{day}:</strong> {focus}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          maxWidth: '640px',
          margin: '2.5rem auto 0',
        }}
      >
        {[
          { icon: '👁️', title: 'I Do', desc: '~5 min · Teacher demonstrates the skill' },
          { icon: '🤝', title: 'We Do', desc: '~7 min · Class practises together' },
          { icon: '✏️', title: 'You Do', desc: '~8 min · Independent practice' },
        ].map(s => (
          <div
            key={s.title}
            style={{
              background: 'white',
              border: '1.5px solid var(--rule)',
              borderRadius: '12px',
              padding: '1.25rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{s.title}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.4 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '2rem', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
        40 weeks · 4 terms · NZ Curriculum Years 5–6 (Phase 2 Writing) · Spiral design
      </p>
    </div>
  )
}
