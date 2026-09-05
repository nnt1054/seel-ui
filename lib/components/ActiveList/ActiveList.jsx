import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import styled from 'styled-components';
import { createStore, useStore } from 'zustand'

import { withActiveNode } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';
import { usePropagateEvents } from '@hooks/usePropagateEvents/usePropagateEvents';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


const StyledActiveList = styled.div`
    display: flex;

    &[data-orientation='horizontal'] {
        flex-direction: row;
    }

    &[data-orientation='vertical'] {
        flex-direction: column;
    }

    &[data-orientation='horizontal'][data-reversed] {
        flex-direction: row-reverse;
    }

    &[data-orientation='vertical'][data-reversed] {
        flex-direction: column-reverse;
    }
`
export const ActiveList = withActiveNode((props) => {
	const {
        ref,
        node,
        adjacentNodes = {},
        maxIndex: _maxIndex,
        initialIndex = 0,
        orientation = 'vertical',
        isReverse = false,
        disableWrap = false,
        disableJump = false,
        ...others
	} = props;

    const maxIndex = Number.isInteger(_maxIndex)
        ? _maxIndex
        : props.children.length;

    const isColumn = (orientation == 'vertical')

    const {
        hasFocus,
        moveFocus,
        grabFocus,
        childrenRef,
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useActiveNode();

    useActiveIndex({
        ref,
        activeIndex,
        setActiveIndex,
        maxIndex,
        initialIndex,
        isColumn,
        isReverse,
        disableWrap,
        disableJump,
        adjacentNodes,
        moveFocus,
    });

    const events = ['confirm', 'cancel'];

    if (disableJump) {
        if (isColumn) {
            events.push('left', 'right')
        } else {
            events.push('up', 'down')
        }
    }

    usePropagateEvents({
        ref,
        childrenRef,
        activeNode: activeIndex,
        events,
    })

    const onClick = () => {
        grabFocus();
    }

    return (
        <StyledActiveList
            ref={ ref }
            onClick={ onClick }
            data-focused={ hasFocus ? "" : null }
            data-orientation={ isColumn ? 'vertical' : 'horizontal' }
            data-reversed={ isReverse ? "" : null }
            { ...others }
        />
    )
})


export const ActiveListItem = withActiveNode((props) => {
    const {
        ref = useRef(),
        node,
        onConfirm = () => {},

        // deprecate callback
        callback = () => {},
        ...others
    } = props;

    const { hasFocus, grabFocus } = useActiveNode();

    const callbacks = useEventListeners(ref, {
        confirm: () => { onConfirm() },
    })

    const onClick = () => {
        grabFocus();
        callbacks.confirm();
    }

    return (
        <div
            ref={ ref }
            onClick={ onClick }
            data-focused={ hasFocus ? "" : null }
            { ...others }
        />
    )
})

ActiveList.Item = ActiveListItem;

export default ActiveList;
