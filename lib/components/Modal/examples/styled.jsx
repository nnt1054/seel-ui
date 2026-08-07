import styled from 'styled-components';

import Modal from '@components/Modal/Modal';

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
