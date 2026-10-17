import { useContext, useEffect } from "react";
import { createStore, useStore } from "zustand";

import { ActiveNodeContext } from "@providers/ActiveNodeProvider/ActiveNodeProvider";
import type { ActiveNodeState } from "@providers/ActiveNodeProvider/ActiveNodeProvider";

const emptyStore = createStore<ActiveNodeState>()(() => ({
  node: null,
  parent: null,
  childrenRef: null,
  grabFocus: () => {},
  setNode: () => {},
  activeNode: null,
  setActiveNode: () => {},
  hasFocus: false,
  setHasFocus: () => {},
  controlledFocus: null,
  setControlledFocus: () => {},
}));

export const useActiveNode = () => {
  const store = useContext(ActiveNodeContext) || emptyStore;
  const node = useStore(store, state => state.node);
  const parent = useStore(store, state => state.parent);
  const setHasFocus = useStore(store, state => state.setHasFocus);
  const grabFocus = useStore(store, state => state.grabFocus);
  const childrenRef = useStore(store, state => state.childrenRef);
  const activeNode = useStore(store, state => state.activeNode);
  const setActiveNode = useStore(store, state => state.setActiveNode);
  const controlledFocus = useStore(store, state => state.controlledFocus);

  // note: removed since we don't need to rerender on this cause its
  // more specifically for children node to hook into
  // const hasFocus = useStore(store, state => state.hasFocus);

  const isActiveNode = useStore(
    parent || emptyStore,
    state => state.hasFocus && state.activeNode == node,
  );

  const moveFocus = useStore(
    parent || emptyStore,
    state => state.setActiveNode,
  );

  const hasFocus = typeof controlledFocus == "boolean"
    ? controlledFocus
    : isActiveNode;

  useEffect(() => {
    setHasFocus(hasFocus);
  }, [parent, hasFocus]);

  return {
    hasFocus,
    moveFocus,
    grabFocus,

    childrenRef,
    activeNode,
    setActiveNode,
  };
};

export default useActiveNode;
