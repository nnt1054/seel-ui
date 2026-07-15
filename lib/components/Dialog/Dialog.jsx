import { useRef, useEffect } from 'react';
import styled from 'styled-components';


const StyledDialog = styled.dialog`
	outline: none;
	appearance: none;
	min-width: 256px;
    border: none;
    border-radius: 12px;
    padding: 16px;

	${props => props.$anchored && `
		position: absolute;
		position-area: bottom;
		position-try-fallbacks: bottom, top;
	    margin: 8px;
	`}
`
export const Dialog = (props) => {
	const {
		ref,
		anchorName,
		children,
	} = props;

	return (
		<StyledDialog
			tabIndex="0"
			popover="manual"
			ref={ ref }
			style={{  positionAnchor: anchorName }}
			$anchored={ !!anchorName }
		>
			{ children }
		</StyledDialog>
	)
}

export default Dialog;
