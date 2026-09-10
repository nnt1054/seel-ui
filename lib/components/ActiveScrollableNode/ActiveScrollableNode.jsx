import { useRef } from 'react';

import { withActiveNode } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode'
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { useActiveScrollableNode } from '@hooks/useActiveScrollableNode/useActiveScrollableNode';


export const ActiveScrollableNode = withActiveNode((props) => {
	const {
		ref,
		node,
		adjacentNodes,
		...others
	} = props;

	const { hasFocus, moveFocus, grabFocus } = useActiveNode();

	useActiveScrollableNode({
		ref,
		adjacentNodes,
		moveFocus,
	})

	const onClick = () => {
		grabFocus();
	}

	return (
		<div
			ref={ ref }
			onClick={ onClick }
			data-focused={ hasFocus ? "" : null }
			{ ...others }
		/>
	)
})

export default ActiveScrollableNode;
