import { createContext } from "react";
import { createStore } from "zustand";
import type { StoreApi } from "zustand";

import type { AdjacentNodes, Node } from "@types";

type ListPositions = {
  [position: string]: Node;
};

export interface TabsState {
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
  maxIndex: number;
  setMaxIndex: (maxIndex: number) => void;
  listPositions: ListPositions;
  setListPosition: (node: Node, position: string) => void;
  adjacentNodes: AdjacentNodes;
}
export type TabsStore = StoreApi<TabsState>;

export interface CreateTabsContextStoreProps {
  maxIndex: number;
  adjacentNodes: AdjacentNodes;
}

const emptyTabsContext = createStore<TabsState>()(() => ({
  activeIndex: 0,
  setActiveIndex: () => {},
  maxIndex: 0,
  setMaxIndex: () => {},
  listPositions: {},
  setListPosition: () => {},
  adjacentNodes: {},
}));

export const TabsContext = createContext<TabsStore>(emptyTabsContext);

export const createTabsContextStore = (props: CreateTabsContextStoreProps) => {
  const {
    maxIndex,
    adjacentNodes,
  } = props;

  return createStore<TabsState>()((set) => ({
    activeIndex: 0,
    setActiveIndex: (activeIndex) => set({ activeIndex }),
    maxIndex,
    setMaxIndex: (maxIndex) => set({ maxIndex }),
    listPositions: {},
    setListPosition: (node, position) =>
      set((state) => {
        return { listPositions: { ...state.listPositions, [position]: node } };
      }),
    adjacentNodes,
  }));
};
