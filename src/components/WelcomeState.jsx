import React from 'react'
import { DAY_COLOURS, DAILY_FOCUS } from '../lib/lessonData.js'

export default function WelcomeState() {
  return (
    <div className="welcome-state">
      <h1 className="welcome-state__heading">
        Ready for your<br />
        <em>warm-up.</em>
      </h1>
      <p className="welcome-state__sub">
        Select a term, week, and day above then press{' '}
        <strong>Go</strong> to load today's lesson.
      </p>

      <div className="day-legend">
        {Object.entries(DAILY_FOCUS).map(([day, focus]) => (
          <div key={day} className="day-legend__item">
            <div className="day-legend__dot-label">
              <span
                className="day-legend__dot"
                style={{ background: DAY_COLOURS[day] || '#666' }}
              />
              <span className="day-legend__name">{day}</span>
            </div>
            <span className="day-legend__focus">{focus}</span>
          </div>
        ))}
      </div>

      <div className="stage-intro-grid">
        {[
          { icon: '👁️', title: 'I Do', desc: '~5 min · Teacher demonstrates the skill' },
          { icon: '🤝', title: 'We Do', desc: '~7 min · Class practises together' },
          { icon: '✏️', title: 'You Do', desc: '~8 min · Independent practice' },
        ].map(s => (
          <div key={s.title} className="stage-intro-card">
            <div className="stage-intro-card__icon">{s.icon}</div>
            <div className="stage-intro-card__title">{s.title}</div>
            <div className="stage-intro-card__desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
