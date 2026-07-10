import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import { createStore, useStore } from 'zustand'
import styled from 'styled-components';

import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { withActiveNodeContainer, useActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const ActiveList = withActiveNodeContainer((props) => {
	const {
        ref,
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
        childrenRef,
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useActiveNodeContainer();

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

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
        childrenRef,
        activeNode: activeIndex,
        events: ['left', 'right', 'confirm']
    })

    const [count, setCount] = useState(0);

    const onClick = () => {
        setActiveNode(node)
        setCount(count + 1)
    }

    return (
        <div
            ref={ ref }
            onClick={ onClick }
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: hasFocus ? '12px' : '8px',
            }}
        >
            <span> { count } </span>
            { props.children }
        </div>
    )
})


// this is just an example of a list item
export const ActiveListItem = withActiveNodeContainer((props) => {
    const {
        ref = useRef(),
        node,
    } = props;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

    const [count, setCount] = useState(0);
    const callbacks = useEventListeners(ref, {
        confirm: () => { console.log(`confirm ${ node }`) },
        left:  () => { setCount(count - 1) },
        right: () => { setCount(count + 1) },
    })

    const onClick = () => {
        callbacks.confirm();
        setActiveNode(node);
    }

    return (
        <div
            ref={ ref }
            style={{ fontWeight: hasFocus ? 'bold' : 'normal' }}
            onClick={ onClick }
        > item { node } - { count }</div>
    )
})


export default ActiveList;
