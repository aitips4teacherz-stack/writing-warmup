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
  '2-5': [
    {
      q: '"The tuatara (New Zealand\'s ancient living fossil) can live for over 100 years." How do you know the brackets are used correctly here?',
      options: [
        'Because the information inside adds an opinion about the tuatara',
        'Because removing the bracketed section still leaves a complete, sensible sentence',
        'Because the information inside is the most important part of the sentence',
        'Because brackets are always used around facts from a textbook',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The tuatara — New Zealand\'s ancient living fossil — can live for over 100 years." What is the main difference between using dashes here instead of brackets?',
      options: [
        'Dashes make the sentence more formal and suitable for reports',
        'Dashes signal that the extra information should be ignored',
        'Dashes draw more attention to the aside — making it feel dramatic rather than like a footnote',
        'Dashes show the reader that the extra information is incorrect',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"The kākāpō is the ___ of all New Zealand parrots." Which adjective correctly completes this superlative sentence?',
      options: ['more heavy', 'heaviest', 'most heaviest', 'heavier'],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"Wellington is ___ than Auckland." Which comparative form of "windy" is correct?',
      options: ['more windier', 'windiest', 'windier', 'most windy'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Choppy: "The kārearea is a falcon. It is native to New Zealand. It is the fastest bird. It hunts other birds." — Which combined version is best?',
      options: [
        '"The kārearea is a falcon and it is native to New Zealand and it is the fastest bird and it hunts other birds."',
        '"The kārearea, a falcon native to New Zealand, is the country\'s fastest bird and hunts other birds in mid-air."',
        '"The kārearea is a native New Zealand falcon. It is the fastest and it hunts birds."',
        '"Because the kārearea is a falcon it is native and fast and it hunts other birds too."',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip says: "Ask: which two sentences share a subject? Can one become a clause inside the other?" Which technique is used in: "The pā, built on a steep hill, had a clear view of the harbour."?',
      options: [
        'A conjunction joining two equal sentences',
        'A relative clause introduced by "which"',
        'An appositive phrase embedded after the subject',
        'A fronted adverbial at the start of the sentence',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The trip was great. We saw lots of things. It was sunny. We had lunch by the river." — Which edit best improves punctuation variety?',
      options: [
        '"The trip was great! We saw lots of things! It was sunny! We had lunch by the river!"',
        '"The trip was great; we saw more than we expected. The sun blazed — perfect conditions. By the river, we ate lunch: sandwiches, fruit, and cold water."',
        '"The trip was great, we saw lots of things, it was sunny, we had lunch by the river."',
        '"The trip was great. We saw lots of things, it was sunny, we had lunch by the river."',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s editor\'s checklist asks: "At least one colon or semicolon? Any dashes? Any brackets?" Why is this a useful check?',
      options: [
        'Because colons, semicolons, and dashes are always better than full stops',
        'Because writing that uses only full stops and commas is missing chances to create variety and effect',
        'Because examiners award marks specifically for colons and semicolons',
        'Because full stops should only appear at the end of a paragraph',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '2-4': [
    {
      q: '"do not" → "don\'t" — where exactly does the apostrophe go, and why?',
      options: [
        'Between "do" and "n\'t" — because it separates the two original words',
        'At the very end — because contractions always close with an apostrophe',
        'Where the missing letter "o" was removed — replacing the missing letter',
        'Before the "t" — because the "t" is the last letter added',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"They\'re dog isnt allowed inside but its a cold night." How many apostrophe errors are in this sentence?',
      options: ['One — only "isnt" is wrong', 'Two — "isnt" and "its" are wrong', 'Three — "They\'re," "isnt," and "its" are all wrong', 'Four — every word with an apostrophe is wrong'],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"The woman ___ won the award is our neighbour." Which relative pronoun is correct?',
      options: ['which', 'that', 'who', 'whom'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"The bridge, ___ was built in 1902, is being restored." Which relative pronoun fits — and why does it need commas?',
      options: [
        '"that" — because it defines which bridge we mean, no commas needed',
        '"who" — because the bridge is being treated as a person, commas optional',
        '"which" — because it adds non-essential extra information, set off by commas',
        '"what" — because it introduces an explanation, commas always follow',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"Recycling reduces waste sent to landfill." Is this a persuasive or informational topic sentence — and how can you tell?',
      options: [
        'Persuasive — because it mentions recycling, which is a controversial topic',
        'Informational — because it states a fact that most people would agree with',
        'Persuasive — because it uses formal vocabulary like "landfill"',
        'Informational — because it begins with a noun rather than a verb',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip: "If someone could disagree with it — it\'s persuasive." Which of these is the strongest PERSUASIVE topic sentence?',
      options: [
        '"Schools have canteens that sell food to students."',
        '"Exercise has some effects on health."',
        '"Schools must ban junk food from their canteens immediately."',
        '"Many students eat at school each day."',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The shop sold apple\'s, pear\'s and mango\'s." What is wrong with all three apostrophes?',
      options: [
        'They are in the wrong position — they should come before the final letter',
        'These are just plurals — they are not possessives or contractions, so no apostrophe is needed',
        'The apostrophes should be replaced with commas to separate the items',
        'Only "mango\'s" is wrong — the others are possessives so they need apostrophes',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s two-question test for apostrophes: (1) Is something being owned? (2) Are letters missing? Apply it to "students." Which sentence uses it correctly?',
      options: [
        '"The student\'s walked to class." — the students own the walking',
        '"Several student\'s raised their hands." — apostrophe shows there are many',
        '"The student\'s bag was left on the bus." — one student owns the bag',
        '"All the student\'s agreed with the decision." — the apostrophe shows agreement',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '2-3': [
    {
      q: '"cold ←→ hot" — but between them sit: freezing, icy, cool, warm, scorching, boiling. What does this spectrum show about word choice?',
      options: [
        'That longer words are always more precise than shorter ones',
        'That meaning is a sliding scale — the right word sits at exactly the right point for the context',
        'That antonyms should never be used in the same paragraph',
        'That all words between two antonyms mean roughly the same thing',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Monday\'s tip: "The most powerful word sits at exactly the right point on that scale for your sentence." The explorer is crossing the Antarctic plateau. Which word best replaces "cold"?',
      options: ['chilly', 'cool', 'glacial', 'slightly cold'],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"Everyone in the kapa haka group ___ the words." Which verb is correct — and why?',
      options: [
        '"know" — because there are many people in the group',
        '"knows" — because "everyone" is singular, like "every single person"',
        '"know" — because "kapa haka group" is a plural noun',
        '"knows" — because the sentence is in the present tense',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"Neither of the referees ___ happy with the decision." Which verb is correct?',
      options: [
        '"were" — because there are two referees',
        '"was" — because "neither" is singular, like "not one of them"',
        '"were" — because "referees" is a plural noun',
        '"was" — because the sentence describes a past event',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The hīkoi had been going for three days. The marchers showed no sign of stopping." Which FANBOYS conjunction best joins these two ideas?',
      options: [
        '"and" — the second sentence simply adds to the first',
        '"or" — it gives the marchers an alternative to stopping',
        '"yet" — it creates contrast: exhaustion expected, but no sign of stopping',
        '"for" — it explains why the hīkoi had been going for three days',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip: "Before picking a conjunction, decide: am I adding, contrasting, showing a result, or giving a reason?" "The experiment failed the first time. The team learnt something valuable." Which conjunction shows a surprising contrast?',
      options: [
        '"so" — the result of failing was learning something',
        '"and" — the learning simply followed the failure',
        '"yet" — failure and learning seem contradictory, creating contrast',
        '"for" — the failure gave the reason for the learning',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The kererū went from branch to branch, getting the ripest berries." Thursday\'s lesson said to upgrade "went" and "getting." Which version is best?',
      options: [
        '"The kererū moved from branch to branch, finding the ripest berries."',
        '"The kererū hopped from branch to branch, plucking the ripest berries."',
        '"The kererū went quickly from branch to branch, getting many berries."',
        '"The kererū did the action of going branch to branch, getting berries."',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s tip: "Highlight every \'went,\' \'got,\' \'said,\' \'did,\' \'made,\' \'was\' — each is an upgrade opportunity." Which sentence has the MOST bland verbs still needing upgrading?',
      options: [
        '"The hawk plummeted from the ridge and snatched the prey mid-flight."',
        '"She sprinted across the field and hurled herself at the finish line."',
        '"The children went to the beach, got into the water and said it was cold."',
        '"The storm battered the coast and tore branches from the pines."',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '2-2': [
    {
      q: '"Before the sun had risen the fishing boats left the harbour." Where does the comma go — and why?',
      options: [
        'After "harbour" — because the sentence ends with a place name',
        'After "risen" — because the fronted adverbial ends there and the main clause begins',
        'After "boats" — because "fishing boats" is the subject of the sentence',
        'After "Before" — because conjunctions are always followed by a comma',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Monday\'s tip: "Read aloud — if you naturally pause after the opening phrase before the subject arrives, that pause is your comma." Which sentence is correctly punctuated?',
      options: [
        '"Despite the heavy rain, the game continued without a break."',
        '"Despite, the heavy rain the game continued without a break."',
        '"Despite the heavy rain the game, continued without a break."',
        '"Despite the heavy rain the game continued, without a break."',
      ],
      correct: 0,
      day: 'Monday',
    },
    {
      q: '"Mum already bought the tickets — we ___ see the kapa haka performance on Friday." Which future form is correct — and why?',
      options: [
        '"will" — because it is a spontaneous decision made right now',
        '"are going to" — because the tickets are already bought, so it is a made plan',
        '"will" — because predictions always use "will" not "going to"',
        '"are going to" — because "going to" is always more polite than "will"',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The phone is ringing. Don\'t worry, I ___ get it!" Which future form fits — and why?',
      options: [
        '"am going to" — because answering the phone is already planned',
        '"will" — because this is a spontaneous decision made in the moment',
        '"am going to" — because the phone ringing is evidence it will happen',
        '"will" — because predictions about the near future always use "will"',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The crowd cheered." → "When the final whistle blew, the crowd cheered." What does adding the "when" clause do to the sentence?',
      options: [
        'It tells us WHY the crowd cheered — it gives the reason',
        'It tells us WHO was in the crowd — it identifies the subject',
        'It tells us WHEN it happened — it adds a time trigger for the action',
        'It tells us WHERE the crowd was — it adds a location detail',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip: "Front = comma after the clause. Back = no comma needed." Which sentence is correctly punctuated?',
      options: [
        '"The crowd cheered, because the All Blacks had scored."',
        '"Because the All Blacks had scored the crowd cheered."',
        '"Because the All Blacks had scored, the crowd cheered."',
        '"The crowd cheered because, the All Blacks had scored."',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"It was raining heavily, the match was cancelled." What is wrong with this sentence?',
      options: [
        'It has a missing capital letter at the start of the second clause',
        'It is a comma splice — two complete sentences joined by only a comma',
        'It uses the wrong tense — "was cancelled" should be "is cancelled"',
        'It needs a colon before "the match was cancelled" to introduce the result',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: '"The kiwi is nocturnal, it comes out to feed after dark." Thursday\'s lesson gives three ways to fix a comma splice. Which fix is NOT one of them?',
      options: [
        'Use a full stop: "The kiwi is nocturnal. It comes out to feed after dark."',
        'Use a conjunction: "The kiwi is nocturnal, so it comes out to feed after dark."',
        'Use a semicolon: "The kiwi is nocturnal; it comes out to feed after dark."',
        'Use a colon: "The kiwi is nocturnal: it comes out to feed after dark."',
      ],
      correct: 3,
      day: 'Thursday',
    },
  ],

  '2-1': [
    {
      q: '"The man went down the street." → "The man strode down the street." What extra information does "strode" give us that "went" does not?',
      options: [
        'It tells us the man was in a hurry and running fast',
        'It tells us HOW he moved — with long, confident steps',
        'It tells us WHERE he was going at the end of the street',
        'It tells us WHEN the movement happened during the day',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Monday\'s tip was: "Precise verbs eliminate the need for adverbs." Which swap best shows this?',
      options: [
        '"walked slowly" → "walked very slowly"',
        '"ran quickly" → "sprinted"',
        '"spoke quietly" → "spoke in a quiet voice"',
        '"moved fast" → "moved very fast indeed"',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"A flock of birds flew overhead." What TYPE of noun is "flock"?',
      options: [
        'Abstract noun — you cannot see or touch a flock',
        'Proper noun — it names a specific group of birds',
        'Collective noun — it names the group as a single unit',
        'Common noun — it is just a regular everyday noun',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Which of these is an ABSTRACT noun?',
      options: ['a murder of crows', 'determination', 'a school of fish', 'a bouquet of flowers'],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The team did a celebration when they won." Replace the weak phrase with ONE strong verb.',
      options: [
        '"The team did celebrate when they won."',
        '"The team celebrated when they won."',
        '"The team were celebrating their winning."',
        '"The team made a celebration happen when they won."',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip was: "did/made/gave/had + noun = usually replaceable with one strong verb." Which sentence still has this weak pattern?',
      options: [
        '"She decided to leave early."',
        '"The scientists investigated the discovery."',
        '"He gave a performance that stunned the crowd."',
        '"They competed in the regional final."',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"last tuesday, ms brown took class 5b to the otago museum in dunedin." How many words need a capital letter?',
      options: ['4', '6', '7', '8'],
      correct: 2,
      day: 'Thursday',
    },
    {
      q: 'In Thursday\'s editing lesson, which CATEGORY of word do we scan for first when checking capitals in a passage?',
      options: [
        'Long words — they are usually more important and need capitals',
        'Days, months, place names, people\'s names and titles, specific event names',
        'The first word of every clause, even inside a longer sentence',
        'Any noun — all nouns need capitals in formal writing',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '1-7': [
    {
      q: '"She needed three things: courage, patience, and luck." What does the colon do here?',
      options: [
        'It replaces a comma that would otherwise be too weak',
        'It introduces the list that explains what the three things are',
        'It shows a pause between two complete but unrelated sentences',
        'It signals that a question is about to be answered',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The sun set behind the hills ___ the valley grew cold." Which punctuation mark fits the blank?',
      options: [
        'A colon — because a list follows',
        'A comma — because both sides need to be separated',
        'A semicolon — because both halves are complete related sentences',
        'A full stop — because these ideas have nothing to do with each other',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"The knight rode into the village. He looks around nervously." What is wrong with the second sentence?',
      options: [
        '"He" should be capitalised because knights are important characters',
        '"looks" is present tense — it switches tense from the past tense "rode"',
        'There should be a comma after "nervously" to end the sentence properly',
        '"He" needs to be replaced with the knight\'s name to avoid confusion',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: 'In the market passage, "The market is busy... Stalls lined both sides..." — which tense is most common and which verb is the odd one out?',
      options: [
        'Present tense is most common; "lined" is the odd one out in past tense',
        'Past tense is most common; "is" is the odd one out in present tense',
        'Future tense is most common; "lined" needs to become "will line"',
        'Both tenses are equally used, so the passage is already consistent',
      ],
      correct: 0,
      day: 'Tuesday',
    },
    {
      q: '"The crowd cheered when the final whistle blew." Which part is the SUBORDINATE clause?',
      options: [
        '"The crowd cheered" — because it names the subject first',
        '"the final whistle blew" — it could easily stand alone as its own sentence',
        '"when the final whistle blew" — it depends on the main clause for meaning',
        '"when the final whistle" — the conjunction plus the subject only',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"When the final whistle blew, the crowd cheered." Why is there a comma after "blew"?',
      options: [
        'Because "blew" is a verb and verbs always need a comma after them',
        'Because the subordinate clause comes first, so a comma follows it',
        'Because "the crowd cheered" is too short and needs extra punctuation',
        'Because "when" is a conjunction and conjunctions always take a comma',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"The explorer sets out at dawn. She walked for three hours before she reaches the ridge." Fix the tense errors — which version is correct?',
      options: [
        '"The explorer sets out at dawn. She walks for three hours before she reaches the ridge."',
        '"The explorer set out at dawn. She walked for three hours before she reached the ridge."',
        '"The explorer setted out at dawn. She walked for three hours before she reached the ridge."',
        '"The explorer sets out at dawn. She walked for three hours before she will reach the ridge."',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Which pair of verbs is the most common accidental tense switch to watch out for?',
      options: [
        '"run" and "runs" — because both look very similar',
        '"was/is" and "said/says" — because writers slip between them without noticing',
        '"walk" and "walked" — because the -ed ending is easy to forget',
        '"have" and "had" — because both are used in every tense',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '1-8': [
    {
      q: '"___ going to need to bring ___ own gear." Which pair fills the blanks correctly?',
      options: [
        'Their / there',
        'There / their',
        'They\'re / their',
        'Their / they\'re',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: 'What is the quickest way to check whether to use "they\'re" or "their"?',
      options: [
        'See if the word comes before a noun — if so, use "their"',
        'Expand it: if "they are" fits in the sentence, use "they\'re"',
        'Count the syllables — one syllable means "their", two means "they\'re"',
        'Check if it comes at the start of a sentence — if so, use "they\'re"',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The cat slept on the warm windowsill throughout the afternoon." What does "on the warm windowsill" tell us?',
      options: [
        'When the cat slept',
        'How the cat slept',
        'Where the cat slept',
        'Why the cat slept',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Which of these is a prepositional phrase?',
      options: [
        '"ran quickly"',
        '"underneath the old bridge"',
        '"she was tired"',
        '"singing loudly"',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"She packed her bag quickly before sunrise." We turned this into a fronted adverbial sentence. Which version is correct?',
      options: [
        '"Before sunrise she packed her bag quickly."',
        '"Before sunrise, she packed her bag quickly."',
        '"Before, sunrise she packed her bag quickly."',
        '"She, before sunrise, packed her bag quickly."',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Why do writers use fronted adverbials?',
      options: [
        'To make sentences shorter and easier to read',
        'Because subjects are not allowed to start a sentence in formal writing',
        'To vary sentence openings and emphasise the time, place, or manner first',
        'To avoid using conjunctions, which can be confusing for readers',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The man walked to the door." We dressed this sentence up. Which addition is most effective?',
      options: [
        '"The man walked very slowly to the door."',
        '"The elderly man shuffled to the creaking front door, pausing with his hand on the handle."',
        '"The man walked to the door and then he stopped and looked around before going in."',
        '"The man, who was a man, walked to the door that was there."',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'When editing a bare sentence, which question helps you add the BEST detail?',
      options: [
        '"Can I make this sentence longer by adding more adjectives everywhere?"',
        '"WHO exactly? WHAT kind? HOW exactly? WHICH one?" — then add only what the reader needs',
        '"Can I replace every noun with a pronoun to make it flow better?"',
        '"Should I split this into two shorter sentences instead?"',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '1-9': [
    {
      q: '"Pots clattered, oil sizzled and a smoke alarm began to shriek." What technique are "clattered", "sizzled" and "shriek" examples of?',
      options: [
        'Alliteration — words starting with the same letter for effect',
        'Onomatopoeia — words that sound like the noise they describe',
        'Personification — giving objects human actions and feelings',
        'Simile — comparing the sounds to something familiar',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Which sentence BEST uses onomatopoeia to bring a thunderstorm to life?',
      options: [
        '"The storm was very loud and scary and everyone was frightened."',
        '"Thunder crashed overhead and rain hammered the tin roof."',
        '"It was a big storm with lots of noise and rain."',
        '"The storm made sounds that could be heard from far away."',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"She ran fast, but she missed the bus." What TYPE of conjunction is "but"?',
      options: [
        'Subordinating — it creates a dependent clause that cannot stand alone',
        'Coordinating — it joins two equal, independent clauses',
        'Correlating — it works in pairs like "both...and"',
        'Adverbial — it tells us when the action happened',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"She missed the bus because she left too late." Could "because she left too late" stand alone as a sentence?',
      options: [
        'Yes — it is a complete thought with a subject and a verb',
        'Yes — any clause with a verb in it can be its own sentence',
        'No — it is a subordinate clause that depends on the main clause for meaning',
        'No — it is too short to be a proper sentence in formal writing',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'In the disconnected coral reef sentences, what does "they" do in the cohesive version?',
      options: [
        'It introduces a new topic to move the paragraph forward',
        'It refers back to "honey bees" to avoid repeating the noun',
        'It signals a contrast between two different ideas',
        'It replaces the conjunction "and" to make the sentence shorter',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Which connective would BEST signal a contrast between two ideas in a paragraph?',
      options: ['In addition', 'Furthermore', 'However', 'As a result'],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The game was exciting. It was an exciting match with exciting moments right up to the exciting end." What is the problem?',
      options: [
        '"exciting" is a weak adjective that should be removed from all four places',
        '"exciting" is repeated four times — it needs to be replaced with varied synonyms',
        'The sentences are too short and need to be joined into one long sentence',
        '"match" and "moments" should both be replaced since they sound similar',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'In the "team" passage, "team" appeared seven times. Which revision strategy did we use?',
      options: [
        'Deleting every second mention of "team" to cut the repetition by half',
        'Replacing some with pronouns (they/their) and synonyms (the squad, the side)',
        'Moving all the sentences around so "team" never appeared twice in a row',
        'Adding stronger adjectives before each "team" to make the repetition feel intentional',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '1-10': [
    {
      q: 'In "it wasnt amara\'s first time winning" — TWO punctuation fixes are needed. What are they?',
      options: [
        'A capital "I" on "it" and a comma after "winning"',
        'A capital "I" on "it" and an apostrophe in "wasnt" → "wasn\'t"',
        'An apostrophe in "wasnt" and a full stop after "amara\'s"',
        'A capital "A" on "amara\'s" and a comma after "time"',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'From our Term 1 review — a semicolon joins two sentences. Which sentence uses it correctly?',
      options: [
        '"She was tired; because she had run a marathon."',
        '"The library was closed; we decided to go to the park instead."',
        '"Although it was late; she kept reading."',
        '"He ate his lunch; and then went outside to play."',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The exhausted climbers finally reached Base Camp." Identify the ADJECTIVE and the ADVERB.',
      options: [
        'Adjective: "climbers" / Adverb: "reached"',
        'Adjective: "exhausted" / Adverb: "finally"',
        'Adjective: "Base Camp" / Adverb: "exhausted"',
        'Adjective: "finally" / Adverb: "exhausted"',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"Because the trail was icy, the rescue team moved slowly." What TYPE is "because" here?',
      options: [
        'A coordinating conjunction — it joins two equal clauses',
        'A preposition — it shows the relationship between two nouns',
        'A subordinating conjunction — it creates a dependent clause',
        'An adverb — it modifies how the team moved',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Our Term 1 sentence toolkit had six types. Which sentence is an example of a FRONTED ADVERBIAL?',
      options: [
        '"The fierce storm broke and the river rose rapidly."',
        '"The storm, which had been building for days, finally broke."',
        '"Just before dawn, the storm broke over the city."',
        '"Although residents had been warned, the storm was worse than expected."',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'Why might a writer choose "She won." over the longer version "After months of training, she finally won the regional championship"?',
      options: [
        'Because shorter sentences are always better and more professional',
        'Because the short sentence creates powerful impact — brevity can be dramatic',
        'Because the longer version has a grammatical error in it',
        'Because readers prefer not to have too much information at once',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'In the botanical gardens passage we edited, "the carnivorous plants were good and everyone wanted to feed them" — what TWO things need fixing?',
      options: [
        '"good" is vague and needs upgrading; a capital is needed on "everyone"',
        '"good" is vague and needs upgrading; the sentence also needs a capital at the start',
        '"good" should be "well"; "carnivorous" should be simplified to "eating"',
        '"everyone" should be replaced with a pronoun; "good" needs a comma after it',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Our 6-pass editing method works through one focus at a time. Which ORDER is correct?',
      options: [
        'Word choice → Capitals & full stops → Apostrophes → Commas → Repetition → Sentence variety',
        'Capitals & full stops → Comma usage → Apostrophes → Word choice → Sentence variety → Repetition',
        'Repetition → Word choice → Sentence variety → Commas → Apostrophes → Capitals',
        'Apostrophes → Capitals → Word choice → Repetition → Commas → Sentence variety',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

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
