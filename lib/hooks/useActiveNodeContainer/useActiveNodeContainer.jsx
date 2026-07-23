import { useContext } from 'react';
import { useStore } from 'zustand';

import { ActiveNodeContext } from '@providers/ActiveNodeProvider/ActiveNodeProvider';


export const useActiveNodeContainer = (selector) => {
    const store = useContext(ActiveNodeContext);
    if (!store) throw new Error('Missing ActiveNodeContext.Provider in the tree')
    return useStore(store, selector)
}

export default useActiveNodeContainer;
