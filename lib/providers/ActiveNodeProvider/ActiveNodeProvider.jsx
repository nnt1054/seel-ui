import {
    useState, useRef, createContext,
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


export const createActiveNodeContext = (props) => {
	const {
		initial,
	} = props;

    const mapRef = useRef(new Map());
	const [store] = useState(() => createActiveNodeStore(mapRef, initial));
    
    const ActiveNodeProvider = (props) => {
    	return <ActiveNodeContext.Provider value={ store } { ...props} />
    }
    const useActiveNodeStore = () => useStore(store);

    return [ActiveNodeProvider, useActiveNodeStore];
}


export default createActiveNodeContext;
