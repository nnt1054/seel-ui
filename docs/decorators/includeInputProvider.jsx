import { useRef } from 'react';

import { InputProvider } from '@providers/InputProvider/InputProvider';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';


export const includeInputProvider = (Story, context) => {
  const { node, hasFocus } = context.args;
  const ref = useRef();
  return (
    <InputProvider inputRef={ ref }>
      <ActiveContainer ref={ ref } initial={ node } hasFocus={ hasFocus }>
        <Story />
      </ActiveContainer>
    </InputProvider>
  )
}

export default includeInputProvider;
