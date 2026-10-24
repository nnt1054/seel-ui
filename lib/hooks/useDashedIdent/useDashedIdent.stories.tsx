import type { Meta, StoryObj } from "@storybook/react-vite";

import { useDashedIdent } from "./useDashedIdent";

const meta = {
  tags: ["!dev"],
  title: "Hooks/useDashedIdent",
  component: useDashedIdent,
  args: {
    salt: "use-dashed-ident",
  },
  argTypes: {
    salt: {
      type: "string",
      description: "String used to salt the generated dashed ident",
      table: {
        defaultValue: {
          summary: "use-dashed-ident",
        },
      },
    },
  },
} satisfies Meta<typeof useDashedIdent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
