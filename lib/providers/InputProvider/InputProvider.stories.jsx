import {
  useEffect, useMemo, useRef,
  useState,
} from 'react';

import { InputProvider } from './InputProvider';
import { DefaultKeybinds } from '../../constants';


export default {
  tags: ['!dev'],
  title: 'Providers/InputProvider',
  component: InputProvider,
  args: {
    inputRef: undefined,
  },
  argTypes: {
    inputRef: {
			type: 'RefObject<>',
      description: "The entrypoint or top level active node to dispatch navigation events to.",
			table: {
				readonly: true,
			},
		},
  },
  parameters: {
    layout: 'centered',
  },
};

export const Default = {};
