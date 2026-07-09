import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import { createStore, useStore } from 'zustand'
import styled from 'styled-components';

import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { createActiveNodeContext } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const ActiveList = memo((props) => {
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

    return (
        <ActiveNodeProvider>
            <BaseActiveList
                ref={ ref }
                useActiveNodeStore={ useActiveNodeStore }
                maxIndex={ maxIndex }
                initialIndex={ initialIndex }
                adjacentNodes={ adjacentNodes }
                setActiveNode={ setActiveNode }
            >
                { children }
            </BaseActiveList>
        </ActiveNodeProvider>
    )
})

const BaseActiveList = (props) => {
    const {
        ref,
        useActiveNodeStore,

        maxIndex,
        initialIndex,

        adjacentNodes,
        setActiveNode,
    } = props;

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
        adjacentNodes,
        setActiveNode,
    });

    useDispatchActiveNodeEvent({
        ref,
        mapRef,
        activeNode: activeIndex,
        events: ['left', 'right', 'confirm']
    })

    return (
        <div ref={ ref }>
            { props.children }
        </div>
    )
}

export const ActiveListItem = memo((props) => {
    const {
        ref = useRef(),
        node,
    } = props;

    console.log(node);

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
})


export default ActiveList;
