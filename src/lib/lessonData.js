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
  Monday: '#2563eb',
  Tuesday: '#16a34a',
  Wednesday: '#ea580c',
  Thursday: '#7c3aed',
  Friday: '#dc2626',
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
  2: { 1: { Monday: lesson('Tier 2 vocabulary: words for movement & action','Choose precise verbs',{title:'I Do',instruction:'Watch me swap plain movement verbs for precise ones.',example:'"The man went down the street." → "The man <u>strode</u> down the street."',demonstration:'Went → strode, shuffled, sprinted, lurched. Each verb tells us HOW as well as that movement happened.',tip:'Precise verbs eliminate the need for adverbs: "ran quickly" → "sprinted."'},{title:'We Do',instruction:'Upgrade the underlined verbs with more precise movement words.',sentences:['The bird <u>went</u> through the air.','She <u>moved</u> across the dance floor.','He <u>went</u> into the room.'],prompt:'What does the precise verb tell us that "went" does not?'},{title:'You Do',instruction:'Replace each plain verb with the most precise one you can think of.',tasks:['The snake <u>went</u> through the grass.','The toddler <u>moved</u> towards the door.','She <u>went</u> across the rooftops.','✦ Bonus: Write 4 sentences each using a different "movement" verb. No two the same.']}), Tuesday: lesson('Nouns: collective & abstract nouns','Extend noun knowledge',{title:'I Do',instruction:'Collective nouns name a group. Abstract nouns name ideas, feelings, or concepts you cannot touch.',example:'Collective: a <u>flock</u> of birds | Abstract: <u>courage</u>, <u>freedom</u>, <u>justice</u>',demonstration:'Flock, swarm, pride, pod — these are collective. Justice, hope, anger — these are abstract. You can\'t hold justice in your hand, but it\'s a noun because it names a concept.',tip:'If you can\'t touch it or see it, but it\'s a thing — it\'s probably abstract.'},{title:'We Do',instruction:'Sort these nouns into collective, abstract, or concrete.',sentences:['a herd of cattle','curiosity','a bouquet of flowers','loyalty','a school of fish'],prompt:'How do you know? Could you take a photo of it? Touch it?'},{title:'You Do',instruction:'Label each noun: collective (C), abstract (A), or concrete (Co).',tasks:['a murder of crows —','envy —','a packet of biscuits —','a pride of lions —','determination —','✦ Bonus: Write a sentence for each type using a noun from today\'s lesson.']}), Wednesday: lesson('Simple sentences: revisit with action-verb focus','Reinforce simple sentence structure',{title:'I Do',instruction:'Revisiting simple sentences — but this time the focus is on choosing a powerful action verb.',example:'Weak: "The volcano did an explosion." → Strong: "The volcano <u>erupted</u>."',demonstration:'Do + noun is often the weak version. Replace with a direct action verb: made a decision → decided. Gave a performance → performed. Did an investigation → investigated.',tip:'"Did", "made", "gave", "had" + noun = usually replaceable with one strong verb.'},{title:'We Do',instruction:'Replace the weak "do + noun" construction with one strong verb.',sentences:['She made a complaint about the noise.','They did a celebration when they won.','He gave a performance that amazed the crowd.'],prompt:'What single verb can replace each phrase?'},{title:'You Do',instruction:'Rewrite each sentence using one strong action verb.',tasks:['She made a decision to leave early.','The team gave a demonstration of the new skill.','They did an investigation into the disappearance.','✦ Bonus: Write 5 simple sentences using 5 different powerful action verbs.']}), Thursday: lesson('Proofreading: capitals for proper nouns in text','Edit with fresh context',{title:'I Do',instruction:'In this term\'s editing focus, we look specifically at proper noun capitals in longer, more complex text.',example:'"last tuesday, ms brown took class 5b to the otago museum in dunedin."',demonstration:'Fixed: "Last Tuesday, Ms Brown took Class 5B to the Otago Museum in Dunedin." Every specific name, title, day, place, and class identifier needs a capital.',tip:'Scan specifically for: days, months, place names, people\'s names/titles, specific event names.'},{title:'We Do',instruction:'Find and fix all the proper noun capitalisation errors.',sentences:['on anzac day, uncle mike and aunt sarah drove to hamilton for the dawn parade at memorial park.'],prompt:'List every word that needs a capital. How many did you find?'},{title:'You Do',instruction:'Rewrite this passage with all proper noun capitals correctly placed.',tasks:['my cousin riya is visiting from tauranga next friday. she goes to otumoetai college and is in year 10. on saturday we\'re going to visit the national aquarium of new zealand in napier. riya wants to see the tuatara display and the kiwi house afterwards we might have lunch at the hawke\'s bay farmers market.','✦ Bonus: Write a paragraph about a real or imaginary trip. Include at least 6 proper nouns — all correctly capitalised.']}) }, },
  3: { 1: { Monday: lesson('Tier 2 vocabulary: words for feelings & emotion','Select emotive vocabulary',{title:'I Do',instruction:'Precise emotion vocabulary moves readers. Watch me build an "emotion word ladder" — from mild to intense.',example:'sad → unhappy → miserable → devastated → heartbroken',demonstration:'Each word is more intense. A character who is "unhappy" about losing a game feels different from one who is "devastated." Choosing the right level signals to the reader how much this matters.',tip:'Match the emotion word to the story\'s stakes. Small disappointment → "disappointed." Life-changing loss → "devastated."'},{title:'We Do',instruction:'Build emotion ladders for these feelings together.',sentences:['angry → ___ → ___ → ___ → ___','happy → ___ → ___ → ___ → ___'],prompt:'Which word would you use in a funny story? Which in a dramatic one?'},{title:'You Do',instruction:'Replace each plain emotion word with one from the correct intensity level.',tasks:['She was <u>sad</u> when her goldfish died. (use devastated or heartbroken)','He was <u>happy</u> when his name was called. (mild — use pleased or delighted)','The crowd was <u>angry</u> at the decision. (intense — use furious or outraged)','✦ Bonus: Write an "emotion ladder" for "scared" with 6 levels from mild to extreme.']}), Tuesday: lesson('Nouns revisited: count vs. non-count nouns','Deepen noun understanding',{title:'I Do',instruction:'Count nouns can be counted and have plurals. Non-count (mass) nouns cannot be counted and have no plural form.',example:'Count: one book, two books ✓ | Non-count: one sand, two sands ✗',demonstration:'"Sand" — you can\'t say "two sands." You say "some sand," "a grain of sand." Other non-count: water, music, advice, furniture, information. With count nouns you use "a/an" or numbers. With non-count you use "some," "much," "a lot of."',tip:'"Much" = non-count ("much water"). "Many" = count ("many cups"). If you\'re unsure, try adding a number — if it sounds wrong, it\'s non-count.'},{title:'We Do',instruction:'Sort these nouns and choose the correct determiner (some/a/an/many/much).',sentences:['___ furniture | ___ chairs | ___ advice | ___ suggestions | ___ lightning'],prompt:'Count or non-count? Which determiner fits?'},{title:'You Do',instruction:'Correct the non-count noun errors in these sentences.',tasks:['She gave me a lot of advices about the exam.','We need two furnitures for the new room.','Can I have some informations about the trip?','There were many thunders during the storm.','✦ Bonus: Write 6 sentences — 3 using count nouns correctly, 3 using non-count nouns correctly.']}), Wednesday: lesson('Simple sentences: revisit in narrative context','Apply in narrative writing',{title:'I Do',instruction:'In narrative, simple sentences aren\'t just exercises — they\'re dramatic tools. Watch how a string of short simple sentences creates suspense.',example:'"She stopped. She listened. The floorboard creaked. Someone was there."',demonstration:'Each sentence is complete. Each ends with a full stop — a tiny pause. That rhythm creates tension. Compare: "She stopped and listened because a floorboard creaked and someone was there." — all the information, but none of the tension.',tip:'In action or suspense moments, break your writing into short simple sentences. Let the reader feel every beat.'},{title:'We Do',instruction:'Rewrite this rushed description as a series of short simple sentences to build suspense.',sentences:['The old house was dark and silent and the child walked slowly up the creaking staircase and then she heard a sound coming from behind the closed door at the end of the hall.'],prompt:'Where are the moments of tension? Break them apart.'},{title:'You Do',instruction:'Write a 5-sentence suspense sequence using only simple sentences. Then label the effect each creates.',tasks:['Scene: a character is alone in a forest at night and hears something.','Must use: 5 simple sentences, each 5–8 words. No conjunctions.','✦ Bonus: Now rewrite the same scene using one long complex sentence. Compare the effect.']}), Thursday: lesson('Proofreading: dialogue punctuation (speech marks)','Edit dialogue conventions',{title:'I Do',instruction:'Dialogue (speech) has its own punctuation rules. Watch me show the five key rules with examples.',example:'"I think we\'re lost," she whispered.\n"Lost?" said Tom. "Are you sure?"\n"Yes," she replied. "Completely."',demonstration:'Rule 1: Speech marks around the spoken words. Rule 2: Comma (not full stop) before the closing speech mark if a speech tag follows. Rule 3: The speech tag (she whispered) is NOT capitalised after the comma. Rule 4: New speaker = new line. Rule 5: Punctuation inside the speech marks.',tip:'Ask: is the full stop job done by the comma? If there\'s a speech tag, the period becomes a comma inside the speech marks.'},{title:'We Do',instruction:'Fix the dialogue punctuation in these exchanges.',sentences:['"We should go" said Marcus "before it gets dark."','Anna replied "but I havent finished yet"','"Look out screamed the driver'],prompt:'Apply the 5 rules one at a time. What is wrong with each line?'},{title:'You Do',instruction:'Rewrite this dialogue with correct punctuation throughout.',tasks:['"where are we going asked lily\n"to the market said dad I need to get some things\n"can I have a sausage she asked\n"if you\'re good he replied\n✦ Bonus: Write a 6-line dialogue between two characters. Apply all 5 dialogue punctuation rules perfectly.']}) }, },
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
