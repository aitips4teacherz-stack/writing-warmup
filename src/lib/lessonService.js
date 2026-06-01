import { supabase } from './supabase.js'
import { getLesson as getLocalLesson, CURRICULUM } from './lessonData.js'

/**
 * Fetch a lesson — tries Supabase first, falls back to local data.
 * Supabase table structure:
 *   lessons(id, term, week, day, topic, nz_link, i_do jsonb, we_do jsonb, you_do jsonb, created_at)
 */
export async function fetchLesson(term, week, day) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('term', term)
        .eq('week', week)
        .eq('day', day)
        .single()

      if (!error && data) {
        return {
          topic: data.topic,
          nzLink: data.nz_link,
          iDo: data.i_do,
          weDo: data.we_do,
          youDo: data.you_do,
        }
      }
    } catch (e) {
      console.warn('Supabase fetch failed, using local data:', e.message)
    }
  }

  // Local fallback
  return getLocalLesson(term, week, day)
}

/**
 * Upsert a lesson into Supabase (for the admin lesson editor, future use).
 */
export async function saveLesson(term, week, day, lessonData) {
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('lessons')
    .upsert({
      term,
      week,
      day,
      topic: lessonData.topic,
      nz_link: lessonData.nzLink,
      i_do: lessonData.iDo,
      we_do: lessonData.weDo,
      you_do: lessonData.youDo,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'term,week,day' })
    .select()
    .single()

  if (error) throw error
  return data
}
