import {
    useEffect, useState, useRef,
    useMemo, memo, createContext,
    useContext,
} from 'react';
import { createStore, useStore } from 'zustand'


export const ActiveNodeContext = createContext(null);


const createNodeContainerStore = (props) => {
    const {
        parent,
        childrenRef,
        initial,
    } = props;

    return createStore()((set) => ({
        childrenRef,
        parent,
        activeNode: initial,
        setActiveNode: (activeNode) => set(state => ({ activeNode })),
    }))
}

const createNodeContainer = (props = {}) => {
	const {
		initial,
        parent,
	} = props;

    const childrenRef = useRef(new Map());
    const [store] = useState(
        () => createNodeContainerStore({ childrenRef, parent, initial, })
    );

    const ActiveNodeProvider = (props) => {
        return <ActiveNodeContext.Provider value={ store } { ...props} />
    }

    const useActiveNodeStore = (selector) => useStore(store, selector);

    return [ActiveNodeProvider, useActiveNodeStore];
}

const registerNode = ({ ref, node }) => {
    const store = useContext(ActiveNodeContext);
    if (!store) return;

    const childrenRef = useStore(store, state => state.childrenRef);

    useEffect(() => {
        const children = childrenRef?.current;
        children?.set(node, ref);
        return () => {
            children?.delete(node)
        }
    })

    return store;
}

export const withActiveNodeContainer = (WrappedComponent) => {
    const Component = memo((props) => {
        const {
            ref = useRef(),
            node,
            initial,
        } = props;

        // register self in container
        const parent = registerNode({ ref, node });

        // setup self as a container
        const [ActiveNodeProvider] = createNodeContainer({
            initial,
            parent,
        });

        return (
            <ActiveNodeProvider>
                <WrappedComponent
                    {...props}
                    ref={ ref }
                />
            </ActiveNodeProvider>
        );
    });

    return Component;
}


export const useActiveNodeContainer = (selector) => {
    const store = useContext(ActiveNodeContext);
    if (!store) throw new Error('Missing ActiveNodeContext.Provider in the tree')
    return useStore(store, selector)
}
