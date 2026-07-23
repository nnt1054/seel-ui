import { useRef } from 'react';

import { withActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNodeContainer } from '@hooks/useActiveNodeContainer/useActiveNodeContainer';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { KeyCodes } from '@constants';


export const RangeInput = withActiveNodeContainer((props) => {
	const {
		ref = useRef(),
		node,
		value,
		setValue = () => {},
		...others
	} = props;

	const {
		min = 0,
		max = 100,
		step = 1,
	} = others;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

    useEventListeners(ref, {
    	left: () => {
    		ref.current.valueAsNumber -= step;
			ref.current.dispatchEvent(new Event("change"));
    	},
    	right: () => {
    		ref.current.valueAsNumber += step;
			ref.current.dispatchEvent(new Event("change"));
    	},
    	change: (event) => {
    		const value = event.target.valueAsNumber;
    		setValue(value);
    	},
    })

	return (
		<input
			type="range"
			ref={ ref }
			{ ...others }
		/>
	)
})

export default RangeInput;
