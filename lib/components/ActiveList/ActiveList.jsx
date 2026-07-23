import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import styled from 'styled-components';
import { createStore, useStore } from 'zustand'

import { withActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNodeContainer } from '@hooks/useActiveNodeContainer/useActiveNodeContainer';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


const StyledActiveList = styled.div`
    display: flex;

    &[data-orientation='vertical'] {
        flex-direction: column;
    }

    &[data-orientation='horizontal'] {
        flex-direction: row;
    }
`
export const ActiveList = withActiveNodeContainer((props) => {
	const {
        ref,
        node,
        adjacentNodes = {},
        maxIndex: _maxIndex,
        initialIndex = 0,
        orientation = 'vertical', // or 'horizontal'
        disableWrap = false,
        disableJump = false,

        children,
        ...others
	} = props;

    const maxIndex = Number.isInteger(_maxIndex)
        ? _maxIndex
        : children.length;
    const isColumn = (orientation == 'vertical')

    const {
        childrenRef,
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useActiveNodeContainer();

    const { hasFocus, setActiveNode, setAsActive } = useActiveNode({ ref, node });

    useActiveIndex({
        ref,
        activeIndex,
        setActiveIndex,
        maxIndex,
        initialIndex,
        isColumn,
        disableWrap,
        disableJump,
        adjacentNodes,
        setActiveNode,
    });

    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode: activeIndex,
        events: isColumn
            ? ['left', 'right', 'confirm']
            : ['up', 'down', 'confirm'],
    })

    const onClick = () => {
        // setActiveNode?.(node)
        setAsActive();
    }

    return (
        <StyledActiveList
            ref={ ref }
            onClick={ onClick }
            data-focused={ hasFocus ? "" : null }
            data-orientation={ isColumn ? 'vertical' : 'horizontal' }
            { ...others }
        >
            { props.children }
        </StyledActiveList>
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

    const { hasFocus, setActiveNode, setAsActive } = useActiveNode({ ref, node });

    const [count, setCount] = useState(0);
    const callbacks = useEventListeners(ref, {
        confirm: () => {
            setCount(count + 1);
            callback();
        },
    })

    const onClick = () => {
        callbacks.confirm();
        setAsActive();
    }

    useEffect(() => {
        if (hasFocus) onFocus();
    }, [hasFocus])

    const markup = label ? label : `item ${ node } - ${ count }`

    return (
        <div
            ref={ ref }
            data-focused={ hasFocus ? "" : null }
            style={{
                fontWeight: hasFocus ? 'bold' : 'normal',
            }}
            onClick={ onClick }
        >
            { markup }
            { children }
        </div>
    )
})


export default ActiveList;
