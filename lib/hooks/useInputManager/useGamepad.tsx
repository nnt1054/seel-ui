import { useEffect } from "react";

import type { GamepadButtonEvent, GamepadMapping } from "@types"

const DEADZONE = 0.3;

export type GamepadButtonCallback = (event: GamepadButtonEvent) => void;
type ButtonPressedMap = {
  [gamepadCode: string | number]: boolean;
};

export const useGamepad = (callback: GamepadButtonCallback, mapping: GamepadMapping) => {
  const { buttons, axes } = mapping;

  useEffect(() => {
    let frame: number;
    const buttonStates: ButtonPressedMap = {};
    const axisButtonStates: ButtonPressedMap = {};

    const update = () => {
      for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;

        const updatedButtonState = { ...buttonStates };

        for (const [buttonIndex, button] of gamepad.buttons.entries()) {
          const pressed = button.pressed || button.value > 0;
          const buttonState = (buttonIndex in buttonStates) ? buttonStates[buttonIndex] : pressed;

          if (pressed != buttonState) {
            const type = pressed ? "buttondown" : "buttonup";
            const gamepadCode = buttons[buttonIndex];
            const gamepadEvent = {
              type,
              gamepadCode,
              buttonIndex,
              value: button.value,
            };
            callback(gamepadEvent);
          }

          updatedButtonState[buttonIndex] = pressed;
        }

        Object.assign(buttonStates, updatedButtonState);

        const updatedAxisButtonStates = { ...axisButtonStates };

        for (const [axisIndex, value] of gamepad.axes.entries()) {
          const axisMap = axes[axisIndex];
          if (!axisMap) continue;

          const [neg, pos] = axisMap;
          const state = {
            [pos]: value > DEADZONE,
            [neg]: value < -DEADZONE,
          };

          for (const gamepadCode of [pos, neg]) {
            const pressed = state[gamepadCode];
            const buttonState = (gamepadCode in axisButtonStates) ? axisButtonStates[gamepadCode] : pressed;

            if (pressed != buttonState) {
              const type = pressed ? "buttondown" : "buttonup";
              const gamepadEvent = {
                type,
                gamepadCode,
                axisIndex,
                value,
              };
              callback(gamepadEvent);
            }
          }

          Object.assign(updatedAxisButtonStates, state);
        }

        Object.assign(axisButtonStates, updatedAxisButtonStates);
      }

      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);
};
