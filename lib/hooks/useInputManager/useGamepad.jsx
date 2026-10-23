import { useState } from "react";

import { GamepadListener } from "gamepad.js";
import { useEffect } from "react";

const DEADZONE = 0.3;

export const useGamepad = (mapping, callback) => {
  const { buttons, axes } = mapping;

  const [buttonStates, setButtonStates] = useState({})
  const [axisButtonStates, setAxisButtonStates] = useState({})

  const update = () => {
    for (const gamepad of navigator.getGamepads()) {
      if (!gamepad) continue;

      const updatedButtonState = { ...buttonStates };

      for (const [buttonIndex, button] of gamepad.buttons.entries()) {
        const pressed = button.pressed || button.value > 0;
        const buttonState = !!buttonStates[buttonIndex];

        if (pressed != buttonState) {
          const type = pressed ? 'buttondown' : 'buttonup';
          const gamepadCode = buttons[buttonIndex];
          const gamepadEvent = {
            type,
            gamepadCode,
            buttonIndex,
            value: button.value,
          }
          callback(gamepadEvent);
          updatedButtonState[buttonIndex] = pressed;
        }
      }

      setButtonStates(updatedButtonState);

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
          const buttonState = !!axisButtonStates[gamepadCode];

          if (pressed != buttonState) {
            const type = pressed ? 'buttondown' : 'buttonup';
            const gamepadEvent = {
              type,
              gamepadCode,
              axisIndex,
              value,
            }
            callback(gamepadEvent);
          }
        }
        Object.assign(updatedAxisButtonStates, state);
      }

      setAxisButtonStates(updatedAxisButtonStates);

      return;
    }
  }

  useEffect(() => {
    const interval = setInterval(update, 100);
    return () => {
        clearInterval(interval);
    }

    // window.requestAnimationFrame(update);
    // return () => {
    //   window.cancelAnimationFrame(update)
    // }
  })

  const onGamepadConnect = (event) => {
    console.log(event);
  };

  useEffect(() => {
    window.addEventListener("gamepadconnected", onGamepadConnect);
    return () => {
      window.removeEventListener("gamepadconnected", onGamepadConnect);
    };
  });
}
