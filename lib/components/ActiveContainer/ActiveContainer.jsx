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


export const ActiveContainer = withActiveNodeContainer((props) => {
    const defaultEvents =  ['up', 'down', 'left', 'right', 'confirm'];
	const {
        ref = useRef(),
		node,
		initial,
		events = defaultEvents,
		hasFocus,
		setActiveNode,
		children,
	} = props;

    const { childrenRef, activeNode } = useActiveNodeContainer();
    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode,
        events,
    })

	return (
		<>
			<div ref={ ref } />
			{ children }
		</>
	)
})

export default ActiveContainer;
