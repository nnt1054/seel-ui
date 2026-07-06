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
