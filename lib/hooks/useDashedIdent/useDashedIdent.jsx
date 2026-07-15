import { useId } from 'react';


export const useDashedIdent = (props) => {
    const {
        salt = 'use-dashed-ident',
    } = props || {};

    const id = useId();
    const name = `${ salt }-${ id.replace(/\W/g, '') }`;
    return `--${ name }`;
}

export default useDashedIdent;
