import styled from 'styled-components';

import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import { ActiveScrollableNode } from '@components/ActiveScrollableNode/ActiveScrollableNode';
import { ActiveList } from '@components/ActiveList/ActiveList';


export const StyledDiv = styled.div`
	width: 512px;
	height: 128px;
	padding: 8px;
	overflow: hidden;

	border: 4px solid transparent;
	border-radius: 16px;

	&:has(*[data-focused]) {
		border-color: #FFC067;
	}
`

export const StyledActiveScrollableNode = styled(ActiveScrollableNode)`
	height: 100%;
	overflow: auto;

	padding: 8px;

	scrollbar-width: thin;
	scrollbar-gutter: stable both-edges;

	/* width */
	&::-webkit-scrollbar {
	  width: 16px;
	  height: 8px;
	  margin-right: 4px;
	}

	/* Track */
	&::-webkit-scrollbar-track {
	  background: #f1f1f1;
	  border-radius: 8px;
	}

	/* Handle */
	&::-webkit-scrollbar-thumb {
	  background: #888;
	  border-radius: 8px;
	}

	/* Handle on hover */
	&::-webkit-scrollbar-thumb:hover {
	  background: #555;
	}

	&::-webkit-scrollbar-button {
		display: none;
	}
`

export const StyledActions = styled(ActiveList)`
	display: flex;
	flex-direction: row;

	padding: 8px;
	gap: 8px;
	align-items: center;
	justify-content: center;
`

export const StyledAction = styled(ActiveList.Item)`
    width: 128px;
    padding: 8px;
	border: 4px solid transparent;
    border-radius: 12px;
    user-select: none;
    font-family: sans-serif;
    font-size: 12pt;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, .1);
    	transition: background-color 0.1s;
    }

	&[data-focused] {
        font-weight: bold;
    	background-color: rgba(0, 0, 0, .3);
		border-color: #FFC067;
    	transition: background-color 0.1s;
	}
`

export const StyledActionAccept = styled(StyledAction)`
	background-color: #82DFA1;
    &:hover {
        background-color: oklch(from #82DFA1 calc(l * 0.9) c h);
    	transition: background-color 0.1s;
    }

	&[data-focused] {
        font-weight: bold;
        background-color: oklch(from #82DFA1 calc(l * 1.1) c h);
    	transition: background-color 0.1s;
	}
`

export const StyledActiveContainer = styled(ActiveContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const StyledHeader = styled.h2`
    font-family: sans-serif;
`
