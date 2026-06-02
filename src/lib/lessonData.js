// Full year lesson data — 40 weeks × 4 days × I Do / We Do / You Do
// Each lesson targets ~20 minutes total (I Do ~5min, We Do ~7min, You Do ~8min)
// NZ Curriculum Years 5–6 (Phase 2 Writing)
// Spiral: each skill domain returns each term with fresh sentences/contexts

export const DAILY_FOCUS = {
  Monday: 'Vocabulary & Punctuation',
  Tuesday: 'Grammar',
  Wednesday: 'Sentence Building',
  Thursday: 'Editing & Craft',
  Friday: 'Weekly Assessment',
}

export const DAY_COLOURS = {
  Monday: '#e63946',
  Tuesday: '#f4a261',
  Wednesday: '#2ec4b6',
  Thursday: '#a855f7',
  Friday: '#facc15',
}

export const TERM_COLOURS = ['#1B2A4A', '#2E5FA3', '#1A6B4A', '#7D3C98']

// Helper to create a lesson object
function lesson(topic, nzLink, iDo, weDo, youDo) {
  return { topic, nzLink, iDo, weDo, youDo }
}

export const CURRICULUM = {
  1: { // TERM 1
    1: {
      Monday: lesson(
        'Tier 2 vocabulary: descriptive adjectives',
        'Use precise words to describe',
        {
          title: 'I Do — Watch Me Choose Better Words',
          instruction: 'I\'m going to show you how to swap a plain word for a much more interesting one. Watch how I upgrade the word "big" in this sentence.',
          example: 'The <u>big</u> dog ran across the field.',
          demonstration: 'Instead of "big" I could say: enormous, muscular, towering, hulking. I pick "muscular" because it tells us something extra — not just size, but strength. Watch: "The <u>muscular</u> dog ran across the field." Much more vivid!',
          tip: 'Ask yourself: Does this word paint a picture? If not, upgrade it.',
        },
        {
          title: 'We Do — Upgrade Together',
          instruction: 'Let\'s upgrade the plain adjectives in these sentences together. Shout out your ideas!',
          sentences: [
            'The <u>nice</u> sunset filled the sky with colour.',
            'She wore a <u>pretty</u> dress to the concert.',
            'It was a <u>bad</u> storm that hit the town.',
          ],
          prompt: 'What word could replace the underlined one? Why is your choice better?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence by replacing the plain adjective with a stronger, more descriptive one. Try to use a different word each time!',
          tasks: [
            'The <u>old</u> bridge creaked in the wind.',
            'We climbed a <u>high</u> mountain on our trip.',
            'The puppy had a <u>soft</u> coat.',
            '✦ Bonus: Write your own sentence using two vivid adjectives.',
          ],
        }
      ),
      Tuesday: lesson(
        'Nouns & proper nouns – identification & use',
        'Understand word classes',
        {
          title: 'I Do — Spot the Noun',
          instruction: 'A noun is a naming word — it names a person, place, thing, or idea. A proper noun is the specific name of something and always starts with a capital letter. Watch me find and sort them.',
          example: 'The <u>girl</u> visited <u>Wellington</u> with her <u>family</u>.',
          demonstration: '"girl" = common noun (a person). "Wellington" = proper noun (specific place — capital W). "family" = common noun (a group). Proper nouns need a capital because they are the actual name.',
          tip: 'Ask: Is this the specific name of someone or somewhere? → proper noun → capital letter!',
        },
        {
          title: 'We Do — Sort & Capitalise',
          instruction: 'Let\'s sort these words into common nouns and proper nouns together, and fix any missing capitals.',
          sentences: [
            'my friend aisha lives in christchurch near the avon river.',
            'the teacher read a book called the lion, the witch and the wardrobe.',
            'on tuesday we visited the auckland museum with mrs chen.',
          ],
          prompt: 'Which words need a capital letter? Which are just common nouns?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence correctly, adding capital letters for all proper nouns.',
          tasks: [
            'last summer, my cousin jake visited queenstown with uncle dan.',
            'our school, parkside primary, is near the hutt river.',
            'i am reading a book by roald dahl called matilda.',
            '✦ Bonus: Write two sentences — one with 2 common nouns, one with 2 proper nouns.',
          ],
        }
      ),
      Wednesday: lesson(
        'Simple sentence structure: subject + verb + object',
        'Construct simple sentences',
        {
          title: 'I Do — Build a Simple Sentence',
          instruction: 'Every sentence needs at least a subject (who/what) and a verb (action/state). We can also add an object (what receives the action). Watch me build one piece at a time.',
          example: 'The cat | chased | the mouse.',
          demonstration: 'Subject = "The cat" (who is doing it). Verb = "chased" (the action). Object = "the mouse" (what it acted on). Put them together: complete thought, complete sentence!',
          tip: 'Check: Who is doing it? What are they doing? What are they doing it to?',
        },
        {
          title: 'We Do — Label & Build',
          instruction: 'Let\'s label each part (S/V/O) in these sentences, then try building our own on the board.',
          sentences: [
            'The goalkeeper saved the penalty.',
            'A huge wave swallowed the sandcastle.',
            'My little brother ate the last biscuit.',
          ],
          prompt: 'Point to the subject, verb, and object. What would happen if we removed the verb?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Label each sentence with S (subject), V (verb), O (object). Then write three simple sentences of your own.',
          tasks: [
            'The chef prepared a delicious meal.',
            'The explorer discovered a hidden cave.',
            'Lightning struck the tall tree.',
            '✦ Bonus: Write an S+V+O sentence about something that happened at school this week.',
          ],
        }
      ),
      Thursday: lesson(
        'Proofreading: capitals & full stops',
        'Edit for basic conventions',
        {
          title: 'I Do — Be the Editor',
          instruction: 'Every sentence starts with a capital letter and ends with a full stop (or ! or ?). Watch me read slowly and fix the mistakes in this passage.',
          example: 'the sun rose slowly over the mountains. birds began to sing in the trees it was going to be a perfect day the children raced outside.',
          demonstration: 'I read aloud and pause at every sentence end. "the sun" → capital T. After "mountains." ✓ already has one. After "trees" — no full stop! I add one. "it" → capital I. And so on. I\'ll mark every fix in red.',
          tip: 'Read out loud — you naturally pause at sentence ends. That pause = full stop.',
        },
        {
          title: 'We Do — Fix It Together',
          instruction: 'Let\'s fix this passage together. One student comes up and marks each correction.',
          sentences: [
            'maya loved visiting her grandma on fridays they would bake together grandma always made chocolate biscuits maya\'s favourite was the ones with icing on top they would eat them while watching the birds in the garden',
          ],
          prompt: 'Where do sentences end? Which words need capitals? How many sentences are in this passage?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this passage correctly, adding all missing capitals and full stops.',
          tasks: [
            'last weekend dad and i went fishing at the lake we caught three fish but we threw them back the water was cold and clear i could see stones on the bottom dad said it was the best fishing spot he knew',
            '✦ Bonus: Count how many sentences you created. Write your own 3-sentence paragraph with perfect punctuation.',
          ],
        }
      ),
    },

    2: {
      Monday: lesson(
        'Commas in lists – rules & practice',
        'Use commas correctly in lists',
        {
          title: 'I Do — Commas Keep Lists Tidy',
          instruction: 'When we list three or more things in a sentence, we separate them with commas. The last item uses "and" (not a comma). Watch me build a list sentence step by step.',
          example: 'In my bag I have a pencil, a ruler, a water bottle and my lunchbox.',
          demonstration: 'I list the items: pencil → comma → ruler → comma → water bottle → "and" → lunchbox. No comma before "and" in NZ/UK style. The commas stop the sentence becoming a jumbled mess!',
          tip: 'Read your list aloud. Every natural pause (except before "and") = a comma.',
        },
        {
          title: 'We Do — Add the Commas',
          instruction: 'These list sentences are missing commas. Let\'s fix them together.',
          sentences: [
            'The market sold fresh tomatoes plump strawberries creamy cheese and warm bread.',
            'Liam packed his boots his shin pads his water bottle his jersey and his mouthguard.',
            'The painting used shades of crimson burnt orange golden yellow and deep purple.',
          ],
          prompt: 'Where do the pauses fall? Does "and" need a comma before it?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add commas to the list sentences, then write two of your own.',
          tasks: [
            'At the beach we collected shells pebbles driftwood and sea glass.',
            'The recipe called for flour sugar butter eggs and a pinch of salt.',
            'Her favourite animals were dolphins elephants red pandas and otters.',
            '✦ Bonus: Write a sentence listing 5 things you would bring on a survival adventure.',
          ],
        }
      ),
      Tuesday: lesson(
        'Verbs: action vs. state verbs',
        'Understand verb types',
        {
          title: 'I Do — Two Kinds of Verbs',
          instruction: 'Action verbs show physical or mental movement (run, think, build). State verbs describe a condition or state of being (is, seems, belongs, loves). Watch how I spot the difference.',
          example: 'The hawk <u>soared</u> above the valley. | The valley <u>is</u> very wide.',
          demonstration: '"soared" — can I picture the hawk doing this? Yes! Action verb. "is" — is the valley doing anything? Not really — it describes its state. State verb. State verbs often can\'t be continuous: you wouldn\'t say "the valley is being wide."',
          tip: 'Can you picture someone physically doing it? → Probably action. Does it describe a condition? → State.',
        },
        {
          title: 'We Do — Sort Them',
          instruction: 'Let\'s sort these verbs and sentences into action or state, then discuss why.',
          sentences: [
            'The students <u>sprinted</u> to the finish line.',
            'This soup <u>smells</u> incredible.',
            'She <u>believes</u> in always trying her best.',
            'The puppy <u>chewed</u> through the shoe.',
          ],
          prompt: 'Action or state? Could you say "is ___-ing"? Would that sound strange?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Label each underlined verb as ACTION or STATE. Then write one sentence for each type.',
          tasks: [
            'The river <u>rushes</u> over the boulders in winter.',
            'My grandmother <u>owns</u> a beautiful garden.',
            'He <u>remembers</u> every goal he ever scored.',
            'The children <u>splashed</u> through the puddles.',
            '✦ Bonus: Write a sentence that has BOTH an action verb and a state verb.',
          ],
        }
      ),
      Wednesday: lesson(
        'Expanding simple sentences with adjectives',
        'Add detail to sentences',
        {
          title: 'I Do — Dress Up Your Sentences',
          instruction: 'A simple sentence is fine, but adjectives add colour and detail. Watch how I take a bare sentence and expand it by adding adjectives before nouns.',
          example: 'Before: A dog barked at the stranger. → After: A <u>scruffy, brown</u> dog barked at the <u>hooded</u> stranger.',
          demonstration: 'I ask: What kind of dog? → scruffy, brown. What kind of stranger? → hooded. I add them before the nouns. Notice I used a comma between two adjectives describing the same noun (scruffy, brown). But "hooded" is alone so no comma needed.',
          tip: 'Ask "what kind?" or "which one?" before each noun to find adjective spots.',
        },
        {
          title: 'We Do — Expand Together',
          instruction: 'Let\'s expand these simple sentences by adding at least one adjective to each noun. Call out your ideas!',
          sentences: [
            'The cat sat on the wall.',
            'A boat moved through the water.',
            'The girl opened the door.',
          ],
          prompt: 'What adjectives could we add? Where exactly in the sentence do they go?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Expand each sentence by adding at least two adjectives. You can also add adjectives to the verb (adverbs) as a bonus challenge.',
          tasks: [
            'The horse galloped across the field.',
            'A bird landed on the fence.',
            'The student opened the book.',
            '✦ Bonus: Write your own expanded sentence about a place you know, using at least 3 adjectives.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: fixing run-on sentences',
        'Revise for sentence clarity',
        {
          title: 'I Do — Taming the Run-On',
          instruction: 'A run-on sentence is when two or more complete sentences crash together without proper punctuation. Watch me find and fix one.',
          example: 'The rain hammered the roof the windows rattled and the lights flickered on and off everyone ran inside.',
          demonstration: 'I read slowly. "The rain hammered the roof" — full thought. Full stop! "the windows rattled and the lights flickered on and off" — I could keep this as one sentence since "and" joins related ideas. Full stop! "everyone ran inside." — done. Result: Three clear sentences.',
          tip: 'Say each sentence aloud. If you run out of breath before a pause, it\'s probably too long.',
        },
        {
          title: 'We Do — Fix the Run-Ons',
          instruction: 'Let\'s work through these run-on sentences together. Decide where to split them or what joining word to use.',
          sentences: [
            'Sophia loved drawing she spent every afternoon filling sketchbooks with dragons and stars her mum often had to call her in for dinner.',
            'The match was tied with five minutes left the striker broke free she shot the ball it curved into the top corner the crowd erupted.',
          ],
          prompt: 'Where do the natural pauses fall? Should we split with a full stop, or join with "and/but/so"?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each run-on as two or three clear sentences. Choose the best punctuation or joining word.',
          tasks: [
            'My dog loves the park he chases every stick he also tries to swim in the fountain the ranger always laughs.',
            'The volcano had been quiet for years then one morning smoke rose from the crater by afternoon it was glowing red scientists rushed to the site.',
            '✦ Bonus: Write a paragraph of 3 sentences on any topic — no run-ons allowed!',
          ],
        }
      ),
    },

    3: {
      Monday: lesson(
        'Synonyms: choosing stronger words',
        'Expand vocabulary range',
        {
          title: 'I Do — Level Up Your Words',
          instruction: 'Synonyms are words with similar meanings — but they\'re not identical. Choosing the right synonym can completely change the feel of your writing. Watch me use a synonym scale.',
          example: 'cold → chilly → freezing → glacial → arctic',
          demonstration: 'All mean "cold" — but they get more intense. "The water was cold" is fine. "The water was glacial" paints a sharper picture. I match the word to the intensity of what I\'m describing. A slightly cool breeze is "chilly." A swimming hole in winter is "glacial."',
          tip: 'Think: Is this word strong enough for what I\'m describing, or do I need to turn up the dial?',
        },
        {
          title: 'We Do — Synonym Scales',
          instruction: 'Let\'s build synonym scales for these words together, then choose the best one for each sentence.',
          sentences: [
            'HAPPY → (let\'s find 4 synonyms, from mild to intense)',
            'MOVE → (find synonyms that show different kinds of movement)',
            '"She was <u>happy</u> when she won the prize." → Which synonym fits best?',
          ],
          prompt: 'Why would you choose "elated" over "pleased" in some sentences but not others?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Replace the plain word in each sentence with a stronger synonym. Then create your own synonym scale for the word "said."',
          tasks: [
            'The athlete was <u>tired</u> after the marathon.',
            'It was a <u>good</u> book — I finished it in one day.',
            'The crowd was <u>loud</u> when the team scored.',
            '✦ Bonus: Build a synonym scale for "said" with at least 6 words. Which would you use in a mystery story? A speech? An argument?',
          ],
        }
      ),
      Tuesday: lesson(
        'Subject-verb agreement (singular/plural)',
        'Apply grammar rules',
        {
          title: 'I Do — Subjects & Verbs Must Match',
          instruction: 'The subject and verb in a sentence must agree in number. Singular subject = singular verb. Plural subject = plural verb. Watch how I check the match.',
          example: 'The dog <u>barks</u>. ✓ | The dogs <u>bark</u>. ✓ | The dogs <u>barks</u>. ✗',
          demonstration: 'I find the subject first: "the dogs" — plural. Now the verb: "barks" — singular (the -s gives it away). They don\'t match! Fix: "bark." Rule: when the subject has an -s (plural), the verb usually doesn\'t, and vice versa.',
          tip: 'Cross out any words between subject and verb — they can trick you. "The group of students [are/is]..." → subject is "group" (singular) → "is."',
        },
        {
          title: 'We Do — Match the Verb',
          instruction: 'Choose the correct verb form for each sentence and explain why.',
          sentences: [
            'The bunch of grapes (was / were) left on the bench.',
            'Her three brothers (play / plays) for the same rugby team.',
            'Everyone in the class (know / knows) the answer.',
          ],
          prompt: 'What is the true subject? Is it singular or plural?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Circle the correct verb form and rewrite the sentences.',
          tasks: [
            'The flock of birds (move / moves) south in winter.',
            'My best friend and I (love / loves) going to the movies.',
            'Each of the sandwiches (need / needs) a label.',
            'The team (was / were) celebrating their win on the field.',
            '✦ Bonus: Write two tricky subject-verb sentences for a partner to solve.',
          ],
        }
      ),
      Wednesday: lesson(
        "Compound sentences using 'and', 'but', 'so'",
        'Use conjunctions to join ideas',
        {
          title: 'I Do — Join Two Ideas Together',
          instruction: 'A compound sentence joins two simple sentences using a coordinating conjunction: "and" (adds), "but" (contrasts), "so" (shows result). Watch me join two short sentences into one smooth compound sentence.',
          example: 'The bell rang. The students rushed outside. → The bell rang, <u>and</u> the students rushed outside.',
          demonstration: 'I put a comma before the conjunction when joining two full sentences. Let me try "but": "I wanted to go swimming, <u>but</u> the pool was closed." And "so": "It was raining heavily, <u>so</u> we moved the game inside." Each conjunction gives a different meaning!',
          tip: 'Remember the comma before the conjunction when joining two complete sentences.',
        },
        {
          title: 'We Do — Join the Pairs',
          instruction: 'Join these pairs of sentences using "and," "but," or "so." Discuss which conjunction fits best and why.',
          sentences: [
            'She studied all weekend. She still felt nervous about the test.',
            'The campfire burned brightly. Everyone gathered around it.',
            'Jake forgot his lunch. His friend shared her sandwich with him.',
          ],
          prompt: 'Why does "but" work better than "and" in the first one? Where does the comma go?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Join each pair of sentences with the best conjunction (and/but/so). Remember your comma!',
          tasks: [
            'The explorers were exhausted. They pushed on through the jungle.',
            'The dog dug a hole under the fence. It escaped into the neighbour\'s garden.',
            'She practised every day. She became the best swimmer in her school.',
            '✦ Bonus: Write three compound sentences about your last school holiday — use "and" once, "but" once, and "so" once.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: identifying vague words & upgrading them',
        'Improve word choice in own writing',
        {
          title: 'I Do — Hunt the Vague Words',
          instruction: 'Vague words are words so overused they\'ve lost their meaning: nice, good, bad, big, small, went, said, things, got. Watch me find them in this passage and replace them with precise language.',
          example: 'It was a nice day and we went to a nice beach. The water was nice and cold and we had a good time.',
          demonstration: 'I underline every vague word: nice (×3), went, good. Now I replace: "It was a <u>golden, windless</u> day and we <u>drove</u> to <u>a sparkling</u> beach. The water was <u>refreshingly</u> cold and we had a <u>brilliant</u> time." Far more vivid!',
          tip: 'After writing, circle every "nice," "good," "went," "said," "got" and challenge yourself to upgrade at least half of them.',
        },
        {
          title: 'We Do — Upgrade the Passage',
          instruction: 'Let\'s find and replace all the vague words in this passage together.',
          sentences: [
            'The big dog got up and went to the door. It made a loud noise and looked at us. We thought it was a good dog but it was a bit scary. Then things got better when its owner came.',
          ],
          prompt: 'Which words can we upgrade? What more precise/vivid option works in each spot?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this passage by replacing every underlined vague word with a more precise one.',
          tasks: [
            'The <u>nice</u> teacher <u>said</u> that our project was <u>good</u>. We had worked on it for a long time and <u>got</u> everything ready the night before. The <u>big</u> display looked <u>great</u> and all our <u>stuff</u> was neatly arranged.',
            '✦ Bonus: Pull out your last piece of writing and hunt for three vague words to upgrade.',
          ],
        }
      ),
    },

    4: {
      Monday: lesson(
        "Apostrophes for possession",
        'Punctuate possession correctly',
        {
          title: "I Do — Who Does It Belong To?",
          instruction: "An apostrophe + s ('s) shows that something belongs to someone. If the owner is singular, add 's. If the owner is plural and already ends in s, just add the apostrophe after: s'.",
          example: "Singular: the <u>cat's</u> collar | Plural: the <u>cats'</u> collars",
          demonstration: "One cat owns the collar → cat's (apostrophe before s). Multiple cats own collars → cats' (apostrophe after s). The trick: find the owner first. 'The collar belonging to the cat' = cat → cat's. 'The collars belonging to the cats' = cats → cats'.",
          tip: "Find the owner. If singular → add 's. If plural ending in s → add just '.",
        },
        {
          title: "We Do — Find the Owner",
          instruction: "Let's rewrite these 'belonging' phrases using apostrophes, and sort them into singular vs. plural owner.",
          sentences: [
            "The jersey belonging to the player → ___",
            "The homework belonging to the students → ___",
            "The beak belonging to the parrot → ___",
          ],
          prompt: "Who is the owner? How many owners are there? Where does the apostrophe go?",
        },
        {
          title: "You Do — Your Turn",
          instruction: "Rewrite each phrase using an apostrophe to show possession.",
          tasks: [
            "The den belonging to the fox → ___",
            "The shoes belonging to the dancers → ___",
            "The medal belonging to the swimmer → ___",
            "The nests belonging to the birds → ___",
            "✦ Bonus: Write four sentences about things you can see in the classroom using possessive apostrophes.",
          ],
        }
      ),
      Tuesday: lesson(
        'Pronouns: personal & possessive',
        'Use pronouns accurately',
        {
          title: 'I Do — Standing In for Nouns',
          instruction: 'Pronouns replace nouns so we don\'t repeat the same word over and over. Personal pronouns (I, you, he, she, it, we, they) and possessive pronouns (my, your, his, her, its, our, their) are the most common. Watch me substitute them in.',
          example: 'Maya left Maya\'s bag on Maya\'s seat when Maya went outside.',
          demonstration: 'This sounds clunky! Replace: "Maya left <u>her</u> bag on <u>her</u> seat when <u>she</u> went outside." The pronoun "her" replaces "Maya\'s" (possessive). "she" replaces "Maya" (personal). Much smoother!',
          tip: 'Make sure your pronoun clearly refers back to the right noun — if there are two possible people, the reader gets confused.',
        },
        {
          title: 'We Do — Swap the Repeated Nouns',
          instruction: 'Replace the repeated nouns with the correct pronouns.',
          sentences: [
            'The team trained hard. The team wanted the team\'s season to be the team\'s best ever.',
            'Tom and Sarah arrived early. Tom and Sarah set up Tom and Sarah\'s stall at the market.',
          ],
          prompt: 'What pronoun replaces "the team"? What about "Tom and Sarah"? Which is possessive?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence replacing the repeated nouns with correct personal or possessive pronouns.',
          tasks: [
            'The explorer found the explorer\'s compass in the explorer\'s coat pocket.',
            'The dolphins leaped out of the water. The dolphins seemed to enjoy the dolphins\' freedom.',
            'Lily and Ben packed Lily and Ben\'s bags. Lily and Ben left early for Lily and Ben\'s trip.',
            '✦ Bonus: Write a paragraph where you use at least 4 different pronouns correctly.',
          ],
        }
      ),
      Wednesday: lesson(
        'Writing topic sentences for paragraphs',
        'Structure paragraphs with clear topic sentences',
        {
          title: 'I Do — The Anchor Sentence',
          instruction: 'A topic sentence is the first sentence of a paragraph. It tells the reader the main idea. All the other sentences in the paragraph support or explain it. Watch me write one.',
          example: 'Topic: Why exercise is important → Topic sentence: "Exercise is one of the most important habits a person can build for a healthy life."',
          demonstration: 'My topic sentence: (1) introduces the topic, (2) gives the writer\'s angle on it (not just "exercise is good" — too vague). The sentences that follow will each give a reason or example to support "one of the most important habits." I won\'t switch to a new topic mid-paragraph.',
          tip: 'Test your topic sentence: could every other sentence in your paragraph be "evidence" for it? If yes — it works!',
        },
        {
          title: 'We Do — Match & Write',
          instruction: 'Match each topic sentence to the paragraph that fits it best. Then write a topic sentence for an unpaired paragraph.',
          sentences: [
            'Topic sentence A: "Dogs make loyal and loving companions for all ages."',
            'Topic sentence B: "The rainforest is home to an astonishing variety of wildlife."',
            'Paragraph without a topic sentence: "...Thousands of species of insects live under its canopy. Brightly coloured frogs cling to leaves, and jaguars prowl silently below. Even the trees themselves host miniature ecosystems..."',
          ],
          prompt: 'Which topic sentence fits the mystery paragraph? What clues told you?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a strong topic sentence for each group of supporting sentences.',
          tasks: [
            'Supporting sentences: "First, it keeps your heart strong. It also helps you sleep better and boosts your mood. Even a short walk each day makes a difference."',
            'Supporting sentences: "Rubbish can entangle sea turtles and birds. Plastic bags are mistaken for jellyfish by whales. Tiny particles enter the food chain through fish."',
            '✦ Bonus: Write a full paragraph of 4 sentences: topic sentence + 3 supports, on a topic of your choice.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: checking pronoun-antecedent agreement',
        'Revise for clarity and consistency',
        {
          title: 'I Do — Does the Pronoun Match?',
          instruction: 'A pronoun must agree with its antecedent (the noun it replaces) in number and gender. Singular noun → singular pronoun. Plural noun → plural pronoun. Watch me find and fix the mismatches.',
          example: 'The team picked up their trophy. ✗ → The team picked up <u>its</u> trophy. ✓',
          demonstration: '"The team" is singular (one team) so the pronoun should be "its" not "their." Now: "Each student brought their lunch." Here "each student" is singular, so technically "his or her lunch" — but in modern usage "their" is widely accepted for singular subjects. Context matters!',
          tip: 'Find the noun the pronoun replaces. Count it: one → singular pronoun, many → plural.',
        },
        {
          title: 'We Do — Spot & Fix',
          instruction: 'Find and fix the pronoun agreement errors in these sentences.',
          sentences: [
            'Every player gave their best, but the team lost their match in the final minute.',
            'The flock of geese spread their wings and took off across the lake.',
            'Anyone who finishes early can bring their book to reading corner.',
          ],
          prompt: 'What is the antecedent? Is it singular or plural? Does the pronoun match?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Fix any pronoun agreement errors. Write "correct" if there is no error.',
          tasks: [
            'The committee made their decision before the deadline.',
            'Each of the birds had lost their feathers in the storm.',
            'Neither of the girls wanted to give up their spot in the team.',
            '✦ Bonus: Write a paragraph about a sports team. Use at least 3 different pronouns correctly — and then swap with a partner to check.',
          ],
        }
      ),
    },

    5: {
      Monday: lesson(
        'Exclamation marks & question marks – when & why',
        'Vary sentence punctuation',
        {
          title: 'I Do — The Right Ending',
          instruction: 'Every sentence ends with a full stop, question mark, or exclamation mark. The wrong choice changes the reader\'s experience completely. Watch me demonstrate why the ending matters.',
          example: '"Come back." vs "Come back!" vs "Will you come back?"',
          demonstration: '"Come back." — a calm instruction. "Come back!" — urgent, emotional, even desperate. "Will you come back?" — a genuine question, uncertain. The same two words — completely different meanings from punctuation alone. Exclamation marks are powerful, so use them sparingly or they lose impact.',
          tip: 'Ask yourself: Am I expressing strong emotion or urgency? → ! | Am I asking a genuine question? → ? | Everything else → .',
        },
        {
          title: 'We Do — Choose the Right Mark',
          instruction: 'Add the correct end punctuation and explain your choice.',
          sentences: [
            'How did the magician make the coin disappear',
            'Watch out for the wave behind you',
            'The library opens at nine o\'clock every morning',
          ],
          prompt: 'What emotion or purpose is in each sentence? Would a different mark change the meaning?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add the correct end punctuation to each sentence and write a short explanation of your choice.',
          tasks: [
            'Did you hear that noise in the middle of the night',
            'Never open that door again',
            'The museum was closed on the day we planned to visit',
            'I can\'t believe we actually won',
            '✦ Bonus: Write one sentence where changing the end mark completely changes the meaning. Share with a partner.',
          ],
        }
      ),
      Tuesday: lesson(
        'Adjectives: degrees of comparison (er/est/more/most)',
        'Use comparative language',
        {
          title: 'I Do — Comparing with Adjectives',
          instruction: 'We use comparative adjectives to compare two things, and superlatives to compare three or more. Short adjectives add -er/-est. Longer adjectives use more/most. Watch me form them.',
          example: 'fast → faster (comparative) → fastest (superlative)\nbeautiful → more beautiful → most beautiful',
          demonstration: 'Rule: 1–2 syllable adjectives → -er/-est: tall/taller/tallest. 3+ syllable adjectives → more/most: exciting/more exciting/most exciting. Exceptions: good/better/best, bad/worse/worst, far/further/furthest.',
          tip: 'Try adding -er: if it sounds natural, use it. If it sounds awkward (intelligenter?), use "more."',
        },
        {
          title: 'We Do — Form the Comparatives',
          instruction: 'Form the comparative and superlative of each adjective and use each in a sentence.',
          sentences: [
            'cold → ___ → ___',
            'dangerous → ___ → ___',
            'good → ___ → ___',
          ],
          prompt: 'Which rule applies? Are there any exceptions here? Can you use each in an example sentence?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Complete the comparison chart and then write sentences using the correct form.',
          tasks: [
            'happy → ___ → ___  |  Use "happiest" in a sentence.',
            'mysterious → ___ → ___  |  Use "more mysterious" in a sentence.',
            'bad → ___ → ___  |  Use "worst" in a sentence.',
            '✦ Bonus: Write a paragraph comparing two animals you know, using at least four comparative or superlative adjectives.',
          ],
        }
      ),
      Wednesday: lesson(
        'Sentence variety: short vs. long sentences',
        'Control sentence rhythm',
        {
          title: 'I Do — Playing with Rhythm',
          instruction: 'Good writers vary their sentence length on purpose. Short sentences create tension and punch. Long sentences slow the pace and build atmosphere. Watch how I mix them for effect.',
          example: 'Long only: "As the fog rolled silently in off the sea and crept through the narrow streets, wrapping itself around the lampposts and filling every doorway with a pale grey shadow, she stood completely still and listened to the sound of the city slowly disappearing." → Too slow.',
          demonstration: 'Now watch: "The fog rolled in. It crept through the streets, wrapping itself around lampposts, filling every doorway. She stood still. Listened. The city was disappearing." The short sentences (She stood still. Listened.) hit hard. The long one builds atmosphere. Mixing them creates rhythm.',
          tip: 'Read your writing aloud. Does it have a beat — fast/slow/fast? If everything is the same length, vary it.',
        },
        {
          title: 'We Do — Mix It Up',
          instruction: 'This passage has all long sentences. Let\'s break some up to create rhythm together.',
          sentences: [
            'The ancient lighthouse had stood on the cliff for over two hundred years and had guided thousands of ships safely past the rocks and through the treacherous harbour entrance in every kind of weather imaginable. It had survived storms and earthquakes and the battering of winter waves and still it stood, its light still turning, still warning, still saving lives that would otherwise have been lost to the sea.',
          ],
          prompt: 'Where could we cut for impact? Which short sentence would create the most drama?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this all-short paragraph by combining some sentences into longer ones, while keeping 1–2 short ones for effect.',
          tasks: [
            'The fire started. It spread fast. Smoke filled the hall. People ran. They called for help. The engines arrived. The firefighters moved quickly. They brought it under control.',
            '✦ Bonus: Write 6 sentences about a storm — 2 short, 2 medium, 2 long. Read them aloud to check the rhythm.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: peer-checking capitals & punctuation',
        'Collaborative editing practice',
        {
          title: 'I Do — Using an Editing Checklist',
          instruction: 'Professional editors use checklists so they don\'t miss anything. Watch me use our class punctuation checklist on a short passage — I\'ll mark each issue as I find it.',
          example: 'checklist: ☐ Capital at start of every sentence ☐ Full stop/!/? at end ☐ Commas in lists ☐ Proper nouns capitalised ☐ Apostrophes correct',
          demonstration: 'I read the passage once just to understand it. Then I go through with the checklist — one check at a time. I mark issues with a light pencil. I explain why each fix is needed, not just what to change.',
          tip: 'Never try to check everything at once — work through one rule at a time on separate read-throughs.',
        },
        {
          title: 'We Do — Peer Edit in Pairs',
          instruction: 'With your partner, use the checklist to edit this passage. One person checks capitals; the other checks full stops and commas.',
          sentences: [
            'last thursday, mr. tane\'s class visited te papa museum in wellington. the students saw a giant squid a huge whale skeleton and many taonga from around new zealand. aisha\'s favourite exhibit was the earthquake house she said "it felt so real." everyone agreed it was an amazing trip',
          ],
          prompt: 'What did you each find? Did you agree on every correction? Compare notes.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Edit this passage alone using the full checklist. Mark and rewrite all corrections.',
          tasks: [
            'on saturday morning, emma and her brother luca decided to bake a chocolate cake. they found flour eggs butter sugar and cocoa in the cupboard. the recipe was easy but luca forgot to add the baking powder. the cake came out flat and dense but mum said it still tasted delicious. emma said "next time i\'m doing it on my own"',
            '✦ Bonus: Swap with a partner and compare corrections. Discuss any differences.',
          ],
        }
      ),
    },

    6: {
      Monday: lesson(
        'Word families – roots, prefixes, suffixes',
        'Build vocabulary through word study',
        {
          title: 'I Do — Words Are Built from Parts',
          instruction: 'Most English words are built from parts: a root (the core meaning), a prefix (added to the front), and/or a suffix (added to the end). Knowing the parts unlocks the meaning of unknown words. Watch me break one apart.',
          example: 'unhappiness → un- (not) + happy (root) + -ness (state of being) = "the state of not being happy"',
          demonstration: 'Let me try "prehistoric": pre- (before) + historic (relating to history) = "before recorded history." Now "transportation": trans- (across) + port (carry) + -ation (process) = "the process of carrying things across." Once you know common roots, you can work out hundreds of words!',
          tip: 'Common roots to remember: port (carry), rupt (break), vis (see), struct (build), dict (say), graph (write).',
        },
        {
          title: 'We Do — Break Them Down',
          instruction: 'Let\'s pull apart these words using our knowledge of prefixes, roots, and suffixes. What does each part tell us?',
          sentences: [
            'impossible → ___ + ___ = meaning?',
            'prediction → ___ + ___ + ___ = meaning?',
            'exportable → ___ + ___ + ___ = meaning?',
          ],
          prompt: 'How does knowing the prefix "im-" help you with impossible, impolite, impractical?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Break apart each word into its prefix/root/suffix. Write the meaning of each part, then the whole word.',
          tasks: [
            'invisible → ',
            'reconstruct → ',
            'disagreement → ',
            'photography → ',
            '✦ Bonus: Use your knowledge of "port" (carry) to work out: import, export, portable, transport, reporter.',
          ],
        }
      ),
      Tuesday: lesson(
        'Adverbs: how, when, where',
        'Modify verbs with adverbs',
        {
          title: 'I Do — Adverbs Tell Us More',
          instruction: 'Adverbs modify (add information to) verbs, adjectives, or other adverbs. They answer How? When? Where? and To what extent? Watch me add adverbs to upgrade a simple sentence.',
          example: 'The explorer walked. → The explorer walked <u>cautiously</u> (how) <u>forward</u> (where) <u>yesterday</u> (when).',
          demonstration: 'I add them one at a time and notice how each one changes the meaning. How? → cautiously (tells us the manner). Where? → forward (tells us direction). When? → yesterday (tells us time). I can layer adverbs, but I should be selective — too many and the sentence becomes clunky.',
          tip: 'Adverbs of manner often end in -ly (quickly, silently) — but not always (fast, hard, late).',
        },
        {
          title: 'We Do — Add the Right Adverb',
          instruction: 'Add an adverb (how/when/where) to each sentence and label what type it is.',
          sentences: [
            'The hawk circled ___.',
            '___ the team gathered for their final practice.',
            'She whispered ___ so no one would hear.',
          ],
          prompt: 'What question does your adverb answer? Could you add a second adverb of a different type?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add one adverb of each type (how/when/where) to the sentence. Then write your own sentence using all three types.',
          tasks: [
            'The scientist worked ___ (how) ___ (when) ___ (where) to find an answer.',
            'Add how, when, where: "The wolves hunted."',
            '✦ Bonus: Find three adverbs in a book you\'re reading. Write which verb each modifies and what question it answers.',
          ],
        }
      ),
      Wednesday: lesson(
        "Adding detail with 'who', 'where', 'when' phrases",
        'Expand sentences purposefully',
        {
          title: "I Do — Dress the Sentence Up",
          instruction: "A bare sentence tells us the basics. Adding WHO/WHERE/WHEN phrases gives the reader a full picture. Watch me build one sentence three ways.",
          example: "Base: The girl read a book. → + WHERE: The girl read a book in the shade of an old oak tree. → + WHO: The girl, who had borrowed it from the library that morning, read a book in the shade. → + WHEN: Just as the sun peaked at noon, the girl, who had borrowed it that morning, read a book in the shade.",
          demonstration: "Each phrase layers in more context. The reader can now picture the scene, the person, and the moment. I don't have to add all three — I choose the ones that matter most for the story.",
          tip: "Ask: does my reader know enough to picture this? If not, add one specific WHERE, WHO, or WHEN phrase.",
        },
        {
          title: "We Do — Layer the Detail",
          instruction: "Let's expand these sentences together by adding a who, where, and when phrase.",
          sentences: [
            "The dog barked.",
            "A boat drifted.",
            "The children cheered.",
          ],
          prompt: "Which detail matters most for each sentence? Does every detail need to be there, or can we cut one?",
        },
        {
          title: "You Do — Your Turn",
          instruction: "Expand each sentence by adding at least two detail phrases (who/where/when).",
          tasks: [
            "The door slammed.",
            "A light flickered.",
            "The crowd fell silent.",
            "✦ Bonus: Write an expanded sentence about a character arriving somewhere unexpected. Include who they are, where exactly they arrived, and when.",
          ],
        }
      ),
      Thursday: lesson(
        'Editing: tightening wordy sentences',
        'Revise for conciseness',
        {
          title: 'I Do — Cut the Fluff',
          instruction: 'Good writing is precise. Wordy sentences say in ten words what could be said in five. Watch me find and cut redundant words without losing meaning.',
          example: '"Due to the fact that it was raining, we decided to stay inside the house." → "Because it was raining, we stayed inside."',
          demonstration: '"Due to the fact that" = just "because." "decided to stay" = "stayed." "inside the house" = "inside" (where else would you stay?). I cut 13 words to 7 — same meaning, cleaner punch. Phrases to watch: "in order to" (→ "to"), "at this point in time" (→ "now"), "on a daily basis" (→ "daily").',
          tip: 'After writing a sentence, ask: can I cut any word without losing meaning? If yes — cut it.',
        },
        {
          title: 'We Do — Tighten Together',
          instruction: 'Rewrite these wordy sentences concisely. Count the words before and after.',
          sentences: [
            'The reason why the match was cancelled was due to the fact that the field was too wet.',
            'At this present moment in time, the students are in the process of completing their assignment.',
            'She made the decision to walk in the direction of the library in order to return the book.',
          ],
          prompt: 'Which words are doing real work? Which are filler? What is the minimum word count that keeps full meaning?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence as concisely as possible. Record the word count before and after.',
          tasks: [
            'In the event that the weather is bad, we will need to make the decision to move the event inside. (___→___words)',
            'He was a person who always showed a great deal of enthusiasm for all the different things that he was interested in. (___→___words)',
            '✦ Bonus: Take a paragraph you\'ve written recently and cut it by 20% — same meaning, fewer words.',
          ],
        }
      ),
    },

    7: {
      Monday: lesson(
        'Colons & semicolons – introduction',
        'Use higher-level punctuation',
        {
          title: 'I Do — Two Powerful Marks',
          instruction: 'A colon (:) introduces something — a list, an explanation, or a dramatic reveal. A semicolon (;) joins two closely related complete sentences without a conjunction. Watch me use both.',
          example: 'Colon: "She needed three things: courage, patience, and luck."\nSemicolon: "The sun set behind the hills; the valley grew cold."',
          demonstration: 'Colon: I use it after a complete sentence when what follows explains or lists. "She had one goal: to finish the race." Semicolon: Both sides must be complete sentences that are closely linked in meaning. "I love summer; the long evenings are my favourite part."',
          tip: 'Test the colon: could you put "namely" or "that is" there? Test the semicolon: are both halves complete sentences that relate to each other?',
        },
        {
          title: 'We Do — Colon or Semicolon?',
          instruction: 'Decide whether each gap needs a colon or semicolon and explain why.',
          sentences: [
            'The storm brought everything with it ___ rain, hail, thunder, and a biting wind.',
            'She loved the city ___ she had lived there all her life.',
            'He only had one request ___ please don\'t wake him before 8 o\'clock.',
          ],
          prompt: 'Does what follows LIST or EXPLAIN? Or are you joining two complete ideas? That tells you which to use.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add a colon or semicolon to each sentence and write a brief reason for your choice.',
          tasks: [
            'The menu offered four choices pizza, pasta, salad, and soup.',
            'The hike was long and exhausting the view from the summit was worth every step.',
            'She packed everything she would need a torch, a map, a compass, and enough food for two days.',
            '✦ Bonus: Write two of your own sentences — one using a colon correctly, one using a semicolon correctly.',
          ],
        }
      ),
      Tuesday: lesson(
        'Tense consistency: simple past & present',
        'Maintain tense throughout writing',
        {
          title: 'I Do — Pick a Tense and Stay There',
          instruction: 'When you write a story or recount, you choose a tense — usually past or present — and stay in it the whole way through. Switching tenses mid-passage confuses the reader. Watch me spot and fix a tense switch.',
          example: 'Past: "The knight rode into the village. He looks around nervously. The villagers gathered in the square."',
          demonstration: '"rode" — past. "looks" — suddenly present! "gathered" — back to past. The switch makes the reader stumble. Fix: "The knight rode into the village. He looked around nervously. The villagers gathered in the square." — all past. Or I could rewrite all in present: "The knight rides... He looks... The villagers gather..." — both are valid, just choose one.',
          tip: 'Circle all your verbs. Are they all the same tense? If not, decide which tense your piece should be in and adjust.',
        },
        {
          title: 'We Do — Spot the Switches',
          instruction: 'Find and fix all tense inconsistencies in this passage. Rewrite it in consistent simple past.',
          sentences: [
            'The young inventor enters her workshop at dawn. She had spent months designing the machine. She checks each part carefully and placed the final gear. The machine starts to hum. It worked.',
          ],
          prompt: 'Which verbs are in the wrong tense? Rewrite in consistent past tense.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite the passage in consistent simple present tense. Then identify and fix the errors.',
          tasks: [
            'Rewrite in present tense: "The geologist climbed the rocky slope. She examined the layers of sediment. Each layer told a story about the earth\'s past. She makes careful notes and photographs each formation."',
            '✦ Bonus: Write an 8-sentence recount (any topic) in consistent simple past tense. Swap with a partner to check.',
          ],
        }
      ),
      Wednesday: lesson(
        'Complex sentences: main + subordinate clause',
        'Use subordinating conjunctions',
        {
          title: 'I Do — The Main Idea + Extra Detail',
          instruction: 'A complex sentence has a main clause (complete thought) and a subordinate clause (depends on the main clause for meaning). They are joined by a subordinating conjunction: because, although, when, if, since, while, unless, after, before. Watch me build one.',
          example: 'Main clause: "The crowd cheered." + Subordinating conjunction: "when" + Subordinate clause: "the final whistle blew." → "The crowd cheered when the final whistle blew."',
          demonstration: 'I can also flip it — subordinate clause first: "When the final whistle blew, the crowd cheered." Notice: when the subordinate clause comes first, I add a comma after it. When it comes second, no comma needed.',
          tip: 'If you start with the subordinate clause, use a comma after it. Starter at the end? No comma.',
        },
        {
          title: 'We Do — Build the Complex Sentence',
          instruction: 'Join these pairs into complex sentences using an appropriate subordinating conjunction. Try putting the subordinate clause at the start in one version and at the end in another.',
          sentences: [
            'She missed the bus. She left the house late.',
            'The crops failed. The summer was unusually dry.',
          ],
          prompt: 'Which conjunction fits? Does the meaning change if we swap the clause order? Where does the comma go?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write complex sentences using the given conjunction. Try one with the subordinate clause first, one with it second.',
          tasks: [
            'Use "although": ___ (subordinate clause first, with comma)',
            'Use "because": ___ (subordinate clause second, no comma)',
            'Use "unless": ___ (your choice of order)',
            '✦ Bonus: Find three complex sentences in a book you\'re reading. Identify the main clause and subordinate clause in each.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: checking tense consistency in a passage',
        'Revise for tense accuracy',
        {
          title: 'I Do — The Tense Audit',
          instruction: 'I\'ll show you a systematic way to check tense in a piece of writing. I underline every verb, then check that they\'re all in the same tense.',
          example: 'Step 1: Underline all verbs. Step 2: Label each P (past) or Pr (present). Step 3: Decide which tense the piece should be. Step 4: Fix mismatches.',
          demonstration: '"The explorer sets out at dawn. She walked for three hours before she reaches the ridge." — sets (Pr), walked (P), reaches (Pr). Two present, one past. I decide: past tense works better for a recount. Fix: "The explorer set out at dawn. She walked for three hours before she reached the ridge."',
          tip: 'Be especially careful with "was/is" and "said/says" — these are the most common accidental switches.',
        },
        {
          title: 'We Do — Tense Audit Together',
          instruction: 'Let\'s audit this passage together. Underline every verb, label its tense, then rewrite it in consistent past tense.',
          sentences: [
            'The market is busy on Saturday mornings. Stalls lined both sides of the street. Vendors called out their prices. The smell of fresh bread drifted through the air. Families stopped to chat and children ran between the stalls. It felt like the whole town was there.',
          ],
          prompt: 'Which verbs switch tense? What is the most common tense here? Rewrite consistently.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Underline all verbs in this passage, label each one P or Pr, then rewrite it in consistent past tense.',
          tasks: [
            'The diver slips below the surface. The water was cold and very clear. She searches for the wreck that locals told her about. After ten minutes, she spots a shadow on the seabed. She swam closer and felt her heart race.',
            '✦ Bonus: Take a piece of your own writing and do a full tense audit on it. Note how many switches you find.',
          ],
        }
      ),
    },

    8: {
      Monday: lesson(
        'Homophones & commonly confused words',
        'Spell correctly in context',
        {
          title: 'I Do — Same Sound, Different Meaning',
          instruction: 'Homophones sound the same but have different spellings and meanings. Spellcheck won\'t catch these — you have to know them! Watch me use context to choose the right one.',
          example: 'there / their / they\'re | to / too / two | your / you\'re',
          demonstration: '"Put it over ___." — "there" (place). "It was ___ idea." — "their" (belonging to them). "___ late." — "they\'re" (they are). I always check: Does a pronoun meaning "they are" fit? → they\'re. Does "belonging to them" fit? → their. A place or pointing? → there.',
          tip: 'Expand contractions to check: "they\'re" = "they are." "you\'re" = "you are." If the expansion doesn\'t make sense — use the other spelling.',
        },
        {
          title: 'We Do — Choose Correctly',
          instruction: 'Choose the correct homophone for each gap and explain the rule that helped you.',
          sentences: [
            '___ going to need ___ bring ___ own gear. (they\'re/their/there | to/too/two)',
            'I don\'t know ___ ___ ready yet — ___ bags are still in the hall. (whether/weather | you\'re/your | they\'re/their/there)',
          ],
          prompt: 'Can you expand any of them? What meaning clue helped you choose?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Fill in the correct homophone. Write the rule you used in brackets.',
          tasks: [
            'We packed ___ bags the night before. (their/there/they\'re) [___]',
            'The ___ yesterday was cold and grey. (weather/whether) [___]',
            'I\'ve read this book ___ many times. (to/too/two) [___]',
            'I can\'t decide ___ to go or stay. (weather/whether) [___]',
            '✦ Bonus: Write four sentences of your own, each using a different homophone pair correctly.',
          ],
        }
      ),
      Tuesday: lesson(
        'Prepositional phrases',
        'Add location and time detail with prepositions',
        {
          title: 'I Do — Prepositions Set the Scene',
          instruction: 'A preposition shows a relationship between a noun and another part of the sentence — often location (in, on, under, beside, behind) or time (before, after, during, since). A prepositional phrase is a preposition + its noun phrase. Watch how it adds precision.',
          example: 'The cat slept. → The cat slept <u>on the warm windowsill</u>. → The cat slept <u>on the warm windowsill</u> <u>throughout the afternoon</u>.',
          demonstration: '"on the warm windowsill" = preposition (on) + noun phrase (the warm windowsill). It tells us WHERE. "throughout the afternoon" = preposition (throughout) + noun phrase (the afternoon). Tells us WHEN. I can stack them for a rich, detailed sentence.',
          tip: 'Prepositions are almost always followed by a noun phrase, never a verb.',
        },
        {
          title: 'We Do — Add the Phrase',
          instruction: 'Add a prepositional phrase (location, time, or both) to each sentence.',
          sentences: [
            'The scientist worked. → ___',
            'A small fire burned. → ___',
            'The children played. → ___',
          ],
          prompt: 'Where is the action happening? When? Can you add both a time and a place phrase?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Expand each sentence by adding at least two prepositional phrases.',
          tasks: [
            'The old man sat.',
            'A bird sang.',
            'The storm raged.',
            '✦ Bonus: Write a paragraph of 4 sentences about a place you know well, using at least one prepositional phrase in every sentence.',
          ],
        }
      ),
      Wednesday: lesson(
        'Fronted adverbials to vary sentence starts',
        'Vary sentence openings',
        {
          title: 'I Do — Don\'t Always Start with the Subject',
          instruction: 'Most sentences start with the subject (The dog / She / The team). But you can start with an adverbial phrase instead — this adds variety and can emphasise time, place, or manner. Watch me move the adverbial to the front.',
          example: 'Normal: "She packed her bag quickly before sunrise."\nFronted: "<u>Before sunrise</u>, she packed her bag quickly."',
          demonstration: '"Before sunrise" is the fronted adverbial — I moved it to the front and added a comma after it. This is the rule: fronted adverbials need a comma after them. The time/place/manner detail now hits the reader first, setting the scene before the action.',
          tip: 'After writing a sentence, ask: could I move the time/place/manner phrase to the front? Try it — see if it sounds stronger.',
        },
        {
          title: 'We Do — Move It to the Front',
          instruction: 'Rewrite each sentence with a fronted adverbial. Remember the comma!',
          sentences: [
            'The team celebrated their victory loudly after the final whistle.',
            'A vast flock of starlings moved through the valley at dusk.',
            'She slipped out of the house quietly at midnight.',
          ],
          prompt: 'What is the adverbial phrase? Where does the comma go? Does it change the emphasis?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence with a fronted adverbial, then write two original sentences that begin with a fronted adverbial.',
          tasks: [
            'The sailors battled the storm through the night.',
            'He suddenly stopped walking at the edge of the cliff.',
            'They arrived in the village on a cold November morning.',
            '✦ Bonus: Write a paragraph of 5 sentences. Make at least 3 of them start with a fronted adverbial.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: adding missing detail to bare sentences',
        'Elaborate through editing',
        {
          title: 'I Do — Bare Bones vs. Fully Dressed',
          instruction: 'A bare sentence gives the fact. A dressed sentence gives the experience. When editing, I look for sentences that tell me very little and add just enough detail to make them come alive. Watch me.',
          example: '"The man walked to the door." → "The elderly man shuffled to the creaking front door, pausing with his hand on the handle."',
          demonstration: 'I added: WHO more specifically (elderly man), HOW (shuffled), WHICH door (creaking front door), and a bonus action (pausing with his hand). I didn\'t overwrite — I added what matters. The reader can now see it.',
          tip: 'Ask bare sentences: WHO exactly? WHAT kind? HOW exactly? WHICH one? Add only what the reader needs to picture it.',
        },
        {
          title: 'We Do — Dress the Sentence',
          instruction: 'Together, let\'s add meaningful detail to these bare sentences. Ask WHO? WHAT kind? HOW?',
          sentences: [
            'A bird flew away.',
            'She opened the box.',
            'The car stopped.',
          ],
          prompt: 'What detail would create the most vivid picture? What detail is unnecessary?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Expand each bare sentence into a fully detailed one. Add detail that serves the story.',
          tasks: [
            'The dog barked.',
            'Rain fell.',
            'He laughed.',
            'She read the letter.',
            '✦ Bonus: Write a scene in 4 bare sentences. Then swap with a partner to dress each other\'s sentences up.',
          ],
        }
      ),
    },

    9: {
      Monday: lesson(
        'Onomatopoeia & sound words in writing',
        'Use language devices for effect',
        {
          title: 'I Do — Let the Words Make Sound',
          instruction: 'Onomatopoeia is when a word sounds like the thing it describes: crash, sizzle, whisper, gurgle. Using sound words makes writing come alive — readers don\'t just see the scene, they hear it. Watch me layer them in.',
          example: 'Without: "The kitchen was busy." → With: "Pots <u>clattered</u>, oil <u>sizzled</u> and somewhere above the noise a smoke alarm began to <u>shriek</u>."',
          demonstration: 'I chose sounds that belong to the kitchen — clattered (pots), sizzled (oil), shriek (alarm). Each sound word tells us something is happening AND what it sounds like. I don\'t need to say "there was a loud noise" — the word IS the noise.',
          tip: 'Think: what does this place/event actually sound like? Find the word that IS the sound.',
        },
        {
          title: 'We Do — Listen & Write',
          instruction: 'Let\'s brainstorm sound words for each setting, then build a sentence that uses at least two.',
          sentences: [
            'Setting: a beach at high tide',
            'Setting: a forest just after rain',
            'Setting: a crowded school cafeteria',
          ],
          prompt: 'What sounds would you hear? Which onomatopoeia words capture them best?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write 3 sentences, each using at least one onomatopoeia word. Set each in a different place.',
          tasks: [
            'Sentence 1 — setting: a thunderstorm.',
            'Sentence 2 — setting: a building site.',
            'Sentence 3 — setting: a night in the bush.',
            '✦ Bonus: Write a 4-sentence paragraph about any noisy event. Use at least 4 onomatopoeia words, but don\'t make them feel forced.',
          ],
        }
      ),
      Tuesday: lesson(
        'Conjunctions: coordinating vs. subordinating',
        'Understand conjunction types',
        {
          title: 'I Do — Two Kinds of Joiners',
          instruction: 'Coordinating conjunctions (FANBOYS: For, And, Nor, But, Or, Yet, So) join two equal, independent clauses. Subordinating conjunctions (because, although, when, if, since, while, unless…) create a dependent clause — one that can\'t stand alone. Watch the difference.',
          example: 'Coordinating: "She ran fast, <u>but</u> she missed the bus." | Subordinating: "She missed the bus <u>because</u> she ran too late."',
          demonstration: 'In the coordinating example, both halves are complete sentences joined as equals with a comma + "but." In the subordinating example, "because she ran too late" can\'t stand alone — it depends on the main clause. The meaning shifts: one shows contrast, one shows cause.',
          tip: 'FANBOYS = coordinating (join equals). Because/although/when/if = subordinating (create dependence).',
        },
        {
          title: 'We Do — Sort & Identify',
          instruction: 'Label each conjunction as CO (coordinating) or SUB (subordinating) and explain how it affects meaning.',
          sentences: [
            'He trained every day, <u>yet</u> he failed to make the team.',
            'The game was cancelled <u>because</u> the field was flooded.',
            '<u>Although</u> the climb was steep, they reached the summit by noon.',
          ],
          prompt: 'Could the underlined part stand alone? Does it show a relationship (cause/contrast/condition)?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Fill in the best conjunction and label it CO or SUB.',
          tasks: [
            'She wanted to stay home, ___ the trip sounded too exciting to miss. (CO/SUB)',
            'They could not leave ___ the storm passed. (CO/SUB)',
            'The museum was old, ___ the exhibits were modern and interactive. (CO/SUB)',
            '✦ Bonus: Write 4 sentences about a challenge you overcame — use two coordinating and two subordinating conjunctions.',
          ],
        }
      ),
      Wednesday: lesson(
        'Paragraph cohesion – linking sentences',
        'Connect ideas within paragraphs',
        {
          title: 'I Do — Making Paragraphs Flow',
          instruction: 'A cohesive paragraph doesn\'t just put sentences next to each other — it connects them. I\'ll show three linking techniques: (1) repeating a key word/idea, (2) using a pronoun to refer back, (3) using a connective (however, also, in addition, as a result).',
          example: 'Disconnected: "Honey bees are important. They pollinate flowers. Crops need pollinating. Bees are threatened." → Cohesive: "Honey bees are vital to our food system. <u>They</u> pollinate the flowers of fruit and vegetable crops, making growth possible. <u>However</u>, bee populations worldwide are in decline, threatening the very harvests <u>they</u> support."',
          demonstration: '"They" links back to "honey bees." "However" signals a contrast. Repeating "pollinate/pollinating" echoes the key idea. The paragraph now reads as connected thought, not a list of facts.',
          tip: 'After writing a paragraph, draw an arrow from each sentence to the one before it. If you can\'t find a link, add one.',
        },
        {
          title: 'We Do — Connect the Paragraph',
          instruction: 'Rewrite this paragraph so sentences flow into each other using pronouns, connectives, and repeated ideas.',
          sentences: [
            'Coral reefs are important ecosystems. Coral reefs have high biodiversity. Many species live in coral reefs. Coral reefs are threatened by warming oceans. Warming oceans cause coral bleaching. Coral bleaching is very damaging.',
          ],
          prompt: 'Which sentences can be linked with a pronoun? Where would "however" or "as a result" work?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this disjointed paragraph, using at least three different linking techniques.',
          tasks: [
            'The ancient library was discovered last year. The library was buried underground. Archaeologists excavated the library. The library contained thousands of scrolls. The scrolls were written in three languages. The scrolls are being studied by experts.',
            '✦ Bonus: Write a cohesive 5-sentence paragraph about a natural phenomenon, using at least one of each linking technique.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: identifying and removing repetition',
        'Revise for variety',
        {
          title: 'I Do — Same Word, Again and Again',
          instruction: 'Repetition drains the energy from writing. When a writer repeats the same word in close proximity, it usually means there\'s a more precise or interesting word available. Watch me identify and fix it.',
          example: '"The game was exciting. It was an exciting match with exciting moments right up to the exciting end."',
          demonstration: '"exciting" appears four times in two sentences. I fix: "The game was <u>thrilling</u>. It was an <u>intense</u> match with <u>breathtaking</u> moments right up to the <u>dramatic</u> finish." Four different words, all meaning roughly the same — but now each adds its own shade of meaning.',
          tip: 'Use Ctrl+F (find) to search for your most-used words. If any appear more than twice in a paragraph — you have a repetition problem.',
        },
        {
          title: 'We Do — Spot & Replace',
          instruction: 'Find the repeated words in this passage and replace them with synonyms or restructure the sentence.',
          sentences: [
            'The team walked to the field. The team warmed up on the field. The team captain looked at the other team. The team captain knew the other team was strong but the team was ready.',
          ],
          prompt: 'How many times does "team" appear? What are the best replacements? Can you also vary the sentence structure?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this passage by eliminating unnecessary repetition. Use synonyms, pronouns, or restructuring.',
          tasks: [
            'The mountain was tall. The mountain was covered in snow. The snow on the mountain was deep. The mountain had a steep path. The path up the mountain was dangerous. Climbers who climbed the mountain had to be careful.',
            '✦ Bonus: Pull out a paragraph from your writing. Highlight every word that appears more than twice. Revise.',
          ],
        }
      ),
    },

    10: {
      Monday: lesson(
        'Review: punctuation marks covered in Term 1',
        'Consolidate punctuation knowledge',
        {
          title: 'I Do — Term 1 Punctuation Recap',
          instruction: 'Let\'s take a tour of all the punctuation we\'ve learned this term. I\'ll show you each mark, its rule, and an example — building a master cheat sheet together.',
          example: 'Marks covered: . ! ? , (lists) , (compound sentences) : ; apostrophe (\'s and \')',
          demonstration: 'Full stop = ends a statement. ! = strong emotion/command. ? = question. Comma in list = separates items (before "and"). Comma in compound = before FANBOYS joining two full sentences. Colon = introduces list or explanation. Semicolon = joins two related sentences. Apostrophe \'s = possession. Apostrophe \' = contraction.',
          tip: 'Make a personal punctuation reference card — one rule + one example per mark.',
        },
        {
          title: 'We Do — Punctuation Challenge',
          instruction: 'This passage is missing ALL punctuation. Let\'s restore it mark by mark, explaining each choice.',
          sentences: [
            'last saturday tama and his sister hemi visited the art gallery in town they saw three types of art sculpture painting and photography tamas favourite was a huge bronze sculpture it was amazing the gallery also had an interactive room where visitors could make their own art they stayed there for an hour',
          ],
          prompt: 'Work through it together: Where are the sentences? Any lists? Any possession? Any compound sentences?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add all correct punctuation to this passage. Use the Term 1 checklist.',
          tasks: [
            'my friend amara won the school science fair her project was about water filtration she built a model using sand gravel charcoal and cloth it wasnt amara\'s first time winning the fair she won last year too amara wants to be an engineer when she grows up she said science is the best subject',
            '✦ Bonus: Write your own 6-sentence paragraph on any topic. Challenge: use every punctuation mark from Term 1 at least once.',
          ],
        }
      ),
      Tuesday: lesson(
        'Review: grammar concepts from Term 1',
        'Consolidate grammar knowledge',
        {
          title: 'I Do — Grammar Gallery Tour',
          instruction: 'Let\'s revisit every grammar concept from Term 1. I\'ll use a "grammar gallery" — one concept per station with a mini-example.',
          example: 'Stations: Nouns & proper nouns → Verbs (action/state) → Subject-verb agreement → Adjectives & comparison → Adverbs (how/when/where) → Pronouns → Conjunctions (CO & SUB)',
          demonstration: 'Station 1: Nouns — "The explorer found a map." (nouns: explorer, map). Station 2: Proper noun — "She found it near Lake Taupo." Station 3: SVA — "Each explorer has their role." Station 4: Adjectives — "a tattered, ancient map." ...and so on through each concept.',
          tip: 'Grammar is about understanding why a sentence works, not just labelling. Always connect the rule to the effect on meaning.',
        },
        {
          title: 'We Do — Grammar Challenge Quiz',
          instruction: 'I\'ll call out a sentence. You identify the grammar feature I\'m asking about. We\'ll go through all Term 1 concepts.',
          sentences: [
            '"The exhausted climbers finally reached Base Camp." → Find: noun, adjective, adverb.',
            '"Neither of the answers is correct." → Identify: subject, verb. Is SVA correct?',
            '"Because the trail was icy, the rescue team moved slowly." → Label: conjunction type, main clause, subordinate clause.',
          ],
          prompt: 'Hands up for each one — can anyone give a different example using the same grammar feature?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Complete the grammar review tasks.',
          tasks: [
            'Write a sentence containing: a proper noun, an action verb, and a fronted adverbial.',
            'Write a compound sentence using "but" and a complex sentence using "although."',
            'Write a sentence with a comparative and one with a superlative adjective.',
            '✦ Bonus: Write a paragraph of 6 sentences that demonstrates at least 5 different Term 1 grammar concepts. Label them in the margin.',
          ],
        }
      ),
      Wednesday: lesson(
        'Review: sentence types practised in Term 1',
        'Consolidate sentence skills',
        {
          title: 'I Do — Our Sentence Toolkit',
          instruction: 'This term we built quite a sentence toolkit. Let me show you every type we practised and how to combine them for maximum effect.',
          example: 'Simple | Simple + adjectives | Compound (FANBOYS) | Complex (subordinate clause) | Fronted adverbial | Who/where/when expanded',
          demonstration: 'Simple: "The storm broke." | + adjectives: "The fierce, sudden storm broke." | Compound: "The storm broke, and the river rose rapidly." | Complex: "Although residents had been warned, few expected the storm to be this severe." | Fronted: "Just before dawn, the storm broke over the city." | Expanded: "The storm, which had been building for three days, broke over the city just before dawn."',
          tip: 'The best writing mixes ALL these sentence types. No single type should dominate.',
        },
        {
          title: 'We Do — Sentence Type Auction',
          instruction: 'I\'ll read out sentences. You identify the type and explain how you know. Then we\'ll vote on which version of the same idea works best.',
          sentences: [
            'Version A: "She won." vs Version B: "After months of training, she finally won the regional championship." vs Version C: "She won, but the victory felt hollow."',
            '"Despite the rain, the festival continued." — what type? What\'s the effect?',
          ],
          prompt: 'Why might a writer choose Version A over B? When is shorter more powerful?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write one sentence of each type listed below, all on the same topic (the ocean).',
          tasks: [
            '1. Simple sentence.',
            '2. Simple sentence with 2 adjectives.',
            '3. Compound sentence (use "yet").',
            '4. Complex sentence (start with "Although").',
            '5. Fronted adverbial sentence.',
            '6. Expanded sentence with who/where/when.',
            '✦ Bonus: Arrange your 6 sentences into a mini-paragraph that flows naturally.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: full-passage edit using Term 1 checklist',
        'Apply all Term 1 skills in editing',
        {
          title: 'I Do — The Full Edit',
          instruction: 'Today I\'m going to do a complete multi-pass edit on this passage using our full Term 1 checklist. Watch how I tackle one aspect at a time rather than trying to fix everything at once.',
          example: 'Pass 1: Capitals & full stops | Pass 2: Comma usage | Pass 3: Apostrophes | Pass 4: Word choice (vague words) | Pass 5: Sentence variety | Pass 6: Repetition',
          demonstration: 'I read the passage once to understand it. Then Pass 1: I check every sentence begins with a capital and ends correctly. Pass 2: I look for lists and compound sentences — are commas right? Pass 3: Any apostrophes? Are they possession or contraction? Pass 4: I highlight "nice," "good," "went," "got" — can I upgrade any? Pass 5: Are all sentences the same length? Pass 6: Any repeated words?',
          tip: 'Multi-pass editing catches more than single-pass. Each pass has a specific focus — you\'re not trying to see everything at once.',
        },
        {
          title: 'We Do — Class Edit',
          instruction: 'Working through each pass together, let\'s edit this full passage as a class.',
          sentences: [
            'last week my class went on a trip to the botanical gardens in the park. it was a nice day and everyone was excited. we walked around and saw lots of nice plants and flowers. our teacher mrs patel said that the gardens had been there for over one hundred years and that they had lots of rare plants from all over the world. we saw carnivorous plants cacti roses sunflowers and many types of ferns. the carnivorous plants were good and everyone wanted to feed them. after the trip we all wrote about our favourite plants in our science books',
          ],
          prompt: 'Pass by pass — what are we fixing? Count the improvements at the end.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Edit this passage using all six passes of the Term 1 checklist. Rewrite the improved version.',
          tasks: [
            'on friday our school had a sports day the weather was nice so everyone went outside there were lots of different events like running jumping throwing and relay races my friend noah ran really fast and he won his race we all cheered for him. i came second in the long jump which was good. at the end mrs kahu gave out certificates and everyone got a good certificate for trying hard we went home tired but happy',
            '✦ Bonus: Apply the same 6-pass edit to a paragraph from your writing journal.',
          ],
        }
      ),
    },
  },

  // TERMS 2, 3, 4 follow same structure — abbreviated here to keep file manageable
  // Full data is loaded from Supabase in production; this serves as fallback/demo
  2: {
    1: { Monday: lesson('Tier 2 vocabulary: words for movement & action','Choose precise verbs',{title:'I Do',instruction:'Watch me swap plain movement verbs for precise ones.',example:'"The man went down the street." → "The man <u>strode</u> down the street."',demonstration:'Went → strode, shuffled, sprinted, lurched. Each verb tells us HOW as well as that movement happened.',tip:'Precise verbs eliminate the need for adverbs: "ran quickly" → "sprinted."'},{title:'We Do',instruction:'Upgrade the underlined verbs with more precise movement words.',sentences:['The bird <u>went</u> through the air.','She <u>moved</u> across the dance floor.','He <u>went</u> into the room.'],prompt:'What does the precise verb tell us that "went" does not?'},{title:'You Do',instruction:'Replace each plain verb with the most precise one you can think of.',tasks:['The snake <u>went</u> through the grass.','The toddler <u>moved</u> towards the door.','She <u>went</u> across the rooftops.','✦ Bonus: Write 4 sentences each using a different "movement" verb. No two the same.']}), Tuesday: lesson('Nouns: collective & abstract nouns','Extend noun knowledge',{title:'I Do',instruction:'Collective nouns name a group. Abstract nouns name ideas, feelings, or concepts you cannot touch.',example:'Collective: a <u>flock</u> of birds | Abstract: <u>courage</u>, <u>freedom</u>, <u>justice</u>',demonstration:'Flock, swarm, pride, pod — these are collective. Justice, hope, anger — these are abstract. You can\'t hold justice in your hand, but it\'s a noun because it names a concept.',tip:'If you can\'t touch it or see it, but it\'s a thing — it\'s probably abstract.'},{title:'We Do',instruction:'Sort these nouns into collective, abstract, or concrete.',sentences:['a herd of cattle','curiosity','a bouquet of flowers','loyalty','a school of fish'],prompt:'How do you know? Could you take a photo of it? Touch it?'},{title:'You Do',instruction:'Label each noun: collective (C), abstract (A), or concrete (Co).',tasks:['a murder of crows —','envy —','a packet of biscuits —','a pride of lions —','determination —','✦ Bonus: Write a sentence for each type using a noun from today\'s lesson.']}), Wednesday: lesson('Simple sentences: revisit with action-verb focus','Reinforce simple sentence structure',{title:'I Do',instruction:'Revisiting simple sentences — but this time the focus is on choosing a powerful action verb.',example:'Weak: "The volcano did an explosion." → Strong: "The volcano <u>erupted</u>."',demonstration:'Do + noun is often the weak version. Replace with a direct action verb: made a decision → decided. Gave a performance → performed. Did an investigation → investigated.',tip:'"Did", "made", "gave", "had" + noun = usually replaceable with one strong verb.'},{title:'We Do',instruction:'Replace the weak "do + noun" construction with one strong verb.',sentences:['She made a complaint about the noise.','They did a celebration when they won.','He gave a performance that amazed the crowd.'],prompt:'What single verb can replace each phrase?'},{title:'You Do',instruction:'Rewrite each sentence using one strong action verb.',tasks:['She made a decision to leave early.','The team gave a demonstration of the new skill.','They did an investigation into the disappearance.','✦ Bonus: Write 5 simple sentences using 5 different powerful action verbs.']}), Thursday: lesson('Proofreading: capitals for proper nouns in text','Edit with fresh context',{title:'I Do',instruction:'In this term\'s editing focus, we look specifically at proper noun capitals in longer, more complex text.',example:'"last tuesday, ms brown took class 5b to the otago museum in dunedin."',demonstration:'Fixed: "Last Tuesday, Ms Brown took Class 5B to the Otago Museum in Dunedin." Every specific name, title, day, place, and class identifier needs a capital.',tip:'Scan specifically for: days, months, place names, people\'s names/titles, specific event names.'},{title:'We Do',instruction:'Find and fix all the proper noun capitalisation errors.',sentences:['on anzac day, uncle mike and aunt sarah drove to hamilton for the dawn parade at memorial park.'],prompt:'List every word that needs a capital. How many did you find?'},{title:'You Do',instruction:'Rewrite this passage with all proper noun capitals correctly placed.',tasks:['my cousin riya is visiting from tauranga next friday. she goes to otumoetai college and is in year 10. on saturday we\'re going to visit the national aquarium of new zealand in napier. riya wants to see the tuatara display and the kiwi house afterwards we might have lunch at the hawke\'s bay farmers market.','✦ Bonus: Write a paragraph about a real or imaginary trip. Include at least 6 proper nouns — all correctly capitalised.']}) },

    2: {
      Monday: lesson(
        'Commas after fronted adverbials',
        'Punctuate sentence openers',
        {
          title: 'I Do — The Opener Comma',
          instruction: 'When a sentence starts with an adverbial phrase or clause (a fronted adverbial), we put a comma after it before the main clause begins. Watch me show you where the comma goes.',
          example: '"<u>After the long match,</u> the players collapsed on the grass." "<u>During the school holidays,</u> we visited Rotorua."',
          demonstration: '"After the long match" is the fronted adverbial — it sets the scene. The comma after "match" separates it from the main clause "the players collapsed." Without the comma, the reader rushes past the opener without pausing.',
          tip: 'Test: read aloud. If you naturally pause after the opening phrase before the subject arrives — that pause is your comma.',
        },
        {
          title: 'We Do — Add the Comma',
          instruction: 'These sentences have fronted adverbials but are missing the comma. Let\'s find the opener and add the comma together.',
          sentences: [
            'Before the sun had risen the fishing boats left the harbour.',
            'On the last day of term the students performed their assembly item.',
            'Despite the heavy rain the game continued without a break.',
          ],
          prompt: 'Where does the opener end and the main clause begin? That\'s where the comma goes.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add the missing comma in each sentence, then write a sentence of your own with a fronted adverbial.',
          tasks: [
            'Throughout the summer holidays Aroha trained every single morning.',
            'High above the clouds the small plane flew steadily north.',
            'By the time we arrived at the marae the hākari had already begun.',
            '✦ Bonus: Write 4 sentences that each start with a different fronted adverbial. Make sure every comma is in the right place.',
          ],
        }
      ),
      Tuesday: lesson(
        'Verb tense: simple future (\'will\' / \'going to\')',
        'Use future tense accurately',
        {
          title: 'I Do — Talking About What\'s Coming',
          instruction: 'The simple future tense talks about things that haven\'t happened yet. In English we use "will" for spontaneous decisions and predictions, and "going to" for plans we\'ve already made. Watch the difference.',
          example: '"I <u>will</u> help you carry that." (decided right now) | "We <u>are going to</u> visit Whānau Bay on Saturday." (already planned)',
          demonstration: '"Will" = decided in the moment or a prediction: "It will snow tonight." "Going to" = a plan or something you can already see evidence of: "Look at those clouds — it\'s going to rain." Both are future but the nuance differs.',
          tip: 'Already planned it? Use "going to." Just decided or making a prediction? Use "will."',
        },
        {
          title: 'We Do — Will or Going To?',
          instruction: 'Choose "will" or "going to" for each sentence and explain your choice.',
          sentences: [
            'Mum already bought the tickets — we ___ see the kapa haka performance on Friday.',
            'The phone is ringing. "Don\'t worry, I ___ get it!"',
            'According to the forecast, it ___ be a hot summer.',
          ],
          prompt: 'Is it already planned, or decided right now? Does it matter which you use here?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Complete each sentence with the correct future tense form and a logical ending.',
          tasks: [
            'We have already booked the bach — we ___ (go) to the Coromandel next week.',
            'Nobody planned this but the window just broke — I ___ (call) the caretaker.',
            'Look at those dark clouds — it ___ (pour) any minute.',
            '✦ Bonus: Write a short paragraph (4–5 sentences) about your plans for the weekend. Use both "will" and "going to" at least once each.',
          ],
        }
      ),
      Wednesday: lesson(
        'Expanding sentences: adding \'when\' and \'because\' clauses',
        'Develop complex sentences',
        {
          title: 'I Do — Give the Reader More',
          instruction: 'A simple sentence tells us what happened. Adding a "when" or "because" clause tells us WHEN it happened or WHY — turning a thin sentence into a complex one. Watch me expand.',
          example: '"The crowd cheered." → "<u>When the final whistle blew,</u> the crowd cheered." → "The crowd cheered <u>because the All Blacks had scored.</u>"',
          demonstration: '"When" adds a time relationship — something triggered the action. "Because" adds a cause — it explains the reason. You can add either clause at the front or the back. Front = comma after the clause. Back = no comma needed.',
          tip: 'Ask two questions about any simple sentence: WHEN did this happen? WHY did this happen? The answer becomes your expansion clause.',
        },
        {
          title: 'We Do — Expand Together',
          instruction: 'Expand each simple sentence twice — once with a "when" clause and once with a "because" clause.',
          sentences: [
            'The dog barked.',
            'She put on her kākahu.',
            'The whole school fell silent.',
          ],
          prompt: 'Does the meaning change depending on which clause you add? Which version is most interesting?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Expand each sentence by adding the clause type shown in brackets.',
          tasks: [
            'The lights went out. (add a "when" clause at the front)',
            'Hemi ran all the way to school. (add a "because" clause at the back)',
            'The rescue helicopter landed on the beach. (add both — one at the front, one at the back)',
            '✦ Bonus: Write 5 complex sentences about a sports event or performance. Use "when" in at least two and "because" in at least two.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: fixing comma splices',
        'Revise comma errors',
        {
          title: 'I Do — The Comma Splice',
          instruction: 'A comma splice happens when two complete sentences are joined with only a comma — which isn\'t strong enough to hold them together. Watch me identify and fix them.',
          example: '"The tide came in, we had to move our towels." ✗ (comma splice)',
          demonstration: 'Both sides are complete sentences. A comma alone can\'t join them. Fix options: (1) Full stop: "The tide came in. We had to move our towels." (2) Conjunction: "The tide came in, so we had to move our towels." (3) Semicolon: "The tide came in; we had to move our towels."',
          tip: 'Test each side of the comma. If BOTH sides can stand alone as sentences, a comma alone is wrong — you need a full stop, semicolon, or conjunction.',
        },
        {
          title: 'We Do — Spot and Fix',
          instruction: 'Some of these sentences have comma splices, some are correct. Identify which are wrong and fix them.',
          sentences: [
            'It was raining heavily, the match was cancelled.',
            'She studied all night, but she still felt unprepared.',
            'The kiwi is nocturnal, it comes out to feed after dark.',
          ],
          prompt: 'Can both sides stand alone? If yes, the comma splice needs fixing. What\'s the best fix for each?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Fix each comma splice using the method shown in brackets.',
          tasks: [
            'The presentation went well, the audience clapped loudly. (use a conjunction)',
            'We planted the seeds in autumn, they sprouted in spring. (use a semicolon)',
            'Tane finished the race first, he was exhausted but thrilled. (use a full stop)',
            '✦ Bonus: Write a paragraph of 5 sentences about a recent event. Swap with a partner — can they find any comma splices you accidentally included?',
          ],
        }
      ),
    },

    3: {
      Monday: lesson(
        'Antonyms & shades of meaning',
        'Understand word relationships',
        {
          title: 'I Do — Opposites and the Spectrum Between',
          instruction: 'An antonym is a word that means the opposite of another word. But meaning isn\'t just black and white — there\'s often a whole spectrum between two opposites. Watch me map the shades.',
          example: '"cold ←→ hot" but also: freezing → icy → cold → cool → warm → hot → scorching → boiling',
          demonstration: '"Cold" and "hot" are antonyms. But between them are many shades. Choosing the right shade of meaning is what separates precise writing from vague writing. "The water was warm" is very different from "The water was scalding."',
          tip: 'Think of meaning as a sliding scale, not a switch. The most powerful word sits at exactly the right point on that scale for your sentence.',
        },
        {
          title: 'We Do — Map the Spectrum',
          instruction: 'For each pair of antonyms, fill in at least three words that sit between them on the meaning spectrum.',
          sentences: [
            'tiny ←→ enormous: ___, ___, ___',
            'happy ←→ miserable: ___, ___, ___',
            'quiet ←→ deafening: ___, ___, ___',
          ],
          prompt: 'What context would make you choose each word? Where on the scale does your sentence need to sit?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Replace the underlined word with one that sits at the right point on the meaning spectrum for the context.',
          tasks: [
            'The explorer was <u>cold</u> as she crossed the Antarctic plateau. (needs extreme)',
            'He spoke in a <u>quiet</u> voice so as not to wake the baby. (needs gentle/soft)',
            'The smell from the rubbish bin was <u>bad</u>. (needs intense and specific)',
            '✦ Bonus: Write a paragraph describing a storm. Use words from the extreme ends of at least three different meaning spectrums.',
          ],
        }
      ),
      Tuesday: lesson(
        'Subject-verb agreement: tricky cases (everyone, each)',
        'Apply agreement rules accurately',
        {
          title: 'I Do — The Tricky Ones',
          instruction: 'Most subject-verb agreement is straightforward. But some words look plural and feel plural yet are grammatically singular. Watch me work through the trickiest ones.',
          example: '"<u>Everyone</u> in the two classes <u>was</u> invited." (not "were") | "<u>Each</u> of the players <u>has</u> a number." (not "have")',
          demonstration: '"Everyone," "everybody," "someone," "nobody," "each," "either," "neither" — all singular, even when they refer to many people. The trick: mentally replace with "every single person" — then the singular verb feels natural.',
          tip: 'Everyone/each/either/neither/nobody = singular. Replace with "every single one" in your head — the right verb follows naturally.',
        },
        {
          title: 'We Do — Choose the Right Verb',
          instruction: 'Choose the correct verb form for each sentence.',
          sentences: [
            'Everyone in the kapa haka group ___ (know/knows) the words.',
            'Each of the entries ___ (was/were) judged on three criteria.',
            'Neither of the referees ___ (was/were) happy with the decision.',
          ],
          prompt: 'Replace the subject with "every single one" — which verb sounds right now?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Correct the subject-verb agreement error in each sentence.',
          tasks: [
            'Everyone in the syndicate have submitted their work.',
            'Each of the kūmara plants were carefully watered.',
            'Neither of the answers are correct.',
            'Somebody have left their bag on the mat.',
            '✦ Bonus: Write 5 sentences, each using one of these subjects: everyone, each, neither, somebody, anyone. Make sure agreement is correct in every one.',
          ],
        }
      ),
      Wednesday: lesson(
        'Compound sentences: new contexts & conjunctions',
        'Extend compound sentence use',
        {
          title: 'I Do — FANBOYS in Fresh Contexts',
          instruction: 'We know FANBOYS conjunctions (for, and, nor, but, or, yet, so). This week we use them in new writing contexts — reports, recounts, and arguments — to see how the same conjunction does different jobs depending on context.',
          example: 'Recount: "We arrived at Tāmaki Makaurau, <u>and</u> the whole whānau was waiting." | Argument: "The policy is popular, <u>yet</u> the evidence does not support it."',
          demonstration: '"And" adds. "But/yet" contrasts. "So" shows result. "Or" gives alternatives. "For" gives reason (formal). "Nor" adds a negative. The conjunction you choose shapes the relationship between the two ideas.',
          tip: 'Before picking a conjunction, decide: am I adding, contrasting, showing a result, or giving a reason? That decides which FANBOYS fits.',
        },
        {
          title: 'We Do — Choose the Right FANBOYS',
          instruction: 'Join each pair of sentences with the best FANBOYS conjunction. Add a comma before the conjunction.',
          sentences: [
            'The hīkoi had been going for three days. The marchers showed no sign of stopping.',
            'You can present your findings as a poster. You can create a short video.',
            'The experiment failed the first time. The team learnt something valuable from it.',
          ],
          prompt: 'What is the relationship between the two ideas? That decides the conjunction.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a compound sentence for each context using the conjunction given.',
          tasks: [
            'Write about a kaitiakitanga project using "so".',
            'Write about a time something went wrong using "yet".',
            'Write a sentence giving someone two choices using "or".',
            '✦ Bonus: Write a paragraph about an environmental issue. Use at least three different FANBOYS conjunctions. Underline each one.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: upgrading bland verbs in a passage',
        'Improve verb precision',
        {
          title: 'I Do — Bland Verbs Drain Energy',
          instruction: 'Some verbs are so vague they tell us almost nothing: went, got, said, did, made, was. Watch me identify them in a passage and replace them with verbs that do real work.',
          example: '"The children <u>went</u> to the beach. They <u>got</u> into the water. Dad <u>said</u> they should come out."',
          demonstration: '"went" → "raced" | "got" → "plunged" | "said" → "bellowed". New version: "The children <u>raced</u> to the beach. They <u>plunged</u> into the water. Dad <u>bellowed</u> at them to come out." The scene comes alive.',
          tip: 'Highlight every "went," "got," "said," "did," "made," "was" in a passage. Each one is an upgrade opportunity.',
        },
        {
          title: 'We Do — Upgrade the Passage',
          instruction: 'Replace every underlined bland verb with a more precise one. The new verb must match the context.',
          sentences: [
            'The kererū <u>went</u> from branch to branch, <u>getting</u> the ripest berries. It <u>made</u> a loud noise with its wings as it <u>went</u> away.',
          ],
          prompt: 'What is actually happening physically? What does a more precise verb tell the reader that "went" and "got" don\'t?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this whole passage, upgrading every bland verb you can find.',
          tasks: [
            'On field trip day, the class got on the bus early. They went to the wetland reserve near Ōtaki. The guide said something about the different birds. Some students went into the hide and got photos of a bittern. Everyone said it was great.',
            '✦ Bonus: Count how many bland verbs you replaced. Write the before and after side by side. Which passage is more engaging and why?',
          ],
        }
      ),
    },

    4: {
      Monday: lesson(
        'Apostrophes for contraction',
        'Use contractions correctly',
        {
          title: 'I Do — The Apostrophe That Replaces Letters',
          instruction: 'A contraction apostrophe shows where one or more letters have been removed when two words are joined together. Watch me build contractions and show exactly what the apostrophe replaces.',
          example: '"do not" → "don\'t" (the apostrophe replaces the \'o\') | "they are" → "they\'re" | "I would" → "I\'d"',
          demonstration: '"cannot" → "can\'t" — the apostrophe replaces "no". "would not" → "wouldn\'t" — replaces "o". "she is" → "she\'s" — replaces "i". The apostrophe sits exactly where the missing letter(s) were.',
          tip: 'The apostrophe goes WHERE THE LETTERS WERE REMOVED — not just anywhere between the words.',
        },
        {
          title: 'We Do — Contract and Expand',
          instruction: 'Write the contraction for each pair of words, and expand each contraction back to the full form.',
          sentences: [
            'we will → ___  |  it\'s → ___',
            'have not → ___  |  they\'d → ___',
            'I am → ___  |  couldn\'t → ___',
          ],
          prompt: 'Exactly which letters did the apostrophe replace? Could you be confused between "it\'s" (it is) and "its" (belonging to it)?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Fix the apostrophe errors in these sentences — some are missing, some are in the wrong place.',
          tasks: [
            'Sh\'es not sure if theyre coming to the hangi tonight.',
            'I wo\'nt be ready until the bus ha\'s already left.',
            'Weve been waiting here for ages — it isnt fair.',
            'They\'re dog isnt allowed inside but its a cold night.',
            '✦ Bonus: Write a conversation (6 lines of dialogue) between two friends making plans. Use at least 6 different contractions correctly.',
          ],
        }
      ),
      Tuesday: lesson(
        'Relative pronouns: who, which, that',
        'Use relative clauses accurately',
        {
          title: 'I Do — Clauses That Give Extra Information',
          instruction: 'A relative clause is a type of subordinate clause that gives more information about a noun. It\'s introduced by a relative pronoun: "who" (for people), "which" (for things), "that" (for people or things in defining clauses). Watch me build them.',
          example: '"The woman <u>who won the award</u> is our neighbour." | "The bridge<u>, which was built in 1902,</u> is being restored." | "The book <u>that she recommended</u> was brilliant."',
          demonstration: '"who" → refers back to a person: "The boy who broke the window has apologised." "which" → refers back to a thing, adds non-essential info (use commas): "The river, which floods every winter, is rising again." "that" → defines which one (no commas): "The path that leads to the pā is steep."',
          tip: '"Who" = people. "Which" = things + commas (extra info). "That" = defines which one, no commas.',
        },
        {
          title: 'We Do — Choose the Right Relative Pronoun',
          instruction: 'Complete each sentence with who, which, or that.',
          sentences: [
            'The rangatira ___ led the iwi was known for her wisdom.',
            'The old pōhutukawa, ___ had stood for 300 years, was finally protected.',
            'This is the exact track ___ leads to the summit.',
          ],
          prompt: 'Does the clause define which one, or add extra information? Does it refer to a person or a thing?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add a relative clause to each sentence using the pronoun given.',
          tasks: [
            'The scientist ___ (who) discovered the new species published her findings last month.',
            'Rotorua, ___ (which) is famous for its geothermal activity, attracts tourists year-round.',
            'She finally found the notebook ___ (that) she had been searching for all morning.',
            '✦ Bonus: Write a paragraph about a local place or person of significance. Include at least three relative clauses — one with who, one with which (with commas), and one with that.',
          ],
        }
      ),
      Wednesday: lesson(
        'Topic sentences: revisit with persuasive purpose',
        'Apply to persuasive writing',
        {
          title: 'I Do — Topic Sentences That Argue',
          instruction: 'In Term 1 we wrote topic sentences for informational paragraphs. This week, topic sentences carry an opinion or argument — they tell the reader not just what the paragraph is about, but what position you\'re taking.',
          example: 'Informational: "Recycling reduces waste sent to landfill." | Persuasive: "<u>Recycling is not enough — we must stop producing unnecessary plastic altogether.</u>"',
          demonstration: 'The persuasive topic sentence does three jobs: (1) introduces the paragraph\'s main idea, (2) makes the writer\'s position clear, (3) makes the reader want to know the evidence. "Everyone deserves access to clean water" is both a topic sentence AND an argument.',
          tip: 'A strong persuasive topic sentence takes a clear position. If someone could disagree with it — it\'s persuasive. If it\'s just a fact — it\'s informational.',
        },
        {
          title: 'We Do — Upgrade to Persuasive',
          instruction: 'Turn each informational topic sentence into a persuasive one by adding a position or claim.',
          sentences: [
            'Smartphones are used by many young people.',
            'Schools have canteens that sell food to students.',
            'Exercise has effects on health.',
          ],
          prompt: 'What position could a writer take on each topic? Add the opinion to make it genuinely persuasive.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a persuasive topic sentence for each argument prompt.',
          tasks: [
            'Topic: whether students should have homework.',
            'Topic: whether animals should be kept in zoos.',
            'Topic: whether Aotearoa should have a four-day school week.',
            '✦ Bonus: Choose one topic and write the full paragraph that follows your topic sentence — include at least two pieces of evidence or reasoning.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: removing unnecessary apostrophes',
        'Revise apostrophe errors',
        {
          title: 'I Do — The Apostrophe That Shouldn\'t Be There',
          instruction: 'One of the most common writing errors is adding apostrophes to plural nouns. Plurals NEVER need apostrophes — only possessives and contractions do. Watch me find and remove the rogue apostrophes.',
          example: '"The shop sold apple\'s, pear\'s and mango\'s." ✗ → "The shop sold apples, pears and mangos." ✓',
          demonstration: '"apple\'s" — is this showing possession or a contraction? No — it\'s just the plural of apple. Remove it. The rule: if you\'re just making a word mean "more than one" — NO apostrophe. Ever.',
          tip: 'Before adding an apostrophe, ask: (1) Is something being owned? (2) Are letters missing? If neither — remove the apostrophe.',
        },
        {
          title: 'We Do — Find the Rogue Apostrophes',
          instruction: 'Some of these sentences have unnecessary apostrophes. Find and remove them.',
          sentences: [
            'The student\'s completed their project\'s and handed them to the kaiako.',
            'We saw kiwi\'s, tūī\'s and kererū\'s on the forest walk.',
            'The team\'s won three trophy\'s this season.',
          ],
          prompt: 'Is the apostrophe showing possession or a missing letter? If neither — delete it.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence, correcting all apostrophe errors (some are missing where needed, some are present where they shouldn\'t be).',
          tasks: [
            'The children\'s bags were full of book\'s, pencil\'s and lunchboxe\'s.',
            'Mias cat knocked over all the plant\'s on the windowsill.',
            'The two schools debate teams both won their semi-final\'s.',
            '✦ Bonus: Write a paragraph about a market or event you\'ve been to. Use plurals, possessives, and contractions — but not a single apostrophe error.',
          ],
        }
      ),
    },

    5: {
      Monday: lesson(
        'Brackets & dashes for extra information',
        'Use parenthetical punctuation',
        {
          title: 'I Do — Slipping in Extra Detail',
          instruction: 'Brackets and dashes both let you add extra information into a sentence without interrupting its flow. Watch how I use them and when I choose one over the other.',
          example: 'Brackets: "The tuatara (New Zealand\'s ancient living fossil) can live for over 100 years." | Dashes: "The tuatara — New Zealand\'s ancient living fossil — can live for over 100 years."',
          demonstration: 'Both add the same parenthetical information. Brackets feel more like a footnote — the information is secondary. Dashes feel more dramatic — they draw attention to the extra detail. Both must be able to be removed from the sentence and leave it grammatically complete.',
          tip: 'Remove the section between the brackets or dashes. If the sentence still makes sense — your punctuation is correct.',
        },
        {
          title: 'We Do — Add the Extra Detail',
          instruction: 'Insert the given extra information using either brackets or dashes. Then try the other option — does one feel better?',
          sentences: [
            'The wētāpunga [largest wētā species in the world] is found on offshore islands.',
            'Lake Taupō [formed by a massive volcanic eruption about 1,800 years ago] is a taonga to Ngāti Tūwharetoa.',
            'The school production [three weeks of rehearsals had led to this moment] was a huge success.',
          ],
          prompt: 'Does the extra information feel like a quiet aside or a dramatic emphasis? That helps you choose brackets vs dashes.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add parenthetical information to each sentence using brackets or dashes as indicated.',
          tasks: [
            'The huia [use brackets: an extinct taonga bird of Aotearoa] was considered sacred by Māori.',
            'My neighbour [use dashes: she\'s a marine biologist] studies dolphin communication.',
            'The competition [use brackets: held every two years since 1987] attracted over 500 entries.',
            '✦ Bonus: Write a paragraph about a topic you know well. Include two pieces of parenthetical information — one using brackets, one using dashes.',
          ],
        }
      ),
      Tuesday: lesson(
        'Comparative & superlative adjectives in sentences',
        'Apply comparison language',
        {
          title: 'I Do — Comparing with Adjectives',
          instruction: 'We revisit comparatives and superlatives — but this time in the context of writing whole sentences, not just forming the words. Watch how I use comparison language to build interesting, precise sentences.',
          example: '"The second mountain was <u>steeper</u> than the first." | "That was the <u>most challenging</u> tramp I have ever done."',
          demonstration: 'Comparative (-er / more): compare TWO things. "The river is wider here than upstream." Superlative (-est / most): compare THREE or more, or one against all others. "This is the deepest lake in the South Island." Irregulars: good → better → best. bad → worse → worst.',
          tip: 'Two things = comparative (-er/more). Three or more, or against everything else = superlative (-est/most).',
        },
        {
          title: 'We Do — Build the Sentences',
          instruction: 'Expand each prompt into a full sentence using the comparative or superlative form shown.',
          sentences: [
            'the kākāpō / heavy / all New Zealand parrots (superlative)',
            'Wellington / windy / Auckland (comparative)',
            'today\'s session / challenging / yesterday\'s (comparative)',
          ],
          prompt: 'Are we comparing two things or ranking against all others? Does the adjective use -er/-est or more/most?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a full sentence for each prompt using the correct comparative or superlative form.',
          tasks: [
            'Use the superlative of "significant" in a sentence about an event in NZ history.',
            'Compare two animals using the comparative of "fast" or "fierce".',
            'Use the superlative of "good" in a sentence about a book, film, or sports moment.',
            '✦ Bonus: Write a paragraph comparing two places in Aotearoa you have visited or know about. Use at least four comparative or superlative adjectives.',
          ],
        }
      ),
      Wednesday: lesson(
        'Combining short sentences into one smooth sentence',
        'Sentence combining',
        {
          title: 'I Do — From Choppy to Smooth',
          instruction: 'Short sentences are powerful in the right place — but a whole paragraph of them sounds choppy. Watch me combine them into fewer, smoother sentences using a range of techniques.',
          example: 'Choppy: "The kārearea is a falcon. It is native to New Zealand. It is the fastest bird in the country. It hunts other birds." → Smooth: "The kārearea, a falcon native to New Zealand, is the country\'s fastest bird and hunts other birds in mid-air."',
          demonstration: 'Techniques used: (1) relative clause to embed "native to New Zealand", (2) appositive "a falcon" to identify it, (3) conjunction "and" to join the final two ideas. One sentence does the work of four.',
          tip: 'Ask: which two sentences share a subject? Can one become a clause inside the other? Can two short ideas be joined with a conjunction?',
        },
        {
          title: 'We Do — Combine Together',
          instruction: 'Combine each group of short sentences into one or two smooth sentences.',
          sentences: [
            'The tītī is a seabird. It migrates every year. It travels to the Pacific. It returns to Rakiura to breed.',
            'The pā was built on a hill. The hill was steep. It was easy to defend. It had a view of the harbour.',
          ],
          prompt: 'Which ideas can be embedded? Which can be joined? Aim for two sentences maximum from each group.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Combine each set of choppy sentences into one smooth, well-constructed sentence.',
          tasks: [
            'Rangi is in our class. He is a good swimmer. He won the regional championship. He trains five days a week.',
            'The pōhutukawa blooms in December. It is called the New Zealand Christmas tree. Its flowers are red. They attract tūī.',
            'The storm hit last night. It was very strong. Trees fell down. Power was cut for many homes.',
            '✦ Bonus: Find a paragraph in your writing folder that has too many short sentences. Rewrite it combining sentences. Compare the two versions.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: peer edit for punctuation variety',
        'Collaborative editing',
        {
          title: 'I Do — Reading Like an Editor',
          instruction: 'Today we peer-edit with a specific focus: punctuation variety. A piece of writing that only uses full stops and commas is missing opportunities. Watch me read a passage and mark it up for punctuation variety.',
          example: '"The trip was great. We saw lots of things. It was sunny. We had lunch by the river. It was nice. We went home tired."',
          demonstration: 'Every sentence ends with a full stop. No semicolons, no dashes, no colons — no variety. Editing pass: "The trip was great; we saw more than we had expected. The sun blazed — perfect conditions for exploring. By the river, we ate lunch: sandwiches, fruit, and cold water. We went home tired but happy."',
          tip: 'Editor\'s checklist for punctuation variety: At least one colon or semicolon? Any dashes? Any brackets? Could any full stop be an exclamation mark?',
        },
        {
          title: 'We Do — Mark Up Together',
          instruction: 'Read this passage and mark every place where punctuation could be more varied. Discuss your changes.',
          sentences: [
            'The science fair was held on Thursday. Every class had an entry. Our class made a working volcano. It erupted three times. The judges were impressed. We won first place. It was a good day.',
          ],
          prompt: 'Where could a semicolon replace a full stop? Where could a dash add drama? Is there a list that needs a colon?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Swap a piece of your own writing with a partner. Edit each other\'s work specifically for punctuation variety using the checklist below.',
          tasks: [
            '✦ Checklist: At least one semicolon used correctly.',
            '✦ Checklist: At least one colon introducing a list or explanation.',
            '✦ Checklist: At least one dash or pair of brackets for parenthetical information.',
            '✦ Bonus: Rewrite your partner\'s weakest paragraph — the one with the least punctuation variety — as a model of what it could look like.',
          ],
        }
      ),
    },

    6: {
      Monday: lesson(
        'Greek & Latin roots in everyday words',
        'Decode unknown vocabulary',
        {
          title: 'I Do — Crack the Code',
          instruction: 'Many English words are built from Greek and Latin roots. Once you know a root, you can work out the meaning of dozens of words you\'ve never seen before. Watch me use roots to decode unfamiliar vocabulary.',
          example: '"tele" (far) → telescope, television, telepathy | "aqua" (water) → aquatic, aquarium, aqueduct | "bio" (life) → biology, biography, biodiversity',
          demonstration: 'If you see "submarine," you might not know it — but "sub" means under and "marine" means sea. So submarine = under the sea. Same with "microphone" — "micro" (small) + "phone" (sound) = small sound. Roots unlock words like a key.',
          tip: 'When you hit an unknown word, look for a root you recognise. Even a partial match gives you a clue.',
        },
        {
          title: 'We Do — Decode Together',
          instruction: 'Use the roots provided to work out what each word means. Then check by looking at the context sentence.',
          sentences: [
            '"geo" (earth): geology, geography, geothermal — what does "geothermal" likely mean?',
            '"script/scribe" (write): manuscript, inscription, transcribe — what does "transcribe" likely mean?',
            '"spec/spect" (look/see): inspect, spectator, spectacular — what does "spectator" likely mean?',
          ],
          prompt: 'Can you find other words that share these roots? How does knowing the root help you read unfamiliar texts?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Use your knowledge of roots to answer each question.',
          tasks: [
            'The root "port" means carry. What do these words mean: export, import, transport, portfolio?',
            'The root "vis/vid" means see. Use it to work out: visible, invisible, vision, evidence.',
            'The root "terra" means land/earth. What do: terrain, territory, terrarium, extraterrestrial mean?',
            '✦ Bonus: Find 5 words in a book, magazine, or website that share a Greek or Latin root. List the root, its meaning, and the words that use it.',
          ],
        }
      ),
      Tuesday: lesson(
        'Adverbial phrases for time & manner',
        'Enrich sentences with adverbials',
        {
          title: 'I Do — Beyond Single Adverbs',
          instruction: 'A single adverb tells us how or when. An adverbial PHRASE does the same job but with more precision and colour. Watch me replace weak single adverbs with rich adverbial phrases.',
          example: '"She spoke quietly." → "She spoke in a hushed, urgent whisper." | "He left quickly." → "He left before anyone could ask questions."',
          demonstration: '"Quietly" tells us the manner. "In a hushed, urgent whisper" tells us manner AND gives texture — we can picture it. "Before anyone could ask questions" tells us time AND hints at motivation. Adverbial phrases carry more weight than single adverbs.',
          tip: 'Spot a lone adverb. Ask: can I replace it with a phrase that tells the reader more? If yes — upgrade it.',
        },
        {
          title: 'We Do — Upgrade Together',
          instruction: 'Replace each underlined adverb with an adverbial phrase that adds more information.',
          sentences: [
            'The tūī sang <u>loudly</u> in the pōhutukawa.',
            'The tamariki waited <u>nervously</u> for the results.',
            'The boat left <u>early</u>.',
          ],
          prompt: 'What kind of adverbial phrase fits — one of manner, time, or place? Can you write one that adds detail and stays true to the context?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence by replacing the adverb in brackets with a precise adverbial phrase.',
          tasks: [
            'The kaitiaki worked [hard] to restore the wetland.',
            'The team celebrated [happily] after the final whistle.',
            'She finished her speech [suddenly].',
            '✦ Bonus: Write a paragraph of 5 sentences about an event or journey. Use at least three different adverbial phrases — one of time, one of manner, one of place.',
          ],
        }
      ),
      Wednesday: lesson(
        'Who/where/when phrases: persuasive context',
        'Transfer skills to persuasive text',
        {
          title: 'I Do — Detail That Persuades',
          instruction: 'In Term 1 we used who/where/when phrases to add descriptive detail. This week we use the same technique in persuasive writing — where specific detail makes arguments more convincing. Watch me add detail to a persuasive sentence.',
          example: '"Schools should have gardens." → "Schools across Aotearoa, from urban Auckland to rural Northland, should have gardens where students can grow and harvest their own kai."',
          demonstration: 'The added phrases — "across Aotearoa, from urban Auckland to rural Northland" (where) and "where students can grow and harvest their own kai" (who/what) — make the claim feel specific and grounded. Vague arguments are easy to dismiss. Specific ones are harder to ignore.',
          tip: 'In persuasion, specific detail builds credibility. WHO would benefit? WHERE would this happen? WHEN should it change? Answer those questions inside your sentences.',
        },
        {
          title: 'We Do — Make It Specific',
          instruction: 'Add who, where, or when detail to each persuasive sentence to make it more convincing.',
          sentences: [
            'Students should have access to nature.',
            'Communities need to protect waterways.',
            'Young people deserve to have their voices heard.',
          ],
          prompt: 'Which type of detail makes each argument stronger — who, where, or when? Can you add more than one?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Expand each bare persuasive claim using who/where/when phrases.',
          tasks: [
            'Claim: "Aotearoa needs more native tree planting." Add a where and a when phrase.',
            'Claim: "Students learn better outdoors." Add a who and a where phrase.',
            'Claim: "Schools should start later." Add a who and a when phrase.',
            '✦ Bonus: Write a persuasive paragraph (5–6 sentences) on a topic you care about. Every sentence must include at least one who, where, or when detail.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: replacing overused words (\'nice\', \'good\')',
        'Improve word choice',
        {
          title: 'I Do — The Vague Word Hunt',
          instruction: 'Some words appear in almost every piece of student writing: nice, good, bad, big, little, went, got, said, things, stuff. They\'re not wrong — they\'re just empty. Watch me hunt them down and replace them with words that actually do a job.',
          example: '"It was a nice day and we had a good time doing lots of fun things." → "The sun blazed over the harbour and we spent the afternoon kayaking, laughing until our arms gave out."',
          demonstration: '"Nice day" → specific weather detail. "Good time" → specific activity. "Lots of fun things" → actual examples. The second version creates a picture. The first version creates nothing.',
          tip: 'The vague word hit list: nice, good, bad, big, little, went, got, said, things, stuff, very, really. Highlight every one. Each is an upgrade opportunity.',
        },
        {
          title: 'We Do — Upgrade Together',
          instruction: 'Find every vague word in this passage and replace it with something precise.',
          sentences: [
            'We went to the nice beach and it was really good. We did lots of fun things and got really tired. The food was nice and everyone said it was a good day.',
          ],
          prompt: 'How many vague words can you find? What specific, precise word or phrase could replace each one?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence, replacing every vague word with a precise alternative.',
          tasks: [
            'The movie was really good and the things that happened were very exciting.',
            'She is a nice person who always says good things to people.',
            'It was a bad situation and lots of bad things went wrong.',
            '✦ Bonus: Take a paragraph from a piece of your own writing. Highlight every word from the vague word hit list. Rewrite the paragraph with every vague word upgraded.',
          ],
        }
      ),
    },

    7: {
      Monday: lesson(
        'Colons to introduce lists',
        'Use colons purposefully',
        {
          title: 'I Do — The Colon That Sets Up a List',
          instruction: 'We met colons in Term 1. This week we focus specifically on using them to introduce lists — and on the rule about what must come BEFORE the colon. Watch me demonstrate.',
          example: '"The kete contained three items: a tī kōuka leaf, a piece of bone, and a carved pounamu." | ✗ "The kete contained: a tī kōuka leaf, a piece of bone, and a carved pounamu."',
          demonstration: 'The colon introduces the list — but only when a complete sentence comes before it. "The kete contained three items" is a complete sentence ✓. "The kete contained" is NOT a complete sentence ✗ — so no colon. The rule: a complete sentence must precede the colon.',
          tip: 'Before the colon = a complete sentence. After the colon = the list or explanation. Test: can the part before the colon stand alone? If not — remove the colon.',
        },
        {
          title: 'We Do — Fix or Confirm',
          instruction: 'Decide whether the colon is used correctly in each sentence. Fix those that aren\'t.',
          sentences: [
            'The scientist needed: a microscope, slides, and a sample jar.',
            'The rescue team brought the following equipment: ropes, a first-aid kit, and torches.',
            'To make rewena bread you will need: flour, potato water, sugar, and salt.',
          ],
          prompt: 'Is the part before the colon a complete sentence? If not, what needs to change?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add a colon in the correct place, or rewrite the sentence so the colon is used correctly.',
          tasks: [
            'The pā required three things to defend effectively high ground, a clear view, and strong palisades.',
            'There are many native birds in the Waikato region including: tūī, kererū, and pīwakawaka.',
            'She packed everything she would need for the tramp: food, a sleeping bag, a compass, and wet-weather gear.',
            '✦ Bonus: Write five sentences, each using a colon to introduce a list. Make sure every sentence before the colon is grammatically complete.',
          ],
        }
      ),
      Tuesday: lesson(
        'Progressive tenses: past & present continuous',
        'Use progressive tense accurately',
        {
          title: 'I Do — Actions in Progress',
          instruction: 'The progressive (or continuous) tense shows an action that was happening over a period of time — not just a single completed event. Watch me form and use past and present progressive.',
          example: 'Present progressive: "The kākāpō <u>is climbing</u> the tree right now." | Past progressive: "The kākāpō <u>was climbing</u> when we first spotted it."',
          demonstration: 'Present progressive = is/are + verb-ing: "She is writing." Past progressive = was/were + verb-ing: "She was writing when the bell rang." The key use: past progressive sets a scene that another action interrupts. "He was reading when the power cut out."',
          tip: 'Past progressive sets the background scene. Simple past is the event that interrupts it. Together they create: "She was sleeping when the earthquake struck."',
        },
        {
          title: 'We Do — Form and Use',
          instruction: 'Complete each sentence with the correct progressive form of the verb given.',
          sentences: [
            'The students ___ (prepare) their speeches when the fire alarm went off.',
            'Look out the window — the kererū ___ (eat) all the berries!',
            'While the waka ___ (cross) the harbour, the wind suddenly changed direction.',
          ],
          prompt: 'Is this happening right now (present) or was it in progress at a past moment (past)? That decides was/were vs is/are.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write sentences using the progressive tense as directed.',
          tasks: [
            'Write a sentence using the past progressive to set a scene, then use simple past for an interrupting event.',
            'Describe what three different people are doing right now using present progressive.',
            'Rewrite in past progressive: "The rangatira spoke to the crowd. The sun set behind the hills."',
            '✦ Bonus: Write a short recount (5 sentences) of a real or imagined event. Use past progressive at least twice to set the scene before key moments.',
          ],
        }
      ),
      Wednesday: lesson(
        'Complex sentences: \'although\', \'unless\', \'while\'',
        'Extend subordination',
        {
          title: 'I Do — Conjunctions That Add Tension',
          instruction: '"Although," "unless," and "while" are subordinating conjunctions that add nuance — they create contrast, condition, and simultaneous action. Watch how each one changes the relationship between two ideas.',
          example: '"<u>Although</u> it was raining, the match continued." | "The match will continue <u>unless</u> there is lightning." | "<u>While</u> the rain fell, the players kept their positions."',
          demonstration: '"Although" = contrast (it happened despite something). "Unless" = condition (this won\'t happen IF something else does). "While" = at the same time. Each one creates a different relationship — choosing the right conjunction is part of a writer\'s craft.',
          tip: '"Although" = despite this. "Unless" = except if. "While" = at the same time as. Choose based on the relationship between your two ideas.',
        },
        {
          title: 'We Do — Choose the Right Conjunction',
          instruction: 'Complete each sentence with although, unless, or while. Then discuss why the others don\'t fit.',
          sentences: [
            '___ the journey was exhausting, Mere never once complained.',
            'The kiwi will remain endangered ___ habitat destruction is halted.',
            '___ the haka was performed, the crowd stood completely still.',
          ],
          prompt: 'Is this a contrast, a condition, or something happening simultaneously? That tells you which conjunction to use.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a complex sentence for each prompt using the conjunction given.',
          tasks: [
            'Write about a challenge you faced using "although."',
            'Write a condition for something you want to happen using "unless."',
            'Describe two things happening at the same time using "while."',
            '✦ Bonus: Write a paragraph of 5 sentences about a character facing a difficult situation. Use although, unless, and while at least once each.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: checking consistency of tense across a paragraph',
        'Revise tense flow',
        {
          title: 'I Do — Tense Drift',
          instruction: 'Tense drift happens when a piece of writing accidentally switches tense mid-way through. It\'s one of the most common errors in student writing. Watch me identify and fix it.',
          example: '"The explorer reached the ridge and looked out over the valley. She can see the river far below. She felt a surge of relief and sits down to rest."',
          demonstration: '"Reached," "looked," "felt" = past tense ✓. "Can see," "sits" = present tense ✗ — tense drift. Fixed: "She could see the river far below. She felt a surge of relief and sat down to rest." One tense throughout.',
          tip: 'Read your paragraph and underline every verb. Do they all match? If you find a present tense hiding in a past-tense paragraph — fix it.',
        },
        {
          title: 'We Do — Find the Drifters',
          instruction: 'Underline every verb in this paragraph. Circle any that don\'t match the dominant tense, then fix them.',
          sentences: [
            'The waka left the shore just before dawn. The crew paddled in silence, their breathing steady and controlled. Suddenly the wind picks up and waves begin to slap against the hull. The navigator checked the stars and calls out a course correction. Everyone digs their paddle in harder.',
          ],
          prompt: 'What tense is the paragraph mainly in? Which verbs have drifted? What should they be?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this passage with consistent tense throughout. Choose either past OR present — not both.',
          tasks: [
            'The team arrives at the marae early in the morning. They were nervous but excited. The kaiako greeted them warmly and shows them to the wharenui. Everyone sits in rows and the pōwhiri begins. The rangatira spoke first, and his voice fills the whole room.',
            '✦ Bonus: Write a recount of a real or imagined event in 5 sentences. Swap with a partner — they must underline every verb and confirm your tense is consistent throughout.',
          ],
        }
      ),
    },

    8: {
      Monday: lesson(
        'Spelling strategies: tricky high-frequency words',
        'Build spelling accuracy',
        {
          title: 'I Do — Strategies, Not Just Rules',
          instruction: 'Some words break the rules — they\'re just tricky. But every tricky word can be cracked with the right strategy. Watch me use three strategies: Look-Say-Cover-Write-Check, finding a word inside the word, and a memory trick.',
          example: '"because" → Because Elephants Can Always Use Some Eggs (first-letter mnemonic) | "necessary" → one Collar, two Socks (1 c, 2 s) | "separate" → there\'s "a rat" in sep<u>a rat</u>e',
          demonstration: '"Necessary" trips people up with the c and ss. Memory trick: one collar, two socks = 1 c, 2 s. "Separate" — people write "seperate." But if you see "a rat" hiding inside the word, you\'ll never forget it: sep-a-rat-e.',
          tip: 'For every word that trips you up, build a personal trick. Draw it, say it, find something hiding inside it. Own it.',
        },
        {
          title: 'We Do — Crack These Together',
          instruction: 'Use a spelling strategy to crack each word. Write the strategy next to the word.',
          sentences: [
            '"February" — it has a hidden "r" many people drop. Find a trick to remember it.',
            '"environment" — break it into parts: en-viron-ment. What does each part sound like?',
            '"parliament" — "I am in parlia-MENT." What trick helps you spell it correctly?',
          ],
          prompt: 'Which strategy works best for each word — mnemonics, words-within-words, or syllable breaking?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Create a spelling strategy for each word, then practise using Look-Say-Cover-Write-Check.',
          tasks: [
            '"Wednesday" — what trick helps you remember the silent d?',
            '"rhythm" — no vowels! Find a mnemonic: Rhythm Has Your Two Hips Moving.',
            '"beautiful" — Big Elephants Are Usually Tall, Intelligent, Full of Umbrella Love.',
            '✦ Bonus: Make a personal "Tricky Words" card with 5 words you often misspell. Write a strategy for each. Test yourself at the end of the week.',
          ],
        }
      ),
      Tuesday: lesson(
        'Prepositions of direction & movement',
        'Use directional prepositions accurately',
        {
          title: 'I Do — Prepositions That Show Movement',
          instruction: 'In Term 1 we used prepositions to show place (on, in, under, beside). This week we focus on prepositions that show DIRECTION and MOVEMENT — words that tell us where something is going, not just where it is.',
          example: '"The tuna swam <u>through</u> the narrow channel." | "The ball rolled <u>towards</u> the goal." | "She climbed <u>over</u> the fence and <u>along</u> the ridge."',
          demonstration: '"Through" = moving inside and out the other side. "Towards" = moving in the direction of. "Over" = moving above and past. "Along" = moving beside and parallel to. Each preposition creates a different movement picture in the reader\'s mind.',
          tip: 'Direction prepositions answer: WHERE is it going? Through, towards, over, under, across, along, past, into, out of, up, down.',
        },
        {
          title: 'We Do — Precise Movement',
          instruction: 'Choose the best directional preposition to complete each sentence.',
          sentences: [
            'The eel moved ___ (through/towards/past) the root system of the tree, disappearing into the dark water.',
            'The hawk swooped ___ (over/along/into) the ridgeline and banked sharply.',
            'The tamariki ran ___ (towards/through/along) the beach and ___ (into/over/past) the waves.',
          ],
          prompt: 'What movement is happening? Which preposition creates the most precise picture of that movement?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Complete each sentence with the most precise directional preposition you can.',
          tasks: [
            'The waka glided ___ the calm waters of the harbour and ___ the narrow inlet.',
            'The pīwakawaka darted ___ the branches, ___ the clearing, and ___ a hollow in the old tōtara.',
            'The river rushed ___ the gorge, ___ the boulders, and finally ___ the wide coastal plain.',
            '✦ Bonus: Write a paragraph tracking the movement of an animal or person through a NZ landscape. Use at least six different directional prepositions.',
          ],
        }
      ),
      Wednesday: lesson(
        'Fronted adverbials: time & contrast openers',
        'Vary writing with openers',
        {
          title: 'I Do — Two New Types of Opener',
          instruction: 'We\'ve used fronted adverbials for place and manner. This week: TIME openers (when something happens) and CONTRAST openers (something unexpected). Watch how each type changes the feel of a sentence.',
          example: 'Time: "<u>By the time the tide turned,</u> the stranded boat had begun to list badly." | Contrast: "<u>Despite the forecast,</u> the day turned out to be perfect for the regatta."',
          demonstration: 'Time openers create urgency or suspense — they anchor the reader in a moment. Contrast openers create surprise — the reader expects one thing and gets another. Both are powerful tools for making writing feel dynamic rather than flat.',
          tip: 'Time opener = when + something interesting about timing. Contrast opener = "despite / even though / in spite of" + something that makes the main clause surprising.',
        },
        {
          title: 'We Do — Build Time and Contrast Openers',
          instruction: 'Add a fronted adverbial of the type shown to each sentence.',
          sentences: [
            '"The announcement was made." (add a TIME opener)',
            '"The team had barely trained all season." (add a CONTRAST opener)',
            '"The wharenui fell silent." (add a TIME opener that builds suspense)',
          ],
          prompt: 'What time detail creates the most tension? What contrast makes the main clause most surprising?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a sentence for each prompt using the fronted adverbial type shown.',
          tasks: [
            'Write about something finishing unexpectedly. Use a TIME opener: "By the time…"',
            'Write about something succeeding despite difficulty. Use a CONTRAST opener: "Despite…"',
            'Write about a dramatic moment. Use a TIME opener: "At the exact moment…"',
            '✦ Bonus: Write a paragraph of 5 sentences about an event. Use at least two fronted adverbials — one time, one contrast. Underline each one.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: making vague sentences more specific',
        'Elaborate through editing',
        {
          title: 'I Do — The Vagueness Test',
          instruction: 'A vague sentence could apply to almost anything or anyone. A specific sentence creates a picture only this situation would create. Watch me test sentences for vagueness and make them specific.',
          example: '"Something happened and it was interesting." ✗ (Vague — could be anything.) → "The kōwhai tree outside the classroom window had shed its flowers overnight, carpeting the path in yellow." ✓',
          demonstration: 'How to make it specific: (1) Name the thing exactly. (2) Add a precise detail — colour, number, size, sound. (3) Ground it in a place or time. (4) Show, don\'t tell — describe what you observe, not just what you conclude.',
          tip: 'Ask: could this sentence describe a hundred different situations? If yes — it\'s too vague. Add one precise detail to anchor it.',
        },
        {
          title: 'We Do — Diagnose and Fix',
          instruction: 'For each vague sentence, identify why it\'s vague, then rewrite it to be specific.',
          sentences: [
            '"The animal did something interesting near the water."',
            '"The weather affected how the people felt."',
            '"Something about the place made it special."',
          ],
          prompt: 'What question does the vague sentence fail to answer? What specific detail would answer it?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each vague sentence to be vivid and specific.',
          tasks: [
            '"It was a nice place with lots of things to see."',
            '"The person did something impressive that everyone noticed."',
            '"The event was interesting and people seemed to enjoy it."',
            '✦ Bonus: Write 3 intentionally vague sentences about your day. Swap with a partner — they must make each one specific. Compare the two versions.',
          ],
        }
      ),
    },

    9: {
      Monday: lesson(
        'Alliteration & assonance as writing tools',
        'Use sound devices for effect',
        {
          title: 'I Do — The Music of Language',
          instruction: 'Alliteration repeats consonant sounds at the start of nearby words. Assonance repeats vowel sounds within words. Both make writing sound richer — almost musical. Watch me use each deliberately.',
          example: 'Alliteration: "The <u>w</u>ild <u>w</u>ind <u>w</u>histled through the <u>w</u>ires." | Assonance: "The r<u>ai</u>n f<u>ai</u>led to d<u>a</u>mpen their sp<u>i</u>rits." (ai/a sounds)',
          demonstration: 'Alliteration draws attention to a group of words — it creates emphasis and memorability. Assonance creates a slower, more musical effect — it\'s subtler but powerful in descriptive writing. Both work best when used purposefully, not just crammed in.',
          tip: 'Alliteration: same starting sound. Assonance: same vowel sound in the middle. Use them when you want a line to linger in the reader\'s ear.',
        },
        {
          title: 'We Do — Spot and Create',
          instruction: 'Identify the device used in each example, then write your own sentence using the same technique.',
          sentences: [
            '"Slowly, silently, the silver moon sailed across the sky." — What device? Write your own alliterative sentence.',
            '"The pale lake lay in the late afternoon haze." — What device? Write your own sentence using assonance.',
            '"The dark, dangerous dog darted down the driveway." — What device? Write one using the same starting sound.',
          ],
          prompt: 'What effect does each device create? Does alliteration feel different from assonance? When would you use each?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a sentence for each task using the device specified.',
          tasks: [
            'Write an alliterative sentence about a NZ animal using the sound "k" (use kiwi, kererū, kākāpō, kārearea).',
            'Write a sentence about the sea using assonance with the "ō" or "oo" sound.',
            'Write a description of a storm using both alliteration and assonance in the same sentence.',
            '✦ Bonus: Write a 4-line descriptive poem about a NZ landscape. Use alliteration in at least two lines and assonance in at least one.',
          ],
        }
      ),
      Tuesday: lesson(
        'Coordinating vs. subordinating conjunctions: review',
        'Consolidate conjunction use',
        {
          title: 'I Do — Two Types, Two Jobs',
          instruction: 'We\'ve studied both types of conjunction across Terms 1 and 2. Today we consolidate: coordinating conjunctions join equal clauses; subordinating conjunctions create a main clause and a dependent clause. Watch me demonstrate the difference clearly.',
          example: 'Coordinating: "The hīkoi was long, <u>but</u> the marchers kept going." (two equal clauses) | Subordinating: "The marchers kept going <u>although</u> the hīkoi was exhausting." (one depends on the other)',
          demonstration: 'FANBOYS (for, and, nor, but, or, yet, so) = coordinating. AAAWWUBBIS (after, although, as, when, while, until, because, before, if, since) = subordinating. Coordinating: both sides could stand alone. Subordinating: the dependent clause leans on the main clause.',
          tip: 'Test: remove the conjunction and split the sentence in two. If both halves make sense alone — coordinating. If one half sounds incomplete — subordinating.',
        },
        {
          title: 'We Do — Classify and Use',
          instruction: 'Identify whether the underlined conjunction is coordinating or subordinating, then explain how you know.',
          sentences: [
            'The kaiako waited <u>until</u> the class was completely silent.',
            'The experiment failed, <u>yet</u> the students learnt something important.',
            '<u>Because</u> the tide was out, we could walk across to the island.',
          ],
          prompt: 'Could both sides stand alone? That\'s your test. What type of relationship does each conjunction create?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write sentences using the conjunction type shown.',
          tasks: [
            'Write a compound sentence using a coordinating conjunction that shows contrast.',
            'Write a complex sentence using a subordinating conjunction that shows cause.',
            'Write a complex sentence where the subordinate clause comes FIRST (with a comma after it).',
            '✦ Bonus: Write a paragraph of 5 sentences about a place you know well. Use at least two coordinating and two subordinating conjunctions. Label each one.',
          ],
        }
      ),
      Wednesday: lesson(
        'Paragraph cohesion: pronouns as linking devices',
        'Connect ideas using pronouns',
        {
          title: 'I Do — Pronouns That Hold a Paragraph Together',
          instruction: 'We used connective words in Week 9 Term 1. This week, we focus specifically on pronouns as cohesive devices — how "he," "she," "they," "it," "this," and "these" reach back to a previous sentence and pull ideas together.',
          example: '"The tuatara is one of New Zealand\'s most ancient reptiles. <u>It</u> has barely changed in 200 million years. <u>This</u> makes <u>it</u> a living link to the age of the dinosaurs."',
          demonstration: '"It" in sentence 2 refers back to "tuatara" — no need to repeat the noun. "This" in sentence 3 refers back to the whole idea of sentence 2. Each pronoun acts like a thread, stitching sentences together into a paragraph rather than a list.',
          tip: 'After writing a paragraph, draw an arrow from each pronoun to what it refers to. Every pronoun should have a clear, unambiguous referent.',
        },
        {
          title: 'We Do — Stitch It Together',
          instruction: 'Replace the repeated nouns with appropriate pronouns to improve paragraph cohesion.',
          sentences: [
            'The pūkeko is a bold and territorial bird. The pūkeko will often chase away much larger animals. The pūkeko\'s bright red beak makes the pūkeko easy to spot in wetland areas. Despite the pūkeko\'s aggression, the pūkeko is a beloved part of the New Zealand landscape.',
          ],
          prompt: 'Which nouns can be replaced with pronouns? Are there any where replacing would cause confusion about what the pronoun refers to?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this paragraph so pronouns link the sentences together without causing ambiguity.',
          tasks: [
            'The kākāpō is a large, flightless parrot. The kākāpō is critically endangered. Conservation teams monitor every single kākāpō. Each kākāpō has a name and a tracking pack. The tracking pack helps conservation teams follow each kākāpō\'s movements across the island.',
            '✦ Bonus: Write a paragraph of 5 sentences about a NZ animal or place. Use a different pronoun in at least three sentences to link back to the subject. Make sure every pronoun is unambiguous.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: identifying weak sentence openings',
        'Revise sentence variety',
        {
          title: 'I Do — The Weak Opening Problem',
          instruction: 'When every sentence starts the same way — especially with "The" or "I" — writing becomes monotonous. Watch me diagnose a passage with weak sentence openings and revise it.',
          example: '"The sky was dark. The clouds gathered quickly. The wind picked up. The rain began to fall. The thunder rolled in from the south."',
          demonstration: 'Five sentences. Every one starts with "The." The reader\'s eye glazes over. Revision: "Dark clouds gathered quickly. As the wind picked up, the first drops of rain began to fall. From the south, thunder rolled in — low and threatening." Varied openers: adjective, adverbial, fronted phrase.',
          tip: 'List the first word of every sentence in your paragraph. If more than two start the same way — vary them. Use: adverbials, adjectives, conjunctions, or rearranged sentence order.',
        },
        {
          title: 'We Do — Diagnose Together',
          instruction: 'List the first word of each sentence in this passage. Identify the pattern. Then rewrite three sentences with different openers.',
          sentences: [
            'I arrived at school early. I put my bag in my locker. I went to find my friends. I sat down and waited for the bell. I felt nervous about the day ahead.',
          ],
          prompt: 'What pattern do you see? What three different ways could you begin these sentences instead?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this paragraph, varying the sentence openings so no two consecutive sentences start the same way.',
          tasks: [
            'The match started well. The team scored early. The crowd cheered loudly. The other team fought back. The score was level at half time. The players looked tired. The coach spoke to them firmly. The second half began.',
            '✦ Bonus: Write a paragraph of 6 sentences about any topic. Make a rule: no two sentences may start with the same word. List the opening word of each sentence underneath.',
          ],
        }
      ),
    },

    10: {
      Monday: lesson(
        'Review: punctuation marks covered in Term 2',
        'Consolidate punctuation',
        {
          title: 'I Do — Term 2 Punctuation in One Passage',
          instruction: 'Let\'s bring all of Term 2\'s punctuation skills together. Watch me read a passage and identify every punctuation mark, naming the rule it follows.',
          example: '"Despite the rain (which had been falling since dawn), the market was busy: stalls selling honey, pottery, and bread lined both sides of the path. \"We\'ve never missed a Saturday,\" said the stallholder, smiling."',
          demonstration: 'Comma after fronted adverbial ✓ | Brackets for extra info ✓ | Colon introducing a list ✓ | Commas in list ✓ | Speech marks and comma before closing mark ✓ | Capital at sentence start ✓. One passage — six rules.',
          tip: 'When reviewing punctuation, go mark by mark: comma, colon, semicolon, dash, bracket, speech mark. Name the rule each one is following.',
        },
        {
          title: 'We Do — Punctuation Audit',
          instruction: 'Read this passage and name every punctuation mark you can find. For each one, state the rule it is following.',
          sentences: [
            '"Although the weather was cold, the crowd — several hundred people — had gathered on the waterfront. The mayor announced three things: free transport, extended opening hours, and a fireworks display. \'This is for everyone,\' she said, \'not just those who can afford it.\'"',
          ],
          prompt: 'Go through mark by mark. What is each one doing? Can you find one of every type from Term 2?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this unpunctuated passage, adding all correct punctuation marks.',
          tasks: [
            'although they had trained for months the team were nervous before the final the coach gave them three reminders breathe together trust each other and enjoy the moment its not just a game she said its a chance to show what youre made of',
            '✦ Bonus: Write your own paragraph of 5–6 sentences that deliberately uses: a comma after a fronted adverbial, brackets, a colon, a semicolon, and speech marks. Underline each one and label it.',
          ],
        }
      ),
      Tuesday: lesson(
        'Review: grammar concepts from Term 2',
        'Consolidate grammar',
        {
          title: 'I Do — Term 2 Grammar Recap',
          instruction: 'We covered a lot of grammar this term. Let me recap the key concepts with one example of each, so we have them all in one place.',
          example: '"Going to" vs "will" | Progressive tense: was/were + -ing | Relative pronouns: who, which, that | Tricky SVA: everyone was, each has | Collective/abstract nouns | Directional prepositions',
          demonstration: '"Everyone was present when the kuia, who had travelled from Rotorua, finally arrived. The group had been waiting for over an hour. Despite the delay, they were going to make the most of the time that remained."  — find: tricky SVA (everyone was), relative pronoun (who), past progressive (had been waiting), contrast conjunction (despite), future tense (going to), relative pronoun (that).',
          tip: 'When reviewing grammar, look at one sentence at a time. Identify: subject, verb, any clauses, any pronouns, any conjunctions.',
        },
        {
          title: 'We Do — Grammar Hunt',
          instruction: 'In the passage below, find and label one example of each grammar concept from Term 2.',
          sentences: [
            '"Although everyone in the group was exhausted, they were still paddling steadily towards the shore. The waka, which had been built by the students themselves, was holding up well. Each of the crew knew that unless they kept their rhythm, the current was going to push them off course."',
          ],
          prompt: 'Can you find: tricky SVA, progressive tense, relative pronoun, subordinating conjunction, directional preposition, future tense?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a sentence that demonstrates each grammar concept from Term 2.',
          tasks: [
            'Write a sentence using "everyone" or "each" with the correct singular verb.',
            'Write a sentence using the past progressive to set a scene.',
            'Write a sentence with a relative clause using "which" (add commas).',
            'Write a compound sentence using a FANBOYS conjunction and a complex sentence using "although."',
            '✦ Bonus: Write a paragraph of 6 sentences that includes at least one example of every grammar concept from Term 2.',
          ],
        }
      ),
      Wednesday: lesson(
        'Review: sentence structures from Term 2',
        'Consolidate sentence skills',
        {
          title: 'I Do — The Term 2 Sentence Toolkit',
          instruction: 'This term we added several tools to our sentence-building toolkit. Watch me write one sentence of each type, showing what makes each one effective.',
          example: 'Comma after fronted adverbial: "Before the tide turned, the waka was safely ashore." | When/because expansion: "The crowd fell silent because the rangatira had raised her hand." | Combined sentence: "The kārearea, a native falcon, is the fastest bird in Aotearoa." | Complex with although/unless/while: "Although the climb was steep, no one asked to stop."',
          demonstration: 'Each sentence type serves a purpose. Fronted adverbials vary openers. When/because expansions explain. Combined sentences condense. Although/unless/while sentences show nuance. A skilled writer chooses the right type for the right moment.',
          tip: 'Review your own writing. Can you spot sentences that could be upgraded to a more interesting type? Try converting a simple sentence into each type in turn.',
        },
        {
          title: 'We Do — Identify and Build',
          instruction: 'Identify the sentence type used in each example, then write your own sentence of that type.',
          sentences: [
            '"Despite the early start, the tamariki were wide awake and eager to begin."',
            '"The river, which flows from the central plateau to the sea, is a taonga to the iwi of the region."',
            '"While the bread was baking, the whānau set the table for the hākari."',
          ],
          prompt: 'What makes each sentence type distinctive? What job does it do that a simple sentence can\'t?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write one sentence of each type as a showcase of your Term 2 sentence skills.',
          tasks: [
            'A sentence with a fronted adverbial of contrast ("Despite…" or "Although…,").',
            'A sentence expanded with a "because" clause at the back.',
            'A combined sentence using an appositive (e.g. "The kiwi, a nocturnal bird,…").',
            'A complex sentence using "unless" or "while."',
            '✦ Bonus: Write a paragraph of 5–6 sentences about Aotearoa. Use a different sentence type from this list in each sentence. Label each type in the margin.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: full-passage edit using Term 2 checklist',
        'Apply all Term 2 skills',
        {
          title: 'I Do — The Term 2 Editing Checklist',
          instruction: 'Our Term 2 editing checklist has 6 passes — one for each key skill. Watch me work through a passage using the checklist systematically.',
          example: 'Pass 1: Comma after every fronted adverbial | Pass 2: Apostrophes (contraction & possession) | Pass 3: Colon/semicolon usage | Pass 4: Vague words (nice, good, went, got) | Pass 5: Tense consistency | Pass 6: Sentence opener variety',
          demonstration: '"Despite the forecast it was a nice day. The students went to the beach and got really tired. everyone was happy said the teacher." | Pass 1: add comma after "forecast" ✓ | Pass 4: "nice" → vivid, "went" → walked, "got" → grew ✓ | Pass 5: consistent past ✓ | Pass 6: vary "Everyone" opener ✓',
          tip: 'Six passes, six focuses. Don\'t try to catch everything in one read — you\'ll miss things. One pass, one rule.',
        },
        {
          title: 'We Do — Checklist Pass Together',
          instruction: 'Work through this passage using the Term 2 checklist. Do one pass at a time.',
          sentences: [
            '"although it was getting late the students was still working on their projects. Each of them were determined to finish. The work was really good and everyone said nice things about it. While the kaiako was watching she seen how hard they worked and felt proud."',
          ],
          prompt: 'Pass 1: fronted adverbial comma? Pass 2: apostrophes? Pass 3: colons/semicolons needed? Pass 4: vague words? Pass 5: tense consistent? Pass 6: opener variety?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Apply the full Term 2 checklist to this passage. Mark each error type with a different colour or symbol.',
          tasks: [
            '"After the long weekend the class shared what they done. Some students went on trips others stayed home. everyone had a good time doing things they like. The kaiako said it was really nice to hear their stories and that it was a good way to start the week. despite the tiredness everyone was glad to be back."',
            '✦ Bonus: Self-edit a piece of your own writing using the Term 2 checklist. Annotate it: mark every change you make and label which pass it belongs to.',
          ],
        }
      ),
    },

  },

  3: { 1: { Monday: lesson('Tier 2 vocabulary: words for feelings & emotion','Select emotive vocabulary',{title:'I Do',instruction:'Precise emotion vocabulary moves readers. Watch me build an "emotion word ladder" — from mild to intense.',example:'sad → unhappy → miserable → devastated → heartbroken',demonstration:'Each word is more intense. A character who is "unhappy" about losing a game feels different from one who is "devastated." Choosing the right level signals to the reader how much this matters.',tip:'Match the emotion word to the story\'s stakes. Small disappointment → "disappointed." Life-changing loss → "devastated."'},{title:'We Do',instruction:'Build emotion ladders for these feelings together.',sentences:['angry → ___ → ___ → ___ → ___','happy → ___ → ___ → ___ → ___'],prompt:'Which word would you use in a funny story? Which in a dramatic one?'},{title:'You Do',instruction:'Replace each plain emotion word with one from the correct intensity level.',tasks:['She was <u>sad</u> when her goldfish died. (use devastated or heartbroken)','He was <u>happy</u> when his name was called. (mild — use pleased or delighted)','The crowd was <u>angry</u> at the decision. (intense — use furious or outraged)','✦ Bonus: Write an "emotion ladder" for "scared" with 6 levels from mild to extreme.']}), Tuesday: lesson('Nouns revisited: count vs. non-count nouns','Deepen noun understanding',{title:'I Do',instruction:'Count nouns can be counted and have plurals. Non-count (mass) nouns cannot be counted and have no plural form.',example:'Count: one book, two books ✓ | Non-count: one sand, two sands ✗',demonstration:'"Sand" — you can\'t say "two sands." You say "some sand," "a grain of sand." Other non-count: water, music, advice, furniture, information. With count nouns you use "a/an" or numbers. With non-count you use "some," "much," "a lot of."',tip:'"Much" = non-count ("much water"). "Many" = count ("many cups"). If you\'re unsure, try adding a number — if it sounds wrong, it\'s non-count.'},{title:'We Do',instruction:'Sort these nouns and choose the correct determiner (some/a/an/many/much).',sentences:['___ furniture | ___ chairs | ___ advice | ___ suggestions | ___ lightning'],prompt:'Count or non-count? Which determiner fits?'},{title:'You Do',instruction:'Correct the non-count noun errors in these sentences.',tasks:['She gave me a lot of advices about the exam.','We need two furnitures for the new room.','Can I have some informations about the trip?','There were many thunders during the storm.','✦ Bonus: Write 6 sentences — 3 using count nouns correctly, 3 using non-count nouns correctly.']}), Wednesday: lesson('Simple sentences: revisit in narrative context','Apply in narrative writing',{title:'I Do',instruction:'In narrative, simple sentences aren\'t just exercises — they\'re dramatic tools. Watch how a string of short simple sentences creates suspense.',example:'"She stopped. She listened. The floorboard creaked. Someone was there."',demonstration:'Each sentence is complete. Each ends with a full stop — a tiny pause. That rhythm creates tension. Compare: "She stopped and listened because a floorboard creaked and someone was there." — all the information, but none of the tension.',tip:'In action or suspense moments, break your writing into short simple sentences. Let the reader feel every beat.'},{title:'We Do',instruction:'Rewrite this rushed description as a series of short simple sentences to build suspense.',sentences:['The old house was dark and silent and the child walked slowly up the creaking staircase and then she heard a sound coming from behind the closed door at the end of the hall.'],prompt:'Where are the moments of tension? Break them apart.'},{title:'You Do',instruction:'Write a 5-sentence suspense sequence using only simple sentences. Then label the effect each creates.',tasks:['Scene: a character is alone in a forest at night and hears something.','Must use: 5 simple sentences, each 5–8 words. No conjunctions.','✦ Bonus: Now rewrite the same scene using one long complex sentence. Compare the effect.']}), Thursday: lesson('Proofreading: dialogue punctuation (speech marks)','Edit dialogue conventions',{title:'I Do',instruction:'Dialogue (speech) has its own punctuation rules. Watch me show the five key rules with examples.',example:'"I think we\'re lost," she whispered.\n"Lost?" said Tom. "Are you sure?"\n"Yes," she replied. "Completely."',demonstration:'Rule 1: Speech marks around the spoken words. Rule 2: Comma (not full stop) before the closing speech mark if a speech tag follows. Rule 3: The speech tag (she whispered) is NOT capitalised after the comma. Rule 4: New speaker = new line. Rule 5: Punctuation inside the speech marks.',tip:'Ask: is the full stop job done by the comma? If there\'s a speech tag, the period becomes a comma inside the speech marks.'},{title:'We Do',instruction:'Fix the dialogue punctuation in these exchanges.',sentences:['"We should go" said Marcus "before it gets dark."','Anna replied "but I havent finished yet"','"Look out screamed the driver'],prompt:'Apply the 5 rules one at a time. What is wrong with each line?'},{title:'You Do',instruction:'Rewrite this dialogue with correct punctuation throughout.',tasks:['"where are we going asked lily\n"to the market said dad I need to get some things\n"can I have a sausage she asked\n"if you\'re good he replied\n✦ Bonus: Write a 6-line dialogue between two characters. Apply all 5 dialogue punctuation rules perfectly.']}) },

    2: {
      Monday: lesson(
        'Commas in complex sentences (before \'but\', \'although\')',
        'Punctuate clauses correctly',
        {
          title: 'I Do — The Comma Before the Turn',
          instruction: 'When we join two clauses with "but" or "although," a comma signals the turn in the sentence — the moment where the meaning shifts. Watch me show when the comma is needed and when it isn\'t.',
          example: '"She trained hard every day<u>,</u> but she still felt unprepared." | "<u>Although</u> she trained hard every day<u>,</u> she still felt unprepared."',
          demonstration: '"But" joining two complete clauses = comma before "but." "Although" at the start of a sentence = comma after the subordinate clause, before the main clause. If "although" is in the middle, no comma: "She still felt unprepared although she had trained hard."',
          tip: 'Comma before "but" when both sides are complete clauses. Comma after a clause starting with "although" when it comes first.',
        },
        {
          title: 'We Do — Add or Remove the Comma',
          instruction: 'Decide whether each sentence needs a comma, already has one correctly, or has one in the wrong place.',
          sentences: [
            'The pōhutukawa was blooming but the bees had not yet arrived.',
            'Although the water was cold she jumped in without hesitating.',
            'He wanted to speak but, he couldn\'t find the right words.',
          ],
          prompt: 'Is the comma in the right place? Is there a complete clause on both sides of "but"? Does "although" come at the front or middle?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Add commas where needed in each sentence.',
          tasks: [
            'The tāniko weaving was intricate but she finished it in two evenings.',
            'Although the hīkoi had been going for three days the group showed no sign of stopping.',
            'He was tired but determined to reach the hut before dark.',
            'Although kiwi are nocturnal they are occasionally spotted during the day.',
            '✦ Bonus: Write 4 sentences — two using "but" and two using "although." Make sure every comma is correct.',
          ],
        }
      ),
      Tuesday: lesson(
        'Verb types: modal verbs (\'might\', \'should\', \'could\')',
        'Use modal verbs accurately',
        {
          title: 'I Do — Verbs That Signal Possibility and Obligation',
          instruction: 'Modal verbs don\'t describe actions — they describe the writer\'s attitude toward an action: how certain it is, how necessary it is, how permitted it is. Watch me use each one deliberately.',
          example: '"You <u>must</u> wear a life jacket." (obligation) | "You <u>should</u> bring water." (advice) | "It <u>might</u> rain." (possibility) | "You <u>could</u> take the shorter track." (option)',
          demonstration: 'Must = obligation/certainty. Should = advice/expectation. Could/might/may = possibility. Would = conditional. Each choice signals a different level of authority or certainty. "You must" is a rule. "You should" is advice. "You might want to" is a gentle suggestion.',
          tip: 'Ask: am I giving a rule, advice, or a possibility? Must → rule. Should → advice. Could/might → possibility.',
        },
        {
          title: 'We Do — Choose the Right Modal',
          instruction: 'Choose the modal verb that best fits the context and explain why.',
          sentences: [
            'Visitors to the kāinga ___ (must/should/might) remove their shoes before entering the wharenui.',
            'The weather forecast says it ___ (must/could/should) be cloudy by afternoon.',
            'Students ___ (might/should/must) proofread their work before submitting it.',
          ],
          prompt: 'Is this a rule, advice, or a possibility? Which modal signals that meaning most clearly?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence using the modal verb that fits the context.',
          tasks: [
            'It is obligatory to wear a helmet when cycling. (use "must")',
            'It would be a good idea to drink plenty of water on the tramp. (use "should")',
            'There is a chance the ferry will be cancelled due to rough seas. (use "might")',
            '✦ Bonus: Write a short set of instructions or guidelines (5 sentences) using at least four different modal verbs. Label each one.',
          ],
        }
      ),
      Wednesday: lesson(
        'Expanding sentences: show don\'t tell technique',
        'Infer emotion through detail',
        {
          title: 'I Do — Don\'t Label, Demonstrate',
          instruction: '"Show don\'t tell" means instead of labelling an emotion or quality, you describe the physical details that let the reader feel it themselves. Watch me transform a telling sentence into a showing one.',
          example: '"She was nervous." (telling) → "Her fingers twisted the hem of her kākahu and she kept glancing at the door." (showing)',
          demonstration: 'The first sentence names the emotion. The second shows physical evidence — we SEE the nervousness without being told it. The reader infers the feeling. That inference is what makes writing engaging. Telling is a shortcut. Showing is the journey.',
          tip: 'Telling = naming the feeling. Showing = describing the physical symptoms of that feeling. What does the body do? What does the face do? What does the person notice?',
        },
        {
          title: 'We Do — Transform Together',
          instruction: 'Transform each "telling" sentence into a "showing" sentence with at least two physical details.',
          sentences: [
            '"He was excited about the game."',
            '"The old whare felt lonely and forgotten."',
            '"She was furious."',
          ],
          prompt: 'What physical signs show this emotion? What would you SEE if you were watching this person or place?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each telling sentence as a showing sentence.',
          tasks: [
            '"The boy was embarrassed."',
            '"The classroom felt tense before the results were announced."',
            '"She was proud of what she had made."',
            '"The forest seemed threatening at night."',
            '✦ Bonus: Write a paragraph of 5 sentences describing a character in a strong emotional state — without ever naming the emotion. See if a partner can identify the feeling from your description alone.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: fixing poorly punctuated dialogue',
        'Revise dialogue errors',
        {
          title: 'I Do — The Five Dialogue Rules in Practice',
          instruction: 'We covered dialogue rules in Term 3 Week 1. Now we apply them to editing — finding what\'s wrong and fixing it. Watch me work through a broken dialogue passage.',
          example: '"Where are we going asked Rangi\n"I\'m not sure said Aroha. I think we\'re lost\n"Lost? she said. But I thought you knew the way."',
          demonstration: 'Errors found: (1) Missing speech marks around "Where are we going" and "I\'m not sure." (2) Missing comma before closing speech mark — "going" needs a comma. (3) Missing capital on "she" after a new speech mark. (4) Missing question mark inside the speech marks. Fixed version: "\'Where are we going?\' asked Rangi. \'I\'m not sure,\' said Aroha. \'I think we\'re lost.\' \'Lost?\' she said. \'But I thought you knew the way.\'"',
          tip: 'Five checks for every line of dialogue: (1) Speech marks? (2) Comma or ? before closing mark? (3) Speech tag lowercase? (4) New speaker, new line? (5) Punctuation inside the marks?',
        },
        {
          title: 'We Do — Fix Together',
          instruction: 'Fix all dialogue punctuation errors in this passage.',
          sentences: [
            '"Come on called Hemi Were going to miss the bus\n"I\'m coming She shouted back I just need my bag\n"Hurry up he said the driver wont wait"',
          ],
          prompt: 'Go through the five checks for each line. How many errors can you find? Are there any lines with more than one error?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this dialogue with all punctuation errors corrected.',
          tasks: [
            '"do you think they\'ll win asked Tia\n"It\'s hard to say said her dad. they\'ve been training really hard though\n"I hope so she said. they deserve it\n"whatever happens he replied, I\'m proud of them"',
            '✦ Bonus: Write a 6-line dialogue between two characters about a decision they need to make together. Apply all five dialogue rules perfectly. Swap with a partner to check.',
          ],
        }
      ),
    },

    3: {
      Monday: lesson(
        'Connotation: positive vs. negative word choice',
        'Choose words for effect',
        {
          title: 'I Do — Words With Attitude',
          instruction: 'Connotation is the feeling or association a word carries beyond its literal meaning. Two words can describe the same thing but make the reader feel very differently about it. Watch me show how connotation shapes a reader\'s response.',
          example: '"The politician was <u>determined</u>." (positive) vs "The politician was <u>stubborn</u>." (negative) | "She was <u>thrifty</u>." vs "She was <u>cheap</u>."',
          demonstration: '"Determined" and "stubborn" both describe someone who doesn\'t change their mind easily — but "determined" sounds admirable and "stubborn" sounds annoying. Same behaviour, opposite feeling. Word choice is never neutral. Every word carries a connotation.',
          tip: 'Ask: does this word make the subject seem positive, negative, or neutral? What feeling do I want the reader to have? Choose accordingly.',
        },
        {
          title: 'We Do — Flip the Connotation',
          instruction: 'For each word, find a word with the opposite connotation that describes the same quality.',
          sentences: [
            '"slender" (positive) → ___ (negative)',
            '"assertive" (positive) → ___ (negative)',
            '"thrifty" (positive) → ___ (negative)',
          ],
          prompt: 'Can you find pairs where you\'d use each word? When would a writer deliberately choose the negative connotation?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence twice — once with positive connotation, once with negative.',
          tasks: [
            'Describe a person who talks a lot. (positive version / negative version)',
            'Describe a person who takes charge in a group. (positive / negative)',
            'Describe a place that is very old. (positive / negative)',
            '✦ Bonus: Find a news headline or advertisement. Identify two words with strong positive or negative connotations. Rewrite the headline changing those words to shift the reader\'s response.',
          ],
        }
      ),
      Tuesday: lesson(
        'Subject-verb agreement: collective nouns',
        'Apply agreement with collective nouns',
        {
          title: 'I Do — One Word, Many People',
          instruction: 'Collective nouns name a group as a single unit. In New Zealand English, they\'re usually treated as singular — but some cases are genuinely tricky. Watch me work through the rules.',
          example: '"The team <u>is</u> ready." (NZ English — team as one unit) | "The crew <u>were</u> exhausted." (British English — acceptable in NZ too) | "The jury <u>has</u> reached a verdict."',
          demonstration: 'In formal NZ writing, treat collective nouns as singular: "The government has announced…" "The band is performing…" "The committee was divided…" But when you\'re emphasising individual members acting separately, plural can work: "The team were arguing among themselves."',
          tip: 'Is the group acting as ONE unit? Singular verb. Are the members acting separately? Plural verb. When in doubt — singular is safer in formal writing.',
        },
        {
          title: 'We Do — Choose the Verb',
          instruction: 'Choose the correct verb for each sentence and explain whether the group is acting as one unit or separately.',
          sentences: [
            'The iwi ___ (has/have) agreed to a joint statement.',
            'The flock of kākāpō ___ (was/were) relocated to a predator-free island.',
            'The committee ___ (is/are) divided on the proposal.',
          ],
          prompt: 'Is the group acting as one? Or are individuals doing different things? That decides singular or plural.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write the correct form of the verb in brackets.',
          tasks: [
            'The school choir ___ (perform/performs) every Friday at assembly.',
            'The pack of hunting dogs ___ (was/were) scattered across the hillside.',
            'The fleet of waka ___ (has/have) left the harbour.',
            'The audience ___ (was/were) on their feet by the end.',
            '✦ Bonus: Write 5 sentences using different collective nouns (team, flock, pack, crew, mob). Decide whether each one takes a singular or plural verb and explain your choice.',
          ],
        }
      ),
      Wednesday: lesson(
        'Compound sentences in narrative: building tension',
        'Use conjunctions for effect',
        {
          title: 'I Do — Conjunctions That Create Drama',
          instruction: 'In narrative writing, the conjunction you choose doesn\'t just connect ideas — it controls tension and pace. Watch me use compound sentences deliberately to build and release tension.',
          example: '"The door opened <u>and</u> she walked in." (neutral) | "The door opened <u>but</u> no one was there." (tension) | "The door opened <u>yet</u> the room was silent." (unease)',
          demonstration: '"And" simply adds — the story moves forward. "But" creates contrast — something unexpected. "Yet" creates unease — the situation feels wrong. Same structure, very different effect. In narrative, "but" and "yet" are tension builders. "So" provides relief or resolution.',
          tip: 'In tense narrative moments, reach for "but" or "yet" instead of "and." They create contrast and unease. Save "so" for resolution.',
        },
        {
          title: 'We Do — Build Tension Together',
          instruction: 'Rewrite each sentence using a different conjunction. How does the tension change?',
          sentences: [
            '"She called out and nobody answered." → rewrite with "but"',
            '"He heard a sound and he kept walking." → rewrite with "yet"',
            '"The light flickered and she grabbed her torch." → rewrite with "but"',
          ],
          prompt: 'How does changing the conjunction shift the feeling of the sentence? Which version creates more tension?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a compound sentence for each situation using the conjunction given to create the effect shown.',
          tasks: [
            'A character hears something in the dark. Use "but" to create tension.',
            'A character reaches safety. Use "so" to show relief.',
            'Something looks fine but feels wrong. Use "yet" to create unease.',
            '✦ Bonus: Write a paragraph of 5–6 sentences describing the build-up to a tense moment in a narrative. Use at least three different FANBOYS conjunctions deliberately for effect. Label each one and explain the effect it creates.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: upgrading adjectives for atmosphere',
        'Revise for mood',
        {
          title: 'I Do — Adjectives That Set the Mood',
          instruction: 'In narrative, adjectives don\'t just describe — they create atmosphere. A "dark forest" is neutral. A "suffocating forest" creates dread. A "whispering forest" creates mystery. Watch me upgrade adjectives to match the mood of a scene.',
          example: '"The <u>old</u> house stood at the end of the <u>quiet</u> road." (neutral) → "The <u>decrepit</u> house loomed at the end of the <u>forsaken</u> road." (dread)',
          demonstration: '"Old" describes age. "Decrepit" implies age AND neglect AND threat. "Quiet" is neutral. "Forsaken" carries loneliness and abandonment. When editing for atmosphere, ask: does this adjective carry the mood I want? If not — upgrade it.',
          tip: 'For each adjective: ask "what mood does this create?" If it\'s neutral when the scene needs tension — find an adjective that carries the mood.',
        },
        {
          title: 'We Do — Match the Adjective to the Mood',
          instruction: 'Upgrade the underlined adjectives to match the mood shown in brackets.',
          sentences: [
            '"A <u>big</u> wave hit the <u>old</u> boat." (mood: danger)',
            '"The <u>nice</u> morning light came through the <u>small</u> window." (mood: peaceful/safe)',
            '"She opened the <u>heavy</u> door to the <u>dark</u> room." (mood: dread)',
          ],
          prompt: 'What connotation does your upgraded adjective carry? Does it match the mood of the scene?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence, upgrading the adjectives to create the mood shown.',
          tasks: [
            '"The <u>big</u> storm hit the <u>small</u> town." → upgrade for dramatic impact.',
            '"The <u>quiet</u> forest was full of <u>tall</u> trees." → upgrade for mystery.',
            '"She walked into the <u>nice</u> garden on the <u>warm</u> day." → upgrade for peacefulness.',
            '✦ Bonus: Write a paragraph describing a setting twice — once with neutral adjectives, once with adjectives that create a specific mood of your choice. Compare the two versions.',
          ],
        }
      ),
    },

    4: {
      Monday: lesson(
        'Apostrophes revisited: tricky plurals (\'children\'s\')',
        'Apply apostrophe rules to irregular plurals',
        {
          title: 'I Do — When the Plural Doesn\'t End in S',
          instruction: 'We know the rule: plural + s → apostrophe after the s (dogs\'). But irregular plurals don\'t end in s — so they follow a different rule. Watch me show how possession works with irregular plurals.',
          example: '"the toys belonging to the children" → "the <u>children\'s</u> toys" | "the rights of the people" → "the <u>people\'s</u> rights" | "the habitat of the mice" → "the <u>mice\'s</u> habitat"',
          demonstration: 'Regular plural: dogs → dogs\' (apostrophe after the s). Irregular plural: children → children\'s (apostrophe + s, because "children" doesn\'t end in s). Rule: if the plural does NOT end in s, add apostrophe + s. If it DOES end in s, just add the apostrophe.',
          tip: 'Check the plural form. Does it end in s? → apostrophe only (dogs\'). Doesn\'t end in s? → apostrophe + s (children\'s, women\'s, people\'s).',
        },
        {
          title: 'We Do — Apply the Rule',
          instruction: 'Write the possessive form of each irregular plural noun.',
          sentences: [
            'the books belonging to the children → ___',
            'the decision made by the people → ___',
            'the nests used by the geese → ___',
          ],
          prompt: 'Does the plural end in s or not? That determines where the apostrophe goes.',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write the correct possessive form for each noun in brackets.',
          tasks: [
            'This is a school that respects ___ (children) voices.',
            'The ___ (women) changing rooms are through that door.',
            'We need to protect ___ (people) access to clean water.',
            'The ___ (sheep) wool was thick from a cold winter.',
            '✦ Bonus: Write 5 sentences using possessive apostrophes — two with regular plurals (dogs\', teachers\'), two with irregular plurals (children\'s, women\'s), and one singular possessive (the kaiako\'s). Label each one.',
          ],
        }
      ),
      Tuesday: lesson(
        'Pronoun reference: avoiding ambiguity',
        'Revise for clarity',
        {
          title: 'I Do — When "He" Could Be Anyone',
          instruction: 'A pronoun must refer clearly to one specific noun. When the pronoun could refer to more than one noun, the sentence becomes ambiguous. Watch me identify ambiguous pronouns and fix them.',
          example: '"When Tama met Rangi, <u>he</u> was nervous." ✗ (Who was nervous — Tama or Rangi?) → "When Tama met Rangi, <u>Tama</u> was nervous." ✓',
          demonstration: '"She told her mother that she had passed the test." — who passed? The daughter or the mother? Fix: "Maya told her mother, \'I passed the test.\'" Or: "Maya told her mother that Maya had passed the test." It feels clunky to repeat the name — but ambiguity is worse. Restructuring the sentence is often the best solution.',
          tip: 'Point to each pronoun. Ask: could this refer to more than one noun in the sentence? If yes — rename or restructure.',
        },
        {
          title: 'We Do — Diagnose and Fix',
          instruction: 'Identify the ambiguous pronoun in each sentence and rewrite to make it clear.',
          sentences: [
            '"Hemi and his brother argued until he finally apologised."',
            '"The kaiako handed the student her report and told her to read it carefully."',
            '"When the cat chased the mouse, it ran behind the fridge."',
          ],
          prompt: 'Who does "he," "her," or "it" refer to? Is there more than one possible answer? How can you restructure to remove the ambiguity?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite each sentence to remove the ambiguous pronoun.',
          tasks: [
            '"Wiremu and his dad argued all the way to the marae. He eventually went quiet."',
            '"The teacher told the student that she needed to redo her introduction."',
            '"Aroha rang her nanny and told her about the award. She was delighted."',
            '✦ Bonus: Write 3 deliberately ambiguous sentences using pronouns. Swap with a partner — they must rewrite each one to remove the ambiguity.',
          ],
        }
      ),
      Wednesday: lesson(
        'Topic sentences: narrative paragraph introductions',
        'Apply to narrative writing',
        {
          title: 'I Do — The Topic Sentence in a Story',
          instruction: 'We\'ve written topic sentences for information and persuasion. In narrative, a topic sentence sets the scene, introduces a character, or signals what this paragraph of the story will be about — without telling the reader everything at once.',
          example: '"The clearing was the last place Hemi expected to feel afraid." | "From the moment she stepped off the plane, everything was different."',
          demonstration: 'Both sentences are topic sentences that open a narrative paragraph. They: (1) hint at what\'s coming, (2) create immediate intrigue, (3) commit the paragraph to a specific focus — fear in the clearing, difference after the arrival. A strong narrative topic sentence makes the reader want to continue.',
          tip: 'A narrative topic sentence should create a question in the reader\'s mind — "Why? What happened? What was different?" It promises the paragraph will answer that question.',
        },
        {
          title: 'We Do — Rate and Improve',
          instruction: 'Rate each topic sentence (weak/okay/strong) and explain why. Then improve the weak ones.',
          sentences: [
            '"This paragraph is about when Aroha got lost in the bush."',
            '"The track disappeared beneath a mat of wet leaves."',
            '"Then something happened that changed everything."',
          ],
          prompt: 'Does the sentence create intrigue? Does it hint without telling? Does it commit to a specific focus?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a narrative topic sentence for each paragraph focus.',
          tasks: [
            'A paragraph about a character arriving somewhere unfamiliar.',
            'A paragraph about the moment a competition turns.',
            'A paragraph about a place that feels threatening at night.',
            '✦ Bonus: Write three narrative topic sentences for three consecutive paragraphs of a story. Each one should create intrigue AND signal what that paragraph will be about. Then write the first paragraph in full.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: pronoun clarity in a short narrative',
        'Revise pronoun use',
        {
          title: 'I Do — The Pronoun Clarity Edit',
          instruction: 'Narrative writing often has multiple characters — which makes pronoun clarity critical. Watch me edit a short passage where pronouns have become confusing, using rename-and-restructure strategies.',
          example: '"Maia and Tui raced down the hill. She tripped and fell. She stopped to help her up. She said she was okay."',
          demonstration: 'Four sentences. Every pronoun is "she" — but there are two characters. Which "she" is which? Edit: "Maia and Tui raced down the hill. Tui tripped and fell. Maia stopped to help her up. \'I\'m okay,\' Tui said." Now every pronoun has a clear referent. Direct speech also resolves ambiguity naturally.',
          tip: 'When editing narrative with multiple characters: (1) Underline every pronoun. (2) Draw an arrow to the noun it refers to. (3) If any arrow is ambiguous — rename or restructure.',
        },
        {
          title: 'We Do — Edit Together',
          instruction: 'Underline every pronoun in this passage. Draw arrows to show what each one refers to. Fix any that are ambiguous.',
          sentences: [
            '"Rangi and his uncle walked down to the river. He carried the fishing rods and he carried the bait. When they reached the spot, he set up the lines while he gathered firewood. He said he had fished here since he was young."',
          ],
          prompt: 'Which pronouns are clear? Which could refer to more than one person? How would you fix each one?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Rewrite this passage so every pronoun is unambiguous.',
          tasks: [
            '"Aroha and her nanny sat on the steps. She told her about the time she had walked the Tongariro Crossing. She said she had been exhausted but that she had never felt more proud. She listened carefully and said she wanted to do it too one day."',
            '✦ Bonus: Write a 5-sentence narrative about two characters of the same gender. Make every pronoun 100% clear — use names, restructuring, and direct speech to achieve this.',
          ],
        }
      ),
    },

    5: {
      Monday: lesson(
        'Ellipsis for suspense and trailing off',
        'Use ellipsis for effect',
        {
          title: 'I Do — Three Dots, Two Jobs',
          instruction: 'The ellipsis (...) has two main jobs in creative writing: building suspense (something is about to happen) and trailing off (a thought or sentence is left unfinished). Watch me use each deliberately.',
          example: 'Suspense: "She reached for the handle... and the door swung open." | Trailing off: "I thought I knew what was on the other side... but I was wrong."',
          demonstration: 'Suspense: the ellipsis forces the reader to pause — creating a micro-moment of tension before the reveal. Trailing off: the sentence is left incomplete, implying the speaker can\'t or won\'t finish the thought. Both effects depend on the reader\'s imagination filling the gap.',
          tip: 'Suspense ellipsis = pause before a reveal. Trailing off = unfinished thought. Use sparingly — too many ellipses and the effect is lost.',
        },
        {
          title: 'We Do — Identify the Effect',
          instruction: 'Identify whether each ellipsis creates suspense or a trailing off, then discuss the effect.',
          sentences: [
            '"The footsteps grew louder... and then stopped."',
            '"I always thought I\'d be brave in that situation, but..."',
            '"She opened the box slowly, reached inside... and smiled."',
          ],
          prompt: 'What does the ellipsis make the reader feel? What are they imagining in the pause? Would the sentence be as effective without it?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write a sentence for each task using the ellipsis as directed.',
          tasks: [
            'Write a sentence using ellipsis for suspense before a surprising reveal.',
            'Write a sentence using ellipsis to show a character trailing off mid-thought.',
            'Rewrite without the ellipsis: "She thought she knew the answer... but she didn\'t." How does removing it change the effect?',
            '✦ Bonus: Write a short paragraph (5 sentences) of narrative about a tense moment. Use ellipsis exactly twice — once for suspense, once for trailing off. Label each one.',
          ],
        }
      ),
      Tuesday: lesson(
        'Adjective placement: before & after nouns',
        'Position adjectives correctly',
        {
          title: 'I Do — Before, After, and Both',
          instruction: 'In English, adjectives usually come before the noun. But some adjectives must come after the noun, and skilled writers sometimes place adjectives after deliberately for effect. Watch me demonstrate each pattern.',
          example: 'Before: "The <u>exhausted, trembling</u> climber reached the summit." | After: "The climber, <u>exhausted and trembling</u>, reached the summit." | Predicate: "The climber was <u>exhausted</u>."',
          demonstration: 'Before the noun = standard placement, smooth flow. After the noun (set off by commas) = emphasis — the adjective feels separate and important. Predicate adjective (after a linking verb like "was" or "seemed") = describes state. Placing adjectives after the noun is a deliberate stylistic choice for effect.',
          tip: 'Before = standard. After (with commas) = dramatic emphasis. Predicate (after "was/seemed") = describing state. Choose based on the effect you want.',
        },
        {
          title: 'We Do — Move the Adjective',
          instruction: 'Rewrite each sentence placing the adjective in a different position. Discuss how the effect changes.',
          sentences: [
            '"The frightened, silent child stood at the edge of the crowd." → move adjectives to after the noun.',
            '"The waka, ancient and scarred, cut through the dark water." → move adjectives to before the noun.',
            '"The kaiako seemed tired and distracted." → move to before the noun.',
          ],
          prompt: 'Does the sentence feel different with the adjective in a different position? Which version creates more emphasis?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write each sentence twice — once with the adjective(s) before the noun, once after (with commas).',
          tasks: [
            'Use the adjectives "tangled" and "overgrown" to describe a path.',
            'Use the adjectives "calm" and "unreadable" to describe a character\'s expression.',
            'Use the adjectives "hollow" and "echoing" to describe a cave.',
            '✦ Bonus: Write a descriptive paragraph of 5 sentences. In at least two sentences, deliberately place adjectives AFTER the noun for dramatic effect. Underline them.',
          ],
        }
      ),
      Wednesday: lesson(
        'Varying sentence length for dramatic effect',
        'Control pacing in writing',
        {
          title: 'I Do — Pace Is Power',
          instruction: 'Long sentences create a slow, building, rolling rhythm. Short sentences hit hard. Knowing when to use which is one of the most powerful writing skills. Watch me control pace through sentence length.',
          example: '"The storm had been building all day — dark clouds massing over the ranges, the wind stripping leaves from the trees, the sea turning from green to black. Then it hit."',
          demonstration: 'Long sentence: creates a sense of accumulation, of things building towards breaking point — the reader is carried forward on a wave. Short sentence: hits like a full stop on the world. The contrast between long and short is what creates dramatic impact. Neither works as well alone.',
          tip: 'Long sentence = build, accumulate, slow down. Short sentence = impact, shock, silence. Place a short sentence after a long one for maximum effect.',
        },
        {
          title: 'We Do — Control the Pace',
          instruction: 'Rewrite this passage to control the pace: use a long sentence to build tension, then a short sentence to deliver the impact.',
          sentences: [
            '"Something happened. A sound came. She looked. It was there."',
          ],
          prompt: 'Combine the first three sentences into one long, building sentence. Keep the last sentence short. How does the contrast change the impact?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Write the combination of sentences shown for each scenario.',
          tasks: [
            'Write 2–3 long sentences building up to a match-winning moment. Then write 1 short sentence for the moment itself.',
            'Write a long sentence describing a threatening environment. Follow it with a short sentence revealing a character\'s reaction.',
            'Write a paragraph of 5 sentences about a race or competition. Vary sentence length deliberately — long, long, long, short for impact.',
            '✦ Bonus: Take a passage from your writing folder and rewrite one paragraph, deliberately varying sentence length for effect. Write the original and revised versions side by side.',
          ],
        }
      ),
      Thursday: lesson(
        'Editing: peer edit narrative for punctuation effect',
        'Collaborative editing',
        {
          title: 'I Do — Editing for Punctuation That Creates Effect',
          instruction: 'In Term 2 Week 5 Thursday we peer-edited for punctuation variety. Today the focus is sharper: punctuation that creates a specific EFFECT in narrative. Watch me evaluate whether each piece of punctuation is earning its place.',
          example: '"She ran. She ran faster. She kept running." vs "She ran — faster now, desperate — until her lungs gave out."',
          demonstration: 'First version: three full stops, three short sentences. Repetitive, but that could be intentional for effect. Second version: the dash creates an aside — it slows the reader slightly inside the action. The dash earns its place because it adds the internal state "desperate" in a way that feels breathless. When editing, ask: does this punctuation mark DO something to the reader?',
          tip: 'For each punctuation mark in narrative: ask "what effect does this create?" If the answer is "nothing special" — consider whether a different mark would work harder.',
        },
        {
          title: 'We Do — Edit for Effect',
          instruction: 'Read this passage and mark any punctuation that feels flat or missed. Suggest what could be changed and explain the effect.',
          sentences: [
            '"She walked into the room. She saw what was there. She could not move. She stood and looked at it for a long time. Then she left."',
          ],
          prompt: 'Where could a dash create an aside? Where could an ellipsis build suspense? Where would a longer sentence create a more effective contrast with the short ones?',
        },
        {
          title: 'You Do — Your Turn',
          instruction: 'Swap a piece of narrative writing with a partner. Edit it specifically for punctuation effect using these questions.',
          tasks: [
            '✦ Check: Is there an ellipsis where suspense would help? If not — could one be added?',
            '✦ Check: Are dashes used for dramatic asides? If not — could one strengthen a key moment?',
            '✦ Check: Does sentence length vary? Is there a short sentence after a long one for impact?',
            '✦ Bonus: Rewrite your partner\'s weakest moment — the scene with the least punctuation effect — as a model of what it could look like with deliberate punctuation choices.',
          ],
        }
      ),
    },

  },

  4: { 1: { Monday: lesson('Tier 2 vocabulary: words for argument & opinion','Use persuasive vocabulary',{title:'I Do',instruction:'Persuasive writing uses specific vocabulary to signal opinion, certainty, and importance. Watch me identify and use these words.',example:'"It is <u>crucial</u> that schools provide healthy lunches. <u>Evidently</u>, poor nutrition affects learning. <u>Furthermore</u>, it <u>significantly</u> impacts behaviour."',demonstration:'Crucial (strong importance), evidently (signals evidence), furthermore (adds a point), significantly (makes impact sound large). These words don\'t just fill space — they do persuasive work.',tip:'"Very important" → "crucial." "Also" → "furthermore." "Shows" → "demonstrates." Upgrade to the persuasive register.'},{title:'We Do',instruction:'Replace the plain words with persuasive vocabulary.',sentences:['It is <u>important</u> that we recycle more.','This <u>shows</u> that the problem is <u>big</u>.','<u>Also</u>, the research <u>proves</u> it works.'],prompt:'Which persuasive word fits best? Does it change how convincing the sentence sounds?'},{title:'You Do',instruction:'Rewrite each sentence using persuasive vocabulary.',tasks:['The problem of food waste is <u>bad</u>.','This <u>shows</u> that something needs to change.','It is <u>important</u> that everyone does their part.','✦ Bonus: Write a 3-sentence persuasive opening about a school rule you\'d like to change. Use at least 4 persuasive words.']}), Tuesday: lesson('Nouns: gerunds as subjects ("Swimming is…")','Identify gerund nouns',{title:'I Do',instruction:'A gerund is a verb form ending in -ing that works as a noun. It can be the subject of a sentence. Watch me identify and use gerunds.',example:'"<u>Swimming</u> is excellent exercise. <u>Writing</u> clearly is a valuable skill."',demonstration:'"Swimming" — looks like a verb, acts as a noun. It\'s the subject of the sentence. "Writing" — same: it\'s what the sentence is ABOUT. You can test it: replace with a regular noun — "Sport is excellent exercise." Still works. That means swimming IS a noun here.',tip:'Gerund as subject: can I replace it with a noun like "sport" or "skill"? If yes — it\'s a gerund.'},{title:'We Do',instruction:'Identify the gerund in each sentence and confirm it\'s acting as a noun.',sentences:['Reading every day improves vocabulary.','Travelling to new places broadens your mind.','Winning isn\'t everything.'],prompt:'What is the subject of each sentence? Is it a gerund? What noun could replace it?'},{title:'You Do',instruction:'Use each gerund as the subject of a sentence.',tasks:['Running → ___','Cooking → ___','Learning → ___','Painting → ___','✦ Bonus: Write 3 sentences about things you enjoy, each using a gerund as the subject.']}), Wednesday: lesson('Simple sentences: direct & concise statements','Apply in persuasive writing',{title:'I Do',instruction:'In persuasive writing, simple sentences land like punches. They state a fact or claim directly. Watch how I use short, direct sentences to drive a point home.',example:'"Litter harms wildlife. It pollutes waterways. It costs millions to clean up. We must act now."',demonstration:'Four short sentences. No padding. No apology. Each one is a single, clear claim. This directness signals confidence and conviction — both essential in persuasive writing.',tip:'In persuasive writing, vary: long sentences to explain and argue, short sentences to make your key claim land hard.'},{title:'We Do',instruction:'Convert these wordy arguments into direct, punchy simple sentences.',sentences:['Due to the fact that plastic bags cause a great deal of harm to sea life, it would be a good idea to consider banning them.','The situation in which animals are kept in small cages for entertainment is something that is not acceptable and should not be allowed.'],prompt:'What is the core claim? Strip it back to the fewest words that still make the point.'},{title:'You Do',instruction:'Write a direct, concise simple sentence for each argument.',tasks:['Argument: school should start later because teenagers need more sleep.','Argument: fast food advertising should not be shown during children\'s programmes.','Argument: every student should learn a second language.','✦ Bonus: Write a persuasive paragraph. Use 3 short punchy sentences and 2 longer explanation sentences alternately.']}), Thursday: lesson('Proofreading: checking for consistency in a report','Edit informational text',{title:'I Do',instruction:'Reports need consistency: consistent tense (usually present), consistent formal register, consistent formatting of lists and headings. Watch me edit an inconsistent report excerpt.',example:'"Dolphins are marine mammals. They lived in oceans worldwide (wrong tense). Dolphins eat fish, squid and they also had crustaceans (inconsistent list)."',demonstration:'Fixed: "Dolphins are marine mammals. They <u>live</u> in oceans worldwide. Dolphins eat fish, squid<u>,</u> and crustaceans." Tense fixed to present. List restructured to parallel form.',tip:'Reports: present tense for facts. Parallel lists: all nouns, or all verbs — not mixed.'},{title:'We Do',instruction:'Find and fix inconsistencies in this science report paragraph.',sentences:['The monarch butterfly undergoes four stages of metamorphosis. First, the egg was laid on a milkweed leaf. Then a caterpillar hatched and it ate the leaf. The caterpillar forms a chrysalis and then eventually it became a butterfly and emerged.'],prompt:'Tense errors? List inconsistencies? Register shifts?'},{title:'You Do',instruction:'Rewrite this passage making it consistent in tense, register, and structure.',tasks:['Kauri trees are one of the largest tree species in the world. They grew very slowly and can lived for over 2,000 years. The kauri forests were very important to Māori people. Kauri gum, the resin from these trees, were used for many purposes including it was used as a fire starter, and for making varnish, and people also chewed it.','✦ Bonus: Write 5 sentences about an animal of your choice in a consistent report style. Present tense, formal register, parallel lists.']}) }, },
}

// Utility: get a lesson by term/week/day
export function getLesson(term, week, day) {
  return CURRICULUM?.[term]?.[week]?.[day] ?? null
}

// Meta for selectors
export const TERMS = [1, 2, 3, 4]
export const WEEKS = Array.from({ length: 10 }, (_, i) => i + 1)
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
