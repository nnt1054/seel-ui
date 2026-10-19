import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";

import { StyledActiveList } from "@components/ActiveList/examples/styled";
import { Button } from "@components/Button/Button";
import { StyledTextInput } from "@components/TextInput/examples/styled";
import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import { InputProvider } from "@providers/InputProvider/InputProvider";
import { StyledModal, StyledModalListItem } from "./examples/styled";
import { Modal } from "./Modal";

const meta = {
  title: "Navigation/Modal",
  component: Modal,
  args: {
    anchorName: "--anchor-name",
    isOpen: undefined,
    setIsOpen: undefined,
    events: ["left", "right", "up", "down", "confirm"],
    ref: undefined,
    node: "modal",
    hasFocus: true,
    initial: "default",
  },
  argTypes: {
    anchorName: {
      type: {
        name: "string",
      },
      description: "Dashed ident string name to be set as the Modal's `position-anchor` style property.",
    },
    isOpen: {
      type: "boolean",
      description:
        "Value for whether or not the modal should be open and rendered.  Updating this prop will automatically show or hide the Modal's popover behavior appropriately.",
      control: false,
      table: {
        readonly: true,
        defaultValue: {
          summary: "false",
        },
      },
    },
    setIsOpen: {
      type: "function",
      description:
        "Function for setting the derived value of the `isOpen` prop.  Used for defining Modal's control functions exposed by the `ModalContext`.",
      control: false,
      table: {
        readonly: true,
      },
    },
    events: {
      description: "List of event names to propagate through to the active child.",
      table: {
        defaultValue: {
          summary: `['up', 'down', 'left', 'right', 'cycleR', 'cycleL', 'confirm']`,
        },
      },
    },
    ref: {
      table: {
        category: "Node Props",
        readonly: true,
      },
    },
    node: {
      type: {
        name: "string",
        required: true,
      },
      table: {
        category: "Node Props",
        readonly: true,
      },
    },
    hasFocus: {
      type: "boolean",
      description:
        "Controlled override for the node's `hasFocus` value.  Primarily used for setting focus value for the top level node.",
      table: {
        category: "Node Props",
        defaultValue: {
          summary: "null",
        },
      },
    },
    initial: {
      type: "string",
      table: {
        category: "Node Props",
        readonly: true,
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  render: (props) => {
    const ref = useRef<HTMLButtonElement | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEventListeners(ref, {
      cancel: () => {
        setIsOpen(false);
      },
    });

    return (
      <InputProvider inputRef={ref}>
        <StyledModal
          {...props}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <StyledActiveList node={props.initial}>
            {...Array(5).fill(0).map((_, i) => {
              return <StyledModalListItem key={i} node={i}>Item {i}</StyledModalListItem>;
            })}
            <StyledTextInput key={5} node={5} />
          </StyledActiveList>
        </StyledModal>
        <Button
          ref={ref}
          onClick={toggle}
          style={{
            anchorName: props.anchorName,
          }}
        >
          toggle
        </Button>
      </InputProvider>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
