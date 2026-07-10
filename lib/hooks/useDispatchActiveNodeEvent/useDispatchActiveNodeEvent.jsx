import { useEffect } from 'react';

import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const useDispatchActiveNodeEvent = (props) => {
	const {
		ref,
		childrenRef,
		activeNode,
		events = [],
	} = props;

    const callbacks = events.reduce((callbacks, event) => {
        callbacks[event] = () => {
	        const activeRef = childrenRef.current.get(activeNode);
	        activeRef?.current?.dispatchEvent(new Event(event))
        }
        return callbacks;
    }, {})

    return useEventListeners(ref, callbacks);
}

export default useDispatchActiveNodeEvent;
