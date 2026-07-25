import styled from 'styled-components';

import { Button } from '@components/Button/Button'; 


export const StyledButton = styled(Button)`
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;

  &[data-focused] {
    outline: 2px solid oklch(14.5% 0 0deg);
    outline-offset: -1px;
    background-color: yellow;

  }
`

export default StyledButton;
