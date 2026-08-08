import { useContext } from 'react';
import styled from 'styled-components';

import { Modal, ModalContext } from '@components/Modal/Modal';
import { StyledActiveListItem } from '@components/ActiveList/examples/styled';


export const StyledModal = styled(Modal)`
	position-area: bottom;

	appearance: none;
	outline: none;

    color: white;

	padding: 8px;
    border:  2px solid transparent;
    border-radius: 12px;
    background-color: rgba(18, 18, 18, .6);
    backdrop-filter: blur(10px);

    flex-direction: column;
    align-items: center;
    justify-content: center;

    &[data-focused] {
	    border-color: #FFC067;
    }
`

export const StyledModalListItem = (props) => {
    const store = useContext(ModalContext);
    const callback = () => {
        const { closeModal } = store.getState();
        closeModal();
    }

    return (
        <StyledActiveListItem
            { ...props }
            callback={ callback }
        />
    )
}
