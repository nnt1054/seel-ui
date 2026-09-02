import { useEffect, useContext } from 'react';
import { createStore, useStore } from 'zustand';

import { ActiveNodeContext } from '@providers/ActiveNodeProvider/ActiveNodeProvider';


const emptyStore = createStore()((set) => ({
    hasFocus: false,
    setHasFocus: () => {},
    grabFocus: () => {},
    parent: null,
}));
const emptyParent = createStore()((set) => ({
    hasFocus: false,
    activeNode: null,
    grabFocus: () => {},
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

    // todo: what to do if no parent? or we have a controlled hasFocus value
    const isActiveNode = useStore(
        parent || emptyParent,
        state => state.hasFocus && state.activeNode == node
    );
    const moveFocus = useStore(
        parent || emptyParent,
        state => state.setActiveNode
    );

    const hasFocus = typeof controlledFocus == 'boolean'
        ? controlledFocus
        : isActiveNode;

    useEffect(() => {
        setHasFocus(hasFocus);
    }, [parent, hasFocus])

    return {
        hasFocus,
        moveFocus,
        grabFocus,

        childrenRef,
        activeNode,
        setActiveNode,
    };
}

export const useActiveNodeContext = (selector) => {
    const store = useContext(ActiveNodeContext);
    if (!store) throw new Error('Missing ActiveNodeContext.Provider in the tree')
    return useStore(store, selector)
}

export default useActiveNode;
