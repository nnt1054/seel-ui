import { DefaultGamepadKeybinds, DefaultKeybinds, StandardGamepadMapping } from "@constants";
import { compareArrays, getKeyCombination } from "@utils";
import { useGamepad } from "./useGamepad";
import { useKeyPress } from "./useKeyPress";
import type {
  Commands, GamepadButtonEvent, GamepadKeybinds,
  GamepadMapping, Keybinds, KeybindCombination,
} from "@types"

type OnBeforeKeyDown = (
  name: string,
  commands: Commands,
  event: KeyboardEvent,
) => void | boolean;

interface UseInputManagerProps {
  commands: Commands;
  keybinds: Keybinds;
  gamepadKeybinds: GamepadKeybinds;
  gamepadMapping: GamepadMapping;
  onBeforeKeyDown: OnBeforeKeyDown;
}

export const useInputManager = (props: UseInputManagerProps) => {
  const {
    commands = {},
    keybinds = DefaultKeybinds as Keybinds,
    gamepadKeybinds = DefaultGamepadKeybinds as GamepadKeybinds,
    gamepadMapping = StandardGamepadMapping,
    onBeforeKeyDown = () => {},
  } = props;

  const getKeybinds = (event: KeyboardEvent, exactMatch = false) => {
    return Object.keys(keybinds).filter(name => {
      const command = commands[name];
      const keybind = keybinds[name];
      if (!command || !keybind) return;

      const keybindCombination = Number.isInteger(keybind) ? [keybind] : keybind as KeybindCombination;

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

  const getGamepadKeybind = (event: GamepadButtonEvent) => {
    return Object.keys(gamepadKeybinds).find(
      command => gamepadKeybinds[command] === event.gamepadCode,
    );
  };

  useKeyPress((event: KeyboardEvent) => {
    if (event.type == "keydown") {
      onKeyDown(event);
    } else if (event.type == "keyup") {
      onKeyUp(event);
    }
  });

  useGamepad((event: GamepadButtonEvent) => {
    const name = getGamepadKeybind(event);
    if (!name) return;

    const command = commands[name];
    if (!command) return;

    if (event.type == "buttondown") {
      command.execute?.();
    } else if (event.type == "buttonup") {
      command.release?.();
    }
  }, gamepadMapping);
};

export default useInputManager;
