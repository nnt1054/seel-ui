import {
    useEffect, useState, useRef,
    useMemo, memo, createContext,
    useContext,
} from 'react';
import { createStore, useStore } from 'zustand'


export const ActiveNodeContext = createContext(null);

const createNodeContainerStore = (props) => {
    const {
        childrenRef,
        initial,
        parent,
    } = props;

    return createStore()((set) => ({
        childrenRef,
        parent,
        activeNode: initial,
        setActiveNode: (activeNode) => set(state => ({ activeNode })),

        // todo: need external flagging system for this
        // any top level container will default to true
        // cant do this via prop so need to expose some
        // api or event listener
        hasFocus: true,
        setHasFocus: (hasFocus) => set(state => ({ hasFocus })),
    }))
}

const createNodeContainer = (props = {}) => {
	const {
        initial,
        parent,
	} = props;

    const childrenRef = useRef(new Map());
    const [store] = useState(
        () => createNodeContainerStore({ childrenRef, initial, parent, })
    );

    return store;
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
            hasFocus = false,
            ...others
        } = props;

        const parent = registerNode({ ref, node });
        const store = createNodeContainer({ initial, parent });

        useEffect(() => {
            const { setHasFocus } = store.getState();
            setHasFocus(hasFocus);
        }, [hasFocus])

        return (
            <ActiveNodeContext.Provider value={ store }>
                <WrappedComponent
                    {...others}
                    ref={ ref }
                    node={ node }
                />
            </ActiveNodeContext.Provider>
        );
    });

    return Component;
}

export const useActiveNodeContainer = (selector) => {
    const store = useContext(ActiveNodeContext);
    if (!store) throw new Error('Missing ActiveNodeContext.Provider in the tree')
    return useStore(store, selector)
}
