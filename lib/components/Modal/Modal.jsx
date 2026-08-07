import { useRef, useEffect, useState } from 'react';
import { FocusTrap } from 'focus-trap-react';

import { withActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useActiveNodeContainer } from '@hooks/useActiveNodeContainer/useActiveNodeContainer';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import {
  useDispatchActiveNodeEvent
} from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';


export const Modal = withActiveNodeContainer((props) => {
	const {
		ref,
		node,
		anchorName,
		isOpen,
		setIsOpen,
		style = {},
		...others
	} = props;

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

	useEventListeners(ref, {
		close: () => { setIsOpen(false) },
	})

	useDispatchActiveNodeEvent({
		ref,
		childrenRef,
		activeNode,
		events: ['up', 'down', 'left', 'right', 'confirm'],
	});

	useEffect(() => {
		if (!isOpen) return;
		const interval = setInterval(() => {
			const activeElement = document.activeElement;
			if (!ref.current.contains(activeElement)) {
				ref.current.focus();
			}
		}, 100)
		return () => {
			clearInterval(interval);
		}
	}, [isOpen])

	return (
		<dialog
			tabIndex="0"
			popover="manual"
			ref={ ref }
			data-focused={ hasFocus ? "" : null }
			style={{
				positionAnchor: anchorName,
				...style,
			}}
			{ ...others }
		/>
	)
})

export default Modal;
