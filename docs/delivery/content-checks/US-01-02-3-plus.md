# Age-suitability check — 3+ deck (US-01-02)

The check every question of `src/content/decks/3-plus.json` passed before it was accepted (`MOD-01-F14`, `Q29`, `DEC-26`, `DEC-46`). Made in the delivery loop on 2026-10-14 against both languages; each row shows the question and its answer in Polish and in English, and each check holds for both. The product owner reviews all content once, before release (`DEC-26`).

The four checks, each `pass` or `fail`:

- **Known words** — every word is one a child of 3 knows (everyday objects, animals, colours, body parts, numbers up to seven).
- **Nothing frightening** — nothing frightening, violent or adult.
- **One answer** — the question has one unambiguous answer, the one given, in each language — a child, or a parent reading it aloud, cannot give another correct one. An open question that admits a synonym or a near miss (a hood for an umbrella, a neck warmer for a scarf) does not pass: it is asked as an either/or between the answer and one clearly wrong option, with the answer first in some questions and second in others, so always choosing the same side does not win. A question stays open only when no other correct answer can be named — the four listed under the table.
- **Verifiable** — the answer is a fact anyone can check.

A question is accepted only when all four are `pass`; `tests/unit/AC-01-02-4-age-suitability-record.test.js` fails on any question of the deck without such a row.

| Id | Question (pl) | Answer (pl) | Question (en) | Answer (en) | Known words | Nothing frightening | One answer | Verifiable |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 3p-01 | Jakiego koloru jest cytryna: niebieskiego czy żółtego? | Żółtego. | What colour is a lemon: blue or yellow? | Yellow. | pass | pass | pass | pass |
| 3p-02 | Ile masz oczu? | Dwoje. | How many eyes do you have? | Two. | pass | pass | pass | pass |
| 3p-03 | Ile kół ma rower: sześć czy dwa? | Dwa. | How many wheels does a bicycle have: six or two? | Two. | pass | pass | pass | pass |
| 3p-04 | Jaki kształt ma koło samochodu: kwadratowy czy okrągły? | Okrągły. | What shape is a car wheel: square or round? | Round. | pass | pass | pass | pass |
| 3p-05 | Czym myjemy zęby: szczoteczką czy łyżką? | Szczoteczką do zębów. | What do we brush our teeth with: a toothbrush or a spoon? | A toothbrush. | pass | pass | pass | pass |
| 3p-06 | Jakiego koloru jest trawa: czerwonego czy zielonego? | Zielonego. | What colour is grass: red or green? | Green. | pass | pass | pass | pass |
| 3p-07 | Ile palców masz na jednej ręce, licząc kciuk? | Pięć. | How many fingers do you have on one hand, counting the thumb? | Five. | pass | pass | pass | pass |
| 3p-08 | Czym widzisz: oczami czy zębami? | Oczami. | What do you see with: your eyes or your teeth? | Your eyes. | pass | pass | pass | pass |
| 3p-09 | Czym słyszysz: uszami czy stopami? | Uszami. | What do you hear with: your ears or your feet? | Your ears. | pass | pass | pass | pass |
| 3p-10 | Czym czujesz zapachy: nosem czy kolanem? | Nosem. | What do you smell with: your nose or your knee? | Your nose. | pass | pass | pass | pass |
| 3p-11 | Jakiego koloru jest śnieg: białego czy czarnego? | Białego. | What colour is snow: white or black? | White. | pass | pass | pass | pass |
| 3p-12 | Kto jest większy: mysz czy kot? | Kot. | Which is bigger: a mouse or a cat? | A cat. | pass | pass | pass | pass |
| 3p-13 | Jaka liczba jest po jedynce? | Dwa. | Which number comes after one? | Two. | pass | pass | pass | pass |
| 3p-14 | Co świeci na niebie w dzień i nas grzeje: księżyc czy słońce? | Słońce. | What shines in the sky in the daytime and keeps us warm: the moon or the sun? | The sun. | pass | pass | pass | pass |
| 3p-15 | Co dzieje się z lodem, gdy robi się ciepło: topi się czy rośnie? | Topi się. | What happens to ice when it gets warm: it melts or it grows? | It melts. | pass | pass | pass | pass |
| 3p-16 | Jak nazywamy krople wody, które spadają z chmur: piasek czy deszcz? | Deszcz. | What do we call drops of water that fall from the clouds: sand or rain? | Rain. | pass | pass | pass | pass |
| 3p-17 | Co świeci w nocy na niebie i zmienia kształt: księżyc czy słońce? | Księżyc. | What shines in the night sky and changes its shape: the moon or the sun? | The moon. | pass | pass | pass | pass |
| 3p-18 | Czym oddychamy: powietrzem czy wodą? | Powietrzem. | What do we breathe: air or water? | Air. | pass | pass | pass | pass |
| 3p-19 | Czy metalowy klucz wrzucony do wody pływa, czy tonie? | Tonie. | Does a metal key dropped in water float or sink? | It sinks. | pass | pass | pass | pass |
| 3p-20 | Co pomaga nam widzieć w ciemności: poduszka czy lampka? | Lampka. | What helps us see in the dark: a pillow or a lamp? | A lamp. | pass | pass | pass | pass |
| 3p-21 | Co widać na ziemi obok ciebie w słońcu: twój cień czy tęczę? | Twój cień. | What do you see on the ground next to you in the sun: your shadow or a rainbow? | Your shadow. | pass | pass | pass | pass |
| 3p-22 | Jakiego koloru jest niebo w pogodny dzień: niebieskiego czy zielonego? | Niebieskiego. | What colour is the sky on a clear day: blue or green? | Blue. | pass | pass | pass | pass |
| 3p-23 | Co zamienia wodę w lód: ciepło czy zimno? | Zimno. | What turns water into ice: warmth or cold? | Cold. | pass | pass | pass | pass |
| 3p-24 | Co ma wiele kolorów i jest na niebie, gdy pada deszcz i świeci słońce: gwiazda czy tęcza? | Tęcza. | What has many colours and is in the sky when it rains and the sun shines: a star or a rainbow? | A rainbow. | pass | pass | pass | pass |
| 3p-25 | Co unosi się nad garnkiem z bardzo gorącą wodą: śnieg czy para? | Para. | What rises above a pot of very hot water: snow or steam? | Steam. | pass | pass | pass | pass |
| 3p-26 | Jak robi krowa: muu czy miau? | Muu. | What sound does a cow make: moo or meow? | Moo. | pass | pass | pass | pass |
| 3p-27 | Które zwierzę robi hau hau: kot czy pies? | Pies. | Which animal says woof: a cat or a dog? | A dog. | pass | pass | pass | pass |
| 3p-28 | Gdzie mieszka ryba: na drzewie czy w wodzie? | W wodzie. | Where does a fish live: in a tree or in water? | In water. | pass | pass | pass | pass |
| 3p-29 | Co słodkiego robią pszczoły: miód czy ser? | Miód. | What sweet thing do bees make: honey or cheese? | Honey. | pass | pass | pass | pass |
| 3p-30 | Kto ma dłuższą szyję: żyrafa czy kot? | Żyrafa. | Which has a longer neck: a giraffe or a cat? | A giraffe. | pass | pass | pass | pass |
| 3p-31 | Który ptak robi kwa kwa: kaczka czy kura? | Kaczka. | Which bird says quack: a duck or a hen? | A duck. | pass | pass | pass | pass |
| 3p-32 | Czym latają ptaki: kołami czy skrzydłami? | Skrzydłami. | What do birds fly with: wheels or wings? | Wings. | pass | pass | pass | pass |
| 3p-33 | Które zwierzę robi kum kum: krowa czy żaba? | Żaba. | Which animal says ribbit: a cow or a frog? | A frog. | pass | pass | pass | pass |
| 3p-34 | Które zwierzę podobne do konia ma czarno-białe paski: owca czy zebra? | Zebra. | Which animal looks like a horse and has black and white stripes: a sheep or a zebra? | A zebra. | pass | pass | pass | pass |
| 3p-35 | Które zwierzę ma trąbę: słoń czy pies? | Słoń. | Which animal has a trunk: an elephant or a dog? | An elephant. | pass | pass | pass | pass |
| 3p-36 | Co znosi kura? | Jajka. | What does a hen lay? | Eggs. | pass | pass | pass | pass |
| 3p-37 | Które zwierzę robi chrum chrum: świnka czy kaczka? | Świnka. | Which animal says oink: a pig or a duck? | A pig. | pass | pass | pass | pass |
| 3p-38 | Które zwierzę robi miau: kot czy ryba? | Kot. | Which animal says meow: a cat or a fish? | A cat. | pass | pass | pass | pass |
| 3p-39 | Co zakładamy na stopy przed butami: rękawiczki czy skarpetki? | Skarpetki. | What do we put on our feet before our shoes: gloves or socks? | Socks. | pass | pass | pass | pass |
| 3p-40 | Co zdmuchujemy na torcie urodzinowym: kanapki czy świeczki? | Świeczki. | What do we blow out on a birthday cake: sandwiches or candles? | Candles. | pass | pass | pass | pass |
| 3p-41 | Gdzie trzymamy mleko, żeby było zimne: w lodówce czy w piekarniku? | W lodówce. | Where do we keep milk so it stays cold: in the fridge or in the oven? | In the fridge. | pass | pass | pass | pass |
| 3p-42 | Co trzymamy nad głową, żeby nie zmoknąć w deszczu: łyżkę czy parasol? | Parasol. | What do we hold over our head to keep dry in the rain: a spoon or an umbrella? | An umbrella. | pass | pass | pass | pass |
| 3p-43 | Jaka zabawka jest okrągła i odbija się od podłogi: piłka czy klocek? | Piłka. | Which toy is round and bounces on the floor: a ball or a block? | A ball. | pass | pass | pass | pass |
| 3p-44 | Jak nazywamy jedzenie rano: kolacja czy śniadanie? | Śniadanie. | What do we call the food we eat in the morning: supper or breakfast? | Breakfast. | pass | pass | pass | pass |
| 3p-45 | Co pokazuje zegar: bajkę czy godzinę? | Godzinę. | What does a clock show: a cartoon or the time? | The time. | pass | pass | pass | pass |
| 3p-46 | Czym otwieramy zamek w drzwiach: kluczem czy kredką? | Kluczem. | What do we open a door lock with: a key or a crayon? | A key. | pass | pass | pass | pass |
| 3p-47 | Po czym jeżdżą pociągi: po torach czy po wodzie? | Po torach. | What do trains travel on: tracks or water? | Tracks. | pass | pass | pass | pass |
| 3p-48 | Co zakładamy na szyję, gdy jest zimno: szalik czy skarpetki? | Szalik. | What do we wear around our neck when it is cold: a scarf or socks? | A scarf. | pass | pass | pass | pass |
| 3p-49 | Czym jemy zupę: grzebieniem czy łyżką? | Łyżką. | What do we eat soup with: a comb or a spoon? | A spoon. | pass | pass | pass | pass |
| 3p-50 | Z czego lepimy bałwana: z kamieni czy ze śniegu? | Ze śniegu. | What do we make a snowman from: stones or snow? | Snow. | pass | pass | pass | pass |

The questions that stay open, and why no other answer is correct:

- **3p-02** — a count: a person has two eyes; no other number is right.
- **3p-07** — a count, with the thumb named so that four is not right as well: five.
- **3p-13** — counting order: the number after one is two and nothing else.
- **3p-36** — a hen lays eggs and nothing else; one egg or many is the same answer.
