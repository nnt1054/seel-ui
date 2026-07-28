import styled from 'styled-components';

import { CheckboxInput } from '@components/CheckboxInput/CheckboxInput'; 


export const StyledCheckboxInput = styled(CheckboxInput)`
  	appearance: none;
	-webkit-appearance: none;

	width: 32px;
	height: 32px;

	border: 4px solid;
	border-color: black;
	border-radius: 4px;
	transform: translateY(-0.075em);
	background-color: oklch(from white calc(l * 0.98) c h);

	display: flex;
	justify-content: center;
	align-items: center;

	&:before {
		content: "";
		width: 16px;
		height: 16px;
		clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
		transform: scale(0);
		transform-origin: bottom left;
		transition: 120ms transform ease-in-out;
		box-shadow: inset 1em 1em #82DFA1;
	}

	&:checked::before {
		transform: scale(1);
	}

	transition:
		background-color 0.2s,
		border 0.2s;

	&:hover {
		background-color: white;
		border-color: oklch(from white calc(l * 0.95) c h);
	}

	&[data-focused] {
		border-color: #FFC067;
	}
`

export default StyledCheckboxInput;
