import { useEffect, useState, useRef } from 'react';


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

    const dispatchEvent = (event) => {
        return () => {
            const listener = listeners[activeNode]?.current;
            if (!listener) return;
            listener.dispatchEvent(new Event(event))
        }
    }

    const callbacks = events.reduce((callbacks, event) => {
        callbacks[event] = dispatchEvent(event);
        return callbacks;
    }, {})

    useEffect(() => {
        const element = ref.current;

        for (const event of events) {
            element?.addEventListener(event, callbacks[event]);
        }

        return () => {
            for (const event of events) {
                element?.removeEventListener(event, callbacks[event]);
            }
        }
    })

    return [activeNode, setActiveNode, listeners]
}

export default useActiveNodeNavigation;
