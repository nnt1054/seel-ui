import { useEffect } from 'react';


export const useEventListeners = (ref, callbacks={}) => {
    const events = Object.keys(callbacks);
    useEffect(() => {
        const element = ref.current;
        for (const event of events) {
            element?.addEventListener(event, callbacks[event]);
        }

        return () => {
            for (const event of events) {
                element?.removeEventListener(event, callbacks[event]);
            }
        }
    })

    return callbacks;
}

export default useEventListeners;
