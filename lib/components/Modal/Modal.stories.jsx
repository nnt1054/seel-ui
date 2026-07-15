import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { Modal } from './Modal';
import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { useDashedIdent } from '@hooks/useDashedIdent/useDashedIdent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export default {
  title: 'Layout/Modal',
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
        <Modal
          ref={ ref }
          initial={ initial }
          anchorName={ anchorName }
          isOpen={ isOpen }
        >
            <ActiveList node={ initial }>
              {
                Array(5).fill(0).map((_, i) => {
                  return (
                    <ActiveListItem key={ i } node={ i } />
                  )
                })
              }
            </ActiveList>
        </Modal>
        <button onClick={ toggle } style={{ anchorName, }}> toggle </button>
      </InputProvider>
    )
  }
};


export const Default = {};
