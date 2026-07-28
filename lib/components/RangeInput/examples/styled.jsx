import styled from 'styled-components';

import { RangeInput } from '@components/RangeInput/RangeInput'; 


export const StyledRangeInput = styled(RangeInput)`
	width: 256px;
	height: 12px;

	accent-color: #82DFA1;
	background-color: oklch(from white calc(l * 0.95) c h);

	border: 4px solid;
	border-radius: 12px;
	border-color: transparent;

	transition:
		background-color 0.2s,
		border 0.2s;

	&[data-focused] {
		border-color: #FFC067;
	}

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
	&:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
		padding: 4px 8px;
        border: solid 4px;
        border-radius: 16px;
		border-color: transparent;
        transition: border-color 0.2s;
    }

	&[data-focused]:before {
		border-color: #FFC067;
    }
`

export default StyledRangeInput;
