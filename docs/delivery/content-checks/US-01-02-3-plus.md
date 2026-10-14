# Age-suitability check — 3+ deck (US-01-02)

The check every question of `src/content/decks/3-plus.json` passed before it was accepted (`MOD-01-F14`, `Q29`, `DEC-26`, `DEC-46`). Made in the delivery loop on 2026-10-14 against both languages; the English text is shown, the Polish one says the same. The product owner reviews all content once, before release (`DEC-26`).

The four checks, each `pass` or `fail`:

- **Known words** — every word is one a child of 3 knows (everyday objects, animals, colours, body parts, numbers up to seven).
- **Nothing frightening** — nothing frightening, violent or adult.
- **One answer** — the question has one unambiguous answer, the one given.
- **Verifiable** — the answer is a fact anyone can check.

A question is accepted only when all four are `pass`; `tests/unit/AC-01-02-4-age-suitability-record.test.ts` fails on any question of the deck without such a row.

| Id | Question (en) | Answer (en) | Known words | Nothing frightening | One answer | Verifiable |
| --- | --- | --- | --- | --- | --- | --- |
| 3p-01 | What colour is a ripe banana? | Yellow. | pass | pass | pass | pass |
| 3p-02 | How many eyes do you have? | Two. | pass | pass | pass | pass |
| 3p-03 | How many wheels does a bicycle have? | Two. | pass | pass | pass | pass |
| 3p-04 | What shape is a coin? | Round. | pass | pass | pass | pass |
| 3p-05 | What do you brush your teeth with? | A toothbrush. | pass | pass | pass | pass |
| 3p-06 | What colour is grass? | Green. | pass | pass | pass | pass |
| 3p-07 | How many fingers do you have on one hand? | Five. | pass | pass | pass | pass |
| 3p-08 | What do you see with? | Your eyes. | pass | pass | pass | pass |
| 3p-09 | What do you hear with? | Your ears. | pass | pass | pass | pass |
| 3p-10 | What do you smell with? | Your nose. | pass | pass | pass | pass |
| 3p-11 | What colour is snow? | White. | pass | pass | pass | pass |
| 3p-12 | Which is bigger: a cat or a mouse? | A cat. | pass | pass | pass | pass |
| 3p-13 | Which number comes after one? | Two. | pass | pass | pass | pass |
| 3p-14 | What shines in the sky in the daytime? | The sun. | pass | pass | pass | pass |
| 3p-15 | What happens to ice when it gets warm? | It melts into water. | pass | pass | pass | pass |
| 3p-16 | What falls from the clouds when it rains? | Drops of water. | pass | pass | pass | pass |
| 3p-17 | What shines in the night sky and changes its shape? | The moon. | pass | pass | pass | pass |
| 3p-18 | What do we breathe? | Air. | pass | pass | pass | pass |
| 3p-19 | Does a metal key dropped in water float or sink? | It sinks. | pass | pass | pass | pass |
| 3p-20 | What do we need to see in the dark? | Light. | pass | pass | pass | pass |
| 3p-21 | What dark shape follows you on a sunny day? | Your shadow. | pass | pass | pass | pass |
| 3p-22 | What colour is the sky on a clear day? | Blue. | pass | pass | pass | pass |
| 3p-23 | What turns water into ice: warmth or cold? | Cold. | pass | pass | pass | pass |
| 3p-24 | What has many colours and appears in the sky when it rains and the sun shines? | A rainbow. | pass | pass | pass | pass |
| 3p-25 | What rises from a pot when the water boils? | Steam. | pass | pass | pass | pass |
| 3p-26 | What sound does a cow make? | Moo. | pass | pass | pass | pass |
| 3p-27 | Which animal says woof? | A dog. | pass | pass | pass | pass |
| 3p-28 | Where does a fish live? | In water. | pass | pass | pass | pass |
| 3p-29 | What do bees make? | Honey. | pass | pass | pass | pass |
| 3p-30 | Which animal has a very long neck? | A giraffe. | pass | pass | pass | pass |
| 3p-31 | Which bird says quack? | A duck. | pass | pass | pass | pass |
| 3p-32 | What do birds fly with? | Their wings. | pass | pass | pass | pass |
| 3p-33 | What grows on an apple tree? | Apples. | pass | pass | pass | pass |
| 3p-34 | Which horse-like animal has black and white stripes? | A zebra. | pass | pass | pass | pass |
| 3p-35 | Which animal has a trunk? | An elephant. | pass | pass | pass | pass |
| 3p-36 | What does a hen lay? | Eggs. | pass | pass | pass | pass |
| 3p-37 | What colour are tree leaves in summer? | Green. | pass | pass | pass | pass |
| 3p-38 | Which animal says meow? | A cat. | pass | pass | pass | pass |
| 3p-39 | How many days are there in a week? | Seven. | pass | pass | pass | pass |
| 3p-40 | What do we put on a birthday cake? | Candles. | pass | pass | pass | pass |
| 3p-41 | Where do we keep ice cream so it does not melt? | In the freezer. | pass | pass | pass | pass |
| 3p-42 | What do we hold over our head to keep dry in the rain? | An umbrella. | pass | pass | pass | pass |
| 3p-43 | What do we sleep in at night? | A bed. | pass | pass | pass | pass |
| 3p-44 | Which meal do we eat in the morning? | Breakfast. | pass | pass | pass | pass |
| 3p-45 | What does a clock show? | The time. | pass | pass | pass | pass |
| 3p-46 | What do you need to open a locked door? | A key. | pass | pass | pass | pass |
| 3p-47 | What do trains run on? | Tracks. | pass | pass | pass | pass |
| 3p-48 | What do we put on our hands when it is cold? | Gloves. | pass | pass | pass | pass |
| 3p-49 | What do we eat soup with? | A spoon. | pass | pass | pass | pass |
| 3p-50 | What do we make a snowman from? | Snow. | pass | pass | pass | pass |
