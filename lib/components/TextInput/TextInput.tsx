import type { InputHTMLAttributes, KeyboardEvent, RefObject } from "react";

import { KeyCodes } from "@constants";
import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import { withActiveNode } from "@providers/ActiveNodeProvider/ActiveNodeProvider";
import type { ActiveNodeProps } from "@types";

interface TextInputProps extends ActiveNodeProps, InputHTMLAttributes<HTMLInputElement> {
  onCancel?: () => void;
  onConfirm?: () => void;
  onCycleR?: () => void;
  onCycleL?: () => void;
}

export const TextInput = withActiveNode((props: TextInputProps) => {
  const {
    ref,
    node,
    onCancel = () => {},
    onConfirm = () => {},
    onCycleR = () => {},
    onCycleL = () => {},
    ...others
  } = props;

  const { hasFocus } = useActiveNode();

  // events while node has focus
  useEventListeners(ref, {
    confirm: () => {
      const hasKeyboardFocus = ref.current == document.activeElement;
      if (hasKeyboardFocus) {
        onConfirm();
      } else {
        ref.current?.focus();
      }
    },
    cancel: () => {
      const hasKeyboardFocus = ref.current == document.activeElement;
      if (hasKeyboardFocus) {
        ref.current?.blur();
      } else {
        onCancel();
      }
    },
    cycleR: () => {
      onCycleR();
    },
    cycleL: () => {
      onCycleL();
    },
  });

  // events while input has focus
  const onKeyDown = (event: KeyboardEvent) => {
    if (!ref.current) return;
    const input = ref.current as HTMLInputElement;

    if (event.keyCode == KeyCodes.ESC) {
      input.blur();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.keyCode == KeyCodes.ENTER) {
      onConfirm();
      input.blur();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.keyCode == KeyCodes.TAB) {
      if (event.shiftKey) {
        onCycleL();
      } else {
        onCycleR();
      }
      event.preventDefault();
    }
  };

  return (
    <input
      type="text"
      ref={ref as RefObject<HTMLInputElement>}
      onKeyDown={onKeyDown}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

export default TextInput;
