import {
    useEffect, useState, useRef,
    useContext, createContext, memo,
} from 'react';
import { createStore, useStore } from 'zustand';


export const ActiveNodeContext = createContext(null);

const createNodeContainerStore = (props) => {
    const {
        node,
        initial,
        parent,
        childrenRef,
        grabFocus,
    } = props;

    return createStore()((set) => ({
        node,
        parent,
        childrenRef,
        grabFocus,

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

    const childrenRef = useRef(new Map());

    const grabFocus = () => {
        if (!parent) return;

        const {
            setActiveNode,
            grabFocus,
        } = parent.getState();

        setActiveNode(node);
        grabFocus();
    }

    const [store] = useState(() => createNodeContainerStore({
        node,
        initial,
        parent,
        childrenRef,
        grabFocus,
    }));

    return store;
}

export const withActiveNode = (WrappedComponent, ignoreParent) => {
    const Component = memo((props) => {
        const {
            ref = useRef(),
            node,
            initial,
            hasFocus,
            ...others
        } = props;

        const parent = ignoreParent ? null : registerNode({ ref, node });
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
