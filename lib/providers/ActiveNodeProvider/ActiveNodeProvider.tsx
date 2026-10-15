import {
    useEffect, useState, useRef,
    useContext, createContext, memo,
} from 'react';
import { createStore, useStore } from 'zustand';
import type { FC, RefObject } from "react";
import type { StoreApi } from 'zustand';

import type { Node } from "@types";

type NodeRefMap = Map<Node, RefObject<HTMLElement | null>>;
type ChildrenRef = RefObject<NodeRefMap>;

interface ActiveNodeState {
    node: Node;
    parent: ActiveNodeStore | null;
    childrenRef: ChildrenRef;
    grabFocus: () => void;
    setNode: (node: Node) => void;
    activeNode: Node,
    setActiveNode: (activeNode: Node) => void;
    hasFocus: boolean,
    setHasFocus: (hasFocus: boolean) => void;
    controlledFocus: boolean | null;
    setControlledFocus: (controlledFocus: boolean) => void;
}

type ActiveNodeStore = StoreApi<ActiveNodeState>;

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
    }))
}

const registerNode = (props: RegisterNodeProps): ActiveNodeStore | null => {
    const { ref, node } = props;
    const store = useContext(ActiveNodeContext);
    if (!store) return null;

    const childrenRef = useStore(store, state => state.childrenRef);

    useEffect(() => {
        const children = childrenRef?.current;
        children?.set(node, ref);
        return () => {
            children?.delete(node)
        }
    })

    return store;
}

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
    }

    const [store] = useState(() => createNodeContainerStore({
        node,
        initial,
        parent,
        childrenRef,
        grabFocus,
    }));

    return store;
}

interface ActiveNodeProps {
    ref?: RefObject<HTMLElement | null>;
    node: Node;
    initial?: Node;
    hasFocus?: boolean;
}

export const withActiveNode = <T extends ActiveNodeProps>(
    WrappedComponent: FC<Omit<T, "initial" | "hasFocus">>,
    ignoreParent: boolean = false
): FC<T> => {
    const Component = memo((props: T) => {
        const defaultRef = useRef<HTMLElement | null>(null);
        const {
            initial = 'default',
            hasFocus,
            ...others
        } = props;

        const {
            ref = defaultRef,
            node,
        } = others;
        others.ref = ref;

        const parent = ignoreParent ? null : registerNode({ ref, node });
        const store = createNodeContainer({ node, initial, parent });

        // keep node synced with updated prop
        useEffect(() => {
            const { setNode } = store.getState();
            setNode(node);
        }, [node])

        // for manually controlled hasFocus
        useEffect(() => {
            if (typeof hasFocus == 'boolean') {
                const { setControlledFocus } = store.getState();
                setControlledFocus(hasFocus);
            }
        }, [hasFocus])

        return (
            <ActiveNodeContext.Provider value={ store }>
                <WrappedComponent {...others} />
            </ActiveNodeContext.Provider>
        );
    });

    return Component;
}
