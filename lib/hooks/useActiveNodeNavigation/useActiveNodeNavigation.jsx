import {
    useEffect, useState, useRef,
    useImperativeHandle,
} from 'react';


// todo: probably replacing this with stuff from @hooks/utils
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

    const callbacks = events.reduce((callbacks, name) => {
        callbacks[name] = listeners[activeNode]?.current?.[name]?.();
        return callbacks;
    }, {})

    // useActiveNodeCallbacks(ref, callbacks);

    return [activeNode, setActiveNode, listeners]
}


// const useActiveNodeCallbacks = (ref, callbacks) => {
//     useImperativeHandle(ref, () => {
//         return {
//             ...ref.current,
//             ...callbacks,
//         }
//     })
// }

export default useActiveNodeNavigation;
