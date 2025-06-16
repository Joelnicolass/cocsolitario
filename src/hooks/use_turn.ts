import { getRandomAction, IBOActions } from "@/utils/game_utilities";
import { useState } from "react";

export const useTurn = () => {
  const [currentTurn, setCurrentTurn] = useState<IBOActions | null>(null);

  const [subscribe, setSubscribe] = useState<number>(0);

  const nextTurn = () => {
    const action = getRandomAction();
    setCurrentTurn(action);
    setSubscribe((prev) => prev + 1);
    return action;
  };

  return { nextTurn, currentTurn, subscribe };
};
