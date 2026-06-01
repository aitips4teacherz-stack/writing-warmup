import React, { useState, useCallback } from 'react'
import SelectorBar from './components/SelectorBar.jsx'
import LessonHeader from './components/LessonHeader.jsx'
import StageDisplay from './components/StageDisplay.jsx'
import FridayAssessment from './components/FridayAssessment.jsx'
import WelcomeState from './components/WelcomeState.jsx'
import { fetchLesson } from './lib/lessonService.js'
import { DAY_COLOURS } from './lib/lessonData.js'

export default function App() {
  const [term, setTerm] = useState(1)
  const [week, setWeek] = useState(1)
  const [day, setDay] = useState('Monday')

  const [activeLesson, setActiveLesson] = useState(null)
  const [activeMeta, setActiveMeta] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fridayKey, setFridayKey] = useState(0)

  const handleGo = useCallback(async () => {
    setLoading(true)
    setError(null)
    setActiveLesson(null)

    try {
      if (day === 'Friday') {
        setActiveMeta({ term, week, day })
        setActiveLesson('friday')
        setFridayKey(k => k + 1)
      } else {
        const lesson = await fetchLesson(term, week, day)
        if (!lesson) throw new Error(`No lesson found for Term ${term}, Week ${week}, ${day}.`)
        setActiveMeta({ term, week, day })
        setActiveLesson(lesson)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [term, week, day])

  const dayColour = DAY_COLOURS[day] || '#a855f7'

  return (
    <div className="app-shell">
      {/* ── Header ── */}
      <header className="site-header">
        <div className="site-header__wordmark">
          Writing <span>Warm-Up.</span>
        </div>
        <div className="site-header__sub">
          NZ Curriculum · Years 5–6 · Phase 2
        </div>
      </header>

      {/* ── Selector bar ── */}
      <SelectorBar
        term={term}
        week={week}
        day={day}
        onTermChange={setTerm}
        onWeekChange={setWeek}
        onDayChange={setDay}
        onGo={handleGo}
        loading={loading}
      />

      {/* ── Main content ── */}
      <main className="main-content">
        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading lesson…</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p style={{ color: '#e63946', fontWeight: 600 }}>⚠ {error}</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
              Check your Supabase connection or try a different lesson.
            </p>
          </div>
        )}

        {!loading && !error && !activeLesson && (
          <WelcomeState />
        )}

        {!loading && !error && activeLesson === 'friday' && activeMeta && (
        <FridayAssessment key={fridayKey} term={activeMeta.term} week={activeMeta.week} />
        )}

        {!loading && !error && activeLesson && activeLesson !== 'friday' && activeMeta && (
          <>
            <LessonHeader
              term={activeMeta.term}
              week={activeMeta.week}
              day={activeMeta.day}
              topic={activeLesson.topic}
              nzLink={activeLesson.nzLink}
            />
            <StageDisplay
              lesson={activeLesson}
              dayColour={dayColour}
              onComplete={() => {}}
            />
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        Writing Warm-Up Programme · NZ Curriculum Years 5–6 · 40 weeks · 4 terms · Spiral design
      </footer>
    </div>
  )
}
