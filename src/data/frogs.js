// Especies reales de anfibios presentes en Colombia.
// Datos de referencia: IUCN Red List, AmphibiaWeb, Catálogo de Anfibios y Reptiles de Colombia.
// Las ilustraciones son originales, cartoon y locales (public/assets/frogs/).

export const FROGS = [
  {
    id: "frog_01",
    commonName: "Rana dorada venenosa",
    scientificName: "Phyllobates terribilis",
    habitat: "Bosques húmedos del Pacífico colombiano",
    funFact: "Es uno de los vertebrados más tóxicos del mundo.",
    image: "/assets/frogs/frog_01.svg",
    palette: ["#FFD45C", "#FF914D"],
  },
  {
    id: "frog_02",
    commonName: "Rana arlequín venenosa",
    scientificName: "Oophaga histrionica",
    habitat: "Selvas húmedas del Chocó biogeográfico",
    funFact: "Su patrón de colores varía muchísimo entre poblaciones.",
    image: "/assets/frogs/frog_02.svg",
    palette: ["#FF914D", "#A66DD4"],
  },
  {
    id: "frog_03",
    commonName: "Rana dardo amarilla",
    scientificName: "Dendrobates truncatus",
    habitat: "Bosques del Caribe y el valle del Magdalena",
    funFact: "Sus rayas negras y amarillas advierten que es tóxica.",
    image: "/assets/frogs/frog_03.svg",
    palette: ["#FFD45C", "#228B45"],
  },
  {
    id: "frog_04",
    commonName: "Rana dardo de Kokoe",
    scientificName: "Phyllobates aurotaenia",
    habitat: "Bosques húmedos del Pacífico (Chocó)",
    funFact: "Se comunica con cantos cortos para defender su territorio.",
    image: "/assets/frogs/frog_04.svg",
    palette: ["#228B45", "#FFD45C"],
  },
  {
    id: "frog_05",
    commonName: "Rana venenosa de Doriss",
    scientificName: "Ranitomeya dorisswansonae",
    habitat: "Bosques andinos y de niebla del Tolima",
    funFact: "Es diminuta: cabe en la punta de un dedo.",
    image: "/assets/frogs/frog_05.svg",
    palette: ["#ED6464", "#65C7E8"],
  },
  {
    id: "frog_06",
    commonName: "Rana arlequín de Spurrell",
    scientificName: "Atelopus spurrelli",
    habitat: "Quebradas del bosque húmedo del Pacífico",
    funFact: "Camina en vez de saltar grandes distancias.",
    image: "/assets/frogs/frog_06.svg",
    palette: ["#A66DD4", "#65C7E8"],
  },
  {
    id: "frog_07",
    commonName: "Rana platanera",
    scientificName: "Boana crepitans",
    habitat: "Zonas bajas y cálidas de casi todo el país",
    funFact: "Duerme sobre las hojas de plátano durante el día.",
    image: "/assets/frogs/frog_07.svg",
    palette: ["#65BD48", "#FFF8E7"],
  },
  {
    id: "frog_08",
    commonName: "Rana silbadora",
    scientificName: "Leptodactylus fuscus",
    habitat: "Sabanas de la Orinoquía y el Caribe",
    funFact: "Su canto suena como un silbido que se repite.",
    image: "/assets/frogs/frog_08.svg",
    palette: ["#FF914D", "#FFF8E7"],
  },
  {
    id: "frog_09",
    commonName: "Rana de cristal gigante",
    scientificName: "Espadarana prosoblepon",
    habitat: "Bosques de niebla de los Andes",
    funFact: "Su piel del vientre es tan fina que se le ven los órganos.",
    image: "/assets/frogs/frog_09.svg",
    palette: ["#65C7E8", "#65BD48"],
  },
  {
    id: "frog_10",
    commonName: "Sapo común",
    scientificName: "Rhinella marina",
    habitat: "Casi todo el país, desde el nivel del mar",
    funFact: "Detrás de los ojos tiene glándulas que producen veneno.",
    image: "/assets/frogs/frog_10.svg",
    palette: ["#228B45", "#FF914D"],
  },
];

export function getFrog(id) {
  return FROGS.find((f) => f.id === id) || FROGS[0];
}
