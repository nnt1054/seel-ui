import { useEffect, useState, useImperativeHandle } from 'react';


export const useActiveGridIndex = (props) => {
    const {
        ref,
        columns: _columns = 1,
        maxIndex = 1,
        adjacentNodes = {},
        setActiveNode = () => {},
    } = props;

    const [activeIndex, _setActiveIndex] = useState(0);
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

    useImperativeHandle(ref, () => {
        return {
            ...ref.current,
            up,
            down,
            left,
            right,
        }
    })

    return [activeIndex, setActiveIndex];
}

export default useActiveGridIndex;
