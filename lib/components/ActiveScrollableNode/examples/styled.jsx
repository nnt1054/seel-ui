import styled from 'styled-components';

import { ActiveScrollableNode } from '@components/ActiveScrollableNode/ActiveScrollableNode';

export const StyledActiveScrollableNode = styled(ActiveScrollableNode)`
	width: 256px;
	height: 96px;
	overflow: auto;

	padding: 8px;
	border: 4px solid transparent;
	border-radius: 16px;

	&[data-focused] {
		border-color: #FFC067;
	}
`
