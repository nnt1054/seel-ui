import { useEffect, useContext } from 'react';
import { useStore } from 'zustand';

import { ActiveNodeContext } from '@providers/ActiveNodeProvider/ActiveNodeProvider';


export const useActiveNode = ({ ref, node }) => {
    const store = useContext(ActiveNodeContext);
    if (!store) return {};

    const setAsActive = useStore(store, state => state.setAsActive);

    // note: top level node can have a controlled hasFocus prop
    // if we need it pull it from `store` but be mindful of
    // variable names
    const parent = useStore(store, state => state.parent);
    if (!parent) return {};

    const hasFocus = useStore(parent, state => state.hasFocus && state.activeNode == node);

    // setting this for strictly our children items
    useEffect(() => {
        const { setHasFocus } = store.getState();
        setHasFocus(hasFocus);
    }, [hasFocus])

    // note: used for setting focus on self + moving to adjacent nodes
    // todo: replace with focus() and update adjacentNodes to function maps
    const setActiveNode = useStore(parent, state => state.setActiveNode);

    return { hasFocus, setAsActive, setActiveNode };
}

export default useActiveNode;
