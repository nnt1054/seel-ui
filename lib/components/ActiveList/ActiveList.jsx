import {
    useEffect, useState, useContext,
    useRef, createContext, useImperativeHandle,
} from 'react';
import { createStore, useStore } from 'zustand'
import styled from 'styled-components';

import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';


const createActiveListStore = (initial) => {
  return createStore()((set) => ({
    ...initial,
    syncActiveIndex: (activeIndex) => set(state => ({ activeIndex })),
  }))
}

const getActiveListStoreState = () => {
    const store = useContext(ActiveListContext);
    if (!store) throw new Error('Missing ActiveListContext.Provider in the tree')
    return store.getState();
}

const useActiveListStore = (selector) => {
    const store = useContext(ActiveListContext);
    if (!store) throw new Error('Missing ActiveListContext.Provider in the tree')
    return useStore(store, selector)
}

export const ActiveListContext = createContext(null);

export const ActiveList = (props) => {
	const {
        ref,
        maxIndex: _maxIndex,
        hasFocus = false,
        node,
		adjacentNodes = {},
        setActiveNode = () => {},

        children,
	} = props;

    const maxIndex = Number.isInteger(_maxIndex) ? _maxIndex : children.length;
    const [activeIndex, setActiveIndex] = useActiveIndex({
        ref,
        maxIndex,
        isColumn: true,
        setActiveNode,
        adjacentNodes,
    });

    const mapRef = useRef({});
    const confirm = () => {
        const ref = mapRef.current?.[activeIndex]?.['confirm']?.();
    }

    useImperativeHandle(ref, () => {
        return {
            ...ref.current,
            confirm,
        }
    })

    const [store] = useState(() => createActiveListStore({
        mapRef,
        activeIndex,
        setActiveIndex,
    }));

    useEffect(() => {
        const { syncActiveIndex } = store.getState();
        syncActiveIndex(activeIndex);
    }, [activeIndex])

    return (
        <ActiveListContext.Provider value={ store }>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                { children }
            </div>
        </ActiveListContext.Provider>
    )
}


export const ActiveListItem = (props) => {
    const {
        index,
    } = props;

    const store = useContext(ActiveListContext);
    const mapRef = useActiveListStore(state => state.mapRef);
    const hasFocus = useActiveListStore(state => state.activeIndex == index);

    const onClick = () => {
        const { setActiveIndex } = getActiveListStoreState();
        setActiveIndex(index);
    }

    const handlers = {
        confirm: () => { console.log(index) },
        left: () => { console.log(`left ${ index }`)},
        right: () => { console.log(`right ${ index }`)},
    }

    useImperativeHandle(mapRef, () => {
        return {
            ...mapRef.current,
            [index]: handlers,
        }
    })

    return (
        <div
            style={{
                fontWeight: hasFocus ? 'bold' : 'normal',
            }}
            onClick={ onClick }
        > item { index } </div>
    )
}

export default ActiveList;
