import type { RefObject } from "react";

import { KeyCodes } from "@constants";
import type { AdjacentNode, Node } from "@types";

export const compareArrays = (a: any[], b: any[]): boolean => {
  return a.toString() === b.toString();
};

export const getKeyCombination = (event: KeyboardEvent): number[] => {
  const keyCode = event.keyCode;
  if (event.shiftKey) {
    return [KeyCodes.SHIFT, keyCode];
  } else if (event.ctrlKey) {
    return [KeyCodes.CTRL, keyCode];
  } else if (event.altKey) {
    return [KeyCodes.ALT, keyCode];
  } else {
    return [keyCode];
  }
};

export const inputInFocus = (): boolean => {
  let isContentEditable = false;
  if (document.activeElement instanceof HTMLElement) {
    isContentEditable = document.activeElement?.isContentEditable;
  }

  return (
    document.activeElement?.tagName == "DIALOG"
    || document.activeElement?.tagName == "INPUT"
    || document.getSelection()?.type == "Range"
    || isContentEditable
  );
};

export const getNavigationCommands = (ref: RefObject<HTMLElement | null>) => {
  const handleEvent = (event: string) => {
    return () => {
      if (inputInFocus()) {
        const input = document.activeElement;
        if (input) input.dispatchEvent(new Event(event));
      } else {
        const element = ref?.current;
        if (element) element.dispatchEvent(new Event(event));
      }
    };
  };

  const commands = {
    "left": {
      execute: handleEvent("left"),
      ignoreModifiers: true,
    },
    "right": {
      execute: handleEvent("right"),
      ignoreModifiers: true,
    },
    "up": {
      execute: handleEvent("up"),
      ignoreModifiers: true,
    },
    "down": {
      execute: handleEvent("down"),
      ignoreModifiers: true,
    },
    "navLeft": {
      execute: handleEvent("left"),
    },
    "navRight": {
      execute: handleEvent("right"),
    },
    "navUp": {
      execute: handleEvent("up"),
    },
    "navDown": {
      execute: handleEvent("down"),
    },
    "confirm": {
      execute: handleEvent("confirm"),
      ignoreModifiers: true,
    },
    "cancel": {
      execute: handleEvent("cancel"),
      ignoreModifiers: true,
    },
    "cycleR": {
      execute: handleEvent("cycleR"),
    },
    "cycleL": {
      execute: handleEvent("cycleL"),
    },
    "start": {
      // todo: ponder on the implications of this
      execute: handleEvent("confirm"),
    },
    "select": {
      // todo: ponder on the implications of this
      execute: handleEvent("cancel"),
    },
    "gamepadA": {
      execute: handleEvent("confirm"),
    },
    "gamepadB": {
      execute: handleEvent("cancel"),
    },
    "dpadUp": {
      execute: handleEvent("up"),
    },
    "dpadDown": {
      execute: handleEvent("down"),
    },
    "dpadLeft": {
      execute: handleEvent("left"),
    },
    "dpadRight": {
      execute: handleEvent("right"),
    },
    "rightBumper": {
      execute: handleEvent("cycleR"),
    },
    "leftBumper": {
      execute: handleEvent("cycleL"),
    },
    "leftStickUp": {
      execute: handleEvent("up"),
    },
    "leftStickDown": {
      execute: handleEvent("down"),
    },
    "leftStickLeft": {
      execute: handleEvent("left"),
    },
    "leftStickRight": {
      execute: handleEvent("right"),
    },
  };

  return commands;
};

export const handleAdjacentNode = (
  adjacentNode: AdjacentNode,
  callback: (activeNode: Node) => void,
) => {
  if (typeof adjacentNode == "function") {
    adjacentNode();
  } else if (typeof adjacentNode == "string") {
    callback(adjacentNode);
  }
};
