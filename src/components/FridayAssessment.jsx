import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { CURRICULUM } from '../lib/lessonData.js'

// ── Strip HTML tags ───────────────────────────────────────────────────────────
const strip = (s) => s ? s.replace(/<[^>]+>/g, '') : ''

// ── Shuffle array (Fisher-Yates) ──────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Build a multiple-choice question with shuffled distractors ────────────────
// correctAnswer and distractors are plain strings; returns { q, options, correct, day }
function mcq(question, correctAnswer, distractors, day) {
  // Options are fixed order here; shuffling happens once in buildQuestions
  const options = [correctAnswer, ...distractors.slice(0, 3)]
  return {
    q: question,
    options,
    correct: 0, // correctAnswer is always first before shuffle
    day,
  }
}

// ── Hardcoded quiz banks ──────────────────────────────────────────────────────
// Each question: { q, options: [A,B,C,D], correct: index, day }
// All four options are similar in length/style so the answer can't be spotted visually.

const HARDCODED_QUIZZES = {
  '1-1': [
    {
      q: 'We upgraded "big" to "muscular" this week. WHY is "muscular" the better word?',
      options: [
        'It is longer, so it fills the sentence better',
        'It tells us size AND strength — it paints a sharper picture',
        'It starts with a capital letter, which makes it stand out',
        'It rhymes with the next word in the sentence',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Which upgrade works best for the word "nice" in: "The nice sunset filled the sky"?',
      options: ['Pleasant', 'Dazzling', 'Okay-ish', 'Very nice'],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'In "The girl visited Wellington with her family" — which word is a PROPER noun?',
      options: ['girl', 'family', 'Wellington', 'visited'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"my friend aisha lives in christchurch" — how many words need a capital letter?',
      options: ['One (just "my")', 'Two ("my" and "aisha")', 'Three ("my", "aisha", "christchurch")', 'None — it looks fine already'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'In "The goalkeeper saved the penalty" — what is the SUBJECT?',
      options: ['saved', 'the penalty', 'The goalkeeper', 'the'],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'What happens to a sentence if you remove the verb?',
      options: [
        'It becomes a question instead',
        'It still makes sense — you just lose some detail',
        'It loses its action and stops making sense',
        'It turns into a sentence fragment with extra nouns',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"birds began to sing in the trees it was going to be a perfect day" — what is missing?',
      options: [
        'A comma after "trees" and a capital "I" on "it"',
        'Speech marks around "it was going to be a perfect day"',
        'The word "and" between "trees" and "it"',
        'A question mark at the very end',
      ],
      correct: 0,
      day: 'Thursday',
    },
    {
      q: 'What is the best trick for spotting where a sentence ends when proofreading?',
      options: [
        'Count exactly 10 words then add a full stop',
        'Look for the longest word — that marks the end',
        'Read aloud — you naturally pause at the end of each sentence',
        'Add a full stop after every verb you can find',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '1-2': [
    {
      q: '"The market sold fresh tomatoes plump strawberries creamy cheese and warm bread." Where do the commas go?',
      options: [
        'After tomatoes, strawberries, cheese — and before "and"',
        'After tomatoes, strawberries, and cheese — but NOT before "and"',
        'Only after the last item before "and"',
        'Before every single word in the list',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Why do we use commas in a list sentence?',
      options: [
        'To show the reader that a new paragraph is starting',
        'To separate each item so the sentence does not become a jumbled mess',
        'Because every sentence must have at least one comma in it',
        'To replace the word "and" between every pair of items',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The hawk soared above the valley." Is "soared" an action verb or a state verb?',
      options: [
        'State verb — it describes how the hawk feels',
        'Neither — it is an adjective describing the hawk',
        'Action verb — you can picture the hawk physically doing it',
        'State verb — it says something about the valley',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Which of these is a STATE verb?',
      options: ['sprinted', 'chewed', 'belongs', 'splashed'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"A dog barked at the stranger." We expanded this with adjectives. Which version is best?',
      options: [
        'A very dog barked at the very stranger',
        'A scruffy, brown dog barked at the hooded stranger',
        'A dog who was scruffy barked at a stranger who wore a hood',
        'A dog with scruffiness barked at a stranger with a hood',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'You want to add TWO adjectives before "dog" in the same noun phrase. What do you put between them?',
      options: [
        'Nothing — just write them one after the other',
        'The word "and" between the two adjectives',
        'A comma between the two adjectives',
        'A full stop, then start the second adjective fresh',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"Sophia loved drawing she spent every afternoon filling sketchbooks." What is wrong here?',
      options: [
        'The word "drawing" should be in speech marks',
        'Two complete sentences have crashed together without a full stop',
        'There are too many adjectives crowding the sentence',
        '"Sophia" should not be capitalised mid-sentence',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'What is the best way to fix a run-on sentence?',
      options: [
        'Delete words until only one idea remains in the sentence',
        'Add a comma after the first word of the sentence',
        'Split it at a natural pause with a full stop, or join with and/but/so',
        'Move the subject to the end so the sentence feels less crowded',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '1-4': [
    {
      q: '"The collar belonging to the cat" — how do you write this with a possessive apostrophe?',
      options: ["cat's collar", "cats' collar", "cats's collar", "cat collar's"],
      correct: 0,
      day: 'Monday',
    },
    {
      q: '"The collars belonging to the cats" — where does the apostrophe go?',
      options: ["cat's collars", "cats' collars", "cats's collars", "cat's' collars"],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Maya left Maya\'s bag on Maya\'s seat when Maya went outside." What is the problem?',
      options: [
        '"Maya\'s" should not have an apostrophe — it is plural',
        'The noun "Maya" is repeated clumsily and needs pronouns to replace it',
        '"Maya" should be replaced with "she" everywhere, including the first word',
        'The possessive "Maya\'s" is the wrong form and should be "Mayas"',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: 'Which pronoun correctly replaces the second "Tom and Sarah" in: "Tom and Sarah set up Tom and Sarah\'s stall"?',
      options: ['his', 'their', 'its', 'her'],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: 'What is the JOB of a topic sentence in a paragraph?',
      options: [
        'To summarise the whole essay in one dramatic sentence',
        'To list all the evidence that will follow in bullet points',
        'To introduce the main idea so every sentence that follows supports it',
        'To ask a question that the rest of the paragraph then answers',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'Which is the strongest topic sentence for a paragraph about rainforests?',
      options: [
        'Rainforests exist in many countries around the world.',
        'I am going to write about rainforests in this paragraph.',
        'The rainforest is home to an astonishing variety of wildlife.',
        'There are lots of interesting things about rainforests to discuss.',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The team picked up their trophy." Our lesson said this is tricky — why?',
      options: [
        '"Trophy" is plural so it needs a plural pronoun like "those"',
        '"Team" is a singular noun, so "its" is technically more precise than "their"',
        '"Their" should be "they" because the trophy belongs to the trophy',
        '"The team" must be replaced by player names before any pronoun works',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: '"Each of the birds had lost ___ feathers in the storm." Which pronoun fits?',
      options: ['their', 'its', 'our', 'his'],
      correct: 0,
      day: 'Thursday',
    },
  ],

  '1-5': [
    {
      q: '"Come back." vs "Come back!" — what is the key difference between these two sentences?',
      options: [
        'One is correct and one has a spelling error',
        '"Come back." is a calm instruction; "Come back!" adds urgency and strong emotion',
        '"Come back!" is more formal and would be used in a letter',
        'They mean exactly the same thing — the mark is just a style choice',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Watch out for the wave behind you" — which end mark is best and why?',
      options: [
        'A full stop — it is a simple instruction with no special feeling',
        'A question mark — we are not sure if there is actually a wave',
        'An exclamation mark — it is urgent and could save someone from danger',
        'No mark needed — the meaning is clear without one',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"dangerous → more dangerous → most dangerous" — why do we use "more/most" instead of "-er/-est"?',
      options: [
        'Because "dangerous" is a proper noun and proper nouns use "more/most"',
        'Because "dangerous" has three syllables, making "-er/-est" sound awkward',
        'Because "dangerous" already ends in "-ous" so it cannot take a suffix',
        'Because "more/most" is always used for adjectives that describe feelings',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: 'What are the correct comparative and superlative forms of "good"?',
      options: ['gooder / goodest', 'more good / most good', 'better / best', 'weller / wellest'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Why do skilled writers mix short and long sentences together?',
      options: [
        'To make their work look longer on the page and harder to read',
        'Because short sentences are always better and long ones should be avoided',
        'To create rhythm — short sentences punch, long ones build pace and atmosphere',
        'Because teachers mark down writing that uses the same sentence length throughout',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'In the lighthouse passage, we wanted to add dramatic impact. Which addition works best?',
      options: [
        'Adding three more long sentences to build even more atmosphere',
        'Cutting it to one very long sentence covering all the same details',
        'Inserting short sharp sentences like "It survived." to create punch',
        'Replacing all full stops with exclamation marks for excitement',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'In the Te Papa passage we edited, "the students saw a giant squid a huge whale skeleton and many taonga" is missing what?',
      options: [
        'A capital letter on "giant" because it is the first item in a list',
        'Speech marks around the list because someone is speaking',
        'Commas between the list items to separate them clearly',
        'The word "and" before every single item in the list',
      ],
      correct: 2,
      day: 'Thursday',
    },
    {
      q: 'Why is it better to check ONE rule at a time when peer-editing, rather than everything at once?',
      options: [
        'Because checking everything at once always takes less time',
        'Because focusing on one rule means you are less likely to miss errors',
        'Because only one type of error can exist in any single piece of writing',
        'Because partners are not allowed to mark more than one type of mistake',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '1-6': [
    {
      q: '"Prediction" breaks into "pre" + "dict" + "ion". What does this tell you the word means?',
      options: [
        'The process of writing before you read',
        'The process of saying something before it happens',
        'The state of not being able to understand words',
        'The action of carrying information across a distance',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Using the root "port" (carry), what does "portable" most likely mean?',
      options: [
        'Belonging to a port or harbour',
        'Very difficult to move or transport',
        'Able to be carried from place to place',
        'Something that carries water from one place to another',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"The explorer walked cautiously forward yesterday." What question does "cautiously" answer?',
      options: ['Where?', 'When?', 'How?', 'Why?'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Which of these is an adverb of TIME?',
      options: ['silently', 'outside', 'yesterday', 'extremely'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"The dog barked." We added WHO, WHERE, and WHEN detail. Which expanded version is best?',
      options: [
        'The dog barked a lot and it was very loud and it scared everyone nearby',
        'The dog, a stray with matted fur, barked frantically outside the locked gate at midnight',
        'The dog barked because dogs bark when they are scared or excited by things',
        'The barking dog was barking outside where dogs often go to bark',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'When should you add a WHO, WHERE, or WHEN phrase to a sentence?',
      options: [
        'Always — every sentence must have all three types of detail',
        'Never — extra phrases make sentences too complicated for readers',
        'When the reader needs that detail to picture the scene clearly',
        'Only in the final sentence of each paragraph as a summary',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"Due to the fact that it was raining, we decided to stay inside the house." What is the tightened version?',
      options: [
        'It rained and so we stayed inside the house as a result of the rain',
        'Because it was raining, we stayed inside',
        'The rain fell, and due to this we made the decision to remain indoors',
        'In the event that rain occurred, staying inside was decided upon',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Which phrase from our lesson is a classic example of wordiness that can be cut to one word?',
      options: [
        '"ran quickly" → just use a stronger verb like "sprinted"',
        '"in order to" → just use "to"',
        '"very happy" → just use "happy"',
        '"the dog" → just use "it"',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '1-3': [
    {
      q: '"The water was cold" vs "The water was glacial." Why is "glacial" stronger?',
      options: [
        'It is longer, so it takes up more space on the page',
        'It is a proper noun, which always sounds more impressive',
        'It is far more intense — it paints a sharper, colder picture',
        'It rhymes with other words, making the sentence musical',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: 'The crowd was loud when the team scored. Which synonym BEST shows an enormous, wild crowd noise?',
      options: ['noisy', 'audible', 'deafening', 'quite loud'],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"The dogs barks at the cat." Why is this wrong?',
      options: [
        '"Dogs" needs a capital letter because it is specific',
        '"Dogs" is plural, so the verb should be "bark" not "barks"',
        '"Cat" should also be plural to match "dogs"',
        'There should be a comma after "dogs"',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The bunch of grapes ___ left on the bench." Which verb is correct?',
      options: ['were', 'is', 'was', 'are'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"She studied all weekend. She still felt nervous." Join them with the RIGHT conjunction.',
      options: [
        'She studied all weekend, and she still felt nervous',
        'She studied all weekend, but she still felt nervous',
        'She studied all weekend, so she still felt nervous',
        'She studied all weekend, or she still felt nervous',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Where does the comma go in a compound sentence?',
      options: [
        'After the conjunction: "She ran so, she won"',
        'Before the conjunction: "She ran, so she won"',
        'At the very start: ", She ran so she won"',
        'No comma is needed — conjunctions replace commas',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"It was a nice day and we went to a nice beach." How many vague words need upgrading?',
      options: [
        'One — only the first "nice" is vague',
        'Two — both uses of "nice" need upgrading',
        'Three — "nice" (×2) and "went" are all vague',
        'None — "nice" and "went" are perfectly precise words',
      ],
      correct: 2,
      day: 'Thursday',
    },
    {
      q: 'Which sentence has the BEST upgrade of "said"?',
      options: [
        '"Get out of my way," said Jake.',
        '"Get out of my way," spoke Jake.',
        '"Get out of my way," yelled Jake.',
        '"Get out of my way," went Jake.',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],
}

// ── Per-day question builders (2 questions each) ──────────────────────────────

function mondayQuestions(lesson, day = 'Monday') {
  const topic = lesson.topic
  const tip = strip(lesson.iDo?.tip || '')
  const example = strip(lesson.iDo?.example || '')
  const demo = strip(lesson.iDo?.demonstration || '')
  const sentences = (lesson.weDo?.sentences || []).map(strip)

  // Build questions that vary by what the lesson actually teaches
  const qs = []

  // Q1: What does this lesson teach? (from topic + iDo instruction)
  const instruction = strip(lesson.iDo?.instruction || '')
  if (instruction) {
    // Extract a short description from the instruction text
    const shortInstruction = instruction.length > 80 ? instruction.substring(0, 80) + '…' : instruction
    qs.push(mcq(
      `Monday's lesson on "${topic}" — which tip best describes what we practised?`,
      tip || shortInstruction.substring(0, 60),
      [
        'Use longer sentences to improve writing',
        'Always add a comma after the first word',
        'Change every noun to a pronoun',
      ],
      day
    ))
  }

  // Q2: Use the weDo example sentence if available
  if (sentences.length > 0) {
    const sent = sentences[0]
    // Try to find an underlined word (originally marked with <u>) from the raw data
    const rawSent = (lesson.weDo?.sentences || [])[0] || ''
    const uMatch = rawSent.match(/<u>([^<]+)<\/u>/)
    if (uMatch) {
      const targetWord = uMatch[1]
      qs.push(mcq(
        `In Monday's exercise: "${sent}" — which word should be improved or focused on?`,
        targetWord,
        ['the', 'a', 'on', 'and', 'in', 'is'].filter(w => w !== targetWord).slice(0, 3),
        day
      ))
    } else {
      // Generic Q about the topic skill
      qs.push(mcq(
        `Which of these best describes what you practised in Monday's lesson on "${topic}"?`,
        strip(lesson.iDo?.demonstration || '').substring(0, 55) || topic,
        [
          'Adding speech marks to dialogue',
          'Counting syllables in words',
          'Writing in first person only',
        ],
        day
      ))
    }
  } else {
    qs.push(mcq(
      `What was the main focus of Monday's lesson on "${topic}"?`,
      topic,
      [
        'Adding pictures to writing',
        'Learning to read faster',
        'Understanding character dialogue',
      ],
      day
    ))
  }

  return qs
}

function tuesdayQuestions(lesson, day = 'Tuesday') {
  const topic = lesson.topic
  const tip = strip(lesson.iDo?.tip || '')
  const sentences = (lesson.weDo?.sentences || []).map(strip)
  const rawSentences = lesson.weDo?.sentences || []

  const qs = []

  // Q1: The tip from the lesson
  if (tip) {
    qs.push(mcq(
      `Tuesday's lesson on "${topic}" — what tip did you learn to remember this skill?`,
      tip,
      [
        'Always use a capital letter at the end of a sentence',
        'Use commas to replace all full stops',
        'Every noun must have an adjective',
      ],
      day
    ))
  } else {
    qs.push(mcq(
      `What was Tuesday's grammar lesson about?`,
      topic,
      [
        'Adding adverbs to every sentence',
        'Replacing verbs with nouns',
        'Writing paragraphs with no punctuation',
      ],
      day
    ))
  }

  // Q2: Use a weDo sentence if available
  if (sentences.length > 0) {
    // Look for underlined target word
    const rawSent = rawSentences[Math.floor(Math.random() * rawSentences.length)] || rawSentences[0]
    const uMatch = rawSent.match(/<u>([^<]+)<\/u>/)
    const cleanSent = strip(rawSent)
    if (uMatch) {
      const targetWord = uMatch[1]
      qs.push(mcq(
        `In Tuesday's exercise: "${cleanSent}" — what is the key word to focus on?`,
        targetWord,
        ['the', 'a', 'and', 'to', 'in'].filter(w => w !== targetWord).slice(0, 3),
        day
      ))
    } else {
      qs.push(mcq(
        `From Tuesday's exercise, which of these sentences relates to "${topic}"?`,
        cleanSent.substring(0, 70),
        [
          'Add a full stop to every comma.',
          'Always write in future tense.',
          'Nouns should never begin a sentence.',
        ],
        day
      ))
    }
  } else {
    qs.push(mcq(
      `Finish this sentence from Tuesday's lesson: "${topic} means…"`,
      strip(lesson.iDo?.demonstration || '').substring(0, 55) || 'applying the grammar rule correctly',
      [
        'writing without any punctuation',
        'only using short sentences',
        'repeating the same word many times',
      ],
      day
    ))
  }

  return qs
}

function wednesdayQuestions(lesson, day = 'Wednesday') {
  const topic = lesson.topic
  const tip = strip(lesson.iDo?.tip || '')
  const example = strip(lesson.iDo?.example || '')
  const sentences = (lesson.weDo?.sentences || []).map(strip)
  const rawSentences = lesson.weDo?.sentences || []
  const prompt = strip(lesson.weDo?.prompt || '')

  const qs = []

  // Q1: The sentence-building concept
  if (tip) {
    qs.push(mcq(
      `Wednesday's lesson on "${topic}" — what tip helps you build better sentences?`,
      tip,
      [
        'Always write sentences with exactly 10 words',
        'Use a question mark after every sentence',
        'Begin every sentence with "The"',
      ],
      day
    ))
  } else {
    qs.push(mcq(
      `What type of sentence skill did Wednesday's lesson on "${topic}" focus on?`,
      topic,
      [
        'Writing only short sentences',
        'Adding pictures to writing',
        'Removing all adjectives',
      ],
      day
    ))
  }

  // Q2: Use an example or weDo sentence
  if (example) {
    const shortEx = example.split('→')[0].trim()
    if (shortEx.length > 5 && shortEx.length < 100) {
      qs.push(mcq(
        `In Wednesday's lesson, we worked on improving this sentence: "${shortEx}" — what were we practising?`,
        topic,
        [
          'Adding speech marks',
          'Converting to past tense only',
          'Removing all adjectives from the sentence',
        ],
        day
      ))
    } else {
      qs.push(mcq(
        `Which best describes what you practised on Wednesday in "${topic}"?`,
        strip(lesson.iDo?.demonstration || '').substring(0, 55) || topic,
        [
          'Writing in columns',
          'Reading backwards for errors',
          'Counting words per sentence only',
        ],
        day
      ))
    }
  } else if (sentences.length > 0) {
    qs.push(mcq(
      `Wednesday's exercise: "${sentences[0].substring(0, 70)}" — what skill were you practising?`,
      topic,
      [
        'Spelling every word in capitals',
        'Removing verbs from the sentence',
        'Adding punctuation to a question',
      ],
      day
    ))
  } else {
    qs.push(mcq(
      `What was the main sentence-building skill from Wednesday?`,
      topic,
      [
        'Writing sentences with no nouns',
        'Using only question sentences',
        'Starting every sentence with a number',
      ],
      day
    ))
  }

  return qs
}

function thursdayQuestions(lesson, day = 'Thursday') {
  const topic = lesson.topic
  const tip = strip(lesson.iDo?.tip || '')
  const example = strip(lesson.iDo?.example || '')
  const tasks = (lesson.youDo?.tasks || []).map(strip).filter(t => !t.startsWith('✦'))

  const qs = []

  // Q1: Editing tip or purpose
  if (tip) {
    qs.push(mcq(
      `Thursday's editing lesson on "${topic}" — which tip helps you edit better?`,
      tip,
      [
        'Delete sentences that seem too long',
        'Replace all verbs with nouns',
        'Add more adjectives to every noun',
      ],
      day
    ))
  } else {
    qs.push(mcq(
      `What editing skill did Thursday's lesson on "${topic}" focus on?`,
      topic,
      [
        'Changing the font size',
        'Re-ordering paragraphs randomly',
        'Adding bullet points to prose',
      ],
      day
    ))
  }

  // Q2: Use the iDo example to spot the error/focus
  if (example && example.length < 200) {
    qs.push(mcq(
      `In Thursday's editing exercise, this text needed fixing: "${example.substring(0, 80)}…" — what type of error were we looking for?`,
      topic,
      [
        'Missing speech marks only',
        'Too many adjectives in the text',
        'Incorrect bullet-point formatting',
      ],
      day
    ))
  } else if (tasks.length > 0) {
    qs.push(mcq(
      `In Thursday's editing task, we practised on: "${tasks[0].substring(0, 70)}" — what were we editing for?`,
      topic,
      [
        'Adding more words to every sentence',
        'Removing all capital letters',
        'Replacing nouns with pronouns',
      ],
      day
    ))
  } else {
    qs.push(mcq(
      `Which skill were you applying when editing your work on Thursday?`,
      topic,
      [
        'Adding pictures to your writing',
        'Counting words per paragraph',
        'Changing the title of the piece',
      ],
      day
    ))
  }

  return qs
}

// ── Generate 8 quiz questions from the week's 4 lessons ──────────────────────
function buildQuestions(term, week) {
  // Use hardcoded quiz if available
  const key = `${term}-${week}`
  if (HARDCODED_QUIZZES[key]) {
    return shuffle(HARDCODED_QUIZZES[key].map(q => {
      const shuffled = shuffle([...q.options])
      return { ...q, options: shuffled, correct: shuffled.indexOf(q.options[q.correct]) }
    }))
  }

  const weekData = CURRICULUM[term]?.[week]
  if (!weekData) return fallbackQuestions

  const raw = [
    ...mondayQuestions(weekData.Monday),
    ...tuesdayQuestions(weekData.Tuesday),
    ...wednesdayQuestions(weekData.Wednesday),
    ...thursdayQuestions(weekData.Thursday),
  ].filter(Boolean)

  // Shuffle options once here — correct index is 0 coming out of mcq()
  const questions = raw.map(q => {
    const shuffled = shuffle(q.options)
    return { ...q, options: shuffled, correct: shuffled.indexOf(q.options[0]) }
  })

  // Pad with fallbacks if needed
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
  const questions = useMemo(() => buildQuestions(term, week), [term, week])
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
  const weekData = CURRICULUM[term]?.[week]
  const topics = weekData
    ? ['Monday','Tuesday','Wednesday','Thursday'].map(d => weekData[d]?.topic).filter(Boolean)
    : []

  // Build a week-specific writing prompt using the actual lesson topics
  const getPrompt = () => {
    if (!weekData || topics.length === 0) {
      return `Write a paragraph applying the skills you practised this week. Focus on strong vocabulary, correct punctuation, and varied sentences.`
    }
    const [mon, tue, wed, thu] = [
      weekData.Monday?.topic, weekData.Tuesday?.topic,
      weekData.Wednesday?.topic, weekData.Thursday?.topic,
    ]
    const variant = ((term - 1) * 10 + (week - 1)) % 4
    if (variant === 0) {
      return `Write a descriptive paragraph about a place you know well. Use this week's skills: apply "${mon}" to choose vivid words, use "${wed}" for your sentences, and check for "${thu}" when you edit.`
    } else if (variant === 1) {
      return `Write a short recount of something that happened to you recently. Show off "${mon}" with strong word choices, apply "${tue}" correctly throughout, and use "${wed}" to vary your sentence structures.`
    } else if (variant === 2) {
      return `Write a persuasive paragraph on a topic you feel strongly about. Use what you know about "${mon}" for powerful vocabulary, "${wed}" for clear sentence structure, and "${thu}" to polish your final draft.`
    } else {
      return `Write a paragraph telling a short story (real or imagined). Practise "${mon}", demonstrate "${tue}" in your nouns or verbs, use "${wed}" for sentence variety, and apply "${thu}" in your editing step.`
    }
  }

  // Build a week-specific checklist using the lesson topics
  const checklist = [
    'Capital letters at the start of every sentence',
    'Full stops, question marks, or exclamation marks at sentence ends',
    topics[0] ? `Monday skill applied: ${topics[0]}` : 'Strong, precise vocabulary throughout',
    topics[1] ? `Tuesday skill applied: ${topics[1]}` : 'Grammar used correctly',
    topics[2] ? `Wednesday skill applied: ${topics[2]}` : 'Varied sentence lengths and structures',
    topics[3] ? `Thursday skill applied: ${topics[3]}` : 'Edited carefully for errors',
  ]

  const prompt = getPrompt()
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

  // Reset to intro whenever term or week changes
  useEffect(() => {
    setPhase('intro')
    setFinalScores([0, 0])
  }, [term, week])

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
        <QuizPhase key={`${term}-${week}`} term={term} week={week} onFinish={handleQuizFinish} />
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
