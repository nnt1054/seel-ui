import { createContext } from 'react';

import { useInputManager } from '@hooks/useInputManager/useInputManager';
import { KeyCodes } from '@constants';
import { getNavigationCommands } from '@utils';


export const KeybindsContext = createContext({});

const defaultKeybinds = {
  'confirm': KeyCodes.ENTER,
  'cancel': KeyCodes.ESC,
  'up': KeyCodes.I,
  'down': KeyCodes.K,
  'left': KeyCodes.J,
  'right': KeyCodes.L,
  'navUp': KeyCodes.UP,
  'navDown': KeyCodes.DOWN,
  'navLeft': KeyCodes.LEFT,
  'navRight': KeyCodes.RIGHT,
  'cycleR': KeyCodes.TAB,
  'cycleL': [KeyCodes.SHIFT, KeyCodes.TAB],
}

const gamepadMapping = {
    buttons: {
        A: 0,
        B: 1,
        X: 2,
        Y: 3,
        LB: 4,
        RB: 5,
        LT: 6,
        RT: 7,
        SELECT: 8,
        START: 9,
        LS: 10,
        RS: 11,
        UP: 12,
        DOWN: 13,
        LEFT: 14,
        RIGHT: 15,
        HOME: 16,
        LS_UP: 100,
        LS_DOWN: 101,
        LS_LEFT: 102,
        LS_RIGHT: 103,
        RS_UP: 104,
        RS_DOWN: 105,
        RS_LEFT: 106,
        RS_RIGHT: 107,
    },
    axis: {
        LSX: 0,
        LSY: 1,
        RSX: 2,
        RSY: 3,
    },
}

export const InputProvider = (props) => {
    const {
        inputRef,
        children,
    } = props;

    const commands = getNavigationCommands(inputRef)
    const keybinds = defaultKeybinds;

    useInputManager({
        commands,
        keybinds,
        gamepadMapping,
    })

    return (
        <KeybindsContext.Provider value={ keybinds }>
            { children }
        </KeybindsContext.Provider>
    )
}

export default InputProvider;
