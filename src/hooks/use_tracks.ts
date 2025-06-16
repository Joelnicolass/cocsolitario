import {
  addBuildingToTrack as addBuildToTrackUtil,
  BuildingType,
  buildStructure as buildStructureUtil,
  initTrackBuilding,
  ResourceType,
  TrackBuilding,
} from "@/utils/game_utilities";
import { useState } from "react";

export const useTracks = () => {
  const [track, setTrack] = useState<TrackBuilding>(initTrackBuilding);
  const [counterBuilding, setCounterBuilding] = useState<number>(1);
  const [trackSettlement, setTrackSettlement] = useState<
    Record<
      ResourceType,
      {
        active: boolean;
        isDestroyed: boolean;
      }
    >
  >({
    [ResourceType.FOOD]: {
      active: true,
      isDestroyed: false,
    },
    [ResourceType.WOOD]: {
      active: false,
      isDestroyed: false,
    },
    [ResourceType.STONE]: {
      active: false,
      isDestroyed: false,
    },
    [ResourceType.GOLD]: {
      active: false,
      isDestroyed: false,
    },
    [ResourceType.SCIENCE]: {
      active: false,
      isDestroyed: false,
    },
  });

  const [buildingsFinished, setBuildingsFinished] = useState<
    Record<Exclude<BuildingType, BuildingType.SETTLEMENT>, boolean>
  >({
    [BuildingType.PORT]: false,
    [BuildingType.ACADEMY]: false,
    [BuildingType.FORTRESS]: false,
    [BuildingType.TEMPLE]: false,
    [BuildingType.MARKET]: false,
    [BuildingType.OBELISK]: false,
    [BuildingType.OBSERVATORY]: false,
  });

  const [buildingsFinishedNames, setBuildingsFinishedNames] = useState<
    Array<BuildingType>
  >([BuildingType.SETTLEMENT]);

  const [trackModifiers, setTrackModifiers] = useState<
    Record<
      Exclude<BuildingType, BuildingType.SETTLEMENT>,
      { description: string; active: boolean; instantane: boolean }
    >
  >({
    [BuildingType.PORT]: {
      description: "+1 Barco en cada puerto con acción de reclutar",
      active: false,
      instantane: false,
    },
    [BuildingType.FORTRESS]: {
      description: "+1 dado en combate. Bloquea 1 ataque en el primer turno",
      active: false,
      instantane: false,
    },

    [BuildingType.OBELISK]: {
      description: "No puede ser influenciado culturalmente",
      active: false,
      instantane: false,
    },
    [BuildingType.MARKET]: {
      description: "Puede reclutar unidades avanzadas",
      active: false,
      instantane: false,
    },
    [BuildingType.ACADEMY]: {
      description: "Investiga una tecnología",
      active: false,
      instantane: true,
    },
    [BuildingType.TEMPLE]: {
      description: "Gana +1 de cultura extra con cada avance tecnológico",
      active: false,
      instantane: false,
    },
    [BuildingType.OBSERVATORY]: {
      description: "Gana una carta de acción",
      active: false,
      instantane: true,
    },
  });

  const addBuildingToTrack = (build: BuildingType) => {
    const newTrack = addBuildToTrackUtil(track, build);
    setTrack(newTrack);

    return {
      track: newTrack,
      building: build,
    };
  };

  const buildStructure = () => {
    const { track: newTrack, building } = buildStructureUtil(track);

    if (building === BuildingType.SETTLEMENT) {
      const nextResource = Object.keys(trackSettlement).find(
        (key) =>
          !trackSettlement[key as ResourceType].active &&
          !trackSettlement[key as ResourceType].isDestroyed
      ) as ResourceType;

      if (nextResource) {
        setTrackSettlement((prev) => ({
          ...prev,
          [nextResource]: {
            active: true,
            isDestroyed: false,
          },
        }));
      }
    }

    if (building && building !== BuildingType.SETTLEMENT) {
      setBuildingsFinished((prev) => ({
        ...prev,
        [building]: true,
      }));

      setTrackModifiers((prev) => ({
        ...prev,
        [building]: { ...prev[building], active: true },
      }));
    }

    setTrack(newTrack);
    setCounterBuilding((prev) => prev + 1);

    if (building) {
      setBuildingsFinishedNames((prev) => [...prev, building]);
    }

    const buildingPlace = Object.keys(trackSettlement).filter(
      (key) => trackSettlement[key as ResourceType]
    );

    const place =
      buildingPlace[Math.floor(Math.random() * buildingPlace.length)];

    return {
      track: newTrack,
      building,
      place: place,
    };
  };

  const destroySettlement = (resource: ResourceType) => {
    setTrackSettlement((prev) => ({
      ...prev,
      [resource]: {
        ...prev[resource],
        isDestroyed: true,
      },
    }));

    setCounterBuilding((prev) => prev - 1);
  };

  return {
    track,
    trackModifiers,
    trackSettlement,
    buildingsFinished,
    counterBuilding,
    buildingsFinishedNames,
    buildStructure,
    destroySettlement,
    addBuildingToTrack,
  };
};
