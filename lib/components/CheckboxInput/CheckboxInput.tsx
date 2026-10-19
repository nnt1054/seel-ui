import type { ChangeEvent, RefObject } from "react";

import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { useAdjacentNodes } from "@hooks/useAdjacentNodes/useAdjacentNodes";
import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import { withActiveNode } from "@providers/ActiveNodeProvider/ActiveNodeProvider";
import type { ActiveNodeProps, AdjacentNodes } from "@types";

interface CheckboxInputProps extends ActiveNodeProps {
  adjacentNodes?: AdjacentNodes;
  value: boolean;
  setValue?: (value: boolean) => void;
}

export const CheckboxInput = withActiveNode((props: CheckboxInputProps) => {
  const {
    ref,
    node,
    adjacentNodes = {},
    value,
    setValue = () => {},
    ...others
  } = props;

  const { hasFocus, moveFocus } = useActiveNode();

  useEventListeners(ref, {
    confirm: () => {
      if (!ref.current) return;
      const input = ref.current as HTMLInputElement;
      input.checked = !input.checked;
      input.dispatchEvent(new Event("change"));
    },
  });

  useAdjacentNodes({
    ref,
    adjacentNodes,
    moveFocus,
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setValue(checked);
  };

  return (
    <input
      type="checkbox"
      ref={ref as RefObject<HTMLInputElement>}
      data-focused={hasFocus ? "" : null}
      checked={!!value}
      onChange={onChange}
      {...others}
    />
  );
});

export default CheckboxInput;
