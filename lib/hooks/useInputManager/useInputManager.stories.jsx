import {
  useEffect, useMemo, useRef,
  useState,
} from 'react';

import { useInputManager } from './useInputManager';
import { DefaultKeybinds } from '../../constants';


export default {
  title: 'Hooks/useInputManager',
  component: useInputManager,
  args: {
    commands: undefined,
    keybinds: undefined,
    gamepadMapping: undefined,
    onBeforeKeyDown: undefined,
  },
  argTypes: {
    commands: {
      type: 'object',
      table: {
        defaultValue: {
          summary: '{}',
        },
        readonly: true,
      },
    },
    keybinds: {
      type: 'object',
      table: {
        defaultValue: {
          summary: 'DefaultKeybinds',
        },
        readonly: true,
      },
    },
    gamepadMapping: {
      type: 'object',
      table: {
        defaultValue: {
          summary: 'DefaultGamepadMapping',
        },
        readonly: true,
      },
    },
    onBeforeKeyDown: {
      type: 'function',
      description: "Function called on keydown event before executing an associated command.  If function returns a truthy value, propagation is stopped and the command will not execute.",
      table: {
        defaultValue: {
          summary: '() => {}',
        },
        readonly: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: () => {
    const ref = useRef();
    const element = ref.current;

    const [down, setDown] = useState();
    const [up, setUp] = useState();

    const commands = useMemo(() => {
      return Object.keys(DefaultKeybinds).reduce((commands, name) => {
        commands[name] = {
          execute: () => element?.dispatchEvent(
            new CustomEvent('execute', { detail: name })
          ),
          release: () => element?.dispatchEvent(
            new CustomEvent('release', { detail: name })
          ),
          ignoreModifiers: true,
        }
        return commands;
      }, {})
    }, [element])

    useEffect(() => {
      const onExecute = (event) => setDown(event.detail);
      const onRelease = (event) => setUp(event.detail);

      element?.addEventListener('execute', onExecute);
      element?.addEventListener('release', onRelease);

      return () => {
        element?.removeEventListener('execute', onExecute);
        element?.removeEventListener('release', onRelease);
      }
    })

    useInputManager({
      commands,
      keybinds: DefaultKeybinds,
    })

    return (
      <div ref={ ref } style={{ padding: '16px', textAlign: 'center', }}>
        <span> Last Command Down: { down }</span> <br/>
        <span> Last Command Up: { up }</span> <br/>
        <br/>
        <p>
          Command Down Events are suppressed while any inputs are active
          but Command Release Events will still fire.
        </p>
        <br/>
        <span> Input: </span> <input/>
      </div>
    )
  },
};

export const Default = {};
