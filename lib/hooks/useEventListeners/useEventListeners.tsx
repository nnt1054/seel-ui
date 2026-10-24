import type { RefObject } from "react";
import { useEffect } from "react";

import type { Callbacks } from "@types";

export const useEventListeners = (
  ref: RefObject<HTMLElement | null>,
  callbacks: Callbacks = {},
  isActive: boolean = true,
) => {
  const events = Object.keys(callbacks);

  useEffect(() => {
    if (!isActive) return;

    const element = ref.current;

    for (const event of events) {
      element?.addEventListener(event, callbacks[event]);
    }

    return () => {
      for (const event of events) {
        element?.removeEventListener(event, callbacks[event]);
      }
    };
  });

  return callbacks;
};

export default useEventListeners;
