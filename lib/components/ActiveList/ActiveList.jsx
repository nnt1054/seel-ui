import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import styled from 'styled-components';

import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { withActiveNodeContainer, useActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const ActiveList = withActiveNodeContainer((props) => {
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

    const {
        mapRef,
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useActiveNodeContainer();

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
})


export const ActiveListItem = memo((props) => {
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
            style={{ fontWeight: hasFocus ? 'bold' : 'normal' }}
            onClick={ onClick }
        > item { node } </div>
    )
})


export default ActiveList;
