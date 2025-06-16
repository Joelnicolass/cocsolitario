import { useEffect, useState } from "react";
import { useTracks } from "./use_tracks";
import { BuildingType, recruitUnit } from "@/utils/game_utilities";

export const useRecruit = (
  trackSettlement: ReturnType<typeof useTracks>["trackSettlement"],
  buildingsFinished: ReturnType<typeof useTracks>["buildingsFinished"]
) => {
  const [canRecruitAdvancedUnities, setCanRecruitAdvancedUnities] =
    useState(false);

  const [canRecruitShip, setCanRecruitShip] = useState(false);

  const [hasLeader, setHasLeader] = useState(false);

  useEffect(() => {
    if (buildingsFinished[BuildingType.MARKET]) {
      setCanRecruitAdvancedUnities(true);
    }

    if (buildingsFinished[BuildingType.PORT]) {
      setCanRecruitShip(true);
    }
  }, [trackSettlement, buildingsFinished]);

  const recruit = () =>
    recruitUnit(
      trackSettlement,
      canRecruitAdvancedUnities,
      canRecruitShip,
      hasLeader,
      setHasLeader
    );

  return {
    recruit,
    hasLeader,
    canRecruitShip,
    canRecruitAdvancedUnities,
  };
};
