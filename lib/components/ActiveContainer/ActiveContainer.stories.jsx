import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider } from '@docs/decorators';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { useDashedIdent } from '@hooks/useDashedIdent/useDashedIdent';
import { Button } from '@components/Button/Button';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import { ActiveList } from '@components/ActiveList/ActiveList';
import { Modal } from '@components/Modal/Modal';


export default {
  title: 'Navigation/ActiveContainer',
  component: ActiveContainer,
  args: {
  	events: ['left', 'right', 'confirm'],
  	ref: null,
    node: 'container',
    hasFocus: true,
    initial: 'foo',
  },
  argTypes: {
    events: {
    	type: 'array',
    	description: 'List of event names to propagate through to the active child.',
    	table: {
	    	defaultValue: {
	    		summary: `
	    			['up', 'down', 'left', 'right',
	    			'cycleR', 'cycleL', 'confirm']`,
	    	},
    	},
    },
    ref: {
    	type: 'RefObject<>',
    	table: {
    		category: 'Node Props',
    		readonly: true,
    	},
    },
    node: {
    	type: {
    		name: 'string',
    		required: true,
    	},
      table: {
    		category: 'Node Props',
    		readonly: true,
      },
    },
    hasFocus: {
    	type: 'boolean',
    	table: {
    		category: 'Node Props',
    	},
    },
    initial: {
    	type: 'string',
    	table: {
    		category: 'Node Props',
    		readonly: true,
    	},
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: (props) => {
		const ref = useRef();

		return (
		   <InputProvider inputRef={ ref }>
				<ActiveContainer { ...props } ref={ ref }>
					<Button
						node={ 'foo' }
						adjacentNodes={{ right: 'bar' }}
					> foo </Button>
					<Button
						node={ 'bar' }
						adjacentNodes={{ left: 'foo' }}
						onClick={() => { console.log('bar') }}
					> bar </Button>
				</ActiveContainer>
			</InputProvider>
		)
  }
};
