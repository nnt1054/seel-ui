import { createContext } from "react";
import type { DialogHTMLAttributes } from "react";
import { createStore } from "zustand";
import type { StoreApi } from "zustand";

import type { ActiveNodeProps } from "@types";

export interface ModalState {
  closeModal: () => void;
}
export type ModalStore = StoreApi<ModalState>;

const emptyModalContext = createStore<ModalState>()(() => ({
  closeModal: () => {},
}));

export const ModalContext = createContext<ModalStore>(emptyModalContext);

export interface ModalProps extends ActiveNodeProps, DialogHTMLAttributes<HTMLDialogElement> {
  events: string[];
  anchorName?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const createModalContextStore = (props: ModalState) => {
  const {
    closeModal,
  } = props;

  return createStore<ModalState>()(() => ({
    closeModal,
  }));
};
