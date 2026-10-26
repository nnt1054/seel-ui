import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import styled from "styled-components";

import type { AdjacentNodes, Node } from "@types";
import { useActiveIndex } from "./useActiveIndex";

interface DemoProps {
  maxIndex: number;
  initialIndex: number;
  isColumn: boolean;
  isReverse: boolean;
  disableWrap: boolean;
  disableJump: boolean;
  adjacentNodes: AdjacentNodes;
  moveFocus: (activeNode: Node) => void;
  isActive: boolean;
}

const Demo = (props: DemoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isColumn, maxIndex } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  useActiveIndex({
    ...props,
    ref,
    activeIndex,
    setActiveIndex,
  });

  const emit = (name: string) => ref.current?.dispatchEvent(new Event(name));

  return (
    <div ref={ref}>
      <span>Active Index: {activeIndex}</span> <br />
      <button onClick={() => emit("left")}>Left</button>
      <button onClick={() => emit("right")}>Right</button>
      <button onClick={() => emit("up")}>Up</button>
      <button onClick={() => emit("down")}>Down</button>
      <br />
      <StyledList $isColumn={isColumn}>
        {Array(maxIndex).fill(0).map((_, i) => {
          const isActive = i == activeIndex;
          return <StyledListItem key={i} $isActive={isActive}>{i}</StyledListItem>;
        })}
      </StyledList>
    </div>
  );
};

const StyledList = styled.div<{ $isColumn: boolean }>`
  display: flex;
  flex-direction: ${props => props.$isColumn ? "column" : "row"};
`;

const StyledListItem = styled.span<{ $isActive: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 25px;
  text-align: center;
  vertical-align: middle;
  line-height: 32px;
  font-weight: ${props => props.$isActive ? "bold" : "normal"};
  color: ${props => props.$isActive ? "white" : "black"};
  background: ${props => props.$isActive ? "red" : "none"};
`;

const meta = {
  title: "Hooks/useActiveIndex",
  component: Demo,
  args: {
    ref: undefined,
    activeIndex: undefined,
    setActiveIndex: undefined,
    maxIndex: 0,
    initialIndex: 0,
    isColumn: false,
    isReverse: false,
    disableWrap: false,
    disableJump: false,
    adjacentNodes: {},
    moveFocus: () => {},
    isActive: true,
  },
  argTypes: {
    ref: {
      type: "RefObject<>",
      table: {
        readonly: true,
      },
    },
    activeIndex: {
      type: "number",
      table: { readonly: true },
    },
    setActiveIndex: {
      type: "function",
      table: { readonly: true },
    },
    maxIndex: {
      description: "The max integer number activeIndex will increment to (exclusive).",
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    initialIndex: {
      description:
        "Initial starting value for activeIndex. Changing the value of the initialIndex prop will automatically move focus to the node at the given index.",
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    isColumn: {
      type: "boolean",
      description:
        "Controls and swaps behavior of directional navigation events based on vertical or horizontal orientation.",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    isReverse: {
      type: "boolean",
      description:
        "Reverses the behavior of directional navigation events based on the visual order of item nodes (i.e. top to bottom vs bottom to top).",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    disableWrap: {
      type: "boolean",
      description:
        "When navigating beyond the min or max index, controls whether or not activeIndex will wrap around to the opposite end.  If an adjacent node exists in the current direction, moving focus to the adjacent node will take priority over wrapping.",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    disableJump: {
      type: "boolean",
      description:
        "When navigating perpendicular to the direction/orientation, controls whether or not activeIndex will move and jump to the min/max index.  If an adjacent node exists in the current direction, moving focus to the adjacent node will take priority over jumping.",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    adjacentNodes: {
      description:
        "Object denoting what nodes within the same parent, if any, are adjacent to the current node and in what direction.  See `useAdjacentNodes` hook for more information.",
      table: {
        defaultValue: {
          summary: `{}`,
        },
        readonly: true,
      },
    },
    moveFocus: {
      description:
        "Function to be called on a node name when responding to a directional navigation event.  This function is expected to be retrieved from the `useActiveNode` hook.",
      table: {
        defaultValue: {
          summary: "() => {}",
        },
      },
    },
    isActive: {
      type: "boolean",
      description: "Controls whether or not hook is actively listening for events.",
      table: {
        defaultValue: {
          summary: "true",
        },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof useActiveIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    initialIndex: 0,
    maxIndex: 8,
    isColumn: false,
    disableWrap: false,
  },
};

export const Column: Story = {
  args: {
    initialIndex: 0,
    maxIndex: 8,
    isColumn: true,
    disableWrap: false,
  },
};
