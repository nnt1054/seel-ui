import { useRef, useEffect } from 'react';
import styled from 'styled-components';


const StyledDialog = styled.dialog`
	position-area: top;
`
export const Dialog = (props) => {
	const {
		ref,
		anchorName,
		children,
		...others
	} = props;

	return (
		<StyledDialog
			tabIndex="0"
			popover="manual"
			ref={ ref }
			style={{
				positionAnchor: anchorName,
			}}
			{ ...others }
		>
			{ children }
		</StyledDialog>
	)
}

export default Dialog;
