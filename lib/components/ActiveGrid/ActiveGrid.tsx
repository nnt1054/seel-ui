import { Children } from "react";
import styled from "styled-components";
import type { RefObject } from "react";

import { useActiveGridIndex } from "@hooks/useActiveGridIndex/useActiveGridIndex";
import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import { usePropagateEvents } from "@hooks/usePropagateEvents/usePropagateEvents";
import { withActiveNode } from "@providers/ActiveNodeProvider/ActiveNodeProvider";
import type { ActiveNodeProps, AdjacentNodes } from "@types";

interface ActiveGridProps extends ActiveNodeProps {
  adjacentNodes?: AdjacentNodes;
  columns?: number;
  initialIndex?: number;
  maxIndex?: number;
}

interface ActiveGridItemProps extends ActiveNodeProps {
  onConfirm?: () => void;
}

type ActiveGridComponent = typeof ActiveGridRoot & {
  Item: typeof ActiveGridItem;
};

const StyledActiveGrid = styled.div<{ $columns: number }>`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.$columns}, 1fr)`};
`;

const ActiveGridRoot = withActiveNode((props: ActiveGridProps) => {
  const {
    ref,
    node,
    adjacentNodes = {},
    columns = 1,
    initialIndex = 0,
    maxIndex: _maxIndex,
    children,
    ...others
  } = props;

  const maxIndex = Number.isInteger(_maxIndex)
    ? _maxIndex
    : Children.count(children);

  const {
    moveFocus,
    grabFocus,
    childrenRef,
    activeNode: activeIndex,
    setActiveNode: setActiveIndex,
  } = useActiveNode();

  useActiveGridIndex({
    ref,
    activeIndex,
    setActiveIndex,
    columns,
    maxIndex,
    initialIndex,
    adjacentNodes,
    moveFocus,
  });

  usePropagateEvents({
    ref,
    childrenRef,
    activeNode: activeIndex,
    events: ["confirm"],
  });

  const onClick = () => {
    grabFocus();
  };

  return (
    <StyledActiveGrid
      ref={ref as RefObject<HTMLDivElement>}
      onClick={onClick}
      $columns={columns}
      data-orientation={"grid"}
      children={children}
      {...others}
    />
  );
});

export const ActiveGridItem = withActiveNode((props: ActiveGridItemProps) => {
  const {
    ref,
    node,
    onConfirm = () => {},
    ...others
  } = props;

  const { hasFocus, grabFocus } = useActiveNode();

  useEventListeners(ref, {
    confirm: onConfirm,
  });

  const onClick = () => {
    grabFocus();
    onConfirm();
  };

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      onClick={onClick}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

export const ActiveGrid = ActiveGridRoot as ActiveGridComponent;
ActiveGrid.Item = ActiveGridItem;
