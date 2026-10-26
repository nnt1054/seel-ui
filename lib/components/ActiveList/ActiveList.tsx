import { Children } from "react";
import type { RefObject } from "react";
import styled from "styled-components";

import { useActiveIndex } from "@hooks/useActiveIndex";
import { useActiveNode } from "@hooks/useActiveNode";
import { useEventListeners } from "@hooks/useEventListeners";
import { usePropagateEvents } from "@hooks/usePropagateEvents";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import type { ActiveNodeProps, AdjacentNodes, Orientation } from "@types";

export interface ActiveListProps extends ActiveNodeProps {
  adjacentNodes?: AdjacentNodes;
  maxIndex?: number;
  initialIndex?: number;
  orientation?: Orientation;
  isReverse?: boolean;
  disableWrap?: boolean;
  disableJump?: boolean;
}

export interface ActiveListItemProps extends ActiveNodeProps {
  onConfirm?: () => void;
}

type ActiveListComponent = typeof ActiveListRoot & {
  Item: typeof ActiveListItem;
};

const StyledActiveList = styled.div`
    display: flex;

    &[data-orientation='horizontal'] {
        flex-direction: row;
    }

    &[data-orientation='vertical'] {
        flex-direction: column;
    }

    &[data-orientation='horizontal'][data-reversed] {
        flex-direction: row-reverse;
    }

    &[data-orientation='vertical'][data-reversed] {
        flex-direction: column-reverse;
    }
`;

const ActiveListRoot = withActiveNode((props: ActiveListProps) => {
  const {
    ref,
    node,
    adjacentNodes = {},
    maxIndex: _maxIndex,
    initialIndex = 0,
    orientation = "vertical",
    isReverse = false,
    disableWrap = false,
    disableJump = false,
    ...others
  } = props;

  const maxIndex = Number.isInteger(_maxIndex)
    ? _maxIndex
    : Children.count(props.children);

  const isColumn = orientation == "vertical";

  const {
    hasFocus,
    moveFocus,
    grabFocus,
    childrenRef,
    activeNode: activeIndex,
    setActiveNode: setActiveIndex,
  } = useActiveNode();

  useActiveIndex({
    ref,
    activeIndex,
    setActiveIndex,
    maxIndex,
    initialIndex,
    isColumn,
    isReverse,
    disableWrap,
    disableJump,
    adjacentNodes,
    moveFocus,
  });

  const events = ["confirm", "cancel"];

  if (disableJump) {
    if (isColumn) {
      events.push("left", "right");
    } else {
      events.push("up", "down");
    }
  }

  usePropagateEvents({
    ref,
    childrenRef,
    activeNode: activeIndex,
    events,
  });

  const onClick = () => {
    grabFocus();
  };

  return (
    <StyledActiveList
      ref={ref as RefObject<HTMLDivElement>}
      onClick={onClick}
      data-focused={hasFocus ? "" : null}
      data-orientation={isColumn ? "vertical" : "horizontal"}
      data-reversed={isReverse ? "" : null}
      {...others}
    />
  );
});

export const ActiveListItem = withActiveNode((props: ActiveListItemProps) => {
  const {
    ref,
    node,
    onConfirm = () => {},
    ...others
  } = props;

  const { hasFocus, grabFocus } = useActiveNode();

  useEventListeners(ref, {
    confirm: () => {
      onConfirm();
    },
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

export const ActiveList = ActiveListRoot as ActiveListComponent;
ActiveList.Item = ActiveListItem;
