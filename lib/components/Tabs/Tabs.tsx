import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useState } from "react";
import type { MouseEvent, PropsWithChildren, ReactElement, RefObject } from "react";
import styled from "styled-components";
import { createStore, useStore } from "zustand";
import type { StoreApi } from "zustand";

import { ActiveList } from "@components/ActiveList/ActiveList";
import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import { usePropagateEvents } from "@hooks/usePropagateEvents/usePropagateEvents";
import { withActiveNode } from "@providers/ActiveNodeProvider/ActiveNodeProvider";
import type { ActiveNodeProps, AdjacentNodes, Node, Orientation } from "@types";
import { handleAdjacentNode } from "@utils";

const defaultEvents = ["up", "down", "left", "right", "confirm"];

interface TabsProps extends ActiveNodeProps {
  adjacentNodes: AdjacentNodes;
  maxIndex?: number;
  events?: string[];
}

type ListPositions = {
  [position: string]: Node;
};
type AdjacentNodePosition = keyof AdjacentNodes;

export interface TabsState {
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
  maxIndex: number;
  setMaxIndex: (maxIndex: number) => void;
  listPositions: ListPositions;
  setListPosition: (node: Node, position: string) => void;
  adjacentNodes: AdjacentNodes;
}
type TabsStore = StoreApi<TabsState>;

interface CreateTabsContextStoreProps {
  maxIndex: number;
  adjacentNodes: AdjacentNodes;
}

interface TabsListProps extends PropsWithChildren {
  node?: Node;
  position?: AdjacentNodePosition;
  orientation?: Orientation;
}

interface TabsTabProps extends ActiveNodeProps {}

interface TabsPanelProps extends PropsWithChildren {
  index: number;
}

interface TabsCycleButtonProps extends PropsWithChildren {
  direction?: AdjacentNodePosition;
}

interface TabsPanelNodeProps {
  node: Node;
  adjacentNodes?: AdjacentNodes;
}

type TabsComponent = typeof TabsRoot & {
  Panel: typeof TabsPanel;
  List: typeof TabsList;
  Tab: typeof TabsTab;
  CycleButton: typeof TabsCycleButton;
};

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

const createTabsContextStore = (props: CreateTabsContextStoreProps) => {
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

// todo: add toggle onFocus flag prop
const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TabsRoot = withActiveNode((props: TabsProps) => {
  const {
    ref,
    node,
    adjacentNodes = {},
    maxIndex = 1,
    events = defaultEvents,
    ...others
  } = props;

  const {
    hasFocus,
    grabFocus,
    moveFocus,
    childrenRef,
    activeNode,
    setActiveNode,
  } = useActiveNode();

  // allow for child nodes to move focus outside of this tabs node

  // todo: convert to utility function
  // todo: double check types here
  const _adjacentNodes = Object.entries(adjacentNodes).reduce((adjacentNodes: AdjacentNodes, [key, value]) => {
    adjacentNodes[key as AdjacentNodePosition] = () => handleAdjacentNode(value, moveFocus);
    return adjacentNodes;
  }, {});

  const [store] = useState(() => createTabsContextStore({ maxIndex, adjacentNodes: _adjacentNodes }));
  const { activeIndex, setActiveIndex, setMaxIndex } = useStore(store);

  usePropagateEvents({
    ref,
    childrenRef,
    activeNode,
    events,
  });

  useEventListeners(ref, {
    cycleR: () => {
      setActiveIndex((activeIndex + 1) % maxIndex);
    },
    cycleL: () => {
      setActiveIndex((activeIndex - 1 + maxIndex) % maxIndex);
    },
  });

  // failsafe when moving to non-node tabs panel
  useEffect(() => {
    const activeRef = childrenRef?.current.get(activeNode);
    if (!activeRef?.current) {
      const { listPositions } = store.getState();
      const listNode = Object.values(listPositions)?.[0] || "list";
      setActiveNode(listNode);
    }
  }, [activeNode, activeIndex]);

  // respond to dynamic tab count
  useEffect(() => {
    setMaxIndex(maxIndex || 1);
  }, [maxIndex]);

  return (
    <TabsContext.Provider value={store}>
      <StyledTabs
        ref={ref as RefObject<HTMLDivElement>}
        onClick={grabFocus}
        data-focused={hasFocus ? "" : null}
        {...others}
      />
    </TabsContext.Provider>
  );
});

const TabsList = (props: TabsListProps) => {
  const {
    node = "list",
    position = "up",
    orientation = "horizontal", // or 'vertical'
    children,
    ...others
  } = props;

  const store = useContext(TabsContext);
  const maxIndex = useStore(store, (state: TabsState) => state.maxIndex);
  const adjacentNodes = useStore(store, (state: TabsState) => state.adjacentNodes);
  const contentPositions = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };
  const contentPosition = contentPositions[position];

  useEffect(() => {
    const { setListPosition } = store.getState();
    setListPosition(node, position);
  }, [position]);

  return (
    <ActiveList
      node={node}
      adjacentNodes={{ ...adjacentNodes, [contentPosition]: "content" }}
      maxIndex={maxIndex}
      disableWrap={true}
      disableJump={true}
      orientation={orientation}
      {...others}
    >
      {children}
    </ActiveList>
  );
};

const TabsTab = withActiveNode((props: TabsTabProps) => {
  const { ref, node, ...others } = props;
  const index = Number.isInteger(node) ? node as number : 0;

  const store = useContext(TabsContext);
  const setActiveIndex = useStore(store, (state: TabsState) => state.setActiveIndex);
  const isActive = useStore(store, (state: TabsState) => state.activeIndex == node);
  const { hasFocus, grabFocus } = useActiveNode();

  // todo: convert to hook OR normalize an onFocus param
  useEffect(() => {
    if (hasFocus || isActive) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [hasFocus, isActive]);

  const onConfirm = () => {
    grabFocus();
    setActiveIndex(index);
  };

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
  };

  useEventListeners(ref, {
    confirm: onConfirm,
  });

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      onClick={onConfirm}
      onMouseDown={onMouseDown}
      data-active-tab={isActive ? "" : null}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

const TabsPanel = (props: TabsPanelProps) => {
  const { index, children } = props;

  const store = useContext(TabsContext);
  const isActive = useStore(store, (state: TabsState) => state.activeIndex == index);
  const adjacentNodes = useStore(store, (state: TabsState) => state.adjacentNodes);
  const listPositions = useStore(store, (state: TabsState) => state.listPositions);

  if (!isActive) return;
  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return;

        // todo: type here should extend generic type T of child
        return cloneElement(child as ReactElement<any | TabsPanelNodeProps>, {
          node: "content",
          adjacentNodes: { ...adjacentNodes, ...listPositions },
        });
      })}
    </>
  );
};

const TabsCycleButton = (props: TabsCycleButtonProps) => {
  const { direction = "left", ...others } = props;

  const store = useContext(TabsContext);
  const { activeIndex, setActiveIndex, maxIndex } = useStore(store);

  const cycleR = () => {
    setActiveIndex((activeIndex + 1) % maxIndex);
  };
  const cycleL = () => {
    setActiveIndex((activeIndex - 1 + maxIndex) % maxIndex);
  };
  const onClick = direction == "left" ? cycleL : cycleR;

  return (
    <button
      data-direction={direction}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      {...others}
    />
  );
};

export const Tabs = TabsRoot as TabsComponent;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.CycleButton = TabsCycleButton;
