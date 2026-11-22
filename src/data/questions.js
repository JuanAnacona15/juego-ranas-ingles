// Banco local de preguntas de inglés.
// Niveles: easy (30), medium (40), hard (50). Total: 120 preguntas.
// Cada pregunta tiene exactamente UNA respuesta correcta, señalada por índice.

// q(id, nivel, tema, pregunta, respuesta correcta, opciones incorrectas, explicación en español)
// El constructor coloca la respuesta correcta en una posición variada pero fija
// (determinada por el id), garantizando que no quede siempre en la misma casilla.
function q(id, level, topic, question, correct, wrongs, explanation) {
  const options = [correct, ...wrongs];
  let shift = 0;
  for (const ch of id) shift = (shift + ch.charCodeAt(0)) % options.length;
  for (let i = 0; i < shift; i++) options.push(options.shift());
  return {
    id,
    level,
    topic,
    question,
    options,
    correctAnswer: options.indexOf(correct),
    explanation,
  };
}

const EASY = [
  q("easy_001", "easy", "simple_present", "She ___ to school every day.", "goes", ["go", "going", "gone"], "Con she, he o it usamos 'goes' en presente simple."),
  q("easy_002", "easy", "simple_present", "I ___ a student.", "am", ["is", "are", "be"], "Con 'I' usamos el verbo 'am'."),
  q("easy_003", "easy", "simple_present", "They ___ soccer on Sundays.", "play", ["plays", "playing", "played"], "Con they usamos la forma base 'play'."),
  q("easy_004", "easy", "simple_present", "He ___ breakfast at 7 a.m.", "eats", ["eat", "eating", "ate"], "Con he usamos 'eats'."),
  q("easy_005", "easy", "simple_present", "We ___ from Colombia.", "are", ["is", "am", "be"], "Con we usamos 'are'."),
  q("easy_006", "easy", "simple_present", "The cat ___ milk.", "likes", ["like", "liking", "liked"], "Sujeto en tercera persona singular → 'likes'."),
  q("easy_007", "easy", "simple_present", "My father ___ in a hospital.", "works", ["work", "working", "worked"], "Tercera persona singular → 'works'."),
  q("easy_008", "easy", "simple_present", "Water ___ at 100 degrees.", "boils", ["boil", "boiling", "boiled"], "Hecho general; con 'water' (it) usamos 'boils'."),
  q("easy_009", "easy", "simple_present", "___ you like ice cream?", "Do", ["Does", "Is", "Are"], "En preguntas con you usamos 'Do'."),
  q("easy_010", "easy", "simple_present", "She ___ not watch TV at night.", "does", ["do", "is", "are"], "Negación en presente con she → 'does not'."),
  q("easy_011", "easy", "simple_present", "It ___ a big house.", "is", ["am", "are", "be"], "Con it usamos 'is'."),
  q("easy_012", "easy", "simple_present", "We ___ TV after dinner.", "watch", ["watches", "watching", "watched"], "Con we usamos la forma base 'watch'."),
  q("easy_013", "easy", "simple_present", "The sun ___ in the east.", "rises", ["rise", "rising", "rose"], "Con the sun (it) usamos 'rises'."),
  q("easy_014", "easy", "simple_present", "I ___ my teeth every morning.", "brush", ["brushes", "brushing", "brushed"], "Con I usamos la forma base 'brush'."),
  q("easy_015", "easy", "simple_present", "He ___ to music on the bus.", "listens", ["listen", "listening", "listened"], "Con he usamos 'listens'."),
  q("easy_016", "easy", "simple_present", "___ he play the guitar?", "Does", ["Do", "Is", "Are"], "Pregunta en presente con he → 'Does'."),
  q("easy_017", "easy", "simple_present", "They ___ in a small town.", "live", ["lives", "living", "lived"], "Con they usamos la forma base 'live'."),
  q("easy_018", "easy", "simple_present", "She ___ English very well.", "speaks", ["speak", "speaking", "spoke"], "Con she usamos 'speaks'."),
  q("easy_019", "easy", "simple_present", "My dog ___ fast.", "runs", ["run", "running", "ran"], "Con my dog (it) usamos 'runs'."),
  q("easy_020", "easy", "simple_present", "I ___ coffee every morning.", "drink", ["drinks", "drinking", "drank"], "Con I usamos la forma base 'drink'."),
  q("easy_021", "easy", "vocabulary", "The color of the sky is ___.", "blue", ["book", "red", "table"], "'Blue' significa azul, el color del cielo."),
  q("easy_022", "easy", "vocabulary", "A 'manzana' in English is ___.", "apple", ["banana", "car", "house"], "'Manzana' se traduce como 'apple'."),
  q("easy_023", "easy", "vocabulary", "How do you say 'perro' in English?", "dog", ["cat", "bird", "fish"], "'Perro' se dice 'dog'."),
  q("easy_024", "easy", "vocabulary", "The opposite of 'big' is ___.", "small", ["tall", "happy", "fast"], "Lo contrario de 'big' (grande) es 'small' (pequeño)."),
  q("easy_025", "easy", "vocabulary", "'Gracias' in English is ___.", "thank you", ["please", "sorry", "goodbye"], "'Gracias' se dice 'thank you'."),
  q("easy_026", "easy", "vocabulary", "A 'sapo' is a kind of ___.", "frog", ["bird", "snake", "fish"], "Un sapo es un anfibio: 'frog' / 'toad'."),
  q("easy_027", "easy", "simple_past", "Yesterday I ___ to the park.", "went", ["go", "gone", "going"], "Pasado de 'go' → 'went'."),
  q("easy_028", "easy", "simple_past", "She ___ a movie last night.", "watched", ["watch", "watches", "watching"], "Pasado regular: 'watch' → 'watched'."),
  q("easy_029", "easy", "simple_past", "They ___ pizza yesterday.", "ate", ["eat", "eats", "eating"], "Pasado de 'eat' → 'ate'."),
  q("easy_030", "easy", "simple_past", "He ___ happy at the party.", "was", ["is", "were", "be"], "Con he en pasado usamos 'was'."),
];

const MEDIUM = [
  // Comparativos
  q("medium_001", "medium", "comparatives", "An elephant is ___ than a mouse.", "bigger", ["big", "biggest", "more big"], "Adjetivo corto: big → bigger."),
  q("medium_002", "medium", "comparatives", "My brother is ___ than me.", "taller", ["tall", "tallest", "more tall"], "tall → taller."),
  q("medium_003", "medium", "comparatives", "This book is ___ than that one.", "more interesting", ["interesting", "most interesting", "interestinger"], "Adjetivo largo: se forma con 'more interesting'."),
  q("medium_004", "medium", "comparatives", "Coffee is ___ than water.", "more expensive", ["expensive", "most expensive", "expensiver"], "Adjetivo largo: 'more expensive'."),
  q("medium_005", "medium", "comparatives", "She runs ___ than her friend.", "faster", ["fast", "fastest", "more fast"], "fast → faster."),
  q("medium_006", "medium", "comparatives", "Today is ___ than yesterday.", "hotter", ["hot", "hottest", "more hot"], "hot → hotter (se duplica la t)."),
  q("medium_007", "medium", "comparatives", "Spanish is ___ than English for me.", "easier", ["easy", "easiest", "more easy"], "easy → easier (la y cambia a i)."),
  q("medium_008", "medium", "comparatives", "The blue shirt is ___ than the red one.", "cheaper", ["cheap", "cheapest", "more cheap"], "cheap → cheaper."),
  q("medium_009", "medium", "comparatives", "A car is ___ than a bicycle.", "heavier", ["heavy", "heaviest", "more heavy"], "heavy → heavier (la y cambia a i)."),
  q("medium_010", "medium", "comparatives", "This test is ___ than the last one.", "harder", ["hard", "hardest", "more hard"], "hard → harder."),
  // Superlativos
  q("medium_011", "medium", "superlatives", "Mount Everest is the ___ mountain in the world.", "highest", ["high", "higher", "more high"], "Superlativo de high → highest."),
  q("medium_012", "medium", "superlatives", "She is the ___ student in the class.", "best", ["good", "better", "well"], "Superlativo irregular de good → best."),
  q("medium_013", "medium", "superlatives", "This is the ___ movie I have ever seen.", "most exciting", ["exciting", "more exciting", "excitingest"], "Adjetivo largo: 'the most exciting'."),
  q("medium_014", "medium", "superlatives", "He is the ___ player on the team.", "fastest", ["fast", "faster", "more fast"], "fast → fastest."),
  q("medium_015", "medium", "superlatives", "That was the ___ day of my life.", "happiest", ["happy", "happier", "more happy"], "happy → happiest."),
  q("medium_016", "medium", "superlatives", "The Amazon is one of the ___ rivers in the world.", "longest", ["long", "longer", "more long"], "long → longest."),
  q("medium_017", "medium", "superlatives", "This is the ___ room in the house.", "smallest", ["small", "smaller", "more small"], "small → smallest."),
  q("medium_018", "medium", "superlatives", "She is the ___ person I know.", "nicest", ["nice", "nicer", "more nice"], "nice → nicest."),
  q("medium_019", "medium", "superlatives", "Colombia is one of the ___ countries in the world.", "most biodiverse", ["biodiverse", "more biodiverse", "biodiversest"], "Adjetivo largo: 'the most biodiverse'."),
  q("medium_020", "medium", "superlatives", "Winter is the ___ season of the year.", "coldest", ["cold", "colder", "more cold"], "cold → coldest."),
  // Presente simple
  q("medium_021", "medium", "simple_present", "She ___ to the gym three times a week.", "goes", ["go", "going", "gone"], "Con she → goes."),
  q("medium_022", "medium", "simple_present", "___ your parents live in Cali?", "Do", ["Does", "Is", "Are"], "Con your parents (they) → Do."),
  q("medium_023", "medium", "simple_present", "He never ___ coffee at night.", "drinks", ["drink", "drinking", "drank"], "Con he → drinks."),
  q("medium_024", "medium", "simple_present", "The students ___ their homework every day.", "do", ["does", "make", "makes"], "Los estudiantes 'do' (hacer) su tarea."),
  q("medium_025", "medium", "simple_present", "My mother ___ dinner at home.", "cooks", ["cook", "cooking", "cooked"], "Con my mother (she) → cooks."),
  q("medium_026", "medium", "simple_present", "___ she speak French?", "Does", ["Do", "Is", "Are"], "Pregunta en presente con she → Does."),
  q("medium_027", "medium", "simple_present", "We ___ to the beach every summer.", "travel", ["travels", "traveling", "traveled"], "Con we → travel."),
  q("medium_028", "medium", "simple_present", "It usually ___ a lot in April here.", "rains", ["rain", "raining", "rained"], "Con it → rains."),
  q("medium_029", "medium", "simple_present", "I ___ like onions.", "don't", ["doesn't", "not", "am not"], "Con I usamos 'don't'."),
  q("medium_030", "medium", "simple_present", "The birds ___ early in the morning.", "sing", ["sings", "singing", "sang"], "Con the birds (they) → sing."),
  // Pasado simple
  q("medium_031", "medium", "simple_past", "We ___ to Bogotá last year.", "traveled", ["travel", "travels", "traveling"], "Pasado regular: traveled."),
  q("medium_032", "medium", "simple_past", "She ___ her homework yesterday.", "did", ["do", "does", "done"], "Pasado de do → did."),
  q("medium_033", "medium", "simple_past", "They ___ a big house in the country.", "had", ["have", "has", "having"], "Pasado de have → had."),
  q("medium_034", "medium", "simple_past", "I ___ my keys this morning.", "lost", ["lose", "loses", "losing"], "Pasado de lose → lost."),
  q("medium_035", "medium", "simple_past", "He ___ his best friend at the park.", "met", ["meet", "meets", "meeting"], "Pasado de meet → met."),
  q("medium_036", "medium", "simple_past", "We ___ a lot of photos on the trip.", "took", ["take", "taken", "taking"], "Pasado de take → took."),
  q("medium_037", "medium", "simple_past", "She ___ me a beautiful gift.", "gave", ["give", "gives", "given"], "Pasado de give → gave."),
  q("medium_038", "medium", "simple_past", "The class ___ at 8 a.m. yesterday.", "began", ["begin", "begun", "begins"], "Pasado de begin → began."),
  q("medium_039", "medium", "simple_past", "They ___ at the party until late.", "stayed", ["stay", "stays", "staying"], "Pasado regular: stayed."),
  q("medium_040", "medium", "simple_past", "I ___ my car last weekend.", "washed", ["wash", "washes", "washing"], "Pasado regular: washed."),
];

const HARD = [
  // Presente simple
  q("hard_001", "hard", "simple_present", "My brother ___ in a bank in Bogotá.", "works", ["work", "working", "worked"], "Con my brother (he) → works."),
  q("hard_002", "hard", "simple_present", "The teacher ___ the lesson every Monday.", "explains", ["explain", "explaining", "explained"], "Con the teacher (he/she) → explains."),
  q("hard_003", "hard", "simple_present", "___ your cousin live in this city?", "Does", ["Do", "Is", "Are"], "Con your cousin (he/she) → Does."),
  q("hard_004", "hard", "simple_present", "She rarely ___ late for school.", "arrives", ["arrive", "arriving", "arrived"], "Con she → arrives."),
  q("hard_005", "hard", "simple_present", "The children ___ quietly in the classroom.", "study", ["studies", "studying", "studied"], "Con the children (they) → study."),
  q("hard_006", "hard", "simple_present", "My grandfather ___ us every Sunday.", "visits", ["visit", "visiting", "visited"], "Con my grandfather (he) → visits."),
  q("hard_007", "hard", "simple_present", "___ the store open on Sundays?", "Is", ["Does", "Do", "Are"], "Con the store (it) usamos 'Is'."),
  q("hard_008", "hard", "simple_present", "That bird ___ over the river.", "flies", ["fly", "flying", "flied"], "Con that bird (it) → flies."),
  q("hard_009", "hard", "simple_present", "My friends and I ___ basketball after class.", "play", ["plays", "playing", "played"], "Con my friends and I (we) → play."),
  q("hard_010", "hard", "simple_present", "The nurse ___ care of the patients.", "takes", ["take", "taking", "took"], "Con the nurse (she/he) → takes."),
  // Pasado simple
  q("hard_011", "hard", "simple_past", "Last summer we ___ to the Amazon rainforest.", "traveled", ["travel", "travels", "traveling"], "Pasado regular: traveled."),
  q("hard_012", "hard", "simple_past", "She ___ her glasses at home yesterday.", "left", ["leave", "leaves", "leaving"], "Pasado de leave → left."),
  q("hard_013", "hard", "simple_past", "They ___ a delicious cake for the party.", "made", ["make", "makes", "making"], "Pasado de make → made."),
  q("hard_014", "hard", "simple_past", "I ___ asleep during the movie last night.", "fell", ["fall", "fallen", "falls"], "Pasado de fall → fell (fall asleep = dormirse)."),
  q("hard_015", "hard", "simple_past", "He ___ the answer but he was too nervous.", "knew", ["know", "known", "knows"], "Pasado de know → knew."),
  q("hard_016", "hard", "simple_past", "We ___ our grandmother last weekend.", "visited", ["visit", "visits", "visiting"], "Pasado regular: visited."),
  q("hard_017", "hard", "simple_past", "The dog ___ under the table during the storm.", "hid", ["hide", "hidden", "hides"], "Pasado de hide → hid."),
  q("hard_018", "hard", "simple_past", "She ___ a beautiful song at the festival.", "sang", ["sing", "sung", "sings"], "Pasado de sing → sang."),
  q("hard_019", "hard", "simple_past", "They ___ for three hours to finish the project.", "worked", ["work", "works", "working"], "Pasado regular: worked."),
  q("hard_020", "hard", "simple_past", "My father ___ me how to ride a bike.", "taught", ["teach", "teaches", "teaching"], "Pasado de teach → taught."),
  // Comparativos
  q("hard_021", "hard", "comparatives", "This exercise is ___ than I expected.", "harder", ["hard", "hardest", "more hard"], "hard → harder."),
  q("hard_022", "hard", "comparatives", "The weather in Cali is ___ than in Bogotá.", "warmer", ["warm", "warmest", "more warm"], "warm → warmer."),
  q("hard_023", "hard", "comparatives", "My house is ___ from the school than yours.", "farther", ["far", "farthest", "more far"], "far → farther."),
  q("hard_024", "hard", "comparatives", "These shoes are ___ than those ones.", "more comfortable", ["comfortable", "most comfortable", "comfortabler"], "Adjetivo largo: 'more comfortable'."),
  q("hard_025", "hard", "comparatives", "The exam was ___ than the homework.", "more difficult", ["difficult", "most difficult", "difficulter"], "Adjetivo largo: 'more difficult'."),
  q("hard_026", "hard", "comparatives", "Gold is ___ than silver.", "more valuable", ["valuable", "most valuable", "valuabler"], "Adjetivo largo: 'more valuable'."),
  q("hard_027", "hard", "comparatives", "Riding a bike is ___ than walking.", "faster", ["fast", "fastest", "more fast"], "fast → faster."),
  q("hard_028", "hard", "comparatives", "The new phone is ___ than the old one.", "lighter", ["light", "lightest", "more light"], "light → lighter."),
  q("hard_029", "hard", "comparatives", "Her pronunciation is ___ than mine.", "better", ["good", "best", "well"], "Comparativo irregular de good → better."),
  q("hard_030", "hard", "comparatives", "The exam results were ___ than last year.", "worse", ["bad", "worst", "badly"], "Comparativo irregular de bad → worse."),
  // Superlativos
  q("hard_031", "hard", "superlatives", "The Amazon is the ___ rainforest on Earth.", "largest", ["large", "larger", "more large"], "Superlativo de large → largest."),
  q("hard_032", "hard", "superlatives", "She got the ___ score in the whole class.", "highest", ["high", "higher", "more high"], "high → highest."),
  q("hard_033", "hard", "superlatives", "This is the ___ restaurant in the city.", "most expensive", ["expensive", "more expensive", "expensiver"], "Adjetivo largo: 'the most expensive'."),
  q("hard_034", "hard", "superlatives", "He is the ___ swimmer of all.", "best", ["good", "better", "well"], "Superlativo irregular de good → best."),
  q("hard_035", "hard", "superlatives", "It was the ___ mistake I have ever made.", "worst", ["bad", "worse", "badly"], "Superlativo irregular de bad → worst."),
  q("hard_036", "hard", "superlatives", "That was the ___ news of the week.", "most important", ["important", "more important", "importanter"], "Adjetivo largo: 'the most important'."),
  q("hard_037", "hard", "superlatives", "The cheetah is the ___ animal on land.", "fastest", ["fast", "faster", "more fast"], "fast → fastest."),
  q("hard_038", "hard", "superlatives", "This is the ___ bridge in the world.", "longest", ["long", "longer", "more long"], "long → longest."),
  q("hard_039", "hard", "superlatives", "She is the ___ girl in her family.", "youngest", ["young", "younger", "more young"], "young → youngest."),
  q("hard_040", "hard", "superlatives", "That was the ___ question on the test.", "easiest", ["easy", "easier", "more easy"], "easy → easiest."),
  // Vocabulario
  q("hard_041", "hard", "vocabulary", "A person who flies airplanes is a ___.", "pilot", ["driver", "chef", "farmer"], "Quien pilotea aviones es un 'pilot'."),
  q("hard_042", "hard", "vocabulary", "The part of your body you use to see is your ___.", "eyes", ["ears", "nose", "hands"], "Ves con tus 'eyes' (ojos)."),
  q("hard_043", "hard", "vocabulary", "If it's raining, you should take an ___.", "umbrella", ["hat", "glass", "book"], "Para la lluvia llevas un 'umbrella' (paraguas)."),
  q("hard_044", "hard", "vocabulary", "The opposite of 'always' is ___.", "never", ["sometimes", "often", "usually"], "Lo contrario de 'always' (siempre) es 'never' (nunca)."),
  q("hard_045", "hard", "vocabulary", "'Biblioteca' in English is ___.", "library", ["bookstore", "school", "museum"], "'Biblioteca' se dice 'library'."),
  q("hard_046", "hard", "vocabulary", "You use ___ to cut paper.", "scissors", ["pencil", "ruler", "glue"], "Cortas papel con 'scissors' (tijeras)."),
  q("hard_047", "hard", "vocabulary", "The meal you eat in the morning is ___.", "breakfast", ["lunch", "dinner", "snack"], "La comida de la mañana es 'breakfast'."),
  q("hard_048", "hard", "vocabulary", "A place where you buy medicine is a ___.", "pharmacy", ["bakery", "hospital", "restaurant"], "Compras medicinas en la 'pharmacy'."),
  q("hard_049", "hard", "vocabulary", "'Comida deliciosa' in English is ___.", "delicious food", ["bad food", "fast food", "spicy food"], "'Comida deliciosa' = 'delicious food'."),
  q("hard_050", "hard", "vocabulary", "The season after winter is ___.", "spring", ["summer", "autumn", "winter"], "Después del invierno viene la 'spring' (primavera)."),
];

export const QUESTIONS = {
  easy: EASY,
  medium: MEDIUM,
  hard: HARD,
};

export const TOTAL_QUESTIONS = EASY.length + MEDIUM.length + HARD.length;
