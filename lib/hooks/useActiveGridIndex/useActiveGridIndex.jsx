import { useEffect, useState } from 'react';


export const useActiveGridIndex = (props) => {
    const {
        ref,
        activeIndex,
        setActiveIndex: _setActiveIndex,
        columns: _columns = 1,
        maxIndex = 1,
        adjacentNodes = {},
        setActiveNode = () => {},
    } = props;

    const setActiveIndex = (index) => _setActiveIndex(index || 0);

    const columns = Math.min(_columns, maxIndex);
    const rows = Math.ceil(maxIndex / columns);
    const gridSize = rows * columns;

    const up = () => {
        if (activeIndex < columns && adjacentNodes.up) {
            setActiveNode(adjacentNodes.up);
        } else {
            let newIndex = activeIndex - columns;
            if (newIndex < 0) {
                newIndex += gridSize - 1;
                if (newIndex >= maxIndex) newIndex -= columns;
                if (newIndex < 0) newIndex += columns;
                setActiveIndex(newIndex);
            } else {
                setActiveIndex(newIndex);
            }
        }
    }

    const down = () => {
        if (activeIndex >= (maxIndex - columns) && adjacentNodes.down) {
            setActiveNode(adjacentNodes.down);
        } else {
            const newIndex = activeIndex + columns;
            if (newIndex >= maxIndex) {
                setActiveIndex((newIndex + 1) % columns);
            } else {
                setActiveIndex(newIndex);
            }
        }
    }

    const left = () => {
        if ((activeIndex % columns) == 0 && adjacentNodes.left) {
            setActiveNode(adjacentNodes.left);
        } else {
            const newIndex = (activeIndex - 1 + maxIndex) % maxIndex;
            setActiveIndex(newIndex);
        }
    }

    const right = () => {
        if ((activeIndex % columns) == (columns - 1) && adjacentNodes.right) {
            setActiveNode(adjacentNodes.right);
        } else {
            const newIndex = (activeIndex + 1) % maxIndex;
            setActiveIndex(newIndex);
        }
    }

    useEffect(() => {
        if (maxIndex < 1) return;
        setActiveIndex(Math.min(activeIndex, maxIndex - 1));
    }, [maxIndex])

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

export default useActiveGridIndex;
