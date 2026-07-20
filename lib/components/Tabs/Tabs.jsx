import {
	useRef, useState, useEffect,
	createContext, useContext, memo,
	cloneElement, Children, isValidElement
} from 'react';
import styled from 'styled-components';
import { createStore, useStore } from 'zustand';

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

// todo: we might want an orientation prop
// so that we can figure out adjacentNodes
// in relation to each other
const StyledTabs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Tabs = withActiveNodeContainer((props) => {
	const {
		ref,
		node,
		adjacentNodes = {},
		maxIndex = 1,
		children,
		...others
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
	    	<StyledTabs
	    		ref={ ref }
	    		onClick={() => { setParentActiveNode(node) }}
	    		{ ...others }
	    	>
				{ children }
	    	</StyledTabs>
        </TabsContext.Provider>
    )
});


const TabsList = memo((props) => {
	const {
		position = 'up',
		orientation = 'horizontal', // or 'vertical'
		children,
		...others
	} = props;

	const store = useContext(TabsContext);
	const maxIndex = useStore(store, state => state.maxIndex);

	// todo: need to declare its position in the tabs context

	return (
		<ActiveGroup
			node={ 1 }
			adjacentNodes={{ down: 2 }}
			maxIndex={ maxIndex }
			disableJump={ true }
			{ ...others }
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

	// todo: if tabs list is on the left then adjacentNdoes
	// should be { left: 1 } appropriately

	if (!isActive) return;
	return (
		<>
	      {
			Children.map(children, (child, index) => {
				if (!isValidElement(child)) return;

				// todo: conditional props based on child
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
