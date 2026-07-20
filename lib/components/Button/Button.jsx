import { useRef } from 'react';

import {
	withActiveNodeContainer,
} from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const Button = withActiveNodeContainer((props) => {
	const {
		ref = useRef(),
		node,
		onClick = () => {},
		children,
		...others
	} = props;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });
	const callbacks = useEventListeners(ref, {
        confirm: () => {
			if (node) setActiveNode?.(node);
			onClick()
        },
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
