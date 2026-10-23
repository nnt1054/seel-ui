import { createContext } from "react";
import type { PropsWithChildren, RefObject } from "react";

import { KeyCodes } from "@constants";
import { useInputManager } from "@hooks/useInputManager/useInputManager";
import type { Keybinds } from "@types";
import { getNavigationCommands } from "@utils";

export const KeybindsContext = createContext<Keybinds>({});

// todo: change to wasd or something before shipping
const keybinds = {
  "confirm": KeyCodes.ENTER,
  "cancel": KeyCodes.ESC,
  "up": KeyCodes.I,
  "down": KeyCodes.K,
  "left": KeyCodes.J,
  "right": KeyCodes.L,
  "navUp": KeyCodes.UP,
  "navDown": KeyCodes.DOWN,
  "navLeft": KeyCodes.LEFT,
  "navRight": KeyCodes.RIGHT,
  "cycleR": KeyCodes.TAB,
  "cycleL": [KeyCodes.SHIFT, KeyCodes.TAB],
};

interface InputProviderProps extends PropsWithChildren {
  inputRef: RefObject<HTMLElement | null>;
}

export const InputProvider = (props: InputProviderProps) => {
  const {
    inputRef,
    children,
  } = props;

  const commands = getNavigationCommands(inputRef);

  // todo: return keybinds from useInputManager
  useInputManager({
    commands,
    keybinds,
  });

  return (
    <KeybindsContext.Provider value={keybinds}>
      {children}
    </KeybindsContext.Provider>
  );
};

export default InputProvider;
