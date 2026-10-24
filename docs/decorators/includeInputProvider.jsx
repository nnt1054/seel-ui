import { useRef } from "react";

import { ActiveContainer } from "@components/ActiveContainer";
import { InputProvider } from "@providers/InputProvider";

export const includeInputProvider = (Story, context) => {
  const { node, hasFocus } = context.args;
  const ref = useRef();
  return (
    <InputProvider inputRef={ref}>
      <ActiveContainer ref={ref} initial={node} hasFocus={hasFocus}>
        <Story />
      </ActiveContainer>
    </InputProvider>
  );
};

export default includeInputProvider;
