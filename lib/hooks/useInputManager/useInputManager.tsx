import { useMemo } from "react";

import { DefaultGamepadMapping, DefaultKeybinds } from "@constants";
import { compareArrays, getKeyCombination } from "@utils";
import { useGamepad } from "./useGamepad";
import { useKeyPress } from "./useKeyPress";

interface GamepadKeybinds {
  [key: string]: number;
}

interface Command {
    execute?: () => void;
    ignoreModifiers?: boolean;
}

interface Commands {
  [name: string]: Command;
}

interface CustomGamepadEvent extends GamepadEvent {
  keyCode: number;
}

type OnBeforeKeyDown = (
  name: string,
  commands: Commands,
  event: KeyboardEvent,
) => void | boolean;

interface UseInputManagerProps {
  commands: any;
  keybinds: any;
  gamepadMapping: any;
  onBeforeKeyDown: OnBeforeKeyDown;
}

export const useInputManager = (props: UseInputManagerProps) => {
  const {
    commands = {},
    keybinds = DefaultKeybinds,
    gamepadMapping = DefaultGamepadMapping,
    onBeforeKeyDown = () => {},
  } = props;

  const getKeybinds = (event: KeyboardEvent, exactMatch = false) => {
    return Object.keys(keybinds).filter(name => {
      const command = commands[name];
      const keybind = keybinds[name];
      if (!command || !keybind) return;

      const keybindCombination = Number.isInteger(keybind) ? [keybind] : keybind;

      if (exactMatch) {
        if (command.ignoreModifiers) {
          return compareArrays(keybindCombination, [event.keyCode]);
        } else {
          const keyCombination = getKeyCombination(event);
          return compareArrays(keybindCombination, keyCombination);
        }
      } else {
        return keybindCombination.includes(event.keyCode);
      }
    });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const name = getKeybinds(event, true)[0];

    // todo: we need to be passing the event also; reorder/organize args here
    const stopPropagation = onBeforeKeyDown(name, commands, event);
    if (stopPropagation) return;

    if (!name) return;
    const command = commands[name];
    command?.execute?.();
  };

  const onKeyUp = (event: KeyboardEvent) => {
    const names = getKeybinds(event);
    for (const name of names) {
      const command = commands[name];
      command?.release?.();
    }
  };

  const { buttons } = gamepadMapping;
  const gamepadKeybinds = useMemo(() => {
    return {
      "gamepadA": buttons.A,
      "gamepadB": buttons.B,
      "gamepadX": buttons.X,
      "gamepadY": buttons.Y,
      "leftBumper": buttons.LB,
      "rightBumper": buttons.RB,
      "leftTrigger": buttons.LT,
      "rightTrigger": buttons.RT,
      "select": buttons.SELECT,
      "start": buttons.START,
      "dpadUp": buttons.UP,
      "dpadDown": buttons.DOWN,
      "dpadLeft": buttons.LEFT,
      "dpadRight": buttons.RIGHT,
      "up": buttons.LS_UP,
      "down": buttons.LS_DOWN,
      "left": buttons.LS_LEFT,
      "right": buttons.LS_RIGHT,
    } as GamepadKeybinds;
  }, [buttons]);

  const getGamepadKeybind = (event: CustomGamepadEvent) => {
    return Object.keys(gamepadKeybinds).find(
      command => gamepadKeybinds[command] === event.keyCode,
    );
  };

  useKeyPress((event: KeyboardEvent) => {
    if (event.type == "keydown") {
      onKeyDown(event);
    } else if (event.type == "keyup") {
      onKeyUp(event);
    }
  });

  useGamepad(gamepadMapping, (event: CustomGamepadEvent) => {
    const name = getGamepadKeybind(event);
    if (!name) return;

    const command = commands[name];
    if (!command) return;

    if (event.type == "buttondown") {
      command.execute?.();
    } else if (event.type == "buttonup") {
      command.release?.();
    }
  });
};

export default useInputManager;
