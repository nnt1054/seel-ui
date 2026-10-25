import { useEffect } from "react";

export type KeyboardCallback = (event: KeyboardEvent) => void;
type KeyPressedMap = {
  [keyCode: string | number]: boolean;
};

export const useKeyPress = (callback: KeyboardCallback) => {
  useEffect(() => {
    const keyPressed: KeyPressedMap = {};

    const downHandler = (event: KeyboardEvent) => {
      if (document.activeElement?.tagName == "INPUT") return;
      if (document.getSelection()?.type == "Range") return;
      if (document.activeElement instanceof HTMLElement) {
        if (document.activeElement?.isContentEditable) return;
      }

      if (!keyPressed[event.keyCode]) {
        keyPressed[event.keyCode] = true;
        event.preventDefault();
        callback && callback(event);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      keyPressed[event.keyCode] = false;
      event.preventDefault();
      callback && callback(event);
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });
};
