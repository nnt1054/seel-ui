import { useState, useEffect } from 'react';
import { GamepadListener } from 'gamepad.js';

import { GamepadCodes, GamepadKeybinds } from '../../constants';
import {
    compareArrays,
    getKeyCombination,
} from '../../utils';


export const useKeyPress = (callback) => {
    const [keyPressed, setKeyPressed] = useState({});

    useEffect(() => {
        const downHandler = (event) => {
            if (document.activeElement?.tagName == 'INPUT') return;
            if (document.activeElement?.isContentEditable) return;
            if (document.getSelection()?.type == 'Range') return;

            if (!keyPressed[event.keyCode]) {
                setKeyPressed(state => ({...state, [event.keyCode]: true}));
                event.preventDefault();
                callback && callback(event);
            }
        };

        const upHandler = (event) => {
            setKeyPressed(state => ({...state, [event.keyCode]: false}));
            event.preventDefault();
            callback && callback(event);
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });

    return keyPressed;
};


export const useGamepad = (callback) => {
    const axisButtonMap = {
        [0]: {
            pos: GamepadCodes.LS_RIGHT,
            neg: GamepadCodes.LS_LEFT,
        },
        [1]: {
            pos: GamepadCodes.LS_DOWN,
            neg: GamepadCodes.LS_UP,
        },
        [2]: {
            pos: GamepadCodes.RS_RIGHT,
            neg: GamepadCodes.RS_LEFT,
        },
        [3]: {
            pos: GamepadCodes.RS_DOWN,
            neg: GamepadCodes.RS_UP,
        }, 
    }

    const onGamepadConnect = (event) => {
        console.log(event);
    };

    useEffect(() => {
        window.addEventListener("gamepadconnected", onGamepadConnect);
        return () => {
            window.removeEventListener("gamepadconnected", onGamepadConnect);
        };
    })

    useEffect(() => {
        const gamepadState = {
            [GamepadCodes.A]: false,
            [GamepadCodes.B]: false,
            [GamepadCodes.X]: false,
            [GamepadCodes.Y]: false,
            [GamepadCodes.LB]: false,
            [GamepadCodes.RB]: false,
            [GamepadCodes.LT]: false,
            [GamepadCodes.RT]: false,
            [GamepadCodes.SELECT]: false,
            [GamepadCodes.START]: false,
            [GamepadCodes.LS]: false,
            [GamepadCodes.RS]: false,
            [GamepadCodes.UP]: false,
            [GamepadCodes.DOWN]: false,
            [GamepadCodes.LEFT]: false,
            [GamepadCodes.RIGHT]: false,
            [GamepadCodes.LS_UP]: false,
            [GamepadCodes.LS_DOWN]: false,
            [GamepadCodes.LS_LEFT]: false,
            [GamepadCodes.LS_RIGHT]: false,
            [GamepadCodes.RS_UP]: false,
            [GamepadCodes.RS_DOWN]: false,
            [GamepadCodes.RS_LEFT]: false,
            [GamepadCodes.RS_RIGHT]: false,
        }

        const listener = new GamepadListener({ deadZone: 0.3 });
        listener.on('gamepad:button', event => {
            const { button, pressed, value } = event.detail;
            const isDown = (pressed && value > 0.5);
            if (isDown && !gamepadState[button]) {
                gamepadState[button] = true;
                callback && callback({
                    keyCode: button,
                    type: 'buttondown',
                });
            } else if (!isDown && gamepadState[button]) {
                gamepadState[button] = false;
                callback && callback({
                    keyCode: button,
                    type: 'buttonup',
                });
            }
        });

        listener.on('gamepad:axis', event => {
            const { axis, value } = event.detail;
            const { pos, neg } = axisButtonMap[axis];

            const state = {}
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
                        type: 'buttondown',
                    });
                } else if (!state[keyCode] && gamepadState[keyCode]) {
                    // keyup
                    callback && callback({
                        keyCode,
                        type: 'buttonup',
                    });
                }
            }
            Object.assign(gamepadState, state);
        });

        listener.start();
        return () => listener.stop();
    })
}


export const useInputManager = (props) => {
    const {
        commands,
        keybinds,
        onBeforeKeyDown,
        ignoreModifierCommands = [],
    } = props;

    const getKeybind = (event) => {
        return Object.keys(keybinds).find(command => {
            const keybind = keybinds[command];
            if (!keybind) return;

            const keybindCombination = Number.isInteger(keybind) ? [keybind] : keybind; 
            if (ignoreModifierCommands.includes(command)) {
                return compareArrays(keybindCombination, [event.keyCode]);
            } else {
                const keyCombination = getKeyCombination(event);
                return compareArrays(keybindCombination, keyCombination);
            }
        });
    }

    const getKeybinds = (event) => {
        return Object.keys(keybinds).filter(command => {
            const keybind = keybinds[command];
            if (!keybind) return;

            const keybindCombination = Number.isInteger(keybind) ? [keybind] : keybind; 
            return keybindCombination.includes(event.keyCode);
        })
    }

    const onKeyDown = (event) => {
        const name = getKeybind(event);

        const stopPropagation = onBeforeKeyDown?.(name, ignoreModifierCommands);
        if (stopPropagation) return;

        if (!name) return;
        const command = commands[name];
        command?.execute?.();
    }

    const onKeyUp = (event) => {
        const names = getKeybinds(event);
        for (const name of names) {
            const command = commands[name];
            command?.release?.();
        }
    }

    useKeyPress(event => {
        switch (event.type) {
          case 'keydown':
            onKeyDown(event);
            break;

          case 'keyup':
            onKeyUp(event);
            break;
        }
    })

    const getGamepadKeybind = (event) => {
        return Object.keys(GamepadKeybinds).find(
            command => GamepadKeybinds[command] === event.keyCode
        );
    }

    const onButtonDown = (event) => {
        const name = getGamepadKeybind(event);
        if (!name) return;

        const command = commands[name];
        command?.execute?.();
    }

    const onButtonUp = (event) => {
        const name = getGamepadKeybind(event);
        if (!name) return;

        const command = commands[name];
        command?.release?.();
    }

    useGamepad((event) => {
        switch (event.type) {
          case 'buttondown':
            onButtonDown(event);
            break;

          case 'buttonup':
            onButtonUp(event);
            break;
        }
    })
}
