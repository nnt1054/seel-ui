import {
    useEffect, useState, useContext,
    useRef, createContext, useImperativeHandle,
} from 'react';
import { createStore, useStore } from 'zustand'
import styled from 'styled-components';

import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { createActiveNodeContext } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const ActiveList = (props) => {
	const {
        ref = useRef(),
        node,
        adjacentNodes = {},
        maxIndex: _maxIndex,
        initialIndex = 0,
        children,
	} = props;

    const maxIndex = Number.isInteger(_maxIndex)
        ? _maxIndex
        : children.length;

    const {
        hasFocus = false,
        setActiveNode = () => {},
    } = useActiveNode({ ref, node });

    const [ActiveNodeProvider, useActiveNodeStore] = createActiveNodeContext({
        initial: initialIndex,
    });

    const {
        mapRef,
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useActiveNodeStore();

    useActiveIndex({
        ref,
        activeIndex,
        setActiveIndex,
        maxIndex,
        initialIndex,
        isColumn: true,
        disableJump: true,
        setActiveNode,
        adjacentNodes,
    });

    useDispatchActiveNodeEvent({
        ref,
        mapRef,
        activeNode: activeIndex,
        events: ['left', 'right', 'confirm']
    })

    return (
        <ActiveNodeProvider>
            <div ref={ ref } style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                { children }
            </div>
        </ActiveNodeProvider>
    )
}


export const ActiveListItem = (props) => {
    const {
        ref = useRef(),
        node,
    } = props;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

    const callbacks = useEventListeners(ref, {
        confirm: () => { console.log(`confirm ${ node }`) },
        left:  () => { console.log(`left ${ node }`)},
        right: () => { console.log(`right ${ node }`)},
    })

    const onClick = () => {
        callbacks.confirm();
        setActiveNode(node);
    }

    return (
        <div
            ref={ ref }
            style={{
                fontWeight: hasFocus ? 'bold' : 'normal',
            }}
            onClick={ onClick }
        > item { node } </div>
    )
}


export default ActiveList;
