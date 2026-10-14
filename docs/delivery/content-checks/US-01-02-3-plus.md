# Age-suitability check — 3+ deck (US-01-02)

The check every question of `src/content/decks/3-plus.json` passed before it was accepted (`MOD-01-F14`, `Q29`, `DEC-26`, `DEC-46`). Made in the delivery loop on 2026-10-14 against both languages; each row shows the question and its answer in Polish and in English, and each check holds for both. The product owner reviews all content once, before release (`DEC-26`).

The four checks, each `pass` or `fail`:

- **Known words** — every word is one a child of 3 knows (everyday objects, animals, colours, body parts, numbers up to seven).
- **Nothing frightening** — nothing frightening, violent or adult.
- **One answer** — the question has one unambiguous answer, the one given, in each language — a child, or a parent reading it aloud, cannot give another correct one.
- **Verifiable** — the answer is a fact anyone can check.

A question is accepted only when all four are `pass`; `tests/unit/AC-01-02-4-age-suitability-record.test.js` fails on any question of the deck without such a row.

| Id | Question (pl) | Answer (pl) | Question (en) | Answer (en) | Known words | Nothing frightening | One answer | Verifiable |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 3p-01 | Jakiego koloru jest cytryna: żółtego czy niebieskiego? | Żółtego. | What colour is a lemon: yellow or blue? | Yellow. | pass | pass | pass | pass |
| 3p-02 | Ile masz oczu? | Dwoje. | How many eyes do you have? | Two. | pass | pass | pass | pass |
| 3p-03 | Ile kół ma rower: dwa czy sześć? | Dwa. | How many wheels does a bicycle have: two or six? | Two. | pass | pass | pass | pass |
| 3p-04 | Jaki kształt ma koło samochodu? | Okrągły. | What shape is a car wheel? | Round. | pass | pass | pass | pass |
| 3p-05 | Czym myjemy zęby: szczoteczką czy łyżką? | Szczoteczką do zębów. | What do we brush our teeth with: a toothbrush or a spoon? | A toothbrush. | pass | pass | pass | pass |
| 3p-06 | Jakiego koloru jest trawa? | Zielonego. | What colour is grass? | Green. | pass | pass | pass | pass |
| 3p-07 | Ile palców masz na jednej ręce, licząc kciuk? | Pięć. | How many fingers do you have on one hand, counting the thumb? | Five. | pass | pass | pass | pass |
| 3p-08 | Czym widzisz? | Oczami. | What do you see with? | Your eyes. | pass | pass | pass | pass |
| 3p-09 | Czym słyszysz? | Uszami. | What do you hear with? | Your ears. | pass | pass | pass | pass |
| 3p-10 | Czym czujesz zapachy? | Nosem. | What do you smell with? | Your nose. | pass | pass | pass | pass |
| 3p-11 | Jakiego koloru jest śnieg? | Białego. | What colour is snow? | White. | pass | pass | pass | pass |
| 3p-12 | Kto jest większy: kot czy mysz? | Kot. | Which is bigger: a cat or a mouse? | A cat. | pass | pass | pass | pass |
| 3p-13 | Jaka liczba jest po jedynce? | Dwa. | Which number comes after one? | Two. | pass | pass | pass | pass |
| 3p-14 | Co świeci na niebie w dzień i nas grzeje? | Słońce. | What shines in the sky in the daytime and keeps us warm? | The sun. | pass | pass | pass | pass |
| 3p-15 | Co dzieje się z lodem, gdy robi się ciepło? | Topi się i zmienia w wodę. | What happens to ice when it gets warm? | It melts into water. | pass | pass | pass | pass |
| 3p-16 | Jak nazywamy krople wody, które spadają z chmur? | Deszcz. | What do we call drops of water that fall from the clouds? | Rain. | pass | pass | pass | pass |
| 3p-17 | Co świeci w nocy na niebie i zmienia kształt? | Księżyc. | What shines in the night sky and changes its shape? | The moon. | pass | pass | pass | pass |
| 3p-18 | Czym oddychamy: powietrzem czy wodą? | Powietrzem. | What do we breathe: air or water? | Air. | pass | pass | pass | pass |
| 3p-19 | Czy metalowy klucz wrzucony do wody pływa, czy tonie? | Tonie. | Does a metal key dropped in water float or sink? | It sinks. | pass | pass | pass | pass |
| 3p-20 | Co pomaga nam widzieć w ciemności: lampka czy poduszka? | Lampka. | What helps us see in the dark: a lamp or a pillow? | A lamp. | pass | pass | pass | pass |
| 3p-21 | Co widać na ziemi obok ciebie w słońcu: twój cień czy tęczę? | Twój cień. | What do you see on the ground next to you in the sun: your shadow or a rainbow? | Your shadow. | pass | pass | pass | pass |
| 3p-22 | Jakiego koloru jest niebo w pogodny dzień? | Niebieskiego. | What colour is the sky on a clear day? | Blue. | pass | pass | pass | pass |
| 3p-23 | Co zamienia wodę w lód: ciepło czy zimno? | Zimno. | What turns water into ice: warmth or cold? | Cold. | pass | pass | pass | pass |
| 3p-24 | Co ma wiele kolorów i pojawia się na niebie, gdy pada deszcz i świeci słońce? | Tęcza. | What has many colours and appears in the sky when it rains and the sun shines? | A rainbow. | pass | pass | pass | pass |
| 3p-25 | Co unosi się nad garnkiem z bardzo gorącą wodą? | Para. | What rises from a pot of very hot water? | Steam. | pass | pass | pass | pass |
| 3p-26 | Jak robi krowa? | Muu. | What sound does a cow make? | Moo. | pass | pass | pass | pass |
| 3p-27 | Które zwierzę robi hau hau? | Pies. | Which animal says woof? | A dog. | pass | pass | pass | pass |
| 3p-28 | Gdzie mieszka ryba: w wodzie czy na drzewie? | W wodzie. | Where does a fish live: in water or in a tree? | In water. | pass | pass | pass | pass |
| 3p-29 | Co słodkiego robią pszczoły? | Miód. | What sweet thing do bees make? | Honey. | pass | pass | pass | pass |
| 3p-30 | Kto ma dłuższą szyję: żyrafa czy kot? | Żyrafa. | Which has a longer neck: a giraffe or a cat? | A giraffe. | pass | pass | pass | pass |
| 3p-31 | Który ptak robi kwa kwa? | Kaczka. | Which bird says quack? | A duck. | pass | pass | pass | pass |
| 3p-32 | Czym latają ptaki? | Skrzydłami. | What do birds fly with? | Their wings. | pass | pass | pass | pass |
| 3p-33 | Które zwierzę robi kum kum: żaba czy krowa? | Żaba. | Which animal says ribbit: a frog or a cow? | A frog. | pass | pass | pass | pass |
| 3p-34 | Które zwierzę podobne do konia ma czarno-białe paski? | Zebra. | Which animal looks like a horse and has black and white stripes? | A zebra. | pass | pass | pass | pass |
| 3p-35 | Które zwierzę ma trąbę: słoń czy pies? | Słoń. | Which animal has a trunk: an elephant or a dog? | An elephant. | pass | pass | pass | pass |
| 3p-36 | Co znosi kura? | Jajka. | What does a hen lay? | Eggs. | pass | pass | pass | pass |
| 3p-37 | Które zwierzę robi chrum chrum? | Świnka. | Which animal says oink? | A pig. | pass | pass | pass | pass |
| 3p-38 | Które zwierzę robi miau? | Kot. | Which animal says meow? | A cat. | pass | pass | pass | pass |
| 3p-39 | Co zakładamy na stopy przed butami: skarpetki czy rękawiczki? | Skarpetki. | What do we put on our feet before our shoes: socks or gloves? | Socks. | pass | pass | pass | pass |
| 3p-40 | Co zdmuchujemy na torcie urodzinowym? | Świeczki. | What do we blow out on a birthday cake? | Candles. | pass | pass | pass | pass |
| 3p-41 | Gdzie trzymamy mleko, żeby było zimne: w lodówce czy w piekarniku? | W lodówce. | Where do we keep milk so it stays cold: in the fridge or in the oven? | In the fridge. | pass | pass | pass | pass |
| 3p-42 | Co trzymamy nad głową, żeby nie zmoknąć w deszczu? | Parasol. | What do we hold over our head to keep dry in the rain? | An umbrella. | pass | pass | pass | pass |
| 3p-43 | Jaka zabawka jest okrągła i odbija się od podłogi? | Piłka. | Which toy is round and bounces on the floor? | A ball. | pass | pass | pass | pass |
| 3p-44 | Jak nazywamy jedzenie rano: śniadanie czy kolacja? | Śniadanie. | What do we call the food we eat in the morning: breakfast or supper? | Breakfast. | pass | pass | pass | pass |
| 3p-45 | Co pokazuje zegar: godzinę czy pogodę? | Godzinę. | What does a clock show: the time or the weather? | The time. | pass | pass | pass | pass |
| 3p-46 | Czym otwieramy zamek w drzwiach: kluczem czy kredką? | Kluczem. | What do we open a door lock with: a key or a crayon? | A key. | pass | pass | pass | pass |
| 3p-47 | Po czym jeżdżą pociągi: po torach czy po wodzie? | Po torach. | What do trains travel on: tracks or water? | Tracks. | pass | pass | pass | pass |
| 3p-48 | Co zakładamy na szyję, gdy jest zimno? | Szalik. | What do we wear around our neck when it is cold? | A scarf. | pass | pass | pass | pass |
| 3p-49 | Czym jemy zupę: łyżką czy grzebieniem? | Łyżką. | What do we eat soup with: a spoon or a comb? | A spoon. | pass | pass | pass | pass |
| 3p-50 | Z czego lepimy bałwana? | Ze śniegu. | What do we make a snowman from? | Snow. | pass | pass | pass | pass |
