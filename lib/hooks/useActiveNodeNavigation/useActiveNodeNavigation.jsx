import {
    useEffect, useState, useRef,
    useImperativeHandle,
} from 'react';


export const useActiveNodeNavigation = (props) => {
    const defaultEvents =  ['up', 'down', 'left', 'right', 'confirm'];
    const {
        ref,
        initial,
        nodes = [],
        events = defaultEvents,
    } = props;

    const [activeNode, setActiveNode] = useState(initial);

    const listeners = nodes.reduce((listeners, name) => {
        listeners[name] = useRef();
        return listeners;
    }, {})

    useImperativeHandle(ref, () => {
        const handlers = events.reduce((handlers, name) => {
            handlers[name] = listeners[activeNode]?.current?.[name]?.();
            return handlers;
        }, {})

        return {
            ...ref.current,
            handlers,
        }
    }, [activeNode])

    return [activeNode, setActiveNode, listeners]
}

export default useActiveNodeNavigation;
