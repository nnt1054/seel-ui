import { useEffect } from 'react';

import { handleAdjacentNode } from '@utils';


export const useAdjacentNode = (props) => {
    const {
        ref,
        adjacentNodes = {},
        setActiveNode = () => {},
        isActive = true,
    } = props;

    const up = () => {
        if (adjacentNodes.up) {
            handleAdjacentNode(adjacentNodes.up, setActiveNode);
        }
    }

    const down = () => {
        if (atBottom && adjacentNodes.down) {
            handleAdjacentNode(adjacentNodes.down, setActiveNode);
        }
    }

    const left = () => {
        if (adjacentNodes.left) {
            handleAdjacentNode(adjacentNodes.left, setActiveNode);
        }
    }

    const right = () => {
        if (adjacentNodes.right) {
            handleAdjacentNode(adjacentNodes.right, setActiveNode);
        }
    }

    useEffect(() => {
        if (!isActive) return;

        const element = ref.current;
        element?.addEventListener('up', up);
        element?.addEventListener('down', down);
        element?.addEventListener('left', left);
        element?.addEventListener('right', right);
        return () => {
            element?.removeEventListener('up', up);
            element?.removeEventListener('down', down);
            element?.removeEventListener('left', left);
            element?.removeEventListener('right', right);
        }
    })
}


export default useAdjacentNode;
