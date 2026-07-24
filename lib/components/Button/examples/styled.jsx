import styled from 'styled-components';

import { Button } from '@components/Button/Button'; 


export const StyledButton = styled(Button)`
  &[data-focused] {
    background-color: yellow;
  }
`

export default StyledButton;
