import type { ChangeEvent, InputHTMLAttributes, RefObject } from "react";

import { useActiveNode } from "@hooks/useActiveNode";
import { useAdjacentNodes } from "@hooks/useAdjacentNodes";
import { useEventListeners } from "@hooks/useEventListeners";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import type { ActiveNodeProps, AdjacentNodes } from "@types";

export interface RangeInputProps extends ActiveNodeProps, InputHTMLAttributes<HTMLInputElement> {
  adjacentNodes?: AdjacentNodes;
  value: number;
  setValue?: (value: number) => void;
  step?: number;
}

export const RangeInput = withActiveNode((props: RangeInputProps) => {
  const {
    ref,
    node,
    adjacentNodes = {},
    value,
    setValue = () => {},
    step = 1,
    ...others
  } = props;

  const { hasFocus, moveFocus } = useActiveNode();

  useEventListeners(ref, {
    left: () => {
      if (!ref.current) return;
      const input = ref.current as HTMLInputElement;
      input.valueAsNumber -= step;
      input.dispatchEvent(new Event("change"));
    },
    right: () => {
      if (!ref.current) return;
      const input = ref.current as HTMLInputElement;
      input.valueAsNumber += step;
      input.dispatchEvent(new Event("change"));
    },
  });

  useAdjacentNodes({
    ref,
    adjacentNodes,
    moveFocus,
  });

  const onChange = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;
    setValue(value);
  };

  return (
    <input
      type="range"
      ref={ref as RefObject<HTMLInputElement>}
      data-focused={hasFocus ? "" : null}
      value={value}
      onChange={onChange}
      step={step}
      {...others}
    />
  );
});

export default RangeInput;
