export enum TechnologicalSection {
  SECTION_1,
  SECTION_2,
  SECTION_3,
}

export enum ResourceType {
  WOOD = "Madera",
  STONE = "Piedra",
  FOOD = "Comida",
  GOLD = "Oro",
  SCIENCE = "Ciencia",
}

export enum TerrainType {
  PLAINS = "Llanura",
  FOREST = "Bosque",
  MOUNTAIN = "Montaña",
  WATER = "Agua",
  DESERT = "Desierto",
}

export enum RecruitType {
  INFANTRY = "Infantería",
  CAVALRY = "Caballo",
  ELEPHANT = "Elefante",
  LEADER = "Líder",
  SHIP = "Barco",
}

// Edificios que se pueden construir
export enum BuildingType {
  FORTRESS = "Fortaleza",
  TEMPLE = "Templo",
  MARKET = "Mercado",
  OBSERVATORY = "Observatorio",
  ACADEMY = "Academia",
  PORT = "Puerto",
  OBELISK = "Obelisco",
  SETTLEMENT = "Asentamiento",
}

export enum TechnologicalRootType {
  AGRICULTURE = "Agricultura",
  BUILDING = "Construcción",
  NAVIGATION = "Nautica",
  EDUCATION = "Educación",
  MILITARY = "Belicismo",
  RELIGION = "Espiritualidad",
  ECONOMY = "Economía",
  CULTURE = "Cultura",
  CIENCE = "Ciencia",
  DEMOCRACY = "Democracia",
  AUTOCRACY = "Autocracia",
  TEOCRACY = "Teocracia",
}

// Primer dado:
// si el dado sale 1 o 2 -> Seccion 1
// si el dado sale 3 o 4 -> Seccion 2
// si el dado sale 5 o 6 -> Seccion 3

const techSectionMapping = {
  [TechnologicalSection.SECTION_1]: [1, 2],
  [TechnologicalSection.SECTION_2]: [3, 4],
  [TechnologicalSection.SECTION_3]: [5, 6],
};

// Segundo dado:
// si el dado sale 1 o 2 -> Tecnologia 1
// si el dado sale 3 o 4 -> Tecnologia 2
// si el dado sale 5 o 6 -> Tecnologia 3
const techRootMappingSection1 = {
  [TechnologicalRootType.AGRICULTURE]: [1, 2],
  [TechnologicalRootType.BUILDING]: [3, 4],
  [TechnologicalRootType.NAVIGATION]: [5, 6],
};

const techRootMappingSection2 = {
  [TechnologicalRootType.EDUCATION]: [1, 2],
  [TechnologicalRootType.MILITARY]: [3, 4],
  [TechnologicalRootType.RELIGION]: [5, 6],
};

const techRootMappingSection3 = {
  [TechnologicalRootType.ECONOMY]: [1, 2],
  [TechnologicalRootType.CULTURE]: [3, 4],
  [TechnologicalRootType.CIENCE]: [5, 6],
};

const techRootMapping = {
  [TechnologicalSection.SECTION_1]: {
    values: [1, 2],
    data: techRootMappingSection1,
  },
  [TechnologicalSection.SECTION_2]: {
    values: [3, 4],
    data: techRootMappingSection2,
  },
  [TechnologicalSection.SECTION_3]: {
    values: [5, 6],
    data: techRootMappingSection3,
  },
};

// Tercer dado:
// si aún no se ha desbloqueado el place 1 -> Place 1

// si ya se ha desbloqueado el place 1:
// si el dado sale 1 o 2 -> Place 2
// si el dado sale 3 o 4 -> Place 3
// si el dado sale 5 o 6 -> Place 4
// En caso de que no se haya desbloqueado el place 2, 3 o 4, se desbloqueará el siguiente disponible.
// En caso de no haber más disponibles, no se actúa.

const placeMapper = {
  2: [1, 2],
  3: [3, 4],
  4: [5, 6],
};

const technologicalTree = {
  [TechnologicalSection.SECTION_1]: {
    technologies: [
      // AGRICULTURA
      {
        id: 1,
        place: 1,
        root: TechnologicalRootType.AGRICULTURE,
        name: "Labranza",
        description:
          "Tus ciudades pueden ‘Recoger’ alimentos de espacios fértiles y madera de espacios de bosques.",
        effect: "",
      },
      {
        id: 2,
        place: 2,
        root: TechnologicalRootType.AGRICULTURE,
        name: "Almacenamiento",
        description: "Dejas de estar limitado a dos alimentos.",
        effect: "",
      },
      {
        id: 3,
        place: 3,
        root: TechnologicalRootType.AGRICULTURE,
        name: "Irrigación",
        description:
          "Tus ciudades pueden ‘Recoger’ alimentos de espacios yermos. Ignoras los eventos de ‘Hambre’.",
        effect: "",
      },
      {
        id: 4,
        place: 4,
        root: TechnologicalRootType.AGRICULTURE,
        name: "Ganadería",
        description:
          "Pagas 1 alimento (0 si tienes ‘Carreteras’) para ‘Recoger’ de espacios de tierra en un radio de 2 espacios de distancia (una vez por turno).",
        effect: "",
      },
      // CONSTRUCCIÓN
      {
        id: 5,
        place: 1,
        root: TechnologicalRootType.BUILDING,
        name: "Minería",
        description:
          "Tus ciudades pueden ‘Recoger’ minerales de los espacios de montaña.",
        effect: "",
      },
      {
        id: 6,
        place: 2,
        root: TechnologicalRootType.BUILDING,
        name: "Ingeniería",
        description:
          "Revelas la Maravilla de arriba del mazo. Puedes constuir una maravilla en ciudades felices.",
        effect: "",
      },
      {
        id: 7,
        place: 3,
        root: TechnologicalRootType.BUILDING,
        name: "Sanidad",
        description:
          "Puedes pagar 1 único colono con una ficha de felicidad. Ignoras los eventos de ‘Peste’ y ‘Epidemia’.",
        effect: "",
      },
      {
        id: 8,
        place: 4,
        root: TechnologicalRootType.BUILDING,
        name: "Carreteras",
        description:
          "Puedes mover unidades y grupos 2 espacios en lugar de 1. Al mover desde o hasta tus ciudades debes pagar 1 alimento y un mineral.",
        effect: "",
      },
      // NÁUTICA
      {
        id: 9,
        place: 1,
        root: TechnologicalRootType.NAVIGATION,
        name: "Pesca",
        description:
          "Tus ciudades pueden ‘Recoger’ alimentos de un espacio de mar adyacente.",
        effect: "",
      },
      {
        id: 10,
        place: 2,
        root: TechnologicalRootType.NAVIGATION,
        name: "Navegación",
        description:
          "Los barcos pueden ‘Mover’ alrededor del tablero al espacio de mar más cercano en la dirección elegida.",
        effect: "",
      },
      {
        id: 11,
        place: 3,
        root: TechnologicalRootType.NAVIGATION,
        name: "Barcos de Guerra",
        description:
          "Batallas navales + batallas en tierra donde tus ejércitos salgan de barcos: cancelas 1 ‘impacto’ en la primera ronda.",
        effect: "",
      },

      {
        id: 12,
        place: 4,
        root: TechnologicalRootType.NAVIGATION,
        name: "Cartografía",
        description:
          "Al usar la acción de mover, ganas 1 de ideas. Ganas 1 de cultura si usas navegación.",
        effect: "",
      },
    ],
  },

  [TechnologicalSection.SECTION_2]: {
    technologies: [
      // EDUCACIÓN
      {
        id: 13,
        place: 1,
        root: TechnologicalRootType.EDUCATION,
        name: "Escritura",
        description: "Roba 1 carta de acción y 1 de objetivo.",
        effect: "",
      },
      {
        id: 14,
        place: 2,
        root: TechnologicalRootType.EDUCATION,
        name: "Educación Pública",
        description:
          "Consigues 1 recurso de idea cuando ‘Recoges’ desde una ciudad con una Academia.",
        effect: "",
      },
      {
        id: 15,
        place: 3,
        root: TechnologicalRootType.EDUCATION,
        name: "Educación Gratuita",
        description:
          "Consigues 1 ficha de ánimo cuando compras 1 avance usando oro, ideas o una mezcla de ambos (una vez por turno).",
        effect: "",
      },
      {
        id: 16,
        place: 4,
        root: TechnologicalRootType.EDUCATION,
        name: "Filosofía",
        description:
          "Consigues 1 idea cuando consigues un avance de ‘Ciencia’ y después de conseguir este avance.",
        effect: "",
      },
      // BELICISMO
      {
        id: 17,
        place: 1,
        root: TechnologicalRootType.MILITARY,
        name: "Tácticas",
        description:
          "Puedes ‘Mover’ ejércitos. Puedes usar los efectos de combate en las cartas de acción.",
        effect: "",
      },
      {
        id: 18,
        place: 2,
        root: TechnologicalRootType.MILITARY,
        name: "Técnica de Asedio",
        description:
          "Cancelas la capacidad de una fortaleza: para atacar (pagas 2 maderas) o para cancelar un ‘impacto’ (pagas 2 minerales).",
        effect: "",
      },
      {
        id: 19,
        place: 3,
        root: TechnologicalRootType.MILITARY,
        name: "Armas de Acero",
        description:
          "Tus ejércitos hacen +1 ‘impacto’ en la primera ronda contra ejércitos sin ‘Armas de Acero’ (pagas +2 minerales para adquirirlo).",
        effect: "",
      },
      {
        id: 20,
        place: 4,
        root: TechnologicalRootType.MILITARY,
        name: "Levas",
        description:
          "En cada acción de ‘Construir’ unidades: una sola unidad de ejército se paga con 1 ficha de ánimo.",
        effect: "",
      },
      // ESPIRITUALIDAD
      {
        id: 21,
        place: 1,
        root: TechnologicalRootType.RELIGION,
        name: "Mitos",
        description:
          "Puedes pagar 1 ficha de ánimo para evitar reducir el ánimo de una ciudad debido a una carta de evento.",
        effect: "",
      },
      {
        id: 22,
        place: 2,
        root: TechnologicalRootType.RELIGION,
        name: "Rituales",
        description:
          "Los recursos (excluyendo ideas) pueden gastarse como fichas de ánimo para ‘Mejora Cívica’ en una relación 1:1.",
        effect: "",
      },
      {
        id: 23,
        place: 3,
        root: TechnologicalRootType.RELIGION,
        name: "Sacerdocio",
        description:
          "Los avances de ‘Ciencia’ pueden comprarse sin coste de alimentos (una vez por turno).",
        effect: "",
      },
      {
        id: 24,
        place: 4,
        root: TechnologicalRootType.RELIGION,
        name: "Religión Oficial",
        description:
          "Acción de ‘Aumentar el tamaño de ciudad’: construyes un templo sin pagar alimentos (una vez por turno).",
        effect: "",
      },
    ],
  },

  [TechnologicalSection.SECTION_3]: {
    technologies: [
      // ECONOMÍA
      {
        id: 25,
        place: 1,
        root: TechnologicalRootType.ECONOMY,
        name: "Trueque",
        description:
          "Acción Gratuita: Descarta una carta a cambio de 1 recurso de oro o de cultura.",
        effect: "",
      },
      {
        id: 26,
        place: 2,
        root: TechnologicalRootType.ECONOMY,
        name: "Impuestos",
        description:
          "CUA: pagas 1 ficha de ánimo y consigues 1 oro por cada ciudad que tengas (una vez por turno).",
        effect: "",
      },
      {
        id: 27,
        place: 3,
        root: TechnologicalRootType.ECONOMY,
        name: "Rutas Comerciales",
        description:
          "Comienzo de turno: consigues 1 alimento por colono/barco en un radio de 2 espacios de una única ciudad de jugador ‘no enfadada’ extranjera (máx. 4).",
        effect: "",
      },
      {
        id: 28,
        place: 4,
        root: TechnologicalRootType.ECONOMY,
        name: "Moneda",
        description:
          "Las rutas comerciales pueden producir oro en lugar de todo o parte de los alimentos.",
        effect: "",
      },

      // CULTURA
      {
        id: 29,
        place: 1,
        root: TechnologicalRootType.CULTURE,
        name: "Arte",
        description:
          "Pagas 1 ficha de cultura para hacer 1 acción de ‘Influencia Cultural’ sin coste de acción (una vez por turno).",
        effect: "",
      },
      {
        id: 30,
        place: 2,
        root: TechnologicalRootType.CULTURE,
        name: "Circo y Deportes",
        description:
          "‘Mejora Cívica’: tus ciudades se consideran 1 tamaño más pequeñas de lo que son realmente (mínimo 1).",
        effect: "",
      },
      {
        id: 31,
        place: 3,
        root: TechnologicalRootType.CULTURE,
        name: "Monumentos",
        description:
          "Revelas la Maravilla de arriba del mazo. Eliges una Maravilla: sólo tú puedes construirla y lo haces sin coste de acción.",
        effect: "",
      },
      {
        id: 32,
        place: 4,
        root: TechnologicalRootType.CULTURE,
        name: "Drama y Música",
        description:
          "Intercambias una ficha de ánimo por una ficha de cultura o viceversa (una vez por turno).",
        effect: "",
      },
      // CIENCIA
      {
        id: 33,
        place: 1,
        root: TechnologicalRootType.CIENCE,
        name: "Matemáticas",
        description:
          "Puedes comprar ‘Ingeniería’ y ‘Carreteras’ sin coste de alimentos.",
        effect: "",
      },
      {
        id: 34,
        place: 2,
        root: TechnologicalRootType.CIENCE,
        name: "Astronomía",
        description:
          "Puedes comprar ‘Cartografía’ y ‘Navegación’ sin coste de alimentos.",
        effect: "",
      },
      {
        id: 35,
        place: 3,
        root: TechnologicalRootType.CIENCE,
        name: "Medicina",
        description: "Tras reclutar, recuperas 1 recurso gastado.",
        effect: "",
      },
      {
        id: 36,
        place: 4,
        root: TechnologicalRootType.CIENCE,
        name: "Metalurgia",
        description:
          "‘Armas de Acero’ no cuesta alimentos ni minerales. Consigues 2 minerales si ya tienes ‘Armas de Acero’.",
        effect: "",
      },
    ],
  },
};

const findByDice = <T extends string | number>(
  mapping: Record<T, number[]>,
  dice: number
): T => {
  for (const key in mapping) {
    const values = mapping[key as T];
    if (values.includes(dice)) {
      return key as T;
    }
  }
  throw new Error(`No mapping found for dice value ${dice}`);
};

function getSection(dice: number): TechnologicalSection {
  return findByDice(techSectionMapping, dice);
}

function getRoot(
  section: TechnologicalSection,
  dice: number
): TechnologicalRootType {
  const rootMap = techRootMapping[section].data as Record<
    TechnologicalRootType,
    number[]
  >;
  return findByDice(rootMap, dice);
}

function getPlace(dice: number): number {
  for (const key in placeMapper) {
    const placeNum = Number(key);
    const values = placeMapper[placeNum as keyof typeof placeMapper];
    if (values.includes(dice)) {
      return placeNum;
    }
  }
  throw new Error(`No place mapping found for dice value ${dice}`);
}

// Mapear categoría (root) de tecnología al edificio correspondiente
const rootEffectMap: Partial<Record<TechnologicalRootType, BuildingType>> = {
  [TechnologicalRootType.NAVIGATION]: BuildingType.PORT,
  [TechnologicalRootType.EDUCATION]: BuildingType.ACADEMY,
  [TechnologicalRootType.MILITARY]: BuildingType.FORTRESS,
  [TechnologicalRootType.RELIGION]: BuildingType.TEMPLE,
  [TechnologicalRootType.ECONOMY]: BuildingType.MARKET,
  [TechnologicalRootType.CULTURE]: BuildingType.OBELISK,
  [TechnologicalRootType.CIENCE]: BuildingType.OBSERVATORY,
};

const pickTech = (tech: {
  name: string;
  description: string;
  root: TechnologicalRootType;
  place: number;
  effect?: string;
}) => {
  return {
    name: tech.name,
    description: tech.description,
    category: tech.root,
    place: tech.place,
    effect: tech.effect || "",
    effectCategory: rootEffectMap[tech.root] || null,
  };
};

export const rollDice = (sides: number): number =>
  Math.floor(Math.random() * sides) + 1;

export const rollForTechnology = (
  unlockedPlaces: Partial<Record<TechnologicalRootType, number[]>> = {}
) => {
  const sectionRoll = rollDice(6);
  const section = getSection(sectionRoll);

  const rootRoll = rollDice(6);
  const root = getRoot(section, rootRoll);

  const placeRoll = rollDice(6);
  const place = getPlace(placeRoll);

  const techsInRoot = technologicalTree[section].technologies.filter(
    (t) => t.root === root
  );

  const unlockedRootPlaces = unlockedPlaces[root] || [];

  if (!unlockedRootPlaces.includes(1)) {
    const tech = techsInRoot.find((t) => t.place === 1)!;
    return pickTech(tech);
  }

  const rolledTech = techsInRoot.find((t) => t.place === place);
  if (rolledTech && !unlockedRootPlaces.includes(place)) {
    return pickTech(rolledTech);
  }

  const nextTech = techsInRoot.find(
    (t) => t.place > place && !unlockedRootPlaces.includes(t.place)
  );

  if (!nextTech) return null;

  // comprobar si se han llenado los 4 lugares de la tech actual
  /* if (unlockedRootPlaces.length >= 3) {
    // AVANZAR TECH DE GOBIERNO

    // buscar si alguna tecnologia de gobierno ya se ha desbloqueado
    const governmentTechs = [
      TechnologicalRootType.DEMOCRACY,
      TechnologicalRootType.AUTOCRACY,
      TechnologicalRootType.TEOCRACY,
    ];

    const unlockedGovernmentTechs = governmentTechs.filter((tech) =>
      unlockedRootPlaces[tech] ? true : false
    );
  }
 */
  return pickTech(nextTech);

  //return nextTech ? pickTech(nextTech) : null;
};

// ACCIONES DEL IBO
export enum IBOActions {
  ADVANCE = "Avanzar",
  RECRUIT = "Reclutar",
  ATACK = "Atacar",
  BUILD = "Construir",
  INFLUENCE = "Influir",
}

export const getRandomAction = (): IBOActions => {
  const dice = rollDice(12);
  switch (dice) {
    case 1:
      return IBOActions.ADVANCE;
    case 2:
      return IBOActions.BUILD;
    case 3:
      return IBOActions.ADVANCE;
    case 4:
      return IBOActions.ADVANCE;
    case 5:
      return IBOActions.RECRUIT;
    case 6:
      return IBOActions.RECRUIT;
    case 7:
      return IBOActions.ATACK;
    case 8:
      return IBOActions.ATACK;
    case 9:
      return IBOActions.ADVANCE;
    case 10:
      return IBOActions.ADVANCE;
    case 11:
      return IBOActions.INFLUENCE;
    case 12:
      return IBOActions.BUILD;
    default:
      throw new Error("Invalid action roll");
  }
};

export const initTrackBuilding = {
  0: BuildingType.SETTLEMENT,
  1: null,
  2: null,
  3: BuildingType.SETTLEMENT,
  4: null,
  5: BuildingType.SETTLEMENT,
  6: null,
  7: BuildingType.SETTLEMENT,
};

export const getBuildingTrack = () => {
  return { ...initTrackBuilding };
};

export type TrackBuilding = Record<number, BuildingType | null>;

export const buildStructure = (
  track: TrackBuilding
): { track: TrackBuilding; building: BuildingType | null } => {
  const newTrack: TrackBuilding = { ...track };

  const firstBuilding = Object.keys(newTrack).find(
    (key) => newTrack[Number(key)] !== null
  );
  if (!firstBuilding) {
    throw new Error("No buildings available to build.");
  }
  const firstBuildingIndex = Number(firstBuilding);
  const buildingType = newTrack[firstBuildingIndex];
  const buildingName = buildingType;

  // shift remaining buildings forward
  for (let i = firstBuildingIndex; i < Object.keys(newTrack).length - 1; i++) {
    newTrack[i] = newTrack[i + 1];
  }

  // clear the last slot
  newTrack[Object.keys(newTrack).length - 1] = null;
  return { track: newTrack, building: buildingName || null };
};

export const addBuildingToTrack = (
  track: TrackBuilding,
  building: BuildingType
): TrackBuilding => {
  const newTrack: TrackBuilding = { ...track };
  const firstEmptyIndex = Object.keys(newTrack).find(
    (key) => newTrack[Number(key)] === null
  );
  if (!firstEmptyIndex) {
    throw new Error("No empty space available in the building track.");
  }
  const index = Number(firstEmptyIndex);
  newTrack[index] = building;
  return newTrack;
};

// Table-driven configuration for advanced recruitment probabilities
const advancedRecruitTable = [
  { max: 3, type: RecruitType.INFANTRY },
  { max: 4, type: RecruitType.CAVALRY },
  { max: 5, type: RecruitType.ELEPHANT },
  { max: 6, type: RecruitType.LEADER },
];

// Threshold for recruiting ships
const SHIP_THRESHOLD = 3;

// Helper to determine the recruit type and any special effect based on dice roll and leader status
function determineUnitType(
  dice: number,
  resource: string,
  canAdvanced: boolean,
  hasLeader: boolean,
  setHasLeader: (value: boolean) => void
): { type: RecruitType; effect?: string } {
  if (!canAdvanced) {
    return { type: RecruitType.INFANTRY };
  }
  const entry = advancedRecruitTable.find((e) => dice <= e.max)!;
  if (entry.type === RecruitType.LEADER) {
    if (hasLeader) {
      return {
        type: RecruitType.INFANTRY,
        effect: `Voy a mover el líder a ${resource}.`,
      };
    }
    setHasLeader(true);
    return { type: RecruitType.LEADER };
  }
  return { type: entry.type };
}

export const recruitUnit = (
  trackSettlement: Record<
    string,
    {
      active: boolean;
      isDestroyed: boolean;
    }
  >,
  canRecruitAdvancedUnities: boolean,
  canRecruitShip: boolean,
  hasLeader: boolean,
  setHasLeader: (value: boolean) => void
) => {
  const result: Record<string, string> = {};

  Object.entries(trackSettlement).forEach(([resource, { active: built }]) => {
    if (!built) return;
    const dice = rollDice(6);
    const { type, effect } = determineUnitType(
      dice,
      resource,
      canRecruitAdvancedUnities,
      hasLeader,
      setHasLeader
    );
    result[resource] = type;
    if (effect) {
      result["effect"] = effect;
    }
  });

  if (canRecruitShip) {
    const shipDice = rollDice(6);
    if (shipDice <= SHIP_THRESHOLD) {
      result["ship"] = "Voy a construir barcos en los puertos.";
    }
  }

  return result;
};
