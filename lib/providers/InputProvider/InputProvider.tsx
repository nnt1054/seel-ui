import { createContext } from "react";
import type { PropsWithChildren, RefObject } from "react";

import { DefaultEvents, DefaultKeybinds } from "@constants";
import { useInputManager } from "@hooks/useInputManager/useInputManager";
import type { Keybinds } from "@types";
import { getNavigationCommands } from "@utils";
import { DefaultEventsContext } from "./DefaultEventsContext";

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
    <DefaultEventsContext.Provider value={{ events: DefaultEvents }}>
      <KeybindsContext.Provider value={keybinds}>
        {children}
      </KeybindsContext.Provider>
    </DefaultEventsContext.Provider>
  );
};

export default InputProvider;
