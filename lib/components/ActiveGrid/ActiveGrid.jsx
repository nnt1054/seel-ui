import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import styled from 'styled-components';
import { createStore, useStore } from 'zustand';

import { withActiveNode } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useActiveGridIndex } from '@hooks/useActiveGridIndex/useActiveGridIndex';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';

const StyledActiveGrid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.$columns}, 1fr)`};
`
export const ActiveGrid = withActiveNode((props) => {
	const {
        ref,
        node,
        adjacentNodes = {},
        columns,
        maxIndex: _maxIndex,
        initialIndex = 0,
        children,
        ...others
	} = props;

    const maxIndex = Number.isInteger(_maxIndex)
        ? _maxIndex
        : children.length;

    const {
        hasFocus,
        moveFocus,
        grabFocus,
        childrenRef,
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useActiveNode();

    useActiveGridIndex({
        ref,
        activeIndex,
        setActiveIndex,
        columns,
        maxIndex,
        initialIndex,
        adjacentNodes,
        moveFocus,
    });

    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode: activeIndex,
        events: ['confirm'],
    })

    const onClick = () => {
        grabFocus();
    }

    return (
        <StyledActiveGrid
            ref={ ref }
            onClick={ onClick }
            $columns={ columns }
            { ...others }
        >
            { props.children }
        </StyledActiveGrid>
    )
})


export const ActiveGridItem = withActiveNode((props) => {
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

ActiveGrid.Item = ActiveGridItem;

export default ActiveGrid;
