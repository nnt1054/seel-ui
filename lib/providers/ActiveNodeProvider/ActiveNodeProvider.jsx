import {
    useEffect, useState, useRef,
    useContext, createContext, memo,
} from 'react';
import { createStore, useStore } from 'zustand';


export const ActiveNodeContext = createContext(null);

const createNodeContainerStore = (props) => {
    const {
        node,
        childrenRef,
        initial,
        parent,
        setAsActive,
    } = props;

    return createStore()((set) => ({
        node,
        childrenRef,
        parent,
        setAsActive,

        // children props;
        activeNode: initial,
        setActiveNode: (activeNode) => set(state => ({ activeNode })),

        hasFocus: true,
        setHasFocus: (hasFocus) => set(state => ({ hasFocus })),
    }))
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

const createNodeContainer = (props = {}) => {
	const {
        node,
        initial,
        parent,
	} = props;

    const setAsActive = () => {
        if (!parent) return;
        const {
            setActiveNode,
            setAsActive: setParentAsActive,
        } = parent.getState();
        setActiveNode(node);
        setParentAsActive();
    }
    const childrenRef = useRef(new Map());
    const [store] = useState(
        () => createNodeContainerStore({
            node,
            childrenRef,
            initial,
            parent,
            setAsActive,
        })
    );

    return store;
}

export const withActiveNodeContainer = (WrappedComponent) => {
    const Component = memo((props) => {
        const {
            ref = useRef(),
            node,
            initial,
            hasFocus,
            ...others
        } = props;

        const parent = registerNode({ ref, node });
        const store = createNodeContainer({ node, initial, parent });

        // for manually controlled hasFocus
        useEffect(() => {
            const { setHasFocus } = store.getState();
            if (typeof hasFocus == 'boolean') setHasFocus(hasFocus);
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
