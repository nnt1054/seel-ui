import {
    useEffect, useState, useRef,
    useMemo, memo, createContext,
    useContext,
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


export const createActiveNodeContext = (props = {}) => {
	const {
		initial,
	} = props;

  const mapRef = useRef(new Map());
  const [store] = useState(
    () => createActiveNodeStore(mapRef, initial)
  );

  const ActiveNodeProvider = useMemo(() => {
    return (props) => {
    	return <ActiveNodeContext.Provider value={ store } { ...props} />
    }
  })

  const useActiveNodeStore = (selector) => useStore(store, selector);

  return [ActiveNodeProvider, useActiveNodeStore];
}


export const useActiveNodeContainer = (selector) => {
    const store = useContext(ActiveNodeContext);
    if (!store) throw new Error('Missing ActiveNodeContext.Provider in the tree')
    return useStore(store, selector)
}


export const withActiveNodeContainer = (WrappedComponent) => {
    const Component = (props) => {
        const [ActiveNodeProvider] = createActiveNodeContext();
        return (
            <ActiveNodeProvider>
                <WrappedComponent
                    {...props}
                />
            </ActiveNodeProvider>
        );
    };

    return Component;
}


export default createActiveNodeContext;
