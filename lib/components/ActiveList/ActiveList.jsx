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

    &[data-orientation='vertical'] {
        flex-direction: column;
    }

    &[data-orientation='horizontal'] {
        flex-direction: row;
    }
`
export const ActiveList = withActiveNode((props) => {
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
        hasFocus,
        moveFocus,
        grabFocus,
        childrenRef,
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useActiveNode();

    // todo: propagation controller
    // issue to note: cancel should come from the child node provided via context
    // why?  in the case of nested containers the top level node will receive
    // the cancel event before the child nodes its intended for
    // useEventListeners(ref, {
    //     confirm: () => {
    //         // propagate the confirm event or turn on propagation
    //     },
    //     cancel: () => {
    //         // stop propagation
    //     },
    // })

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
        moveFocus,
    });

    usePropagateEvents({
        ref,
        childrenRef,
        activeNode: activeIndex,
        events: isColumn
            ? ['left', 'right', 'confirm']
            : ['up', 'down', 'confirm'],
    })

    const onClick = () => {
        // setActiveNode?.(node)
        grabFocus();
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


export const ActiveListItem = withActiveNode((props) => {
    const {
        ref = useRef(),
        node,
        callback = () => {},
        ...others
    } = props;

    const { hasFocus, grabFocus } = useActiveNode();
    const callbacks = useEventListeners(ref, {
        confirm: () => { callback(); },
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
