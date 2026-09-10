import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { Modal } from './Modal';
import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { useDashedIdent } from '@hooks/useDashedIdent/useDashedIdent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';
import { Button } from '@components/Button/Button';
import { StyledModal, StyledModalListItem } from './examples/styled';
import { StyledActiveList, StyledActiveListItem } from '@components/ActiveList/examples/styled';
import { StyledTextInput } from '@components/TextInput/examples/styled';


export default {
  title: 'Navigation/Modal',
  component: Modal,
  args: {
    anchorName: '--anchor-name',
    isOpen: undefined,
    setIsOpen: undefined,
    events: ['left', 'right', 'up', 'down', 'confirm'],
		ref: undefined,
    node: 'modal',
		hasFocus: true,
    initial: 'default',
  },
  argTypes: {
    anchorName: {
      type: {
        name: 'string',
      },
      description: "Dashed ident string name to be set as the Modal's `position-anchor` style property."
    },
    isOpen: {
			type: 'boolean',
      description: "Value for whether or not the modal should be open and rendered.  Updating this prop will automatically show or hide the Modal's popover behavior appropriately.",
      control: false,
			table: {
				defaultValue: {
          summary: 'false',
          readonly: true,
				},
			},
		},
    setIsOpen: {
      type: 'function',
      description: "Function for setting the derived value of the `isOpen` prop.  Used for defining Modal's control functions exposed by the `ModalContext`.",
      control: false,
      table: {
        readonly: true,
      },
    },
    events: {
			type: 'array',
			description: 'List of event names to propagate through to the active child.',
			table: {
				defaultValue: {
					summary: `['up', 'down', 'left', 'right', 'cycleR', 'cycleL', 'confirm']`,
				},
			},
		},
		ref: {
			type: 'RefObject<>',
			table: {
				category: 'Node Props',
				readonly: true,
			},
		},
		node: {
			type: {
				name: 'string',
				required: true,
			},
			table: {
				category: 'Node Props',
				readonly: true,
			},
		},
		hasFocus: {
			type: 'boolean',
			description: "Controlled override for the node's `hasFocus` value.  Primarily used for setting focus value for the top level node.",
			table: {
				category: 'Node Props',
				defaultValue: {
					summary: 'null',
				},
			},
		},
		initial: {
			type: 'string',
			table: {
				category: 'Node Props',
				readonly: true,
			},
		},
  },
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const ref = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEventListeners(ref, {
      cancel: () => { setIsOpen(false) },
    });

    return (
      <InputProvider inputRef={ ref }>
        <StyledModal
          { ...props }
          isOpen={ isOpen }
          setIsOpen={ setIsOpen }
        >
            <StyledActiveList node={ props.initial }>
              {
                ...Array(5).fill(0).map((_, i) => {
                  return (
                    <StyledModalListItem key={ i } node={ i }> Item { i } </StyledModalListItem>
                  )
                })
              }
              <StyledTextInput key={ 5 } node={ 5 } />
            </StyledActiveList>
        </StyledModal>
        <Button
          ref={ ref }
          onClick={ toggle }
          style={{
            anchorName: props.anchorName,
          }}
        > toggle </Button>
      </InputProvider>
    )
  }
};


export const Default = {};
