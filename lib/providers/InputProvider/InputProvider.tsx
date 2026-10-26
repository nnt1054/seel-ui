import { createContext } from "react";
import type { PropsWithChildren, RefObject } from "react";

import { DefaultKeybinds } from "@constants";
import { useInputManager } from "@hooks/useInputManager/useInputManager";
import type { Keybinds } from "@types";
import { getNavigationCommands } from "@utils";

export const KeybindsContext = createContext<Keybinds>({});

export interface InputProviderProps extends PropsWithChildren {
  inputRef: RefObject<HTMLElement | null>;
}

export const InputProvider = (props: InputProviderProps) => {
  const {
    inputRef,
    children,
  } = props;

  const commands = getNavigationCommands(inputRef);
  const keybinds = DefaultKeybinds;

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
