import styled from 'styled-components';

// todo: themeing stuff
const StyledColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
`
export const Column = (props) => {
    return (
        <StyledColumn { ... props} />
    )
}

export default Column;
