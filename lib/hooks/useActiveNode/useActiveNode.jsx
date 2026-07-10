import { useEffect, useContext } from 'react';
import { useStore } from 'zustand';

import { ActiveNodeContext, useActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';


export const useActiveNode = ({ ref, node }) => {
    const store = useContext(ActiveNodeContext);
    if (!store) return {};

    const parent = useStore(store, state => state.parent);
    if (!parent) return {};

    const hasFocus = useStore(parent, state => state.activeNode == node);
    const parentHasFocus = useStore(parent, state => state.hasFocus);
    const setActiveNode = useStore(parent, state => state.setActiveNode);

    // setting this for strictly our children items
    useEffect(() => {
        const { setHasFocus } = store.getState();
        setHasFocus(hasFocus && parentHasFocus);
    }, [hasFocus])

    return { hasFocus: hasFocus && parentHasFocus, setActiveNode };
}

export default useActiveNode;
