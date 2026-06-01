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
  const fridayColour = '#facc15'

  return (
    <div className="friday-card">
      <div className="friday-card__header" style={{ borderLeft: `3px solid ${fridayColour}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>📝</span>
          <div>
            <h2 style={{ color: fridayColour }}>Friday Writing Assessment</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              Term {term} · Week {week} · Apply this week's skills independently
            </p>
          </div>
        </div>
      </div>

      <div className="friday-card__body">
        {/* Writing task */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '0.6rem',
          }}>
            Writing Task
          </div>
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

        {/* Checklist */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '0.75rem',
          }}>
            Self-Assessment Checklist
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {checklist.map((item, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.7rem 1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                fontSize: '1.05rem',
                color: 'var(--text)',
                lineHeight: 1.5,
              }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, color: fridayColour }}>☐</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Time guide */}
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
            5 minutes planning → 10 minutes writing → 5 minutes self-edit using the checklist above. Swap with a partner for peer feedback if time allows.
          </span>
        </div>
      </div>
    </div>
  )
}
