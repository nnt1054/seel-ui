import { useRef, useEffect, useState } from 'react';
import { FocusTrap } from 'focus-trap-react';

import {
	withActiveNodeContainer,
	useActiveNodeContainer,
} from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { Dialog } from '@components/Dialog/Dialog';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import {
  useDispatchActiveNodeEvent
} from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
// import { Backdrop } from '@components/Backdrop/Backdrop';


export const Modal = withActiveNodeContainer((props) => {
	const {
		ref,
		node,
		anchorName,
		isOpen,
		...others
	} = props;

	// todo: backdrop that (optionally) closes on click
    
	useEffect(() => {
		if (isOpen) {
			ref.current.showPopover();
			ref.current.focus();
		} else {
			ref.current.hidePopover();
		}
	}, [isOpen])
	
	const { hasFocus } = useActiveNode({ ref, node });
	const { childrenRef, activeNode } = useActiveNodeContainer();

	useDispatchActiveNodeEvent({
		ref,
		childrenRef,
		activeNode,
		events: ['up', 'down', 'left', 'right', 'confirm'],
	});

	return (
		<FocusTrap
			active={ isOpen }
			focusTrapOptions={{
				fallbackFocus: () => { return ref.current },
				allowOutsideClick: () => {
					ref.current.focus()
					return false
				},
				escapeDeactivates: false,
				tabbableOptions: {
					includeContainer: true,
				}
			}}
		>
			<Dialog
				ref={ ref }
				data-focused={ hasFocus ? "" : null }
				anchorName={ anchorName }
				{ ...others }
			/>
		</FocusTrap>
	)
})

export default Modal;
