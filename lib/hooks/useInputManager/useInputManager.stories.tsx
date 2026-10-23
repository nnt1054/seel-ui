import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { RefObject } from "react";

import { DefaultKeybinds } from "@constants";
import { useInputManager } from "./useInputManager";
import type { OnBeforeKeyDown } from "./useInputManager";
import type {
  Commands, GamepadKeybinds,
  GamepadMapping, Keybinds,
} from "@types"

interface DemoProps {
  commands?: Commands;
  keybinds?: Keybinds;
  gamepadKeybinds?: GamepadKeybinds;
  gamepadMapping?: GamepadMapping;
  onBeforeKeyDown?: OnBeforeKeyDown;
}

const Demo = (props: DemoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [down, setDown] = useState<string | undefined>("");
  const [up, setUp] = useState<string | undefined>("");

  const commands = Object.keys(DefaultKeybinds as Keybinds).reduce((commands, name) => {
    commands[name] = {
      execute: () => {
        ref.current?.dispatchEvent(
          new CustomEvent("execute", { detail: name }),
        );
      },
      release: () => {
        ref.current?.dispatchEvent(
          new CustomEvent("release", { detail: name }),
        );
      },
      ignoreModifiers: true,
    };
    return commands;
  }, {} as Commands);

  useEffect(() => {
    const onExecute = (event: CustomEventInit<string>) => setDown(event.detail);
    const onRelease = (event: CustomEventInit<string>) => setUp(event.detail);

    ref.current?.addEventListener("execute", onExecute);
    ref.current?.addEventListener("release", onRelease);

    return () => {
      ref.current?.removeEventListener("execute", onExecute);
      ref.current?.removeEventListener("release", onRelease);
    };
  });

  useInputManager({
    ...props,
    commands,
    keybinds: DefaultKeybinds,
  });

  return (
    <div ref={ref as RefObject<HTMLDivElement>} style={{ padding: "16px", textAlign: "center" }}>
      <span>Last Command Down: {down}</span> <br />
      <span>Last Command Up: {up}</span> <br />
      <br />
      <p>
        Command Down Events are suppressed while any inputs are active but Command Release Events will still fire.
      </p>
      <br />
      <span>Input:</span> <input />
    </div>
  );
};

const meta = {
  title: "Hooks/useInputManager",
  component: Demo,
  args: {
    commands: undefined,
    keybinds: undefined,
    gamepadKeybinds: undefined,
    gamepadMapping: undefined,
    onBeforeKeyDown: undefined,
  },
  argTypes: {
    commands: {
      type: "object",
      table: {
        defaultValue: {
          summary: "{}",
        },
        readonly: true,
      },
    },
    keybinds: {
      type: "object",
      table: {
        defaultValue: {
          summary: "DefaultKeybinds",
        },
        readonly: true,
      },
    },
    gamepadKeybinds: {
      type: "object",
      table: {
        defaultValue: {
          summary: "DefaultGamepadKeybinds",
        },
        readonly: true,
      },
    },
    gamepadMapping: {
      type: "object",
      table: {
        defaultValue: {
          summary: "DefaultGamepadMapping",
        },
        readonly: true,
      },
    },
    onBeforeKeyDown: {
      type: "function",
      description:
        "Function called on keydown event before executing an associated command.  If function returns a truthy value, propagation is stopped and the command will not execute.",
      table: {
        defaultValue: {
          summary: "() => {}",
        },
        readonly: true,
      },
    },
  },
  parameters: {
    layout: "centered",
  }
} satisfies Meta<typeof useInputManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
