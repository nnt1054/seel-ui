import { useRef } from 'react';

import { withActiveNode } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode'
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const ActiveContainer = withActiveNode((props) => {
    const defaultEvents =  [
    	'up', 'down', 'left', 'right',
    	'cycleR', 'cycleL', 'confirm',
    ];
	const {
        ref = useRef(),
		node,
		initial,
		events = defaultEvents,
		...others
	} = props;

    const { childrenRef, activeNode } = useActiveNode();
    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode,
        events,
    })

	return (
		<div ref={ ref } { ...others }/>
	)
})

export default ActiveContainer;
