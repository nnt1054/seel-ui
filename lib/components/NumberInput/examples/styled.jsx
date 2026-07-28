import styled from 'styled-components';

import { NumberInput } from '@components/NumberInput/NumberInput'; 


export const StyledNumberInput = styled(NumberInput)`
	width: 64px;
	padding: 8px;

	color: black;
	font-size: 12pt;

	border: 4px solid;
	border-color: black;
	border-radius: 12px;
	background-color: oklch(from white calc(l * 0.98) c h);

	outline: none;
	user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;

	transition:
		background-color 0.2s,
		border 0.2s;

	&:hover {
		background-color: white;
		border-color: oklch(from white calc(l * 0.95) c h);
	}

	&:focus {
		background-color: white;
	}

	&[data-focused] {
		border-color: #FFC067;
	}
`

export default StyledNumberInput;
