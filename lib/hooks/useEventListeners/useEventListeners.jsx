import { useEffect } from 'react';


export const useEventListeners = (ref, callbacks={}, isActive=true) => {

    const events = Object.keys(callbacks);

    useEffect(() => {
        if (!isActive) return;

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
