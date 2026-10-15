import { useRef, useState } from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { useActiveGridIndex } from "./useActiveGridIndex";
import type { Node, AdjacentNodes } from "@types";


interface DemoProps {
  columns?: number;
  maxIndex?: number;
  adjacentNodes: AdjacentNodes;
  moveFocus?: (activeNode: Node) => void;
  isActive?: boolean;
}

const Demo = (props: DemoProps) => {
  const { columns, maxIndex } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useActiveGridIndex({
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
      <StyledGrid $columns={columns}>
        {Array(maxIndex).fill(0).map((_, i) => {
          const isActive = i == activeIndex;
          const style = {
            width: "32px",
            height: "32px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "white" : "black",
            background: isActive ? "red" : "none",
            borderRadius: "25px",
            textAlign: "center" as const,
            verticalAlign: "middle",
            lineHeight: "32px",
          };
          return <span key={i} style={style}>{i}</span>;
        })}
      </StyledGrid>
    </div>
  );
};

const meta = {
  title: "Hooks/useActiveGridIndex",
  component: Demo,
  args: {
    ref: undefined,
    activeIndex: undefined,
    setActiveIndex: undefined,
    columns: 1,
    maxIndex: 0,
    initialIndex: 0,
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
    columns: {
      description: "The number of columns in the grid.  Rows will be calculated based off number of columns and items.",
      table: {
        defaultValue: {
          summary: 0,
        },
      },
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
} satisfies Meta<typeof useActiveGridIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: 5,
    maxIndex: 23,
  },
};

interface StyledGridProps {
  $columns?: number;
}
const StyledGrid = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.$columns}, 1fr)`};
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;
