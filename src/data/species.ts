export type ThreatLevel = 'tiny' | 'medium' | 'chaos goblin' | 'majestic hazard';
export type CareMood = 'pleased' | 'curious' | 'concerned' | 'overstimulated' | 'deeply fond';

export type SpeciesLog = {
  id: string;
  commonName: string;
  scientificName: string;
  homeWorld: string;
  habitat: string;
  diet: string;
  behaviorNotes: string;
  enrichment: string;
  conservationStatus: string;
  threatLevel: ThreatLevel;
  keeperMood: CareMood;
  viviNote: string;
  tags: string[];
};

export const starterSpecies: SpeciesLog[] = [
  {
    id: 'red-panda-earth-01',
    commonName: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    homeWorld: 'Earth / Himalayan forests',
    habitat: 'Cool temperate forest with climbing routes, shade, and quiet places to retreat.',
    diet: 'Bamboo, fruit, specialized biscuits, and very selective snack diplomacy.',
    behaviorNotes: 'Appears soft and decorative, but is actually a highly opinionated tree goblin.',
    enrichment: 'High branches, scent trails, puzzle feeders, and platforms with excellent surveillance value.',
    conservationStatus: 'Endangered',
    threatLevel: 'tiny',
    keeperMood: 'deeply fond',
    viviNote: 'Creature requires vertical space and respect for tiny paws.',
    tags: ['earth mammal', 'arboreal', 'soft hazard'],
  },
  {
    id: 'axolotl-earth-02',
    commonName: 'Axolotl',
    scientificName: 'Ambystoma mexicanum',
    homeWorld: 'Earth / Xochimilco waterways',
    habitat: 'Cool freshwater with hiding spots, gentle flow, and clean parameters.',
    diet: 'Worms, aquatic invertebrates, and snacks delivered like offerings to a tiny water alien.',
    behaviorNotes: 'Permanent baby-face camouflage. Suspiciously alien. Observes the observer.',
    enrichment: 'Caves, plants, soft substrate, and stable water quality above all else.',
    conservationStatus: 'Critically Endangered in the wild',
    threatLevel: 'tiny',
    keeperMood: 'curious',
    viviNote: 'Do not underestimate the smile. It knows secrets.',
    tags: ['amphibian', 'aquatic', 'alien-coded'],
  },
  {
    id: 'capybara-earth-03',
    commonName: 'Capybara',
    scientificName: 'Hydrochoerus hydrochaeris',
    homeWorld: 'Earth / South American wetlands',
    habitat: 'Warm grassland and wetland edge with social space, grazing, and water access.',
    diet: 'Grasses, aquatic plants, hay, and social vegetables.',
    behaviorNotes: 'Large calm node in the ecosystem. Other creatures appear to trust its vibe authority.',
    enrichment: 'Mud wallows, pools, browse, social grouping, and peaceful basking zones.',
    conservationStatus: 'Least Concern',
    threatLevel: 'medium',
    keeperMood: 'pleased',
    viviNote: 'Design habitat around social serenity. This creature is a walking treaty.',
    tags: ['social', 'wetland', 'vibe anchor'],
  },
];
