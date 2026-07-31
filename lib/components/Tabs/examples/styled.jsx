import styled from 'styled-components';

import { Tabs } from '@components/Tabs/Tabs'; 


export const StyledTabs = styled(Tabs)`
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

export const StyledCycleButtons = styled(Tabs.CycleButton)`
	padding: 8px;
	background-color: black;

	font-family: Comfortaa;
	font-size: 8pt;
	font-weight: bold;
	color: white;

	cursor: pointer;
	user-select: none;

    &[data-direction='left'] {
    	border-radius: 12px 4px 4px 4px;
    }

    &[data-direction='right'] {
    	border-radius: 4px 12px 4px 4px;
    }
`

export const StyledList = styled(Tabs.List)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`
