import { useEffect, useContext } from 'react';
import { createStore, useStore } from 'zustand';

import { ActiveNodeContext } from '@providers/ActiveNodeProvider/ActiveNodeProvider';


const emptyStore = createStore()((set) => ({
    hasFocus: false,
    setHasFocus: () => {},
    setAsActive: () => {},
    parent: null,
}));
const emptyParent = createStore()((set) => ({
    hasFocus: false,
    activeNode: null,
    setAsActive: () => {},
}));

export const useActiveNode = ({ ref, node }) => {
    const store = useContext(ActiveNodeContext) || emptyStore;
    const hasFocus = useStore(store, state => state.hasFocus);
    const setHasFocus = useStore(store, state => state.setHasFocus);
    const setAsActive = useStore(store, state => state.setAsActive);
    const parent = useStore(store, state => state.parent);

    const isActiveNode = useStore(
        parent || emptyParent,
        state => state.hasFocus && state.activeNode == node
    );
    const setActiveNode = useStore(
        parent || emptyParent,
        state => state.setActiveNode
    );
    useEffect(() => {
        if (!parent) return;
        setHasFocus(isActiveNode);
    }, [parent, isActiveNode])

    return {
        hasFocus,
        setAsActive,
        setActiveNode,
    };
}

export default useActiveNode;
