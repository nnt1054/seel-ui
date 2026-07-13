import {
    useEffect, useState, useContext,
    useRef, useMemo, memo,
} from 'react';
import { createStore, useStore } from 'zustand'
import styled from 'styled-components';

import { Row } from '@components/Row/Row';
import { useActiveIndex } from '@hooks/useActiveIndex/useActiveIndex';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { withActiveNodeContainer, useActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const ActiveGroup = withActiveNodeContainer((props) => {
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
        disableWrap,
        disableJump,
        adjacentNodes,
        setActiveNode,
    });

    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode: activeIndex,
        events: ['up', 'down', 'confirm']
    })

    const onClick = () => {
        setActiveNode(node)
    }

    return (
        <Row
            ref={ ref }
            onClick={ onClick }
            style={{ gap: hasFocus ? '12px' : '8px' }}
        >
            { props.children }
        </Row>
    )
})


export default ActiveGroup;
