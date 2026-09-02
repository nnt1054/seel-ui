import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';
import styled from 'styled-components';

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
					summary: `['up', 'down', 'left', 'right', 'cycleR', 'cycleL', 'confirm']`,
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
			description: "Controlled override for the node's `hasFocus` value.  Primarily used for setting focus value for the top level node.",
			table: {
				category: 'Node Props',
				defaultValue: {
					summary: 'null',
				},
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
				<StyledContainer { ...props } ref={ ref }>
					<StyledButton
						node={ 'foo' }
						adjacentNodes={{ right: 'bar' }}
						onClick={() => { console.log('foo') }}
					>foo</StyledButton>
					<StyledButton
						node={ 'bar' }
						adjacentNodes={{ left: 'foo' }}
						onClick={() => { console.log('bar') }}
					>bar</StyledButton>
				</StyledContainer>
			</InputProvider>
		)
  }
};

const StyledContainer = styled(ActiveContainer)`
	border: 2px solid black;

	&[data-focused] {
		border-color: #FFC067;
	}
`

const StyledButton = styled(Button)`
	margin: 4px;

	&[data-focused] {
		border-color: #FFC067;
	}
`
