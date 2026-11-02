import { createContext } from "react";
import { DefaultEvents } from "@constants";

export interface DefaultEventsState {
  events: string[];
}

export const DefaultEventsContext = createContext<DefaultEventsState>({
  events: DefaultEvents,
});
