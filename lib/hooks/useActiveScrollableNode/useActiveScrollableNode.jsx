import { useEffect } from 'react';

import { handleAdjacentNode } from '@utils';


export const useActiveScrollableNode = (props) => {
    const {
        ref,
        adjacentNodes = {},
        setActiveNode = () => {},
    } = props;

    const up = () => {
        const element = ref.current;
        if (!element) return;

        const scrollBy = element.clientHeight / 2;
        const atTop = element.scrollTop == 0;
        if (atTop && adjacentNodes.up) {
            handleAdjacentNode(adjacentNodes.up, setActiveNode);
        } else {
            element.scrollBy({
                top: -scrollBy,
                behavior: 'smooth',
            })
        }
    }

    const down = () => {
        const element = ref.current;
        if (!element) return;

        const scrollBy = element.clientHeight / 2;
        const scrollBottom = Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop);
        const atBottom = scrollBottom <= 1;
        if (atBottom && adjacentNodes.down) {
            handleAdjacentNode(adjacentNodes.down, setActiveNode);
        } else {
            element.scrollBy({
                top: scrollBy,
                behavior: 'smooth',
            })
        }
    }

    const left = () => {
        const element = ref.current;
        if (!element) return;

        const scrollBy = element.clientWidth / 2;
        const atLeft = element.scrollLeft == 0;
        if (atLeft && adjacentNodes.left) {
            handleAdjacentNode(adjacentNodes.left, setActiveNode);
        } else {
            element.scrollBy({
                left: -scrollBy,
                behavior: 'smooth',
            })
        }
    }

    const right = () => {
        const element = ref.current;
        if (!element) return;

        const scrollBy = element.clientWidth / 2;
        const scrollRight = Math.abs(element.scrollWidth - element.clientWidth - element.scrollLeft);
        const atRight = scrollRight <= 1;
        if (atRight && adjacentNodes.right) {
            handleAdjacentNode(adjacentNodes.right, setActiveNode);
        } else {
            element.scrollBy({
                left: scrollBy,
                behavior: 'smooth',
            })
        }
    }

    useEffect(() => {
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


export default useActiveScrollableNode;
