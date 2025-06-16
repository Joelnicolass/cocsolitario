import { BuildingType, TechnologicalRootType } from "@/utils/game_utilities";
import { useState } from "react";

export const useAdvanceTech = () => {
  const [unlockedTechs, setUnlockedTechs] = useState({
    Agricultura: [],
    Belicismo: [],
    Ciencia: [],
    Construcción: [],
    Cultura: [],
    Economía: [],
    Educación: [],
    Espiritualidad: [],
    Nautica: [],
    Democracia: [],
    Teocracia: [],
    Autocracia: [],
  });

  const [techCompleteGraph, setTechCompleteGraph] = useState<
    Record<
      TechnologicalRootType,
      {
        name: string;
        description: string;
        place: number | null;
        effect: string | null;
      }[]
    >
  >({
    Agricultura: [],
    Belicismo: [],
    Ciencia: [],
    Construcción: [],
    Cultura: [],
    Economía: [],
    Educación: [],
    Espiritualidad: [],
    Nautica: [],
    Democracia: [],
    Teocracia: [],
    Autocracia: [],
  });

  const unlockTech = (
    tech: {
      name: string;
      description: string;
      category: TechnologicalRootType;
      place: number;
      effect: string;
      effectCategory: BuildingType | null;
    } | null
  ) => {
    if (!tech) return;

    setUnlockedTechs((prev) => ({
      ...prev,
      [tech.category]: [
        ...prev[tech.category as keyof typeof prev],
        tech.place,
      ],
    }));

    setTechCompleteGraph((prev) => {
      const updatedCategory = prev[tech.category] || [];
      const existingTechIndex = updatedCategory.findIndex(
        (t) => t.name === tech.name
      );

      if (existingTechIndex !== -1) {
        updatedCategory[existingTechIndex] = {
          name: tech.name,
          description: tech.description,
          place: tech.place,
          effect: tech.effect,
        };
      } else {
        updatedCategory.push({
          name: tech.name,
          description: tech.description,
          place: tech.place,
          effect: tech.effect,
        });
      }

      return {
        ...prev,
        [tech.category]: updatedCategory,
      };
    });
  };

  return { unlockedTechs, unlockTech, techCompleteGraph };
};
