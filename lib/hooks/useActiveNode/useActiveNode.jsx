import { useEffect, useContext } from 'react';
import { useStore } from 'zustand';

import { ActiveNodeContext } from '@providers/ActiveNodeProvider/ActiveNodeProvider';


export const useActiveNode = ({ ref, node }) => {
    const store = useContext(ActiveNodeContext);
    const mapRef = useStore(store, state => state.mapRef);
    const setActiveNode = useStore(store, state => state.setActiveNode);
    const setFocus = useStore(store, state => state.setFocus);
    const hasFocus = useStore(store, state => state.activeNode == node);

    useEffect(() => {
        const map = mapRef?.current;
        map?.set(node, ref);
        return () => {
            map?.delete(node)
        }
    })

    return {
    	mapRef,
    	hasFocus,
        setFocus,
    	setActiveNode,
    }
}


export default useActiveNode;
