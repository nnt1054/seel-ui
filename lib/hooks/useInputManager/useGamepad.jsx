import { GamepadListener } from "gamepad.js";
import { useEffect } from "react";

export const useGamepad = (mapping, callback) => {
  const { buttons, axis } = mapping;
  const axisButtonMapping = {
    [axis.LSX]: {
      pos: buttons.LS_RIGHT,
      neg: buttons.LS_LEFT,
    },
    [axis.LSY]: {
      pos: buttons.LS_DOWN,
      neg: buttons.LS_UP,
    },
    [axis.RSX]: {
      pos: buttons.RS_RIGHT,
      neg: buttons.RS_LEFT,
    },
    [axis.RSY]: {
      pos: buttons.RS_DOWN,
      neg: buttons.RS_UP,
    },
  };

  const onGamepadConnect = (event) => {
    console.log(event);
  };

  useEffect(() => {
    window.addEventListener("gamepadconnected", onGamepadConnect);
    return () => {
      window.removeEventListener("gamepadconnected", onGamepadConnect);
    };
  });

  useEffect(() => {
    // todo: doesn't necessarily need to be hardcoded;
    //      can go off keys of GamepadCodes (turned into prop)
    const gamepadState = {
      [buttons.A]: false,
      [buttons.B]: false,
      [buttons.X]: false,
      [buttons.Y]: false,
      [buttons.LB]: false,
      [buttons.RB]: false,
      [buttons.LT]: false,
      [buttons.RT]: false,
      [buttons.SELECT]: false,
      [buttons.START]: false,
      [buttons.LS]: false,
      [buttons.RS]: false,
      [buttons.UP]: false,
      [buttons.DOWN]: false,
      [buttons.LEFT]: false,
      [buttons.RIGHT]: false,
      [buttons.LS_UP]: false,
      [buttons.LS_DOWN]: false,
      [buttons.LS_LEFT]: false,
      [buttons.LS_RIGHT]: false,
      [buttons.RS_UP]: false,
      [buttons.RS_DOWN]: false,
      [buttons.RS_LEFT]: false,
      [buttons.RS_RIGHT]: false,
    };

    const listener = new GamepadListener({ deadZone: 0.3 });

    listener.on("gamepad:button", event => {
      const { button, pressed, value } = event.detail;
      const isDown = pressed && value > 0.5;
      if (isDown && !gamepadState[button]) {
        gamepadState[button] = true;
        callback && callback({
          keyCode: button,
          type: "buttondown",
        });
      } else if (!isDown && gamepadState[button]) {
        gamepadState[button] = false;
        callback && callback({
          keyCode: button,
          type: "buttonup",
        });
      }
    });

    listener.on("gamepad:axis", event => {
      const { axis, value } = event.detail;
      const { pos, neg } = axisButtonMapping[axis];

      const state = {};
      if (value > 0.5) {
        state[pos] = true;
        state[neg] = false;
      } else if (value < -0.5) {
        state[pos] = false;
        state[neg] = true;
      } else {
        state[pos] = false;
        state[neg] = false;
      }

      for (const keyCode of [pos, neg]) {
        if (state[keyCode] && !gamepadState[keyCode]) {
          // keydown
          callback && callback({
            keyCode,
            type: "buttondown",
          });
        } else if (!state[keyCode] && gamepadState[keyCode]) {
          // keyup
          callback && callback({
            keyCode,
            type: "buttonup",
          });
        }
      }
      Object.assign(gamepadState, state);
    });

    listener.start();
    return () => listener.stop();
  });
};
