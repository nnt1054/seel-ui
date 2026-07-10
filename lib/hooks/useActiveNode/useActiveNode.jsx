import { useEffect, useContext } from 'react';
import { useStore } from 'zustand';

import { ActiveNodeContext, useActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';


export const useActiveNode = ({ ref, node }) => {
    const store = useContext(ActiveNodeContext);
    if (!store) return {};

    const parent = useStore(store, state => state.parent);
    if (!parent) return {};

    const hasFocus = useStore(parent, state => state.activeNode == node);
    const setActiveNode = useStore(parent, state => state.setActiveNode);

    return { hasFocus, setActiveNode };
}

export default useActiveNode;
