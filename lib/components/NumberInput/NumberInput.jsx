import { useRef } from 'react';

import {
	withActiveNodeContainer,
	useActiveNodeContainer,
} from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { KeyCodes } from '@constants';


export const NumberInput = withActiveNodeContainer((props) => {
	const {
		ref = useRef(),
		node,
		...others
	} = props;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

    // events while node has focus
    useEventListeners(ref, {
    	confirm: () => { ref.current.focus(); },
    	close: () => { ref.current.blur(); },
    	cycleR: () => { console.log('cycleR') },
    	cycleL: () => { console.log('cycleL') },
    })

    // events while input has focus
	const onKeyDown = (event) => {
		if (event.keyCode == KeyCodes.ESC) {
			ref.current.blur();
			event.preventDefault();
			event.stopPropagation();
		} else if (event.keyCode == KeyCodes.ENTER) {
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
			type="number"
			ref={ ref }
			onKeyDown={ onKeyDown }
			style={{
				border: '4px solid',
				borderRadius: '8px',
				borderColor: hasFocus ? 'blue' : 'black',
			}}
			{ ...others }
		/>
	)
})

export default NumberInput;
