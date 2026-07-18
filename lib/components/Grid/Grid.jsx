import styled from 'styled-components';


const StyledGrid = styled.div`
	display: grid;
    grid-template-columns: ${props => `repeat(${props.$columns}, 1fr)`};
	justify-content: space-between;
	align-items: center;
	gap: 8px;
`
export const Grid = (props) => {
	const {
		columns,
		...others
	} = props;

    return (
        <StyledGrid $columns={ columns } { ...others } />
    )
}

export default Grid;
