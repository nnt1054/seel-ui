import { useRef } from 'react';

import { withActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNodeContainer } from '@hooks/useActiveNodeContainer/useActiveNodeContainer';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode'
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const ActiveContainer = withActiveNodeContainer((props) => {
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

    const { childrenRef, activeNode, setHasFocus } = useActiveNodeContainer();
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
