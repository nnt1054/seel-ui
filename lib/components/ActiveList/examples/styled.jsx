import styled from 'styled-components';

import { ActiveList } from '@components/ActiveList/ActiveList'; 


export const StyledActiveList = styled(ActiveList)`
	gap: 8px;
`

export const StyledActiveListItem = styled(ActiveList.Item)`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 128px;
	padding: 8px;

	color: white;
	font-family: sans-serif;
	font-size: 12pt;
	font-weight: bold;

	border: 4px solid;
	border-color: transparent;
	border-radius: 12px;
	background-color: #4E97FF;

	cursor: pointer;
	user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;

	transition:
		background-color 0.2s,
		transform 0.2s,
		border 0.2s;

	&:hover {
		background-color: oklch(from #4E97FF calc(l * 0.75) c h);
		transform: scale(1.04);
	}

	&[data-focused] {
		border-color: #FFC067;
	}
`
