import { useRef } from 'react';


export const ActiveContainer = (props) => {
    const defaultEvents =  ['up', 'down', 'left', 'right', 'confirm'];
	const {
        ref = useRef(),
		node,
		initial,
		events = defaultEvents,
		children,
	} = props;

    const { hasFocus = false } = useActiveNode({ ref, node });

    const [ActiveNodeProvider, useActiveNodeStore] = createActiveNodeContext({
      initial,
    });
    
    const { mapRef, activeNode } = useActiveNodeStore();
    const dispatchEvent = (event) => {
      return () => {
        const activeRef = mapRef.current.get(activeNode);
        activeRef.current?.dispatchEvent(new Event(event))
      }
    }

    const callbacks = events.reduce((callbacks, event) => {
        callbacks[event] = dispatchEvent(event);
        return callbacks;
    }, {})

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

	return (
		<ActiveNodeProvider>
			<div ref={ ref } />
			{ children }
		</ActiveNodeProvider>
	)
}
