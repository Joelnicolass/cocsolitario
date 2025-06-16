import { useState } from "react";

export enum ResultTrackEvent {
  NONE,
  USE_EVENT_CARD,
}

const COUNTER_EVENT = 3;

export const useEvent = () => {
  const [trackEvent, setTrackEvent] = useState<number>(COUNTER_EVENT);

  const decreaseTrackEvent = () => {
    const newTrackEvent = trackEvent - 1;

    if (newTrackEvent <= 0) {
      setTrackEvent(COUNTER_EVENT);
      return ResultTrackEvent.USE_EVENT_CARD;
    }

    setTrackEvent(newTrackEvent);
    return ResultTrackEvent.NONE;
  };

  return {
    trackEvent,
    decreaseTrackEvent,
  };
};
