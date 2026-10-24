import { createContext, useEffect, useState } from "react";
import type { DialogHTMLAttributes, RefObject } from "react";
import { createStore } from "zustand";
import type { StoreApi } from "zustand";

import { useActiveNode } from "@hooks/useActiveNode";
import { useEventListeners } from "@hooks/useEventListeners";
import { usePropagateEvents } from "@hooks/usePropagateEvents";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import type { ActiveNodeProps } from "@types";

const defaultEvents = [
  "up",
  "down",
  "left",
  "right",
  "cycleR",
  "cycleL",
  "confirm",
];

export interface ModalState {
  closeModal: () => void;
}
export type ModalStore = StoreApi<ModalState>;

export const ModalContext = createContext<ModalStore | null>(null);

export interface ModalProps extends ActiveNodeProps, DialogHTMLAttributes<HTMLDialogElement> {
  events: string[];
  anchorName?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const createModalContextStore = (props: ModalState) => {
  const {
    closeModal,
  } = props;

  return createStore<ModalState>()(() => ({
    closeModal,
  }));
};

export const Modal = withActiveNode((props: ModalProps) => {
  const {
    ref,
    node,
    events = defaultEvents,
    anchorName,
    isOpen = false,
    setIsOpen = () => {},
    style = {},
    ...others
  } = props;

  const closeModal = () => {
    setIsOpen(false);
  };
  const [store] = useState(() => createModalContextStore({ closeModal }));

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      ref.current.showPopover();
      ref.current.focus();
    } else {
      ref.current.hidePopover();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const dialog = ref.current;
      const activeElement = document.activeElement;
      if (dialog && !dialog.contains(activeElement)) {
        dialog.focus();
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [isOpen]);

  const { hasFocus, childrenRef, activeNode } = useActiveNode();

  usePropagateEvents({
    ref,
    childrenRef,
    activeNode,
    events,
  });

  useEventListeners(ref, {
    cancel: () => {
      setIsOpen(false);
    },
  });

  return (
    <ModalContext.Provider value={store}>
      <dialog
        tabIndex={0}
        popover="manual"
        ref={ref as RefObject<HTMLDialogElement>}
        data-focused={hasFocus ? "" : null}
        style={{
          positionAnchor: anchorName,
          ...style,
        }}
        {...others}
      />
    </ModalContext.Provider>
  );
}, true);

export default Modal;
