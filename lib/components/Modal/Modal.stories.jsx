import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { Modal } from './Modal';
import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { useDashedIdent } from '@hooks/useDashedIdent/useDashedIdent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { Button } from '@components/Button/Button';
import { StyledModal } from './examples/styled';
import { StyledActiveList, StyledActiveListItem } from '@components/ActiveList/examples/styled';
import { StyledTextInput } from '@components/TextInput/examples/styled';


export default {
  title: 'Navigation/Modal',
  component: Modal,
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const ref = useRef();
    const anchorName = useDashedIdent();
    const initial = 'default';

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    useEventListeners(ref, {
      close: () => { setIsOpen(false) },
    });

    return (
      <InputProvider inputRef={ ref }>
        <StyledModal
          // node={ 'node' }
          initial={ initial }
          hasFocus={ true }
          anchorName={ anchorName }
          isOpen={ isOpen }
          setIsOpen={ setIsOpen }
        >
            <StyledActiveList node={ initial }>
              {
                ...Array(5).fill(0).map((_, i) => {
                  return (
                    <StyledActiveListItem key={ i } node={ i }> Item { i } </StyledActiveListItem>
                  )
                })
              }
              <StyledTextInput key={ 5 } node={ 5 } />
            </StyledActiveList>
        </StyledModal>
        <Button ref={ ref } onClick={ toggle } style={{ anchorName, }}> toggle </Button>
      </InputProvider>
    )
  }
};


export const Default = {};
