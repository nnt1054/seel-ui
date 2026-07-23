import { useRef } from 'react';

import { withActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNodeContainer } from '@hooks/useActiveNodeContainer/useActiveNodeContainer';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { KeyCodes } from '@constants';


export const TextInput = withActiveNodeContainer((props) => {
	const {
		ref = useRef(),
		node,
		onCancel = () => {},
		onConfirm = () => {},
		onCycleR = () => {},
		onCycleL = () => {},
		...others
	} = props;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

    // events while node has focus
    useEventListeners(ref, {
    	confirm: () => { ref.current.focus(); },
    	close: () => { onCancel() },
    	cycleR: () => { onCycleR() },
    	cycleL: () => { onCycleL() },
    })

    // events while input has focus
	const onKeyDown = (event) => {
		if (event.keyCode == KeyCodes.ESC) {
			ref.current.blur();
			event.preventDefault();
			event.stopPropagation();
		} else if (event.keyCode == KeyCodes.ENTER) {
			onConfirm();
			ref.current.blur();
			event.preventDefault();
			event.stopPropagation();
		} else if (event.keyCode == KeyCodes.TAB) {
			if (event.shiftKey) {
				onCycleL();
			} else {
				onCycleR();
			}
			event.preventDefault();
		}
	}

	return (
		<input
			ref={ ref }
			onKeyDown={ onKeyDown }
			data-focused={ hasFocus ? "" : null }
			{ ...others }
		/>
	)
})

export default TextInput;
