import { useInputManager } from '@hooks/useInputManager/useInputManager';
import { KeyCodes } from '@constants';
import { getNavigationCommands } from '@utils';


const defaultKeybinds = {
  'confirm': KeyCodes.ENTER,
  'close': KeyCodes.ESC,
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
    const keybinds = defaultKeybinds;

    useInputManager({
        commands,
        keybinds,
    })

    return (
        <>
            { children }
        </>
    )
}

export default InputProvider;
