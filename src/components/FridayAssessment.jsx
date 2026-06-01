import React, { useState, useEffect, useCallback } from 'react'
import { CURRICULUM } from '../lib/lessonData.js'

// ── Generate 8 quiz questions from the week's 4 lessons ──────────────────────
function buildQuestions(term, week) {
  const weekData = CURRICULUM[term]?.[week]
  if (!weekData) return fallbackQuestions

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
  const questions = []

  days.forEach(day => {
    const lesson = weekData[day]
    if (!lesson) return

    // Strip HTML tags for clean text
    const strip = (s) => s ? s.replace(/<[^>]+>/g, '') : ''

    const topic = lesson.topic
    const iDoInstruction = strip(lesson.iDo?.instruction || '')
    const weDo = lesson.weDo
    const youDo = lesson.youDo

    // Q1 per day: topic-based concept question
    if (day === 'Monday') {
      questions.push({
        q: `In Monday's lesson on "${topic}", what does upgrading a word mean?`,
        options: [
          'Making it longer',
          'Replacing a plain word with a more vivid, precise one',
          'Adding a capital letter',
          'Putting it in bold',
        ],
        correct: 1,
        day,
      })
      questions.push({
        q: `Which of these is the BEST upgrade for the word "big"?`,
        options: ['Large', 'Very big', 'Enormous', 'Bigger'],
        correct: 2,
        day,
      })
    }

    if (day === 'Tuesday') {
      questions.push({
        q: `From Tuesday's lesson on "${topic}" — which word is a PROPER noun?`,
        options: ['city', 'river', 'Auckland', 'teacher'],
        correct: 2,
        day,
      })
      questions.push({
        q: `Proper nouns always start with a…`,
        options: ['Full stop', 'Capital letter', 'Comma', 'Question mark'],
        correct: 1,
        day,
      })
    }

    if (day === 'Wednesday') {
      const sentences = weDo?.sentences || []
      questions.push({
        q: `In Wednesday's "${topic}" lesson, what are the three parts of a simple sentence?`,
        options: [
          'Noun, adjective, adverb',
          'Subject, verb, object',
          'Comma, colon, full stop',
          'Question, answer, example',
        ],
        correct: 1,
        day,
      })
      questions.push({
        q: `In the sentence "The cat chased the mouse" — what is the VERB?`,
        options: ['cat', 'mouse', 'chased', 'the'],
        correct: 2,
        day,
      })
    }

    if (day === 'Thursday') {
      questions.push({
        q: `Thursday covered "${topic}" — what is the purpose of editing?`,
        options: [
          'To make the writing longer',
          'To improve clarity, style, and correctness',
          'To add more adjectives',
          'To change the topic',
        ],
        correct: 1,
        day,
      })
      questions.push({
        q: `Which skill did Thursday's editing lesson focus on?`,
        options: [
          topic,
          'Adding pictures',
          'Changing fonts',
          'Reading aloud only',
        ],
        correct: 0,
        day,
      })
    }
  })

  // Trim or pad to exactly 8
  while (questions.length < 8) questions.push(...fallbackQuestions.slice(0, 8 - questions.length))
  return questions.slice(0, 8)
}

const fallbackQuestions = [
  { q: 'What is a noun?', options: ['An action word', 'A naming word', 'A describing word', 'A joining word'], correct: 1, day: 'Monday' },
  { q: 'Which sentence uses a capital letter correctly?', options: ['the dog ran.', 'The Dog ran.', 'The dog ran.', 'the Dog ran.'], correct: 2, day: 'Tuesday' },
  { q: 'What does a verb do in a sentence?', options: ['Names something', 'Describes something', 'Shows action or state', 'Joins clauses'], correct: 2, day: 'Wednesday' },
  { q: 'Which word is an adjective?', options: ['run', 'quickly', 'sparkling', 'and'], correct: 2, day: 'Thursday' },
  { q: 'Where does a full stop go?', options: ['At the start', 'In the middle', 'At the end', 'Nowhere'], correct: 2, day: 'Monday' },
  { q: 'Which is a proper noun?', options: ['dog', 'city', 'Wellington', 'bridge'], correct: 2, day: 'Tuesday' },
  { q: 'A compound sentence joins two clauses with a…', options: ['Full stop', 'Comma only', 'Conjunction', 'Question mark'], correct: 2, day: 'Wednesday' },
  { q: 'What should you check when self-editing?', options: ['Font size', 'Punctuation and word choice', 'Number of pages', 'Colour of ink'], correct: 1, day: 'Thursday' },
]

const DAY_COLOURS = {
  Monday: '#e63946',
  Tuesday: '#f4a261',
  Wednesday: '#2ec4b6',
  Thursday: '#a855f7',
  Friday: '#facc15',
}

const TEAM_NAMES = ['Team Kiwi 🥝', 'Team Tui 🐦']
const TEAM_COLOURS = ['#3b82f6', '#f97316']

// ── Confetti burst ────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    dur: 2 + Math.random() * 2,
    color: ['#e63946','#f4a261','#2ec4b6','#a855f7','#facc15','#3b82f6'][i % 6],
    size: 8 + Math.random() * 10,
    rotate: Math.random() * 360,
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998, overflow: 'hidden' }}>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: '-20px',
          width: p.size,
          height: p.size * 0.6,
          background: p.color,
          borderRadius: '2px',
          animation: `confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
          transform: `rotate(${p.rotate}deg)`,
        }} />
      ))}
    </div>
  )
}

// ── Scoreboard ────────────────────────────────────────────────────────────────
function Scoreboard({ scores, activeTeam, questionNum, totalQ }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: '1rem',
      alignItems: 'center',
      marginBottom: '1.5rem',
    }}>
      {[0, 1].map(t => (
        <div key={t} style={{
          background: activeTeam === t ? `${TEAM_COLOURS[t]}22` : 'var(--bg-card)',
          border: `2px solid ${activeTeam === t ? TEAM_COLOURS[t] : 'var(--border)'}`,
          borderRadius: '10px',
          padding: '1rem 1.5rem',
          textAlign: t === 1 ? 'right' : 'left',
          transition: 'all 0.3s ease',
          boxShadow: activeTeam === t ? `0 0 20px ${TEAM_COLOURS[t]}44` : 'none',
        }}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: TEAM_COLOURS[t],
            marginBottom: '0.25rem',
          }}>{TEAM_NAMES[t]}</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3.5rem',
            color: TEAM_COLOURS[t],
            lineHeight: 1,
          }}>{scores[t]}</div>
          {activeTeam === t && (
            <div style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: TEAM_COLOURS[t],
              marginTop: '0.3rem',
              opacity: 0.8,
            }}>← answering now</div>
          )}
        </div>
      ))}

      {/* Middle: question counter */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          color: 'var(--text-muted)',
          lineHeight: 1,
        }}>{questionNum}</div>
        <div style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
        }}>of {totalQ}</div>
        <div style={{
          marginTop: '0.5rem',
          display: 'flex',
          gap: '3px',
          justifyContent: 'center',
        }}>
          {Array.from({ length: totalQ }, (_, i) => (
            <div key={i} style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: i < questionNum - 1 ? '#facc15' : i === questionNum - 1 ? 'var(--text)' : 'var(--border)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Quiz phase ────────────────────────────────────────────────────────────────
function QuizPhase({ term, week, onFinish }) {
  const questions = buildQuestions(term, week)
  const [qIdx, setQIdx] = useState(0)
  const [scores, setScores] = useState([0, 0])
  const [activeTeam, setActiveTeam] = useState(0)
  const [selected, setSelected] = useState(null)
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState(null) // 'correct' | 'wrong'
  const [answered, setAnswered] = useState(false)

  const q = questions[qIdx]
  const dayColour = DAY_COLOURS[q.day] || '#facc15'

  const handleAnswer = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)

    if (idx === q.correct) {
      setFlash('correct')
      setScores(s => {
        const next = [...s]
        next[activeTeam] += 1
        return next
      })
      setTimeout(() => {
        setFlash(null)
        advance()
      }, 1400)
    } else {
      setFlash('wrong')
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setTimeout(() => {
        setFlash(null)
        advance()
      }, 1800)
    }
  }

  const advance = () => {
    setSelected(null)
    setAnswered(false)
    if (qIdx + 1 >= questions.length) {
      onFinish(scores)
    } else {
      setQIdx(i => i + 1)
      setActiveTeam(t => 1 - t) // alternate teams
    }
  }

  // Shake animation style
  const shakeStyle = shake ? {
    animation: 'shake 0.5s ease',
  } : {}

  return (
    <div>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15%      { transform: translateX(-10px) rotate(-1deg); }
          30%      { transform: translateX(10px) rotate(1deg); }
          45%      { transform: translateX(-8px); }
          60%      { transform: translateX(8px); }
          75%      { transform: translateX(-4px); }
        }
        @keyframes correctPulse {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.7); }
          70%  { box-shadow: 0 0 0 20px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        @keyframes wrongFlash {
          0%,100% { background: var(--bg-surface); }
          25%,75% { background: rgba(230,57,70,0.3); }
        }
      `}</style>

      {/* Full-screen flash overlay */}
      {flash === 'correct' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9990,
          background: 'rgba(16,185,129,0.15)',
          pointerEvents: 'none',
          animation: 'correctPulse 1.4s ease',
        }} />
      )}
      {flash === 'wrong' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9990,
          background: 'rgba(230,57,70,0.2)',
          pointerEvents: 'none',
        }} />
      )}

      <Scoreboard
        scores={scores}
        activeTeam={activeTeam}
        questionNum={qIdx + 1}
        totalQ={questions.length}
      />

      {/* Question card */}
      <div style={shakeStyle}>
        <div style={{
          background: 'var(--bg-card)',
          border: `1px solid var(--border)`,
          borderTop: `3px solid ${dayColour}`,
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}>
          {/* Header */}
          <div style={{
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: `${dayColour}11`,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: dayColour,
              lineHeight: 1,
            }}>Q{qIdx + 1}</span>
            <span style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: dayColour,
            }}>{q.day}'s skills</span>
            <span style={{
              marginLeft: 'auto',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: TEAM_COLOURS[activeTeam],
              background: `${TEAM_COLOURS[activeTeam]}22`,
              padding: '3px 8px',
              borderRadius: '3px',
            }}>{TEAM_NAMES[activeTeam]}'s turn</span>
          </div>

          {/* Question text */}
          <div style={{
            padding: '1.5rem 1.5rem 1.25rem',
            fontFamily: 'var(--font-body)',
            fontSize: '1.35rem',
            fontWeight: 600,
            color: 'var(--text)',
            lineHeight: 1.4,
          }}>
            {q.q}
          </div>
        </div>

        {/* Answer options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
        }}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct
            const isSelected = selected === i
            let bg = 'var(--bg-card)'
            let border = 'var(--border)'
            let textColor = 'var(--text)'
            let icon = ''

            if (answered) {
              if (isCorrect) {
                bg = 'rgba(16,185,129,0.15)'
                border = '#10b981'
                icon = ' ✓'
              } else if (isSelected && !isCorrect) {
                bg = 'rgba(230,57,70,0.15)'
                border = '#e63946'
                textColor = '#e63946'
                icon = ' ✗'
              }
            }

            const letters = ['A', 'B', 'C', 'D']

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                style={{
                  background: bg,
                  border: `2px solid ${border}`,
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  cursor: answered ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  color: textColor,
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  ...((!answered) ? {
                    ':hover': { borderColor: TEAM_COLOURS[activeTeam] }
                  } : {}),
                }}
                onMouseEnter={e => { if (!answered) e.currentTarget.style.borderColor = TEAM_COLOURS[activeTeam] }}
                onMouseLeave={e => { if (!answered) e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: answered && isCorrect ? '#10b981' : answered && isSelected ? '#e63946' : `${TEAM_COLOURS[activeTeam]}33`,
                  color: answered && (isCorrect || isSelected) ? 'white' : TEAM_COLOURS[activeTeam],
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  {letters[i]}
                </span>
                {opt}{icon}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Winner screen ─────────────────────────────────────────────────────────────
function WinnerScreen({ scores, onContinue }) {
  const [showConfetti, setShowConfetti] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const tied = scores[0] === scores[1]
  const winner = scores[0] > scores[1] ? 0 : 1

  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      {showConfetti && <Confetti />}

      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        {tied ? '🤝' : '🏆'}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        lineHeight: 0.95,
        letterSpacing: '0.02em',
        color: tied ? '#facc15' : TEAM_COLOURS[winner],
        marginBottom: '0.75rem',
      }}>
        {tied ? "IT'S A TIE!" : `${TEAM_NAMES[winner]} WINS!`}
      </div>

      <div style={{
        fontSize: '1.15rem',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
        lineHeight: 1.5,
      }}>
        {tied
          ? `Both teams scored ${scores[0]} — you're equally brilliant! 🌟`
          : `${scores[winner]} – ${scores[1 - winner]} · Incredible work from both teams!`
        }
      </div>

      {/* Final scores */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
      }}>
        {[0, 1].map(t => (
          <div key={t} style={{
            background: `${TEAM_COLOURS[t]}18`,
            border: `2px solid ${TEAM_COLOURS[t]}`,
            borderRadius: '10px',
            padding: '1rem 2rem',
            minWidth: '160px',
          }}>
            <div style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: TEAM_COLOURS[t],
              marginBottom: '0.25rem',
            }}>{TEAM_NAMES[t]}</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              color: TEAM_COLOURS[t],
              lineHeight: 1,
            }}>{scores[t]}</div>
          </div>
        ))}
      </div>

      <div style={{
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        marginBottom: '1.5rem',
        fontWeight: 500,
        letterSpacing: '0.06em',
      }}>
        Now let's put those skills to work ↓
      </div>

      <button
        onClick={onContinue}
        style={{
          background: '#facc15',
          color: '#0a0812',
          border: 'none',
          borderRadius: '6px',
          padding: '0.75rem 2.5rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(250,204,21,0.4)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
      >
        Continue to Writing Task →
      </button>
    </div>
  )
}

// ── Writing task ──────────────────────────────────────────────────────────────
function WritingTask({ term, week }) {
  const assessmentPrompts = [
    `Write a paragraph about something interesting you discovered this week. Use at least three skills from this week's lessons: strong vocabulary, correct punctuation, and varied sentences.`,
    `Describe a place you love using vivid adjectives, at least one compound sentence, and one complex sentence. Aim for 5–7 sentences.`,
    `Write a short argument: should students have more free time at school? Use persuasive vocabulary, at least one list with commas, and a clear topic sentence.`,
    `Recount something that happened to you recently. Use consistent past tense, varied sentence lengths, and at least one fronted adverbial.`,
  ]

  const checklist = [
    'Capital letters at the start of every sentence',
    'Full stops, question marks, or exclamation marks at sentence ends',
    'Commas used correctly in lists or complex sentences',
    'Varied sentence lengths (mix of short and long)',
    'Strong, precise vocabulary (no "nice," "good," "went")',
    'At least one skill specifically practised this week',
  ]

  const prompt = assessmentPrompts[(week - 1) % assessmentPrompts.length]
  const fridayColour = '#facc15'

  return (
    <div>
      {/* Section divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        margin: '0 0 1.5rem',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: fridayColour,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          ✍️ Writing Time
        </div>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div className="friday-card">
        <div className="friday-card__header" style={{ borderLeft: `3px solid ${fridayColour}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>📝</span>
            <div>
              <h2 style={{ color: fridayColour }}>Independent Writing</h2>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                marginTop: 2,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                Term {term} · Week {week} · Apply this week's skills
              </p>
            </div>
          </div>
        </div>

        <div className="friday-card__body">
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.6rem',
            }}>Writing Task</div>
            <div style={{
              background: 'var(--bg-surface)',
              borderLeft: `3px solid ${fridayColour}`,
              borderRadius: '0 8px 8px 0',
              padding: '1.1rem 1.4rem',
              fontSize: '1.2rem',
              lineHeight: 1.65,
              color: 'var(--text)',
            }}>
              {prompt}
            </div>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem',
            }}>Self-Assessment Checklist</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {checklist.map((item, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  padding: '0.7rem 1rem', background: 'var(--bg-surface)',
                  border: '1px solid var(--border)', borderRadius: '6px',
                  fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.5,
                }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, color: fridayColour }}>☐</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'rgba(250,204,21,0.07)',
            border: '1px solid rgba(250,204,21,0.25)',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            fontSize: '1rem',
            color: 'var(--text)',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
            lineHeight: 1.6,
          }}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>⏱️</span>
            <span>
              <strong style={{ color: fridayColour }}>Time guide: </strong>
              5 minutes planning → 10 minutes writing → 5 minutes self-edit. Swap with a partner for peer feedback if time allows.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Friday header / intro ─────────────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
        letterSpacing: '0.04em',
        lineHeight: 0.95,
        color: 'var(--text)',
        marginBottom: '0.75rem',
      }}>
        Friday<br />
        <span style={{ color: '#facc15' }}>Quiz Show.</span>
      </div>
      <p style={{
        fontSize: '1.1rem',
        color: 'var(--text-muted)',
        maxWidth: '480px',
        margin: '1rem auto 2rem',
        lineHeight: 1.6,
      }}>
        8 questions on this week's writing skills. Two teams compete for glory — then everyone writes!
      </p>

      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {[0, 1].map(t => (
          <div key={t} style={{
            background: `${TEAM_COLOURS[t]}18`,
            border: `1px solid ${TEAM_COLOURS[t]}`,
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: TEAM_COLOURS[t],
          }}>{TEAM_NAMES[t]}</div>
        ))}
      </div>

      <button
        onClick={onStart}
        style={{
          background: '#facc15',
          color: '#0a0812',
          border: 'none',
          borderRadius: '6px',
          padding: '0.85rem 3rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(250,204,21,0.45)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
      >
        Start Quiz →
      </button>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function FridayAssessment({ term, week }) {
  const [phase, setPhase] = useState('intro') // intro | quiz | winner | writing
  const [finalScores, setFinalScores] = useState([0, 0])

  const handleQuizFinish = useCallback((scores) => {
    setFinalScores(scores)
    setPhase('winner')
  }, [])

  return (
    <div>
      {/* Persistent top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: '1.25rem' }}>🎮</span>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: '#facc15',
            lineHeight: 1,
            letterSpacing: '0.04em',
          }}>Friday Quiz Show</div>
          <div style={{
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginTop: '2px',
          }}>Term {term} · Week {week}</div>
        </div>

        {/* Phase pills */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
          {[['intro','Intro'],['quiz','Quiz'],['winner','Results'],['writing','Writing']].map(([p, label]) => (
            <div key={p} style={{
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              borderRadius: '3px',
              background: phase === p ? '#facc15' : 'var(--bg-surface)',
              color: phase === p ? '#0a0812' : 'var(--text-dim)',
              border: `1px solid ${phase === p ? '#facc15' : 'var(--border)'}`,
            }}>{label}</div>
          ))}
        </div>
      </div>

      {phase === 'intro' && (
        <IntroScreen onStart={() => setPhase('quiz')} />
      )}

      {phase === 'quiz' && (
        <QuizPhase term={term} week={week} onFinish={handleQuizFinish} />
      )}

      {phase === 'winner' && (
        <WinnerScreen scores={finalScores} onContinue={() => setPhase('writing')} />
      )}

      {phase === 'writing' && (
        <WritingTask term={term} week={week} />
      )}
    </div>
  )
}
