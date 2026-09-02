import { useRef } from 'react';

import { withActiveNode } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode'
import { usePropagateEvents } from '@hooks/usePropagateEvents/usePropagateEvents';


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

    const { hasFocus, childrenRef, activeNode } = useActiveNode();
    usePropagateEvents({
        ref,
        childrenRef,
        activeNode,
        events,
    })

	return (
		<div
			ref={ ref }
			data-focused={ hasFocus ? "" : null }
			{ ...others }
		/>
	)
})

export default ActiveContainer;
