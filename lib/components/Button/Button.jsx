import { useRef } from 'react';

import {
	withActiveNode,
} from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useAdjacentNodes } from '@hooks/useAdjacentNodes/useAdjacentNodes';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';

export const Button = withActiveNode((props) => {
	const {
		ref = useRef(),
		node,
		adjacentNodes = {},
		onClick = () => {},
		children,
		...others
	} = props;

    const { hasFocus, grabFocus, moveFocus } = useActiveNode();
	const callbacks = useEventListeners(ref, {
        confirm: () => {
        	grabFocus()
			onClick()
        },

		// prevent focus on click
        mousedown: (event) => { event.preventDefault() },
    })

	useAdjacentNodes({
		ref,
		adjacentNodes,
		moveFocus,
	})


	return (
		<button
			ref={ ref }
			onClick={ callbacks.confirm }
			data-focused={ hasFocus ? "" : null }
			{ ...others }
		>
			{ children }
		</button>
	)
})

export default Button;
