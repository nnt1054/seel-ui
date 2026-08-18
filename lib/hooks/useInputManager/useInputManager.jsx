import { useState, useEffect, useMemo } from 'react';
import { GamepadListener } from 'gamepad.js';

import { GamepadCodes, GamepadKeybinds } from '../../constants';
import {
    compareArrays,
    getKeyCombination,
} from '../../utils';


const useKeyPress = (callback) => {
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


const useGamepad = (mapping, callback) => {
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
            const { pos, neg } = axisButtonMapping[axis];

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
        gamepadMapping,
    } = props;

    const getKeybinds = (event, exactMatch = false) => {
        return Object.keys(keybinds).filter(name => {
            const command = commands[name];
            const keybind = keybinds[name];
            if (!keybind) return;

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
        })
    }

    const onKeyDown = (event) => {
        const name = getKeybinds(event, true)[0];

        const stopPropagation = onBeforeKeyDown?.(name, commands);
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

    const { buttons } = gamepadMapping;
    const gamepadKeybinds = useMemo(() => {
        return {
            'gamepadA': buttons.A,
            'gamepadB': buttons.B,
            'gamepadX': buttons.X,
            'gamepadY': buttons.Y,
            'leftBumper': buttons.LB,
            'rightBumper': buttons.RB,
            'leftTrigger': buttons.LT,
            'rightTrigger': buttons.RT,
            'select': buttons.SELECT,
            'start': buttons.START,
            'dpadUp': buttons.UP,
            'dpadDown': buttons.DOWN,
            'dpadLeft': buttons.LEFT,
            'dpadRight': buttons.RIGHT,
            'up': buttons.LS_UP,
            'down': buttons.LS_DOWN,
            'left': buttons.LS_LEFT,
            'right': buttons.LS_RIGHT,
        }
    }, [buttons]);

    const getGamepadKeybind = (event) => {
        return Object.keys(gamepadKeybinds).find(
            command => gamepadKeybinds[command] === event.keyCode
        );
    }

    useKeyPress(event => {
        if (event.type == 'keydown') {
            onKeyDown(event);
        } else if (event.type == 'keyup') {
            onKeyUp(event);
        }
    })

    useGamepad(gamepadMapping, (event) => {
        const name = getGamepadKeybind(event);
        if (!name) return;

        const command = commands[name];
        if (!command) return;

        if (event.type == 'buttondown') {
            command.execute?.();
        } else if (event.type == 'buttonup') {
            command.release?.();
        }
    })
}

export default useInputManager;
