import { useRef, useEffect, useState, createContext } from 'react';
import { createStore, useStore } from 'zustand';

import { withActiveNode } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { usePropagateEvents } from '@hooks/usePropagateEvents/usePropagateEvents';


const defaultEvents =  [
	'up', 'down', 'left', 'right',
	'cycleR', 'cycleL', 'confirm',
];

export const ModalContext = createContext(null);

const createModalContextStore = ({ closeModal }) => {
    return createStore()((set) => ({
        closeModal,
    }))
}

export const Modal = withActiveNode((props) => {
	const {
		ref,
		node,
    	events = defaultEvents,
		anchorName,
		isOpen = false,
		setIsOpen = () => {},
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

	const { hasFocus, childrenRef, activeNode } = useActiveNode();

	usePropagateEvents({
		ref,
		childrenRef,
		activeNode,
    events,
	});

  useEventListeners(ref, {
    cancel: () => { setIsOpen(false) },
  })

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
}, true)

export default Modal;
