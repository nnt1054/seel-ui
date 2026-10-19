import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import styled from "styled-components";

import { ActiveContainer } from "@components/ActiveContainer/ActiveContainer";
import { Button } from "@components/Button/Button";
import { includeInputProvider } from "@docs/decorators";

const meta = {
  title: "Navigation/ActiveContainer",
  component: ActiveContainer,
  decorators: [includeInputProvider],
  args: {
    events: ["left", "right", "confirm"],
    ref: undefined,
    node: "container",
    hasFocus: true,
    initial: "foo",
  },
  argTypes: {
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
} satisfies Meta<typeof ActiveContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <StyledContainer {...props}>
        <StyledButton
          node={"foo"}
          adjacentNodes={{ right: "bar" }}
          onClick={fn()}
        >
          foo
        </StyledButton>
        <StyledButton
          node={"bar"}
          adjacentNodes={{ left: "foo" }}
          onClick={fn()}
        >
          bar
        </StyledButton>
      </StyledContainer>
    );
  },
};

const StyledContainer = styled(ActiveContainer)`
	border: 2px solid black;

	&[data-focused] {
		border-color: #FFC067;
	}
`;

const StyledButton = styled(Button)`
	margin: 4px;

	&[data-focused] {
		border-color: #FFC067;
	}
`;
