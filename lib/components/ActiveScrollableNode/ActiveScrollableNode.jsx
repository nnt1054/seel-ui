import { useRef } from 'react';

import { withActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNodeContainer } from '@hooks/useActiveNodeContainer/useActiveNodeContainer';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode'
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { useActiveScrollableNode } from '@hooks/useActiveScrollableNode/useActiveScrollableNode';


export const ActiveScrollableNode = withActiveNodeContainer((props) => {
	const {
        ref = useRef(),
		node,
		adjacentNodes,
		initial,
		...others
	} = props;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });
	useActiveScrollableNode({
		ref,
		adjacentNodes,
		setActiveNode,
	})

	return (
		<div
			ref={ ref }
			data-focused={ hasFocus ? "" : null }
			{ ...others }
		/>
	)
})

export default ActiveScrollableNode;
