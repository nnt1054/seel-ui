import { useEffect } from 'react';

import { handleAdjacentNode } from '@utils';


export const useActiveIndex = (props) => {
    const {
        ref,
        activeIndex,
        setActiveIndex,
        maxIndex = 0,
        initialIndex = 0,
        isColumn = false,
        isReverse = false,
        disableWrap = false,
        disableJump = false,
        adjacentNodes = {},
        setActiveNode = () => {},
    } = props;

    const incrementIndex = (adjacentNode) => {
        if (activeIndex >= (maxIndex - 1) && adjacentNode) {
            handleAdjacentNode(adjacentNode, setActiveNode);
        } else {
            const newIndex = disableWrap
                ? Math.min(activeIndex + 1, maxIndex - 1)
                : (activeIndex + 1) % maxIndex;
            setActiveIndex(newIndex);
        }
    }

    const decrementIndex = (adjacentNode) => {
        if (activeIndex <= 0 && adjacentNode) {
            handleAdjacentNode(adjacentNode, setActiveNode);
        } else {
            const newIndex = disableWrap
                ? Math.max(activeIndex - 1, 0)
                : (activeIndex - 1 + maxIndex) % maxIndex;
            setActiveIndex(newIndex);
        }
    }

    const up = () => {
        if (isColumn) {
            if (isReverse) {
                incrementIndex(adjacentNodes.up);
            } else {
                decrementIndex(adjacentNodes.up);
            }
        } else {
            if (adjacentNodes.up) {
                handleAdjacentNode(adjacentNode, setActiveNode);
            } else if (!disableJump) {
                const jumpIndex = isReverse ? maxIndex - 1 : 0;
                setActiveIndex(jumpIndex);
            }
        }
    }

    const down = () => {
        if (isColumn) {
            if (isReverse) {
                decrementIndex(adjacentNodes.down);
            } else {
                incrementIndex(adjacentNodes.down);
            }
        } else {
            if (adjacentNodes.down) {
                handleAdjacentNode(adjacentNode, setActiveNode);
            } else if (!disableJump) {
                const jumpIndex = isReverse ? 0 : maxIndex - 1;
                setActiveIndex(jumpIndex);
            }
        }
    }

    const left = () => {
        if (isColumn) {
            if (adjacentNodes.left) {
                handleAdjacentNode(adjacentNodes.left, setActiveNode);
            } else if (!disableJump) {
                const jumpIndex = isReverse ? maxIndex - 1 : 0;
                setActiveIndex(jumpIndex);
            }
        } else {
            if (isReverse) {
                incrementIndex(adjacentNodes.left);
            } else {
                decrementIndex(adjacentNodes.left);
            }
        }
    }

    const right = () => {
        if (isColumn) {
            if (adjacentNodes.right) {
                handleAdjacentNode(adjacentNodes.right, setActiveNode);
            } else if (!disableJump) {
                const jumpIndex = isReverse ? 0 : maxIndex - 1;
                setActiveIndex(jumpIndex);
            }
        } else {
            if (isReverse) {
                decrementIndex(adjacentNodes.right);
            } else {
                incrementIndex(adjacentNodes.right);
            }
        }
    }

    useEffect(() => {
        if (maxIndex < 1) return;
        setActiveIndex(Math.min(activeIndex, maxIndex - 1));
    }, [maxIndex])

    useEffect(() => {
        setActiveIndex(initialIndex);
    }, [initialIndex])

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


export default useActiveIndex;
