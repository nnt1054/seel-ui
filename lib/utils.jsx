import { KeyCodes } from './constants';


export const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};


export const getKeyCombination = (event) => {
    const keyCode = event.keyCode;
    if (event.shiftKey) {
        return [KeyCodes.SHIFT, keyCode];
    } else if (event.ctrlKey) {
        return [KeyCodes.CTRL, keyCode];
    } else if (event.altKey) {
        return [KeyCodes.ALT, keyCode];
    } else {
        return [keyCode];
    }
}


export const inputInFocus = () => {
    return (
        document.activeElement?.tagName == 'DIALOG' ||
        document.activeElement?.tagName == 'INPUT' ||
        document.activeElement?.isContentEditable ||
        document.getSelection()?.type == 'Range'
    )
}


export const getNavigationCommands = (ref) => {
    const handleEvent = (event) => {
      return () => {
        if (inputInFocus()) {
            const input = document.activeElement;
            if (input) input.dispatchEvent(new Event(event));
        } else {
            const element = ref?.current;
            if (element) element.dispatchEvent(new Event(event));
        }
      }
    }

    const commands = {
        'left': {
            execute: handleEvent('left'),
            ignoreModifiers: true,
        },
        'right': {
            execute: handleEvent('right'),
            ignoreModifiers: true,
        },
        'up': {
            execute: handleEvent('up'),
            ignoreModifiers: true,
        },
        'down': {
            execute: handleEvent('down'),
            ignoreModifiers: true,
        },
        'navLeft': {
            execute: handleEvent('left')
        },
        'navRight': {
            execute: handleEvent('right')
        },
        'navUp': {
            execute: handleEvent('up')
        },
        'navDown': {
            execute: handleEvent('down')
        },
        'confirm': {
            execute: handleEvent('confirm'),
            ignoreModifiers: true,
        },
        'close': {
            execute: handleEvent('close'),
            ignoreModifiers: true,
        },
        'cycleR': {
            execute: handleEvent('cycleR')
        },
        'cycleL': {
            execute: handleEvent('cycleL')
        },
        'start': {
            // todo: ponder on the implications of this
            execute: handleEvent('confirm')
        },
        'select': {
            // todo: ponder on the implications of this
            execute: handleEvent('close')
        },
        'gamepadA': {
            execute: handleEvent('confirm')
        },
        'gamepadB': {
            execute: handleEvent('close')
        },
        'dpadUp': {
            execute: handleEvent('up')
        },
        'dpadDown': {
            execute: handleEvent('down')
        },
        'dpadLeft': {
            execute: handleEvent('left')
        },
        'dpadRight': {
            execute: handleEvent('right')
        },
        'rightBumper': {
            execute: handleEvent('cycleR')
        },
        'leftBumper': {
            execute: handleEvent('cycleL')
        },
    }

    return commands;
}
