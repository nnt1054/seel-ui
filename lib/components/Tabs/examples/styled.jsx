import styled from 'styled-components';

import { Tabs } from '@components/Tabs/Tabs'; 


export const StyledTabs = styled(Tabs)`
	gap: 8px;

	color: black;
	font-family: sans-serif;
	font-size: 12pt;

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

	font-family: sans-serif;
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

export const StyledTab = styled(Tabs.Tab)`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 128px;
	padding: 8px;

	color: black;
	font-family: sans-serif;
	font-size: 12pt;
	font-weight: bold;

	border: 4px solid;
	border-color: transparent;
	border-radius: 12px;
	background-color: #F2F0EF;

	cursor: pointer;
	user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;

	transition:
		background-color 0.2s,
		transform 0.2s,
		border 0.2s;

	&:hover {
		background-color: oklch(from #F2F0EF calc(l * 0.75) c h);
		transform: scale(1.04);
	}

	&[data-focused] {
		border-color: #FFC067;
	}

	&[data-active-tab] {
		background-color: #82DFA1;
	}
`
