import { createContext } from 'react';

import { useInputManager } from '@hooks/useInputManager/useInputManager';
import { KeyCodes } from '@constants';
import { getNavigationCommands } from '@utils';


export const KeybindsContext = createContext({});

// todo: change to wasd or something before shipping
const keybinds = {
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

export const InputProvider = (props) => {
    const {
        inputRef,
        children,
    } = props;

    const commands = getNavigationCommands(inputRef)

    // todo: return keybinds from useInputManager
    useInputManager({
        commands,
        keybinds,
    })

    return (
        <KeybindsContext.Provider value={ keybinds }>
            { children }
        </KeybindsContext.Provider>
    )
}

export default InputProvider;
