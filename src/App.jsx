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

  const handleGo = useCallback(async () => {
    setLoading(true)
    setError(null)
    setActiveLesson(null)

    try {
      if (day === 'Friday') {
        setActiveMeta({ term, week, day })
        setActiveLesson('friday')
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

  const dayColour = DAY_COLOURS[day] || '#1d4ed8'

  return (
    <div className="app-shell">
      {/* ── Header ── */}
      <header className="site-header">
        <div className="site-header__wordmark">
          Writing <span>Warm-Up</span>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
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
            <p style={{ color: '#dc2626', fontWeight: 600 }}>⚠ {error}</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Check your Supabase connection or try a different lesson.
            </p>
          </div>
        )}

        {!loading && !error && !activeLesson && (
          <WelcomeState />
        )}

        {!loading && !error && activeLesson === 'friday' && activeMeta && (
          <FridayAssessment term={activeMeta.term} week={activeMeta.week} />
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
              onComplete={() => {
                // Could log progress to Supabase here in future
              }}
            />
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          textAlign: 'center',
          padding: '1.5rem',
          fontSize: '0.78rem',
          color: 'var(--ink-soft)',
          borderTop: '1px solid var(--rule)',
          marginTop: '2rem',
        }}
      >
        Writing Warm-Up Programme · NZ Curriculum Years 5–6 · 40 weeks, 4 terms, spiral design
      </footer>
    </div>
  )
}
