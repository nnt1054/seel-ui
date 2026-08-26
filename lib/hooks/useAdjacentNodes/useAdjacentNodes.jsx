import { useEffect } from 'react';

import { handleAdjacentNode } from '@utils';


export const useAdjacentNodes = (props) => {
    const {
        ref,
        adjacentNodes = {},
        moveFocus = () => {},
        isActive = true,
    } = props;

    const up = () => {
        if (adjacentNodes.up) {
            handleAdjacentNode(adjacentNodes.up, moveFocus);
        }
    }

    const down = () => {
        if (adjacentNodes.down) {
            handleAdjacentNode(adjacentNodes.down, moveFocus);
        }
    }

    const left = () => {
        if (adjacentNodes.left) {
            handleAdjacentNode(adjacentNodes.left, moveFocus);
        }
    }

    const right = () => {
        if (adjacentNodes.right) {
            handleAdjacentNode(adjacentNodes.right, moveFocus);
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


export default useAdjacentNodes;
