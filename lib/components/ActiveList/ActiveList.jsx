import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import { createStore, useStore } from 'zustand'
import styled from 'styled-components';

import { Column } from '@components/Column/Column';
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
        disableWrap = false,
        disableJump = false,

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
        disableWrap,
        disableJump,
        adjacentNodes,
        setActiveNode,
    });

    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode: activeIndex,
        events: ['left', 'right', 'confirm']
    })

    const onClick = () => {
        setActiveNode?.(node)
    }

    return (
        <Column
            ref={ ref }
            onClick={ onClick }
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: hasFocus ? '12px' : '8px',
            }}
        >
            { props.children }
        </Column>
    )
})


// this is just an example of a list item
export const ActiveListItem = withActiveNodeContainer((props) => {
    const {
        ref = useRef(),
        node,

        label,

        onFocus = () => {},
        callback = () => {},

        children,
    } = props;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

    const [count, setCount] = useState(0);
    const callbacks = useEventListeners(ref, {
        confirm: () => {
            setCount(count + 1);
            callback();
        },
    })

    const onClick = () => {
        callbacks.confirm();
        setActiveNode(node);
    }

    useEffect(() => {
        if (hasFocus) onFocus();
    }, [hasFocus])

    const markup = label ? label : `item ${ node } - ${ count }`

    return (
        <div
            ref={ ref }
            style={{ fontWeight: hasFocus ? 'bold' : 'normal' }}
            onClick={ onClick }
        >
            { markup }
            { children }
        </div>
    )
})


export default ActiveList;
