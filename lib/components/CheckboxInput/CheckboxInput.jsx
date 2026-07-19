import { useRef } from 'react';

import {
	withActiveNodeContainer,
	useActiveNodeContainer,
} from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { KeyCodes } from '@constants';


export const CheckboxInput = withActiveNodeContainer((props) => {
	const {
		ref = useRef(),
		node,
		value,
		setValue = () => {},
		...others
	} = props;

    const { hasFocus, setActiveNode } = useActiveNode({ ref, node });

    useEventListeners(ref, {
    	confirm: () => {
    		ref.current.checked = !ref.current.checked;
			ref.current.dispatchEvent(new Event("change"));
    	},
    	change: (event) => {
    		const checked = event.target.checked;
    		setValue(checked);
    	},
    })

	return (
		<input
			type="checkbox"
			ref={ ref }
			{ ...others }
		/>
	)
})

export default CheckboxInput;
