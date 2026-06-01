import React from 'react'

export default function FridayAssessment({ term, week }) {
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

  return (
    <div className="friday-card">
      <div className="friday-card__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>📝</span>
          <div>
            <h2>Friday Writing Assessment</h2>
            <p style={{ opacity: 0.85, fontSize: '0.85rem', marginTop: 2 }}>
              Term {term} · Week {week} · Apply this week's skills independently
            </p>
          </div>
        </div>
      </div>

      <div className="friday-card__body">
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: '0.5rem',
            }}
          >
            Writing Task
          </div>
          <div
            style={{
              background: 'var(--paper-warm)',
              borderLeft: '4px solid #b91c1c',
              borderRadius: '0 8px 8px 0',
              padding: '1rem 1.25rem',
              fontSize: '1.05rem',
              lineHeight: 1.65,
              fontFamily: 'var(--font-display)',
            }}
          >
            {prompt}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: '0.75rem',
            }}
          >
            Self-Assessment Checklist
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {checklist.map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.6rem 1rem',
                  background: 'white',
                  border: '1.5px solid var(--rule)',
                  borderRadius: '6px',
                  fontSize: '0.93rem',
                }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>☐</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: '#fef3c7',
            border: '1.5px solid #fbbf24',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            fontSize: '0.9rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>⏱️</span>
          <span>
            <strong>Time guide:</strong> 5 minutes planning → 10 minutes writing → 5 minutes
            self-edit using the checklist above. Swap with a partner for peer feedback if time allows.
          </span>
        </div>
      </div>
    </div>
  )
}
