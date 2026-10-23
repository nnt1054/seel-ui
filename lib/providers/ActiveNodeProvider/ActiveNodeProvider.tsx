import { createContext, memo, useContext, useEffect, useRef, useState } from "react";
import type { FC, RefObject } from "react";
import { createStore, useStore } from "zustand";
import type { StoreApi } from "zustand";

import type { ActiveNodeProps, ChildrenRef, ExtraActiveNodeProps, IComponentProps, Node } from "@types";

export interface ActiveNodeState {
  node: Node;
  parent: ActiveNodeStore | null;
  childrenRef: ChildrenRef | null;
  grabFocus: () => void;
  setNode: (node: Node) => void;
  activeNode: Node;
  setActiveNode: (activeNode: Node) => void;
  hasFocus: boolean;
  setHasFocus: (hasFocus: boolean) => void;
  controlledFocus: boolean | null;
  setControlledFocus: (controlledFocus: boolean) => void;
}

export type ActiveNodeStore = StoreApi<ActiveNodeState>;

interface CreateNodeContainerStoreProps {
  node: Node;
  initial: Node;
  parent: ActiveNodeStore | null;
  childrenRef: ChildrenRef;
  grabFocus: () => void;
}

interface RegisterNodeProps {
  ref: RefObject<HTMLElement | null>;
  node: Node;
}

interface CreateNodeContainerProps {
  node: Node;
  initial: Node;
  parent: ActiveNodeStore | null;
}

export const ActiveNodeContext = createContext<ActiveNodeStore | null>(null);

const createNodeContainerStore = (props: CreateNodeContainerStoreProps) => {
  const {
    node,
    initial,
    parent,
    childrenRef,
    grabFocus,
  } = props;

  return createStore<ActiveNodeState>()((set) => ({
    node,
    parent,
    childrenRef,
    grabFocus,

    setNode: (node: Node) => set({ node }),

    activeNode: initial,
    setActiveNode: (activeNode: Node) => set({ activeNode }),

    hasFocus: true,
    setHasFocus: (hasFocus: boolean) => set({ hasFocus }),

    controlledFocus: null,
    setControlledFocus: (controlledFocus: boolean) => set({ controlledFocus }),
  }));
};

const registerNode = (props: RegisterNodeProps): ActiveNodeStore | null => {
  const { ref, node } = props;
  const store = useContext(ActiveNodeContext);
  if (!store) return null;

  const childrenRef = useStore(store, state => state.childrenRef);

  useEffect(() => {
    const children = childrenRef?.current;
    children?.set(node, ref);
    return () => {
      children?.delete(node);
    };
  });

  return store;
};

const createNodeContainer = (props: CreateNodeContainerProps) => {
  const {
    node,
    initial,
    parent,
  } = props;

  const childrenRef = useRef(new Map());

  const grabFocus = () => {
    if (!parent) return;

    const {
      setActiveNode,
      grabFocus,
    } = parent.getState();

    setActiveNode(node);
    grabFocus();
  };

  const [store] = useState(() =>
    createNodeContainerStore({
      node,
      initial,
      parent,
      childrenRef,
      grabFocus,
    })
  );

  return store;
};

export const withActiveNode = <T extends ActiveNodeProps>(
  WrappedComponent: FC<T>,
  ignoreParent: boolean = false,
): FC<IComponentProps<T>> => {
  const Component = memo((props: IComponentProps<T>) => {
    const defaultRef = useRef<HTMLElement | null>(null);
    const {
      ref = defaultRef,
      node = null,
      initial = "default",
      hasFocus,
      ...others
    } = props;

    const componentProps = {
      ...others,
      ref,
      node,
    };

    const parent = ignoreParent ? null : registerNode({ ref, node });
    const store = createNodeContainer({ node, initial, parent });

    // keep node synced with updated prop
    useEffect(() => {
      const { setNode } = store.getState();
      setNode(node);
    }, [node]);

    // for manually controlled hasFocus
    useEffect(() => {
      if (typeof hasFocus == "boolean") {
        const { setControlledFocus } = store.getState();
        setControlledFocus(hasFocus);
      }
    }, [hasFocus]);

    return (
      <ActiveNodeContext.Provider value={store}>
        <WrappedComponent {...componentProps as T & ExtraActiveNodeProps} />
      </ActiveNodeContext.Provider>
    );
  });

  return Component;
};
