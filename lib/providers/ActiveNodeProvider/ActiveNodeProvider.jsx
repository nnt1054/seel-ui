import {
    useEffect, useState, useRef,
    createContext,
} from 'react';
import { createStore, useStore } from 'zustand'


const defaultStore = createStore()((set) => ({
  mapRef: null,
  activeNode: null,
  setActiveNode: () => {},
}))
export const ActiveNodeContext = createContext(defaultStore);


const createActiveNodeStore = (mapRef, initial) => {
  return createStore()((set) => ({
    mapRef,
    activeNode: initial,
    setActiveNode: (activeNode) => set(state => ({ activeNode })),
  }))
}


export const createActiveNodeContext = (props) => {
	const {
		initial,
	} = props;

  const mapRef = useRef(new Map());
  const [store] = useState(
    () => createActiveNodeStore(mapRef, initial)
  );

  const ActiveNodeProvider = (props) => {
  	return <ActiveNodeContext.Provider value={ store } { ...props} />
  }

  const useActiveNodeStore = (selector) => useStore(store, selector);

  return [ActiveNodeProvider, useActiveNodeStore];
}


export default createActiveNodeContext;
