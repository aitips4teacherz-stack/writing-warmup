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
  '4-5': [
    {
      q: '"a well-known author" — which mark correctly joins "well" and "known" here, and why?',
      options: [
        'A dash — because it creates emphasis between the two words',
        'A hyphen — because "well" and "known" work together as one compound modifier before the noun',
        'An ellipsis — because there is a pause between the two descriptive words',
        'No mark — compound modifiers never need punctuation between them',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"She opened the envelope — her hands trembling — and pulled out the letter." What does the dash aside add that brackets would not?',
      options: [
        'Brackets would be grammatically incorrect here — dashes are the only option',
        'Dashes add a more dramatic, breathless quality — the trembling feels urgent, not parenthetical',
        'Dashes change the tense of "trembling" to make it more vivid',
        'Nothing — dashes and brackets always create exactly the same effect',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Competing at national level requires years of dedication." What verb form is "Competing" — and how can you tell?',
      options: [
        'An infinitive — it acts as the purpose of the sentence',
        'A participle — it describes the subject of the sentence',
        'A gerund — it is the "-ing" form used as the noun subject of the sentence',
        'A progressive verb — it shows an action in progress',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"The carved pounamu hung at the entrance to the wharenui." What verb form is "carved" — and what job does it do?',
      options: [
        'A gerund — it is the noun subject of the sentence',
        'An infinitive — it shows the purpose of hanging the pounamu',
        'A past participle used as an adjective — it describes the pounamu',
        'A past tense verb — it tells us when the pounamu was carved',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Wednesday\'s model paragraph uses five sentence types. "Hunger, which affects concentration and mood, makes learning almost impossible." What type is this?',
      options: [
        'A simple sentence — it has one subject and one verb',
        'A compound sentence — two equal clauses joined by a conjunction',
        'A complex sentence with an embedded relative clause',
        'A fronted adverbial sentence — the opener comes before the subject',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s model ends with "Do it now." Why is a short imperative the best final sentence here?',
      options: [
        'Because imperatives are always the most formal way to end an argument',
        'Because the contrast between the long argument and the short command creates maximum impact and urgency',
        'Because "Do it now" summarises all the evidence that came before it',
        'Because short sentences are always more persuasive than long sentences',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"I think schools should totally invest in better libraries." Thursday\'s voice checklist finds two problems. What are they?',
      options: [
        '"totally" is misspelt and "better" is too informal',
        '"I think" is first-person opinion and "totally" is informal/vague — both break formal register',
        '"should" is a weak modal and "better" should be replaced with "superior"',
        '"I think" is too short a phrase and "totally" needs a comma after it',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: '"The evidence is clear, so the government needs to sort this out." Thursday\'s clarity check finds a problem. What is it?',
      options: [
        '"so" is a coordinating conjunction and should be replaced with "therefore"',
        '"The evidence is clear" doesn\'t say what evidence — it is vague; and "sort this out" is informal',
        '"clear" is an adjective and adjectives cannot follow linking verbs in formal writing',
        'The comma before "so" is incorrect — compound sentences never need a comma',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '4-4': [
    {
      q: '"Its the boards decision" — how many apostrophe errors are in this phrase?',
      options: [
        'One — only "Its" needs an apostrophe (it\'s)',
        'Two — "Its" needs an apostrophe (it\'s) and "boards" needs a possessive apostrophe (board\'s)',
        'Three — "Its," "boards," and "teachers" all need apostrophes',
        'None — "its" is a possessive pronoun and never takes an apostrophe',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Monday\'s three-test rule. Apply it to "students" in "students books." Which test applies — and what is the correct form?',
      options: [
        'Test 1 (contraction): "students" = "stud + ents" → "student\'s books"',
        'Test 2 (possession): multiple students own the books → "students\' books" (apostrophe after the s)',
        'Test 3 (just a plural): no apostrophe needed — "students books" is correct',
        'Test 2 (possession): one student owns the books → "student\'s books"',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"I think schools should provide free lunches for all students." Rewrite without first person. Which version is strongest?',
      options: [
        '"We think schools should provide free lunches for all students."',
        '"One thinks schools should provide free lunches."',
        '"The evidence indicates that schools should provide free lunches for all students."',
        '"It is my belief that schools should provide free lunches."',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Tuesday\'s tip: "Remove the person — let the argument stand on its own." Why is "the evidence suggests" stronger than "I think"?',
      options: [
        'Because "the evidence suggests" uses more words and longer arguments are always more convincing',
        'Because "I think" admits uncertainty while "the evidence suggests" grounds the claim in reality rather than personal opinion',
        'Because "suggests" is a more formal verb than "think"',
        'Because removing "I" makes the sentence shorter and easier to read',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"In conclusion, I have shown that native trees should be planted in all urban areas." Wednesday\'s lesson calls this weak. Why?',
      options: [
        'Because it uses first person ("I have shown") and starts with the banned phrase "In conclusion"',
        'Because it is too short — conclusions must be at least two sentences',
        'Because "native trees" is too specific — conclusions should be general',
        'Because it restates rather than synthesises — it just repeats the claim without revealing a bigger truth',
      ],
      correct: 3,
      day: 'Wednesday',
    },
    {
      q: '"When schools invest in gardens, they invest in food literacy, environmental responsibility, and student wellbeing — a return on investment no budget line can fully capture." Which synthesis technique does this use?',
      options: [
        'Echo the opening with a twist — it returns to the original claim but reframes it',
        'Broaden to the bigger picture — gathering threads into a larger resonant truth about value',
        'Pose an implicit challenge — daring the reader to disagree',
        'Use a statistic — the "return on investment" phrase grounds the conclusion in data',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"This paragraph will talk about funding." Thursday\'s skeleton test calls this weak. What makes the strong version — "Chronic underfunding has left Aotearoa\'s public libraries unable to serve the communities that need them most" — stronger?',
      options: [
        'It is longer, which signals the paragraph will have more content',
        'It is specific, urgent, and tells the reader exactly what the problem is and who it affects',
        'It uses passive voice, which is more appropriate for formal writing',
        'It avoids mentioning libraries directly, which creates intrigue',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: '"So screens are bad for young people." Thursday\'s lesson calls this a weak closing sentence. Apply the skeleton test — what should a strong closing sentence do instead?',
      options: [
        'Start with "In conclusion" to signal the paragraph is ending',
        'Repeat the topic sentence word for word to create a circular structure',
        'Synthesise — reveal the bigger truth or implication the evidence has established, not just restate the claim',
        'Use the shortest possible sentence so the paragraph ends with impact',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '4-3': [
    {
      q: '"The council totally stuffed up the rubbish collection." → "The council\'s waste management procedures were significantly inadequate." What is the main difference?',
      options: [
        'The formal version uses passive voice and the informal version uses active voice',
        'The formal version uses measured, precise Latinate vocabulary; the informal uses emotional everyday language',
        'The formal version is longer and informal writing must always be shorter',
        'The formal version avoids mentioning the council while the informal version names them directly',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Monday\'s tip: "Formal = Latinate words (commence, obtain, utilise). Informal = Saxon words (start, get, use)." Which word is the formal equivalent of "get"?',
      options: ['grab', 'obtain', 'take', 'receive'],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"None of the proposed solutions ___ the root cause." Which verb is correct — and why?',
      options: [
        '"address" — because "solutions" is plural',
        '"addresses" — because "none" means "not one" and takes a singular verb',
        '"address" — because formal writing prefers plural verbs with "none"',
        '"addresses" — because "root cause" is singular',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"A number of researchers ___ challenged this finding." vs "The number of complaints ___ rising." Which pair of verbs is correct?',
      options: [
        '"has / are" — a number takes singular, the number takes plural',
        '"have / is" — a number of = several (plural), the number of = one count (singular)',
        '"has / is" — both phrases are singular because they both refer to a single group',
        '"have / are" — both phrases are plural because researchers and complaints are plural nouns',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"Renewable energy is cost-effective, yet investment remains low." Wednesday\'s lesson says "yet" highlights a gap or hypocrisy. What is the implied message of using "yet" here?',
      options: [
        'That renewable energy is not actually cost-effective despite what people say',
        'That there is a frustrating contradiction — the evidence supports investment, but it still isn\'t happening',
        'That investment in renewable energy is about to increase significantly',
        'That "yet" signals the argument is still being developed',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"We invest in prevention now. We pay far more for the consequences later." Which FANBOYS conjunction best joins these for maximum persuasive urgency?',
      options: [
        '"and" — adding a supporting point to strengthen the argument',
        '"but" — contrasting the two options to show they are different',
        '"or" — creating a binary choice that makes inaction feel unacceptable',
        '"yet" — showing a surprising contrast between prevention and consequences',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"Kids today are spending heaps of time on screens." Thursday\'s formality checklist finds two problems. What are they?',
      options: [
        '"Kids" is informal (use "young people" or "children") and "heaps of" is informal (use "significant amounts of")',
        '"today" is informal and "spending" should be in the passive voice',
        '"Kids" needs a capital letter and "heaps" should be replaced with "very much"',
        '"screens" is too vague and "heaps" should be replaced with a specific statistic',
      ],
      correct: 0,
      day: 'Thursday',
    },
    {
      q: '"The government should totally do something about this before it gets worse." Thursday\'s checklist says this breaks three formality rules. Which THREE?',
      options: [
        '"totally" is informal, "something" is vague, and "gets worse" is informal — none is formal register',
        '"should" is a weak modal, "this" is a vague pronoun, and "worse" needs a comparison',
        '"totally" is a colloquialism, "do something" is informal and vague, "gets worse" is informal — replace all three',
        '"The government" should be replaced, "totally" is informal, and "before" is a subordinating conjunction that should be removed',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '4-2': [
    {
      q: '"The judges were Dr Hana Tūhoe chair of the panel Professor James Rāwiri linguistics expert and Mere Ngata award-winning author." Why should this use semicolons instead of commas?',
      options: [
        'Because there are more than three items in the list',
        'Because each list item already contains its own descriptive phrase — commas would create confusion about what belongs to whom',
        'Because the items are proper nouns and proper nouns always take semicolons in lists',
        'Because semicolons are always preferred in formal writing over commas',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"We invited the mayor, John Smith, the principal, and the board." Monday\'s lesson says this is ambiguous. What is unclear?',
      options: [
        'Whether the board is also called John Smith',
        'Whether John Smith is the mayor or a separate person — the commas don\'t make this clear',
        'Whether the principal and the board are the same person',
        'Whether "we" includes the mayor or not',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Scientists discovered a new species of gecko near Fiordland." → "A new species of gecko was discovered near Fiordland." What changed — and why might the passive version be better here?',
      options: [
        'The subject changed from "scientists" to "gecko" — the passive is better because scientists are unimportant',
        'The verb changed to passive — better when the discovery itself (not who made it) is the focus',
        'The sentence became shorter — passive voice is preferred because it saves words',
        'The tense changed to past — passive voice always uses simple past',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The treaty was signed in 1840." Tuesday\'s lesson says this passive sentence is appropriate. Why?',
      options: [
        'Because 1840 is a historical date and historical events always use passive voice',
        'Because the agent (who signed it) is either obvious, unimportant in this context, or the focus is the event itself',
        'Because "signed" is an irregular past participle and must follow "was"',
        'Because passive voice is always required in informational writing',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: 'Wednesday\'s CEE structure: Claim → Evidence → Explanation. After every piece of evidence, ask "So what?" What does the "So what?" answer become?',
      options: [
        'The next claim in the argument',
        'The explanation — why the evidence actually proves the claim',
        'The topic sentence of the next paragraph',
        'A rhetorical question to engage the reader',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"Auckland\'s rail network carries only 4% of commuters, compared to 40% in comparable cities." In the CEE structure, what role does this sentence play?',
      options: [
        'Claim — it states the writer\'s position on public transport',
        'Explanation — it tells the reader why the evidence matters',
        'Evidence — it provides a specific, grounded fact that supports the claim',
        'Conclusion — it summarises the argument about public transport',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The submission was written by the iwi. It was lodged with the council." Thursday\'s lesson says these passive sentences are a poor choice in a piece arguing for the iwi\'s role. Why?',
      options: [
        'Because passive voice is grammatically incorrect when a "by" phrase is used',
        'Because passive voice hides the iwi\'s agency — the iwi become recipients rather than actors in their own story',
        'Because "was written" and "was lodged" are in the wrong tense for a report',
        'Because the "by" phrase at the end creates a dangling modifier',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: '"Two months later, the council announced its decision." Thursday\'s lesson says this final sentence is correctly left in passive. But actually it\'s active — "the council announced." Why does it stay in active voice?',
      options: [
        'Because "announced" is an irregular verb that cannot be made passive',
        'Because the council is the doer and in this sentence the council\'s action (announcing) is the important thing',
        'Because active voice is always required when a time fronted adverbial opens the sentence',
        'Because "its decision" is a possessive pronoun that prevents passive construction',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '4-1': [
    {
      q: '"It is important that we recycle more." → What is the persuasive register upgrade for "important"?',
      options: [
        '"very important" — adding emphasis',
        '"crucial" or "essential" — a more authoritative, persuasive register word',
        '"quite important" — a measured, formal tone',
        '"really important" — a natural upgrade for formal writing',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Also, the research proves it works." Monday\'s tip: "\'Also\' → \'furthermore.\'" Why is "furthermore" stronger in persuasive writing?',
      options: [
        'Because "furthermore" is longer and longer words always sound more authoritative',
        'Because "furthermore" signals an additional supporting point in a formal argument, while "also" sounds conversational',
        'Because "furthermore" is always placed at the start of a sentence, making it more visible',
        'Because "proves" needs a formal linking adverb to function correctly',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Reading every day improves vocabulary." What verb form is "Reading" in this sentence?',
      options: [
        'A present progressive — it shows reading happening right now',
        'A participle — it describes the subject of the sentence',
        'A gerund — the "-ing" form acting as the noun subject of the sentence',
        'An infinitive — it shows the purpose of improving vocabulary',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Tuesday\'s tip: "Can I replace it with a noun like \'sport\' or \'skill\'?" Apply this to "Winning isn\'t everything." Replace "Winning" with a noun. Which test result confirms it is a gerund?',
      options: [
        '"Scoring isn\'t everything" — replacing with another gerund confirms it',
        '"Victory isn\'t everything" — replacing with a regular noun still makes sense, confirming "Winning" is a noun here',
        '"To win isn\'t everything" — replacing with an infinitive confirms it is a verb form',
        '"Winners aren\'t everything" — replacing with a plural noun confirms the gerund',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"Due to the fact that plastic bags cause a great deal of harm to sea life, it would be a good idea to consider banning them." Wednesday\'s lesson says this needs to be cut. Which version is the best direct, concise rewrite?',
      options: [
        '"Plastic bags cause harm to sea life and it would be good to think about banning them."',
        '"Plastic bags harm sea life. Ban them."',
        '"Due to plastic bags causing harm to sea life, banning them is something to consider."',
        '"Plastic bags cause a lot of harm to sea life and therefore should possibly be banned."',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip: "In persuasive writing, short sentences make your key claim land hard." Which version delivers the claim with most impact?',
      options: [
        '"We must act now due to the fact that litter is causing significant problems."',
        '"It would be beneficial if we were to act now on the issue of litter."',
        '"Litter harms wildlife. It pollutes waterways. It costs millions to clean up. We must act now."',
        '"Acting now is something we should consider given the problems caused by litter."',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The monarch butterfly undergoes four stages of metamorphosis. First, the egg was laid on a milkweed leaf." What is wrong with the second sentence?',
      options: [
        '"was laid" is passive voice and reports should use active voice',
        '"was laid" is past tense — Thursday\'s lesson says reports use present tense for facts',
        '"milkweed" should be capitalised as it is a specific plant name',
        '"First" should be followed by a comma and then a full sentence, not a dependent clause',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: '"Dolphins eat fish, squid and they also had crustaceans." Thursday\'s lesson fixes this to "Dolphins eat fish, squid, and crustaceans." What TWO errors were corrected?',
      options: [
        'Tense inconsistency ("had" → "eat") and non-parallel list structure ("they also had crustaceans" → "crustaceans")',
        'Missing Oxford comma and incorrect verb form',
        'Passive voice and incorrect pronoun reference',
        'Tense inconsistency and a missing comma after "squid"',
      ],
      correct: 0,
      day: 'Thursday',
    },
  ],

  '3-10': [
    {
      q: '"Although the path had disappeared, she kept moving — the sound of the stream, which she could hear but not yet see, was pulling her forward..." Which punctuation mark creates a trailing-off suspense effect here?',
      options: [
        'The dash — it creates a dramatic pause before the main action',
        'The ellipsis — it creates a pause that leaves the reader\'s imagination to fill the gap',
        'The comma after "disappeared" — it separates the two clauses',
        'The commas around "which she could hear but not yet see" — they set off the relative clause',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Despite the rain — which had turned the track to mud — Rangi kept his pace." What job do the dashes do here?',
      options: [
        'They replace a colon to introduce an explanation',
        'They create a parenthetical aside — adding detail that could be removed without breaking the sentence',
        'They signal a tense change from past to present',
        'They replace speech marks around Rangi\'s thought',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The children\'s kapa haka group had performed beautifully." Which TWO grammar features appear in this sentence?',
      options: [
        'Present perfect tense and a relative clause',
        'Irregular plural possessive ("children\'s") and past perfect tense ("had performed")',
        'Collective noun and a modal verb',
        'Fronted adverbial and subject-verb agreement',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"They, exhausted and elated, would remember this night forever." Where are the adjectives placed — and what effect does this create?',
      options: [
        'Before the noun — standard placement for smooth flow',
        'After the linking verb — describing the state of the subject',
        'After the pronoun, set off by commas — dramatic emphasis making the exhaustion and elation feel significant',
        'At the end of the sentence — creating a trailing conclusion',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"The ruru called twice, then silence swallowed the forest." Which Term 3 sentence technique is "silence swallowed the forest"?',
      options: [
        'Show don\'t tell — describing a physical symptom of an emotion',
        'Personification — giving silence a human action (swallowing)',
        'Simile — comparing silence to something that swallows',
        'Sensory detail — appealing to the sense of hearing',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"She had been waiting for this moment for three years. It was over in seconds." What technique is used — and why is it effective?',
      options: [
        'Show don\'t tell — the waiting is shown through physical detail',
        'Varied sentence length — the long sentence builds anticipation, the short sentence delivers the impact of how fast it ended',
        'Past perfect — the waiting happened before another past moment',
        'Fronted adverbial — the time phrase comes before the main clause',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Thursday\'s Term 3 checklist: Pass 2 says "Replace any \'she was [emotion]\'." Apply it to "Aroha was nervous as she waited to perform." Which revision correctly shows rather than tells?',
      options: [
        '"Aroha felt very nervous as she waited to perform on stage."',
        '"Aroha was extremely nervous — she had never felt this nervous before."',
        '"Aroha\'s hands twisted in her lap; she kept her eyes fixed on the door."',
        '"Aroha, who was nervous, waited to perform for the audience."',
      ],
      correct: 2,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s Pass 6: "At least one figurative language device." Apply it to: "The hall was big and the lights were very bright." Which revision adds a figurative device?',
      options: [
        '"The hall was enormous and the lights were extremely bright."',
        '"The hall was large, and the lights were very, very bright."',
        '"The hall stretched away like a held breath, and the lights blazed overhead."',
        '"The very big hall had lights that were quite bright above her."',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '3-9': [
    {
      q: '"The wind whispered through the tī kōuka." Monday\'s lesson says: "The verb you choose carries the mood." What mood does "whispered" create?',
      options: [
        'Danger and threat — whispering signals something sinister',
        'Gentleness and secrecy — a hushed, intimate atmosphere',
        'Joy and lightness — the wind is playful and cheerful',
        'Power and violence — whispering shows restrained force',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The ocean clawed at the base of the cliff." Which human quality does "clawed" give the ocean — and what mood does it create?',
      options: [
        'Hunger and aggression — the ocean is attacking, dangerous, relentless',
        'Sadness and longing — the ocean is reaching for something it cannot have',
        'Playfulness and curiosity — the ocean is exploring the cliff face',
        'Exhaustion — the ocean is weakly scraping at the cliff',
      ],
      correct: 0,
      day: 'Monday',
    },
    {
      q: '"Kiwi numbers have increased ___ intensive predator control was introduced." Is this a narrative or informational use — and which conjunction fits?',
      options: [
        'Narrative — "until" creates tension about when the increase will stop',
        'Informational — "because" shows a cause-and-effect relationship',
        'Narrative — "but" creates contrast between the numbers and the control',
        'Informational — "although" qualifies the increase with a condition',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"She kept paddling ___ she could no longer feel her arms." Is this narrative or informational — and which conjunction fits?',
      options: [
        'Informational — "because" explains why she stopped paddling',
        'Narrative — "although" creates contrast but feels less urgent',
        'Narrative — "until" shows her pushing to an extreme limit, creating tension',
        'Informational — "before" sets up the sequence of events',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"At first, the waka moved slowly through the shallows. As the water deepened, the crew found their rhythm. By the time they cleared the harbour mouth, they were moving as one." What do the three underlined phrases do?',
      options: [
        'They are fronted adverbials of place — they show where the waka was at each point',
        'They are time connectives — they move the paragraph forward in sequence and anchor each moment in time',
        'They are subordinate clauses — each one depends on the main clause for meaning',
        'They are relative clauses — each one adds extra information about the waka',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip says to vary time connectives — "don\'t just use \'then\' repeatedly." Why does repeating "then" weaken a paragraph?',
      options: [
        'Because "then" is grammatically incorrect as a connective',
        'Because it makes every event feel equally important with no variation in pace or emphasis',
        'Because "then" is only correct at the start of the final sentence',
        'Because "then" signals past tense and can cause tense drift',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"In my opinion, I personally think that the ending was really quite a good one in actual fact." Thursday\'s lesson cuts this to "The ending was powerful." How many words were removed?',
      options: ['Six words', 'Eight words', 'Ten words', 'Fourteen words'],
      correct: 3,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s tip: "Would removing this change the meaning? If no — cut it." Apply it to "I personally think." What is wrong with this phrase?',
      options: [
        '"Think" is a weak verb that should be replaced with "believe"',
        '"I personally" is redundant — thinking is always personal, so "personally" adds nothing',
        '"I think" should always be replaced with "in my opinion" in formal writing',
        '"Personally" is informal and should be replaced with "in my view"',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '3-8': [
    {
      q: '"celebrate" + "-tion" = "celebration." Monday\'s tip says to drop the silent e before a vowel suffix. Which word correctly applies this rule?',
      options: [
        '"managment" — from "manage" + "-ment"',
        '"laziness" — from "lazy" + "-ness"',
        '"celebrattion" — from "celebrate" + "-tion"',
        '"creation" — from "create" + "-tion" (e dropped before vowel suffix)',
      ],
      correct: 3,
      day: 'Monday',
    },
    {
      q: '"happy" + "-ness" = "happiness." Monday\'s tip says change y to i before a suffix. Which word correctly applies this rule?',
      options: [
        '"laziness" — from "lazy" (y → i) + "-ness"',
        '"lazness" — from "lazy" + "-ness" with y dropped',
        '"lazyness" — from "lazy" + "-ness" with no change',
        '"lazieness" — from "lazy" (y → ie) + "-ness"',
      ],
      correct: 0,
      day: 'Monday',
    },
    {
      q: '"Beneath the canopy of ancient rimu, the forest floor was deep in shadow." Tuesday\'s lesson says prepositional phrases in setting do two jobs. What are they?',
      options: [
        'They name the setting and introduce the characters',
        'They locate us precisely AND contribute to atmosphere',
        'They tell us the time and the weather conditions',
        'They replace adverbs and add length to descriptions',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"Between the roots of the largest tree, something moved." Tuesday\'s tip: "Choose prepositions that carry the mood you want." What mood does "between" create here?',
      options: [
        'Openness and freedom — between suggests space and possibility',
        'Height and perspective — between implies a view from above',
        'Unease and enclosure — something hiding in a tight, dark space',
        'Distance and isolation — between suggests the thing is far away',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"High above the valley, the kārearea surveyed its territory." Wednesday\'s lesson says "High above the valley" is a fronted adverbial of place. What atmosphere does it create before the main clause begins?',
      options: [
        'Danger — the height suggests the kārearea is about to fall',
        'Height and distance — a sense of elevation and wide perspective before we know what\'s there',
        'Warmth — the high position suggests the kārearea is close to the sun',
        'Mystery — we don\'t know what is high above the valley yet',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"Somewhere in the darkness, a branch snapped." Why does "Somewhere in the darkness" create suspense more effectively than "In the forest"?',
      options: [
        'Because "darkness" is a more formal word than "forest"',
        'Because vagueness ("somewhere") means the reader doesn\'t know exactly where, making it feel closer and more threatening',
        'Because "in the darkness" is a longer phrase and longer openers create more tension',
        'Because "somewhere" is an adverb, not a preposition, which makes it more powerful',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"One day a girl went for a walk in the bush." vs "The path ended without warning — just a wall of ferns and, somewhere beyond them, a sound that shouldn\'t have been there." Thursday\'s lesson says the strong version creates three elements. Which three?',
      options: [
        'A character, a setting, and a conflict',
        'A visual (wall of ferns), a mystery (sound that shouldn\'t be there), and a question (what is it?)',
        'A simile, a metaphor, and personification',
        'A fronted adverbial, a dash aside, and an ellipsis',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s strong opening checklist: "(1) Does it create a question? (2) Does it start in the middle of something? (3) Does it avoid \'One day…\'?" Which opening passes all three checks?',
      options: [
        '"It was a sunny day and Tia decided to explore the old part of town."',
        '"This story is about a boy who finds something strange at the beach."',
        '"One day Rangi discovered something that would change everything."',
        '"The box had been buried under the ngaio tree for longer than anyone could remember."',
      ],
      correct: 3,
      day: 'Thursday',
    },
  ],

  '3-7': [
    {
      q: '"The tide was going out; the beach grew wider by the minute." Monday\'s tip: "Replace the semicolon with a full stop — if both halves stand alone, the semicolon is correct." Does it work here?',
      options: [
        'No — "the beach grew wider by the minute" cannot stand alone as a sentence',
        'Yes — both "The tide was going out" and "the beach grew wider by the minute" are complete sentences',
        'No — semicolons can only join sentences that share the same subject',
        'Yes — but only because both sentences are in the same tense',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"She loved writing. Her brother preferred maths." Should these be joined with a semicolon? Why or why not?',
      options: [
        'Yes — they are both complete sentences so a semicolon is always correct',
        'No — the connection between them is not obvious enough; a full stop is clearer here',
        'Yes — semicolons replace all full stops between short sentences',
        'No — semicolons can only join sentences about the same person',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"By the time the rescue team arrived, the group ___ in the cave for two days." Which form correctly completes this past perfect sentence?',
      options: [
        '"has sheltered" — present perfect, still relevant now',
        '"sheltered" — simple past, the action completed',
        '"had sheltered" — past perfect, the action happened before the rescue team arrived',
        '"was sheltering" — past progressive, the action was in progress',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"The kaitiaki ___ to restore this wetland for over a decade." The restoration is still ongoing now. Which tense is correct?',
      options: [
        '"had worked" — past perfect, before another past moment',
        '"has worked" — present perfect, past action still relevant/ongoing now',
        '"worked" — simple past, the action completed in the past',
        '"was working" — past progressive, the action was in progress at a past moment',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"Before the pōwhiri began, the visitors gathered outside the gate." The "before" clause comes at the FRONT. What punctuation rule applies?',
      options: [
        'No comma needed — "before" clauses never take a comma',
        'Comma after the "before" clause — fronted subordinate clauses take a comma before the main clause',
        'Comma before "before" — conjunctions always have a comma before them',
        'Semicolon after the "before" clause — time clauses use semicolons not commas',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"She prepared the hangi before the guests arrived." The "before" clause comes at the BACK. What punctuation rule applies?',
      options: [
        'Comma before "before" — conjunctions always need a comma',
        'No comma needed — when the subordinate clause comes after the main clause, no comma is required',
        'Semicolon before "before" — equal clauses need a semicolon',
        'Comma after "hangi" AND before "before" — two commas frame the main clause',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"Kiri was nervous. The hall was full. The judges sat at a long table. The performance started at two o\'clock. She had practised for months." Thursday\'s lesson says these sentences don\'t connect. What is missing?',
      options: [
        'Longer sentences — each idea needs to be expanded with more detail',
        'Cohesive devices — each sentence needs to reach back to the previous one through a pronoun, connective, or echoed idea',
        'Figurative language — each sentence needs a simile or metaphor',
        'Varied vocabulary — the same words are used too many times',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s revision: "Kiri was nervous — the hall was fuller than she had expected." What cohesive device connects these two ideas?',
      options: [
        'A time connective — "than she had expected" shows when she arrived',
        'A pronoun — "she" refers back to Kiri without repeating her name',
        'An echoed idea — "fuller than she had expected" directly connects back to her nervousness',
        'A relative clause — "than she had expected" adds extra information about the hall',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '3-6': [
    {
      q: '"The pohutukawa tree was an old warrior — scarred but undefeated." Is this a simile or a metaphor — and how can you tell?',
      options: [
        'Simile — because "warrior" is compared to the tree using descriptive language',
        'Metaphor — because the tree IS described as a warrior, with no "like" or "as"',
        'Simile — because "scarred but undefeated" uses contrasting adjectives',
        'Metaphor — because the sentence contains a dash which signals figurative language',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Her voice was like a tui calling across a still morning." Is this a simile or a metaphor — and what is the effect?',
      options: [
        'Metaphor — her voice IS a tui, creating an immediate and powerful image',
        'Simile — "like a tui" signals comparison, creating a considered, musical image with some distance',
        'Personification — the tui is given a human voice',
        'Simile — "still morning" shows the comparison is gentle and quiet',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The kākāpō is extremely rare." Tuesday\'s lesson says this degree adverb earns its place. Why?',
      options: [
        'Because "extremely" is a longer word than "very" and therefore more precise',
        'Because "extremely" emphasises a fact that genuinely matters — the kākāpō\'s rarity is a serious conservation concern',
        'Because "extremely" always earns its place before any adjective',
        'Because "rare" is a weak adjective that needs "extremely" to do the work',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"She was very sad about what had happened." Tuesday\'s tip: "Is there one word that says this better?" Which single word best replaces "very sad"?',
      options: ['upset', 'unhappy', 'devastated', 'quite sad'],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"The beach was wide and flat. The waves were small. The sun was bright and the sand was pale." Wednesday\'s lesson says this uses only one sense. Which sense is missing from all three sentences?',
      options: [
        'Smell — there is no mention of the scent of salt or seaweed',
        'Sight — the colours and shapes are not described in detail',
        'Taste — the writer has not described the taste of the sea air',
        'Touch — the temperature of the sand under bare feet is not mentioned',
      ],
      correct: 0,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip: "Add one non-visual sense detail per paragraph." Which sentence adds the best SOUND detail to the beach passage?',
      options: [
        '"The sea was a bright, vivid blue stretching to the horizon."',
        '"The waves were cool and refreshing against her ankles."',
        '"Gulls shrieked overhead and the waves hissed across the wet sand."',
        '"The beach was beautiful and she felt relaxed standing there."',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"Very slowly" → "crept." "Very quiet" → "hushed." "Very scared" → "terrified." Thursday\'s audit replaces degree adverb + weak adjective with one strong word. Which replacement is INCORRECT?',
      options: [
        '"very tired" → "exhausted"',
        '"very happy" → "elated"',
        '"very big" → "enormous"',
        '"very quickly" → "more quickly"',
      ],
      correct: 3,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s revised waka passage: "The crossing had been gruelling." Which audit rule does this apply — and what was "gruelling" replacing?',
      options: [
        'Rule 1 (delete it) — "gruelling" replaces an unnecessary adverb',
        'Rule 2 (replace adverb + adjective with one strong word) — "gruelling" replaces "fairly difficult"',
        'Rule 1 (delete it) — "fairly difficult" was removed entirely and nothing replaced it',
        'Rule 2 (replace adverb + adjective with one strong word) — "gruelling" replaces "quite exhausting"',
      ],
      correct: 3,
      day: 'Thursday',
    },
  ],

  '3-5': [
    {
      q: '"The footsteps grew louder... and then stopped." Which effect does the ellipsis create here?',
      options: [
        'Trailing off — the narrator cannot finish the thought',
        'Suspense — a pause before the reveal that forces the reader to wait',
        'Humour — the sudden stop is meant to be surprising and funny',
        'Contrast — the loud footsteps are contrasted with the silence',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"I always thought I\'d be brave in that situation, but..." Which effect does the ellipsis create here?',
      options: [
        'Suspense — something dramatic is about to happen',
        'Trailing off — the thought is left unfinished, implying the speaker cannot or will not complete it',
        'Emphasis — the ellipsis makes "but" feel more important',
        'Contrast — the bravery and the reality are being compared',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The exhausted, trembling climber reached the summit." → "The climber, exhausted and trembling, reached the summit." What changes when the adjectives move after the noun?',
      options: [
        'The meaning changes — "exhausted and trembling" after the noun means something different',
        'The adjectives gain dramatic emphasis — set off by commas, they feel separate and important',
        'The sentence becomes incorrect — adjectives must always come before the noun',
        'The sentence becomes shorter and easier to read',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: 'Tuesday\'s tip: "Before = standard. After (with commas) = dramatic emphasis." Rewrite "The ancient, scarred waka cut through the dark water" with adjectives after the noun. Which version is correct?',
      options: [
        '"The waka ancient and scarred cut through the dark water."',
        '"The waka, ancient and scarred, cut through the dark water."',
        '"The waka — ancient and scarred — cut through the dark water."',
        '"The waka (ancient and scarred) cut through the dark water."',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The storm had been building all day — dark clouds massing, the wind stripping leaves, the sea turning black. Then it hit." Why is "Then it hit" so effective after the long sentence?',
      options: [
        'Because it uses a pronoun instead of a noun, which is more formal',
        'Because the contrast between the long accumulating sentence and the short impact sentence creates dramatic force',
        'Because "Then" is a time connective that links the two sentences logically',
        'Because short sentences are always more dramatic than long sentences',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s weDo passage: "Something happened. A sound came. She looked. It was there." What is the problem with all four sentences being this short?',
      options: [
        'They are all grammatically incomplete — each needs a subordinate clause',
        'There is no variety — four short sentences in a row loses the impact that contrast would create',
        'Short sentences cannot be used in narrative writing — only in lists',
        'They all start with different words, which makes the paragraph feel disconnected',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"She ran. She ran faster. She kept running." → "She ran — faster now, desperate — until her lungs gave out." What does the dash aside add that the original does not have?',
      options: [
        'A time sequence — we now know the exact order of events',
        'Her internal state ("desperate") in a way that feels breathless and immediate',
        'A contrast between running fast and running slow',
        'A speech tag showing that she is thinking these words aloud',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s tip: "For each punctuation mark in narrative, ask: what effect does this create?" Which version of this sentence has punctuation that is working hardest?',
      options: [
        '"She walked into the room. She saw what was there."',
        '"She walked into the room and she saw what was there."',
        '"She walked into the room — and stopped."',
        '"She walked into the room, she saw what was there."',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '3-4': [
    {
      q: '"the toys belonging to the children" → "the children\'s toys." Why is it "children\'s" and not "childrens\'"?',
      options: [
        'Because "children" ends in "en" not "s," so you add apostrophe + s rather than just an apostrophe',
        'Because possession of toys always uses apostrophe + s regardless of the plural',
        'Because "children" is a singular noun and singular nouns always take apostrophe + s',
        'Because the apostrophe goes before the final letter of any possessive noun',
      ],
      correct: 0,
      day: 'Monday',
    },
    {
      q: 'Monday\'s tip: "Does the plural end in s? → apostrophe only. Doesn\'t end in s? → apostrophe + s." Which possessive form is correct for "the rights belonging to the people"?',
      options: [
        '"peoples\' rights" — regular plural ending in s, apostrophe after',
        '"people\'s rights" — irregular plural not ending in s, apostrophe + s',
        '"peoples rights" — no apostrophe needed for plurals',
        '"people\'s\' rights" — double apostrophe for irregular plural possession',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"When Tama met Rangi, he was nervous." Why is this sentence ambiguous?',
      options: [
        'Because "nervous" is an adjective and adjectives cannot follow a comma',
        'Because "he" could refer to either Tama or Rangi — the reader cannot tell who was nervous',
        'Because the comma after "Rangi" is in the wrong position',
        'Because the sentence is in the wrong tense — it should be "he is nervous"',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"When the cat chased the mouse, it ran behind the fridge." Tuesday\'s lesson says this is ambiguous. What is the best fix?',
      options: [
        '"When the cat chased the mouse, the cat ran behind the fridge."',
        '"When the cat chased the mouse, the mouse fled behind the fridge."',
        '"When the cat chased the mouse, they ran behind the fridge."',
        '"The cat chased the mouse and it ran behind the fridge."',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"This paragraph is about when Aroha got lost in the bush." Wednesday\'s lesson rates this as a weak narrative topic sentence. Why?',
      options: [
        'Because it uses past tense — narrative topic sentences must be in present tense',
        'Because it announces what it will cover rather than creating intrigue or a question in the reader\'s mind',
        'Because it names a character — narrative topic sentences should never begin with a name',
        'Because it is too short — narrative topic sentences must be at least two clauses',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"The track disappeared beneath a mat of wet leaves." Why is this a strong narrative topic sentence?',
      options: [
        'Because it uses a simile — "like a mat of wet leaves" creates a vivid comparison',
        'Because it creates immediate intrigue — the reader wonders where the track went and what happens next',
        'Because it states a clear fact that sets the informational context for the paragraph',
        'Because it introduces all the main characters who will appear in the paragraph',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"Maia and Tui raced down the hill. She tripped and fell. She stopped to help her up. She said she was okay." What is the core problem with this passage?',
      options: [
        'The tense is inconsistent — "raced" is past but "is" is present tense',
        'Every pronoun "she" could refer to either Maia or Tui — the reader cannot follow who is doing what',
        'There are no commas in the passage — each sentence needs internal punctuation',
        'The sentences are all the same length — there is no variety for effect',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s edit: "\'I\'m okay,\' Tui said." Why does using direct speech help fix the pronoun ambiguity?',
      options: [
        'Because speech marks remove the need for pronouns entirely',
        'Because "I" in direct speech clearly identifies the speaker, removing any uncertainty',
        'Because direct speech always follows a comma, which signals a new character',
        'Because speech marks signal that the pronoun inside them is a possessive',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '3-3': [
    {
      q: '"The politician was determined." vs "The politician was stubborn." Both describe the same quality. What is different about them?',
      options: [
        '"Determined" is formal and "stubborn" is informal — the register is different',
        '"Determined" carries a positive connotation and "stubborn" carries a negative one — same behaviour, opposite feeling',
        '"Determined" describes an action and "stubborn" describes a state',
        '"Stubborn" is more precise because it describes exactly how the politician behaves',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Monday\'s tip: "Ask: what feeling do I want the reader to have? Choose accordingly." A journalist wants readers to admire a community leader who refuses to give up. Which word should they choose?',
      options: ['obstinate', 'pigheaded', 'inflexible', 'tenacious'],
      correct: 3,
      day: 'Monday',
    },
    {
      q: '"The iwi ___ agreed to a joint statement." The iwi is acting as one unit making a single decision. Which verb is correct?',
      options: [
        '"have" — because "iwi" sounds like a plural noun',
        '"has" — because the iwi is acting as one unit, so it takes a singular verb',
        '"have" — because formal writing prefers plural verbs with group nouns',
        '"has" — because agreement verbs always take singular form',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The committee ___ divided on the proposal." The members hold different individual views. Which verb fits — and why?',
      options: [
        '"is" — because collective nouns always take singular verbs in formal writing',
        '"are" — because the members are acting separately, each holding a different view',
        '"is" — because "divided" already signals that individuals disagree',
        '"are" — because "committee" ends in "ee" which signals a plural',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The door opened and she walked in." → "The door opened but no one was there." What does changing "and" to "but" do to the sentence?',
      options: [
        'It makes the sentence longer and more complex',
        'It creates tension — the reader expected someone to be there, so the empty room is unsettling',
        'It changes the tense of the sentence from present to past',
        'It signals that the door opening and walking in are simultaneous events',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip: "Save \'so\' for resolution." In a tense narrative, a character finally escapes danger. Which conjunction creates the best sense of relief?',
      options: [
        '"but" — to contrast the danger with the escape',
        '"yet" — to create ongoing unease even after the escape',
        '"so" — to signal that the danger caused the escape, providing resolution',
        '"and" — to simply add the escape to what came before',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The old house stood at the end of the quiet road." → "The decrepit house loomed at the end of the forsaken road." What does "loomed" add that "stood" does not?',
      options: [
        '"Loomed" is a more formal verb appropriate for written narrative',
        '"Loomed" carries threat and menace — it suggests the house is oppressive and dangerous',
        '"Loomed" tells us the house is tall, which "stood" does not indicate',
        '"Loomed" is the past tense equivalent of "stands" for inanimate objects',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s tip: "Ask: what mood does this adjective create?" Upgrade "big" and "old" in "A big wave hit the old boat" for a mood of danger. Which version is best?',
      options: [
        '"A very big wave hit the very old boat."',
        '"A large wave hit the ancient boat."',
        '"A mountainous wave obliterated the battered boat."',
        '"A huge wave hit the really old boat."',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '3-2': [
    {
      q: '"She trained hard every day, but she still felt unprepared." Where is the comma and why is it correct?',
      options: [
        'Before "but" — because "but" joins two complete clauses and needs a comma before it',
        'After "but" — because conjunctions are always followed by a comma',
        'Before "still" — because adverbs need to be separated from the rest of the sentence',
        'After "day" — because fronted adverbials always take a comma',
      ],
      correct: 0,
      day: 'Monday',
    },
    {
      q: '"He wanted to speak but, he couldn\'t find the right words." What is wrong with the comma placement?',
      options: [
        'The comma should be before "but," not after it — "He wanted to speak, but he couldn\'t find the right words."',
        'There should be no comma at all — "but" never takes a comma',
        'The comma should be after "speak" AND after "but" — two commas are required',
        'The comma is in the right place — conjunctions are followed by commas',
      ],
      correct: 0,
      day: 'Monday',
    },
    {
      q: '"Visitors to the kāinga ___ remove their shoes before entering the wharenui." This is a rule with no exceptions. Which modal verb is correct?',
      options: [
        '"might" — because there is a chance visitors will remove their shoes',
        '"should" — because it is good advice but not compulsory',
        '"must" — because this is an obligation, a rule with no exceptions',
        '"could" — because removing shoes is an option visitors can choose',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"Students ___ proofread their work before submitting it." This is advice, not a strict rule. Which modal verb fits?',
      options: [
        '"must" — because proofreading is always obligatory',
        '"should" — because this is advice about good practice',
        '"might" — because there is a possibility students will proofread',
        '"could" — because proofreading is just one option among many',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"She was nervous." (telling) → "Her fingers twisted the hem of her kākahu and she kept glancing at the door." (showing). What does the showing version do that telling does not?',
      options: [
        'It names the emotion so the reader understands it immediately',
        'It uses more words, which signals to the reader that the moment is important',
        'It shows physical evidence of nervousness so the reader infers the feeling themselves',
        'It uses a simile to compare her behaviour to something familiar',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip: "What does the body do? What does the face do? What does the person notice?" Which version best SHOWS rather than tells the emotion "He was excited"?',
      options: [
        '"He felt very excited and happy about the game."',
        '"He was obviously extremely excited about the upcoming game."',
        '"He kept checking the clock, bouncing on his heels, already wearing his boots an hour before kick-off."',
        '"The game made him feel excited in a way he had never experienced before."',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"Come on called Hemi Were going to miss the bus." How many dialogue punctuation errors are in this sentence?',
      options: [
        'Two — missing speech marks and missing comma before the speech tag',
        'Three — missing speech marks, missing comma, and "Were" should be "We\'re"',
        'Four — missing speech marks, missing comma, "Were" needs an apostrophe, and "Hemi" should be lowercase',
        'One — only the speech marks are missing',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s five-check rule. "\'I\'m coming,\' she shouted back." Which check confirms the comma before the closing speech mark is correct?',
      options: [
        'Check 4 — new speaker, new line',
        'Check 2 — comma or question mark before the closing speech mark when a speech tag follows',
        'Check 3 — the speech tag is not capitalised',
        'Check 5 — punctuation is inside the speech marks',
      ],
      correct: 1,
      day: 'Thursday',
    },
  ],

  '3-1': [
    {
      q: '"sad → unhappy → miserable → devastated → heartbroken." Monday\'s lesson says: "Match the emotion word to the story\'s stakes." A character loses a game of cards. Which word is most appropriate?',
      options: ['heartbroken', 'devastated', 'miserable', 'disappointed'],
      correct: 3,
      day: 'Monday',
    },
    {
      q: 'A character\'s best friend moves away forever. Monday\'s tip: "Life-changing loss → \'devastated.\'" Which word on the scale is most appropriate?',
      options: ['unhappy', 'sad', 'heartbroken', 'disappointed'],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"You can\'t say \'two sands\' — sand is non-count." Using Tuesday\'s number test, which of these is a NON-COUNT noun?',
      options: [
        '"chair" — you cannot say "two chairs"',
        '"advice" — you cannot say "three advices"',
        '"book" — you cannot say "four books"',
        '"suggestion" — you cannot say "five suggestions"',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: 'Tuesday\'s tip: "\'Much\' = non-count. \'Many\' = count." Which sentence is correct?',
      options: [
        '"She gave me many good advices about the trip."',
        '"She gave me much good advice about the trip."',
        '"She gave me many good advice about the trip."',
        '"She gave me much good advices about the trip."',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"She stopped. She listened. The floorboard creaked. Someone was there." Wednesday\'s lesson says this rhythm creates tension. What technique achieves this?',
      options: [
        'Using four different verbs to show a sequence of actions',
        'Breaking the action into short simple sentences so the reader feels every beat as a separate pause',
        'Using alliteration across the four sentences for a musical effect',
        'Avoiding adjectives so the reader focuses entirely on the verbs',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s demonstration: "She stopped and listened because a floorboard creaked and someone was there." Why does this longer version lose the tension?',
      options: [
        'Because it uses "because" which is a weak conjunction in narrative',
        'Because it uses past tense — tense consistency is lost',
        'Because all the information is crammed into one sentence — the reader rushes through without pausing at each beat',
        'Because "and" is repeated twice, which sounds informal',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"\'I think we\'re lost,\' she whispered." Thursday\'s Rule 3 says the speech tag is NOT capitalised. Which sentence correctly follows this rule?',
      options: [
        '\'We should go,\' Said Marcus, \'before it gets dark.\'',
        '\'We should go,\' said Marcus, \'before it gets dark.\'',
        '\'We should go,\' Said marcus, \'before it gets dark.\'',
        '\'We should go.\' said Marcus. \'Before it gets dark.\'',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s Rule 2: "Comma (not full stop) before the closing speech mark if a speech tag follows." Which sentence applies this correctly?',
      options: [
        '"I think we\'re lost." she whispered.',
        '"I think we\'re lost", she whispered.',
        '"I think we\'re lost," she whispered.',
        '"I think we\'re lost" she whispered.',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '2-10': [
    {
      q: '"Despite the rain (which had been falling since dawn), the market was busy." What job do the brackets do here?',
      options: [
        'They introduce the most important information in the sentence',
        'They add extra detail that could be removed without breaking the sentence',
        'They replace a colon that would otherwise introduce the detail',
        'They signal that the information inside is incorrect or uncertain',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Monday\'s review passage uses six punctuation marks in one paragraph. Which mark is used to introduce the list "free transport, extended opening hours, and a fireworks display"?',
      options: [
        'A semicolon — because it joins two related ideas',
        'A dash — because it creates a dramatic pause before the list',
        'A colon — because a complete sentence comes before it and a list follows',
        'A comma — because lists always use a comma before the first item',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"Everyone was present when the kuia, who had travelled from Rotorua, finally arrived." What grammar feature is "who had travelled from Rotorua"?',
      options: [
        'A fronted adverbial — it comes before the main verb',
        'A relative clause — it gives extra information about the kuia',
        'A past progressive — it shows an action in progress',
        'A compound sentence — it joins two equal clauses',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The group had been waiting for over an hour." What tense is "had been waiting" — and what does it tell us?',
      options: [
        'Past progressive — it shows the waiting was happening at a specific moment',
        'Present perfect — it shows the waiting is still happening now',
        'Past perfect progressive — it shows the waiting was in progress before another past moment',
        'Simple past — it shows the waiting happened and finished',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"Before the tide turned, the waka was safely ashore." What type of sentence is this?',
      options: [
        'A compound sentence — two equal clauses joined by a conjunction',
        'A complex sentence with a fronted adverbial — the subordinate clause comes first with a comma',
        'A simple sentence with a prepositional phrase at the start',
        'A compound-complex sentence — it has both a relative clause and a conjunction',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"The kārearea, a native falcon, is the fastest bird in Aotearoa." What technique is used in "a native falcon"?',
      options: [
        'A relative clause introduced by "which"',
        'A fronted adverbial giving extra detail',
        'An appositive — an embedded noun phrase that renames the subject',
        'A participial phrase describing what the kārearea is doing',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: 'Thursday\'s Term 2 checklist has six passes. Pass 4 targets vague words. Which sentence most needs a Pass 4 edit?',
      options: [
        '"The kererū plunged into the pōhutukawa and devoured the ripest berries."',
        '"The work was really good and everyone said nice things about it."',
        '"Despite the rain, the hīkoi continued throughout the afternoon."',
        '"The waka, which had been built by students, held up well in the swell."',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s tip: "Six passes, six focuses. One pass, one rule." Why is this better than trying to catch everything in one read?',
      options: [
        'Because each rule applies to different letters of the alphabet',
        'Because you can only fix one type of error — fixing two at once is grammatically impossible',
        'Because focusing on one rule at a time means you are less likely to miss errors of that type',
        'Because six passes always takes exactly the same amount of time as one pass',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '2-9': [
    {
      q: '"Slowly, silently, the silver moon sailed across the sky." Which device is used — and what is the effect?',
      options: [
        'Assonance — the repeated vowel sounds create a musical, lingering quality',
        'Alliteration — the repeated "s" sound creates emphasis and a hushed atmosphere',
        'Onomatopoeia — "sailed" sounds like the action it describes',
        'Personification — the moon is given the human action of sailing',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The pale lake lay in the late afternoon haze." Which device is used?',
      options: [
        'Alliteration — "pale," "lake," "late" all start with the same sound',
        'Personification — the lake is given human qualities',
        'Assonance — the repeated "a" vowel sound in "pale," "lake," "late," "haze" creates a slow musical effect',
        'Onomatopoeia — "haze" sounds like the feeling it describes',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"The kaiako waited until the class was completely silent." Is "until" coordinating or subordinating — and how do you know?',
      options: [
        'Coordinating — because both sides of "until" could stand alone as sentences',
        'Subordinating — because "until the class was completely silent" cannot stand alone',
        'Coordinating — because "until" is part of the FANBOYS group',
        'Subordinating — because "until" always comes at the end of a sentence',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The experiment failed, yet the students learnt something important." Remove "yet" and split into two sentences. What does this tell you about "yet"?',
      options: [
        '"Yet" is subordinating — one half cannot stand alone without it',
        '"Yet" is coordinating — both halves stand alone, so it joins two equal clauses',
        '"Yet" is a linking adverb — it must always be followed by a semicolon',
        '"Yet" is subordinating — the second half depends on the first for its meaning',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"The tuatara is one of New Zealand\'s most ancient reptiles. It has barely changed in 200 million years." What does "It" do in the second sentence?',
      options: [
        'It introduces a new subject — a different animal being compared to the tuatara',
        'It refers back to "tuatara" — avoiding repetition and stitching the sentences together',
        'It signals that the sentence is in the passive voice',
        'It is an indefinite pronoun that could refer to any reptile',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"This makes it a living link to the age of the dinosaurs." In this sentence, what does "This" refer back to?',
      options: [
        'The tuatara specifically — "This tuatara"',
        'New Zealand — "This country"',
        'The whole idea of the previous sentence — that the tuatara has barely changed in 200 million years',
        'The age of the dinosaurs — "This age"',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The sky was dark. The clouds gathered quickly. The wind picked up. The rain began to fall." What is the problem with all four sentence openings?',
      options: [
        'They all use the past tense, which is incorrect for descriptive writing',
        'They are all too short — each sentence needs at least two clauses',
        'Every sentence starts with "The" — the repeated opener makes the writing monotonous',
        'They all describe weather, which is a cliché opening for a story',
      ],
      correct: 2,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s revised version: "Dark clouds gathered quickly. As the wind picked up, the first drops of rain began to fall. From the south, thunder rolled in." What THREE different opener types are used?',
      options: [
        'Adjective opener, subordinate clause, fronted adverbial of place',
        'Adverb opener, relative clause, compound sentence',
        'Noun opener, coordinating conjunction, prepositional phrase',
        'Verb opener, fronted adverbial of time, linking adverb',
      ],
      correct: 0,
      day: 'Thursday',
    },
  ],

  '2-8': [
    {
      q: '"Separate" — people often write "seperate." Monday\'s lesson hides a word inside it to fix this. What is the hidden word?',
      options: ['"pare" — sep-PARE-te', '"a rat" — sep-A-RAT-e', '"par" — SEPAR-ate', '"rate" — sepa-RATE'],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"Necessary" — one Collar, two Socks. What does this mnemonic mean for the spelling?',
      options: [
        'The word has two c\'s and one s',
        'The word has one c and two s\'s — "neCeSSary"',
        'The word has one collar (full stop) and two socks (commas)',
        'The word has two syllables and one silent letter',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The eel moved ___ the root system of the tree, disappearing into the dark water." Which directional preposition is correct?',
      options: [
        '"towards" — the eel is moving in the direction of the roots',
        '"past" — the eel is moving alongside the roots without entering them',
        '"through" — the eel is moving inside and out the other side of the root system',
        '"over" — the eel is moving above the roots',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"The tamariki ran ___ the beach and ___ the waves." Which pair of directional prepositions best completes the sentence?',
      options: [
        '"along / past" — running beside the beach then past the waves',
        '"towards / into" — running in the direction of the beach then entering the waves',
        '"through / over" — running through the beach then above the waves',
        '"past / along" — running past the beach then beside the waves',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"By the time the tide turned, the stranded boat had begun to list badly." What TYPE of fronted adverbial opener is "By the time the tide turned"?',
      options: [
        'A contrast opener — it shows something unexpected happened',
        'A place opener — it tells us where the boat was',
        'A time opener — it anchors the reader in a specific moment',
        'A manner opener — it tells us how the boat was moving',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"Despite the forecast, the day turned out to be perfect for the regatta." What does the contrast opener "Despite the forecast" create?',
      options: [
        'Urgency — the reader feels the situation is about to get worse',
        'Surprise — the reader expected the forecast to be right, so the perfect day is unexpected',
        'Suspense — the reader doesn\'t know what the forecast predicted',
        'Sadness — the contrast between forecast and reality feels disappointing',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: '"Something happened and it was interesting." Thursday\'s lesson says this is vague. Which revision best applies the four-step fix?',
      options: [
        '"Something very interesting happened near the water yesterday."',
        '"The kōwhai tree outside the classroom window had shed its flowers overnight, carpeting the path in yellow."',
        '"An interesting event occurred which was notable and worth writing about."',
        '"Something happened that was quite interesting and everyone noticed it."',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s tip: "Could this sentence describe a hundred different situations? If yes — it\'s too vague." Which sentence passes this test — it could NOT describe a hundred situations?',
      options: [
        '"The animal did something near the water."',
        '"Something about the place made it feel special."',
        '"The weather affected how the people felt."',
        '"A kōtuku stood motionless in the shallows, its white plumage brilliant against the dark water."',
      ],
      correct: 3,
      day: 'Thursday',
    },
  ],

  '2-7': [
    {
      q: '"The kete contained: a tī kōuka leaf, a piece of bone, and a carved pounamu." Why is the colon wrong here?',
      options: [
        'Because "tī kōuka" needs a capital letter before a colon can be used',
        'Because "The kete contained" is not a complete sentence — the colon needs a complete sentence before it',
        'Because colons can only introduce two items, not three',
        'Because the list items should be separated by semicolons, not commas',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The rescue team brought the following equipment: ropes, a first-aid kit, and torches." Why is the colon correct here?',
      options: [
        'Because "following" is a signal word that always requires a colon',
        'Because "The rescue team brought the following equipment" is a complete sentence before the colon',
        'Because there are three items in the list — colons are only correct with three or more items',
        'Because the list contains specific nouns, which always follow a colon',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: '"The students ___ their speeches when the fire alarm went off." Which verb form correctly completes this past progressive sentence?',
      options: [
        '"prepared" — simple past, the action was completed',
        '"have prepared" — present perfect, still relevant now',
        '"were preparing" — past progressive, the action was in progress when interrupted',
        '"had prepared" — past perfect, the action finished before another past moment',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: 'Tuesday\'s tip: "Past progressive sets the background scene. Simple past is the event that interrupts it." Which sentence uses this pattern correctly?',
      options: [
        '"She was reading her book and then she finished it."',
        '"She read her book when the power cut out."',
        '"She was reading her book when the power cut out."',
        '"She had read her book when the power cut out."',
      ],
      correct: 2,
      day: 'Tuesday',
    },
    {
      q: '"___ the journey was exhausting, Mere never once complained." Which conjunction fits — and why?',
      options: [
        '"Unless" — the exhaustion is a condition for the complaining',
        '"While" — the exhaustion and the not-complaining happened at the same time',
        '"Although" — there is a contrast: exhaustion expected complaining, but she didn\'t',
        '"Because" — the exhaustion caused her not to complain',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The kiwi will remain endangered ___ habitat destruction is halted." Which conjunction fits — and why?',
      options: [
        '"although" — halting destruction would be a surprising contrast to the endangerment',
        '"while" — the endangerment and the halting happen at the same time',
        '"unless" — the endangerment will continue EXCEPT IF destruction is halted',
        '"because" — halting destruction is the reason the kiwi will remain endangered',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"The waka left the shore just before dawn. The crew paddled in silence. Suddenly the wind picks up and waves begin to slap against the hull." What is wrong with the last sentence?',
      options: [
        'It uses passive voice — "picks up" and "slap" should be in the passive',
        'It switches to present tense — "picks up" and "begin to slap" should be "picked up" and "began to slap"',
        'It uses too many conjunctions — "and" should be removed',
        'It has a comma splice — "the wind picks up" and "waves begin to slap" need a full stop between them',
      ],
      correct: 1,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s tip: "Read your paragraph and underline every verb. Do they all match?" In a past-tense paragraph, which verb is the odd one out?',
      options: [
        '"paddled" — this is simple past',
        '"left" — this is simple past',
        '"calls out" — this is present tense, drifting from past',
        '"checked" — this is simple past',
      ],
      correct: 2,
      day: 'Thursday',
    },
  ],

  '2-6': [
    {
      q: '"micro" (small) + "phone" (sound) = microphone. Using the same logic, what does "microscope" most likely mean?',
      options: [
        'An instrument for measuring small distances',
        'An instrument for looking at very small things',
        'An instrument for recording tiny sounds',
        'An instrument for magnifying photographs',
      ],
      correct: 1,
      day: 'Monday',
    },
    {
      q: 'Monday\'s tip: "When you hit an unknown word, look for a root you recognise." The root "terra" means land. What does "extraterrestrial" most likely mean?',
      options: [
        'Relating to extreme conditions on land',
        'Belonging to a territory outside your own country',
        'Existing or coming from outside the Earth',
        'A very large area of flat terrain',
      ],
      correct: 2,
      day: 'Monday',
    },
    {
      q: '"She spoke quietly." → "She spoke in a hushed, urgent whisper." What does the adverbial phrase add that the single adverb "quietly" cannot?',
      options: [
        'It tells us the exact volume in decibels',
        'It adds texture and mood — we can picture the manner AND feel the urgency',
        'It tells us who she was speaking to',
        'It changes the tense of the sentence to make it more vivid',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"He left quickly." → "He left before anyone could ask questions." What does the adverbial phrase add that "quickly" does not?',
      options: [
        'It adds time detail — we know exactly when he left',
        'It adds time AND hints at motivation — he was avoiding questions',
        'It tells us where he went after leaving',
        'It tells us how fast he was walking',
      ],
      correct: 1,
      day: 'Tuesday',
    },
    {
      q: '"Schools should have gardens." → "Schools across Aotearoa, from urban Auckland to rural Northland, should have gardens where students can grow and harvest their own kai." What do the added phrases do to the argument?',
      options: [
        'They make the sentence longer so it seems more authoritative',
        'They add WHERE detail (across Aotearoa) and WHO detail (students growing kai), making the claim specific and harder to dismiss',
        'They replace the original claim with a new, stronger claim about kai',
        'They add contrast — urban schools versus rural schools',
      ],
      correct: 1,
      day: 'Wednesday',
    },
    {
      q: 'Wednesday\'s tip: "In persuasion, specific detail builds credibility." Which version of this claim is most persuasive?',
      options: [
        '"Young people should be heard on important matters."',
        '"Young people deserve a voice."',
        '"Young people aged 10–18, who will inherit every consequence of today\'s decisions, deserve a formal voice in policy that affects their future."',
        '"Young people have good ideas that adults should listen to."',
      ],
      correct: 2,
      day: 'Wednesday',
    },
    {
      q: '"It was a nice day and we had a good time doing lots of fun things." Thursday\'s lesson says every underlined word is an upgrade opportunity. How many vague words are in this sentence?',
      options: ['Two — "nice" and "good"', 'Three — "nice," "good," and "fun"', 'Four — "nice," "good," "fun," and "lots"', 'Five — "nice," "good," "fun," "lots," and "things"'],
      correct: 4,
      day: 'Thursday',
    },
    {
      q: 'Thursday\'s example upgrade: "The sun blazed over the harbour and we spent the afternoon kayaking, laughing until our arms gave out." Which technique was NOT used in this upgrade?',
      options: [
        'Replacing "nice day" with specific weather detail',
        'Replacing "good time" with a specific activity',
        'Replacing "lots of fun things" with a concrete example',
        'Adding speech marks to show what someone said about the day',
      ],
      correct: 3,
      day: 'Thursday',
    },
  ],

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
