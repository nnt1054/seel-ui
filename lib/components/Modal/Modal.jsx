import { useRef, useEffect, useState, createContext } from 'react';
import { createStore, useStore } from 'zustand';

import { withActiveNodeContainer } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useActiveNodeContainer } from '@hooks/useActiveNodeContainer/useActiveNodeContainer';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import {
  useDispatchActiveNodeEvent
} from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';


export const ModalContext = createContext(null);

const createModalContextStore = ({ closeModal }) => {
    return createStore()((set) => ({
        closeModal,
    }))
}

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

	const closeModal = () => { setIsOpen(false) };
	const [store] = useState(() => createModalContextStore({ closeModal, }));

	useEffect(() => {
		if (isOpen) {
			ref.current.showPopover();
			ref.current.focus();
		} else {
			ref.current.hidePopover();
		}
	}, [isOpen])

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

	const { hasFocus } = useActiveNode({ ref, node });
	const { childrenRef, activeNode } = useActiveNodeContainer();

	useDispatchActiveNodeEvent({
		ref,
		childrenRef,
		activeNode,
		events: ['up', 'down', 'left', 'right', 'confirm'],
	});

	return (
		<ModalContext.Provider value={ store }>
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
		</ModalContext.Provider>
	)
})

export default Modal;
