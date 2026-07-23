import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import styled from 'styled-components';
import { createStore, useStore } from 'zustand';

import { withActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNodeContainer } from '@hooks/useActiveNodeContainer/useActiveNodeContainer';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useActiveGridIndex } from '@hooks/useActiveGridIndex/useActiveGridIndex';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';


const StyledActiveGrid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.$columns}, 1fr)`};
`
export const ActiveGrid = withActiveNodeContainer((props) => {
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
        childrenRef,
        activeNode: activeIndex,
        setActiveNode: setActiveIndex,
    } = useActiveNodeContainer();

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

    useActiveGridIndex({
        ref,
        activeIndex,
        setActiveIndex,
        columns,
        maxIndex,
        initialIndex,
        adjacentNodes,
        setActiveNode,
    });

    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode: activeIndex,
        events: ['confirm']
    })

    const onClick = () => {
        // setActiveNode?.(node);
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


export default ActiveGrid;
