import styled from 'styled-components';


const StyledRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
`
export const Row = (props) => {
    return (
        <StyledRow { ...props } />
    )
}

export default Row;
