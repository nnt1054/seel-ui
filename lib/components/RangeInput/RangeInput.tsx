import type { ChangeEvent, InputHTMLAttributes, RefObject } from "react";

import { useActiveNode } from "@hooks/useActiveNode";
import { useEventListeners } from "@hooks/useEventListeners";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import type { ActiveNodeProps } from "@types";

interface RangeInputProps extends ActiveNodeProps, InputHTMLAttributes<HTMLInputElement> {
  value: number;
  setValue?: (value: number) => void;
  step?: number;
}

export const RangeInput = withActiveNode((props: RangeInputProps) => {
  const {
    ref,
    node,
    value,
    setValue = () => {},
    step = 1,
    ...others
  } = props;

  const { hasFocus } = useActiveNode();

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
