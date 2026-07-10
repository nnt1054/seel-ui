import { useRef } from 'react';

import {
	withActiveNodeContainer,
	useActiveNodeContainer,
} from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import {
	useActiveNode,
} from '@hooks/useActiveNode/useActiveNode'
import {
	useDispatchActiveNodeEvent
} from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const ActiveContainer = withActiveNodeContainer((props) => {
    const defaultEvents =  ['up', 'down', 'left', 'right', 'confirm'];
	const {
        ref = useRef(),
		node,
		initial,
		events = defaultEvents,
		children,
	} = props;

    const { childrenRef, activeNode, setHasFocus } = useActiveNodeContainer();
    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode,
        events,
    })

    useEventListeners(ref, {
    	focus: () => { setHasFocus(true) },
    	blur: () => { setHasFocus(false) },
    })

	return (
		<>
			<div ref={ ref } />
			{ children }
		</>
	)
})

export default ActiveContainer;
