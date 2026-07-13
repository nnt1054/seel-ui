import {
	useRef, useState, useEffect,
	createContext, useContext, memo,
	cloneElement, Children, isValidElement
} from 'react';
import { createStore, useStore } from 'zustand'

import {
	withActiveNodeContainer,
	useActiveNodeContainer,
} from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { Column } from '@components/Column/Column';
import { ActiveGroup } from '@components/ActiveGroup/ActiveGroup';
import { ActiveListItem } from '@components/ActiveList/ActiveList';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const TabsContext = createContext(null);

const createTabsContextStore = ({ maxIndex }) => {
    return createStore()((set) => ({
        activeIndex: 0,
        setActiveIndex: (activeIndex) => set(state => ({ activeIndex })),
        maxIndex,
        setMaxIndex: (maxIndex) => set(state => ({ maxIndex })),
    }))
}

export const Tabs = withActiveNodeContainer((props) => {
	const {
		ref,
		node,
		adjacentNodes = {},
		maxIndex = 1,
		children,
	} = props;

    const [store] = useState(() => createTabsContextStore({ maxIndex }));
	const { activeIndex, setActiveIndex, setMaxIndex } = useStore(store);

    const {
        childrenRef,
        activeNode,
        setActiveNode,
    } = useActiveNodeContainer();

    const {
    	hasFocus,
    	setActiveNode: setParentActiveNode,
    } = useActiveNode({ ref, node });

    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode,
        events: ['left', 'right', 'up', 'down', 'confirm'],
    })

    const callbacks = useEventListeners(ref, {
    	'cycleR': () => { setActiveIndex((activeIndex + 1) % maxIndex) },
    	'cycleL': () => { setActiveIndex((activeIndex - 1 + maxIndex) % maxIndex) },
    })

    // failsafe when swapping panels while focused on another
	useEffect(() => {
		const activeRef = childrenRef.current.get(2);
		if (!activeRef?.current) setActiveNode(1)
	}, [activeIndex])

	// failsafe when directionally moving to non-node tabs panel
	useEffect(() => {
		const activeRef = childrenRef.current.get(activeNode);
		if (!activeRef?.current) setActiveNode(1)
	}, [activeNode])

	// respond to dynamic tab count
	useEffect(() => {
		setMaxIndex(maxIndex || 1);
	}, [maxIndex])

    return (
		<TabsContext.Provider value={ store }>
			<button onClick={ callbacks.cycleL }> -1 </button>
			<button onClick={ callbacks.cycleR }> +1 </button>
	    	<Column ref={ ref } onClick={() => { setParentActiveNode(node) }}>
				{ children }
	    	</Column>
        </TabsContext.Provider>
    )
});


const TabsList = memo((props) => {
	const {
		children,
	} = props;

	const store = useContext(TabsContext);
	const maxIndex = useStore(store, state => state.maxIndex);

	return (
		<ActiveGroup
			node={ 1 }
			adjacentNodes={{ down: 2 }}
			maxIndex={ maxIndex }
			disableJump={ true }
		>
			{ children }
		</ActiveGroup>
	)
})

const TabsTab = memo((props) => {
	const {
		node,
		label,
		children,
	} = props;

	const store = useContext(TabsContext);
	const setActiveIndex = useStore(store, state => state.setActiveIndex);
	const isActive = useStore(store, state => state.activeIndex == node);

	return (
		<ActiveListItem
			node={ node }
			label={" "}
			callback={() => { setActiveIndex(node) }}
		> { children } { isActive ? 'active' : 'not active' }</ActiveListItem>
	)
})


const TabsPanel = (props) => {
	const { index, children } = props;
	const store = useContext(TabsContext);
	const isActive = useStore(store, state => state.activeIndex == index);

	if (!isActive) return;
	return (
		<>
	      {
			Children.map(children, (child, index) => {
				if (!isValidElement(child)) return;
				return cloneElement(child, {
					node: 2,
					adjacentNodes: { up: 1 },
				});
			})
	      }
		</>
	)
}


Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
Tabs.Tab = TabsTab;

export default Tabs;
