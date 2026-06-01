import React from 'react'
import { TERMS, WEEKS, DAYS } from '../lib/lessonData.js'

export default function SelectorBar({ term, week, day, onTermChange, onWeekChange, onDayChange, onGo, loading }) {
  return (
    <div className="selector-bar">
      <div className="selector-group">
        <label htmlFor="term-select">Term</label>
        <select
          id="term-select"
          value={term}
          onChange={e => onTermChange(Number(e.target.value))}
        >
          {TERMS.map(t => (
            <option key={t} value={t}>Term {t}</option>
          ))}
        </select>
      </div>

      <div className="selector-group">
        <label htmlFor="week-select">Week</label>
        <select
          id="week-select"
          value={week}
          onChange={e => onWeekChange(Number(e.target.value))}
        >
          {WEEKS.map(w => (
            <option key={w} value={w}>Week {w}</option>
          ))}
        </select>
      </div>

      <div className="selector-group">
        <label htmlFor="day-select">Day</label>
        <select
          id="day-select"
          value={day}
          onChange={e => onDayChange(e.target.value)}
        >
          {DAYS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <button
        className="go-btn"
        onClick={onGo}
        disabled={loading}
      >
        {loading ? 'Loading…' : 'Go →'}
      </button>
    </div>
  )
}
