import { useRef } from 'react';

import {
	withActiveNodeContainer,
	useActiveNodeContainer,
} from '@providers/ActiveNodeProvider/ActiveNodeProvider';


export const ActiveContainer = withActiveNodeContainer((props) => {
    const defaultEvents =  ['up', 'down', 'left', 'right', 'confirm'];
	const {
        ref = useRef(),
		node,
		initial,
		events = defaultEvents,
		children,
	} = props;

    const { hasFocus = false } = useActiveNode({ ref, node });
    const { mapRef, activeNode } = useActiveNodeContainer();
    useDispatchActiveNodeEvent({
        ref,
        mapRef,
        activeNode,
        events,
    })

    // todo: ???
	return (
		<>
			<div ref={ ref } />
			{ children }
		</>
	)
})

export default ActiveContainer;
