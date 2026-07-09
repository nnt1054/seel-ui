import {
    useEffect, useState, useContext,
    useRef, createContext, useImperativeHandle,
} from 'react';
import { createStore, useStore } from 'zustand'
import styled from 'styled-components';

import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';
import { useActiveNode, useActiveNodeContainer } from '@hooks/utils';


export const ActiveList = (props) => {
	const {
        ref = useRef(),
        node,
        adjacentNodes = {},
        maxIndex: _maxIndex,
        children,
	} = props;

    const maxIndex = Number.isInteger(_maxIndex)
        ? _maxIndex
        : children.length;

    const { hasFocus } = useActiveNode({ ref, node });

    const [ActiveNodeProvider, mapRef, store] = useActiveNodeContainer({
        initial: 0
    });
    const {
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useStore(store);

    useActiveIndex({
        ref,
        activeIndex,
        setActiveIndex,
        maxIndex,
        isColumn: true,
        disableJump: true,

        // todo: decide on naming; used to change
        // the active node within the parent container
        // and not the active child item in the list
        // setActiveNode,
        // adjacentNodes,
    });

    const dispatchEvent = (event) => {
      return () => {
        const activeRef = mapRef.current.get(activeIndex);
        activeRef.current?.dispatchEvent(new Event(event))
      }
    }
    const left = dispatchEvent('left');
    const right = dispatchEvent('right');
    const confirm = dispatchEvent('confirm');

    useEffect(() => {
        const element = ref.current;
        element?.addEventListener('left', left);
        element?.addEventListener('right', right);        
        element?.addEventListener('confirm', confirm);
        return () => {
            element?.removeEventListener('left', left);
            element?.removeEventListener('right', right);        
            element?.removeEventListener('confirm', confirm);
        }
    })

    return (
        <ActiveNodeProvider>
            <div ref={ ref } style={{ display: 'flex', flexDirection: 'column' }}>
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

    const confirm = () => { console.log(`confirm ${ node }`) };
    const left =  () => { console.log(`left ${ node }`)};
    const right = () => { console.log(`right ${ node }`)};
    useEffect(() => {
        const element = ref.current;
        element.addEventListener('left', left);
        element.addEventListener('right', right);        
        element.addEventListener('confirm', confirm);
        return () => {
            element.removeEventListener('left', left);
            element.removeEventListener('right', right);        
            element.removeEventListener('confirm', confirm);
        }
    })

    const onClick = () => {
        confirm();

        // used to set self as active within parent
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
