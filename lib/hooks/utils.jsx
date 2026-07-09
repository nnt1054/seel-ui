// todo: move this elsewhere once we figure out what we're doing lol
import {
    useEffect, useState, useContext,
    useRef, createContext,
} from 'react';
import { createStore, useStore } from 'zustand'


export const ActiveNodeContext = createContext(null);
const createActiveNodeStore = (mapRef, initial) => {
  return createStore()((set) => ({
    mapRef,
    activeNode: initial,
    setActiveNode: (activeNode) => set(state => ({ activeNode })),
  }))
}


export const useActiveNodeContainer = (props) => {
	const {
		initial,
	} = props;

    const mapRef = useRef(new Map());
	const [store] = useState(() => createActiveNodeStore(mapRef, initial));
    
    const ActiveNodeProvider = (props) => {
    	return <ActiveNodeContext.Provider value={ store } { ...props} />
    }

    return [ActiveNodeProvider, mapRef, store];
}


export const useActiveNode = ({ ref, node }) => {
    const store = useContext(ActiveNodeContext);
    const mapRef = useStore(store, state => state.mapRef);
    const hasFocus = useStore(store, state => state.activeNode == node);
    const setActiveNode = useStore(store, state => state.setActiveNode);

    useEffect(() => {
        const map = mapRef.current;
        map.set(node, ref);
        return () => {map.delete(node)}
    })

    return {
    	mapRef,
    	hasFocus,
    	setActiveNode,
    }
}
