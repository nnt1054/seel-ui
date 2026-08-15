import { useRef } from 'react';

import { withActiveNode } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode'
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { useActiveScrollableNode } from '@hooks/useActiveScrollableNode/useActiveScrollableNode';


export const ActiveScrollableNode = withActiveNode((props) => {
	const {
        ref = useRef(),
		node,
		adjacentNodes,
		initial,
		...others
	} = props;

    const { hasFocus, moveFocus } = useActiveNode();
	useActiveScrollableNode({
		ref,
		adjacentNodes,
		moveFocus,
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
