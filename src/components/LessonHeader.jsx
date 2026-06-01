import React from 'react'
import { DAILY_FOCUS, DAY_COLOURS } from '../lib/lessonData.js'

export default function LessonHeader({ term, week, day, topic, nzLink }) {
  const colour = DAY_COLOURS[day] || '#1d4ed8'
  const focus = DAILY_FOCUS[day] || day

  return (
    <div className="lesson-header">
      <div className="lesson-header__meta">
        <span
          className="lesson-header__badge"
          style={{ background: colour }}
        >
          <span>{dayEmoji(day)}</span>
          {day}
        </span>
        <span
          className="lesson-header__badge"
          style={{ background: 'var(--ink-soft)', fontSize: '0.72rem' }}
        >
          {focus}
        </span>
        <span className="lesson-header__term-week">
          Term {term} · Week {week}
        </span>
      </div>

      <h1 className="lesson-header__topic">{topic}</h1>

      {nzLink && (
        <p className="lesson-header__nz">
          <span>🎓</span>
          <span>
            <strong>NZ Curriculum Y5–6:</strong> {nzLink}
          </span>
        </p>
      )}
    </div>
  )
}

function dayEmoji(day) {
  const map = {
    Monday: '📚',
    Tuesday: '📖',
    Wednesday: '✍️',
    Thursday: '🔍',
    Friday: '📝',
  }
  return map[day] || '📌'
}
