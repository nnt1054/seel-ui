import {
    useEffect, useState, useContext,
    useRef, createContext, useImperativeHandle,
} from 'react';
import styled from 'styled-components';

import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';


export const ActiveListContext = createContext(null);

export const ActiveList = (props) => {
	const {
        ref,
        hasFocus = false,
        node,
		adjacentNodes = {},
        setActiveNode = () => {},

        children,
	} = props;

    const [activeIndex, setActiveIndex] = useActiveIndex({
        ref,
        maxIndex: 3,
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

    return (
        <ActiveListContext.Provider value={ mapRef }>
        <div ref={ ref } style={{ display: 'flex', flexDirection: 'column' }}>
            <ActiveListItem
                mapRef={ mapRef }
                index={ 0 }
            />
            <ActiveListItem
                mapRef={ mapRef }
                index={ 1 }
            />
            <ActiveListItem
                mapRef={ mapRef }
                index={ 2 }
            />
        </div>
        </ActiveListContext.Provider>
    )
}


export const ActiveListItem = (props) => {
    const {
        mapRef,
        index,
    } = props;

    const confirm = () => { console.log(index) };

    useImperativeHandle(mapRef, () => {
        return {
            ...mapRef.current,
            [index]: {
                confirm,
            }
        }
    })

    return (
        <div> item { index } </div>
    )
}

export default ActiveList;
