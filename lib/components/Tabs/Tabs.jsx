import {
	useRef, useState, useEffect,
	createContext, useContext, memo,
	cloneElement, Children, isValidElement
} from 'react';
import styled from 'styled-components';
import { createStore, useStore } from 'zustand';

import { withActiveNode } from '@providers/ActiveNodeProvider/ActiveNodeProvider';
import { useActiveNode } from '@hooks/useActiveNode/useActiveNode';
import { Column } from '@components/Column/Column';
import { ActiveList } from '@components/ActiveList/ActiveList';
import { Button } from '@components/Button/Button';
import { useDispatchActiveNodeEvent } from '@hooks/useDispatchActiveNodeEvent/useDispatchActiveNodeEvent';
import { useEventListeners } from '@hooks/useEventListeners/useEventListeners';


export const TabsContext = createContext(null);

const createTabsContextStore = ({ maxIndex, adjacentNodes }) => {
    return createStore()((set) => ({
        activeIndex: 0,
        setActiveIndex: (activeIndex) => set(state => ({ activeIndex })),
        maxIndex,
        setMaxIndex: (maxIndex) => set(state => ({ maxIndex })),
        listPositions: {},
        setListPosition: (node, position) => set(state => {
        	return { listPositions: { ...state.listPositions, [position]: node } };
       	}),
        adjacentNodes,
    }))
}

const StyledTabs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Tabs = withActiveNode((props) => {
	const {
		ref,
		node,
		adjacentNodes = {},
		maxIndex = 1,
		children,
		...others
	} = props;

    const [store] = useState(() => createTabsContextStore({ maxIndex, adjacentNodes }));
	const { activeIndex, setActiveIndex, setMaxIndex } = useStore(store);

    const {
    	hasFocus,
    	grabFocus,
        childrenRef,
        activeNode,
        setActiveNode,
    } = useActiveNode();

    useDispatchActiveNodeEvent({
        ref,
        childrenRef,
        activeNode,
        events: ['left', 'right', 'up', 'down', 'confirm'],
    })

    useEventListeners(ref, {
    	'cycleR': () => { setActiveIndex((activeIndex + 1) % maxIndex) },
    	'cycleL': () => { setActiveIndex((activeIndex - 1 + maxIndex) % maxIndex) },
    })

	// failsafe when moving to non-node tabs panel
	useEffect(() => {
		const activeRef = childrenRef.current.get(activeNode);
		if (!activeRef?.current) {
			const { listPositions } = store.getState();
			const listNode = Object.values(listPositions)?.[0] || 'list';
			setActiveNode(listNode);
		}
	}, [activeNode, activeIndex])

	// respond to dynamic tab count
	useEffect(() => {
		setMaxIndex(maxIndex || 1);
	}, [maxIndex])

    return (
		<TabsContext.Provider value={ store }>
	    	<StyledTabs
	    		ref={ ref }
	    		onClick={ grabFocus }
	    		{ ...others }
	    	>
				{ children }
	    	</StyledTabs>
        </TabsContext.Provider>
    )
});

const TabsList = memo((props) => {
	const {
		node = 'list',
		position = 'up',
		orientation = 'horizontal', // or 'vertical'
		children,
		...others
	} = props;

	const store = useContext(TabsContext);
	const maxIndex = useStore(store, state => state.maxIndex);
	const adjacentNodes = useStore(store, state => state.adjacentNodes);
	const contentPositions = {
		up: 'down',
		down: 'up',
		left: 'right',
		right: 'left',
	}
	const contentPosition = contentPositions[position];

	useEffect(() => {
		const { setListPosition } = store.getState();
		setListPosition(node, position);
	}, [position]);

	return (
		<ActiveList
			node={ node }
			adjacentNodes={{ ...adjacentNodes, [contentPosition]: 'content' }}
			maxIndex={ maxIndex }
			disableJump={ true }
			orientation={ 'horizontal' }
			{ ...others }
		>
			{ children }
		</ActiveList>
	)
})

const TabsTab = memo((props) => {
	const {
		ref,
		node,
		...others
	} = props;

	const store = useContext(TabsContext);
	const setActiveIndex = useStore(store, state => state.setActiveIndex);
	const isActive = useStore(store, state => state.activeIndex == node);

	return (
		<Button
			node={ node }
			label={" "}
			onClick={() => {
				setActiveIndex(node)
			}}
            data-active-tab={ isActive ? "" : null }
            { ...others }
		/>
	)
})

const TabsPanel = (props) => {
	const { index, children } = props;
	const store = useContext(TabsContext);
	const isActive = useStore(store, state => state.activeIndex == index);
	const adjacentNodes = useStore(store, state => state.adjacentNodes);
	const listPositions = useStore(store, state => state.listPositions);

	if (!isActive) return;
	return (
		<>
	      {
			Children.map(children, (child, index) => {
				if (!isValidElement(child)) return;
				return cloneElement(child, {
					node: 'content',
					adjacentNodes: { ...adjacentNodes, ...listPositions },
				});
			})
	      }
		</>
	)
}

const TabsCycleButton = (props) => {
	const {
		direction = 'left',
		...others
	} = props;

	const store = useContext(TabsContext);
	const { activeIndex, setActiveIndex, maxIndex } = useStore(store);

	const cycleR = () => { setActiveIndex((activeIndex + 1) % maxIndex) };
	const cycleL = () => { setActiveIndex((activeIndex - 1 + maxIndex) % maxIndex) };
	const onClick = (direction == 'left') ? cycleL : cycleR;

    return (
    	<button
    		data-direction={ direction }
    		onClick={ onClick }
	        onMouseDown={ event => event.preventDefault() }
    		{ ...others }
    	/>
    )
}

Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.CycleButton = TabsCycleButton;

export default Tabs;
