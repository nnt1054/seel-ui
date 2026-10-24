import { useId } from "react";

export interface UseDashedIdentProps {
  salt: string;
}

export const useDashedIdent = (props: UseDashedIdentProps) => {
  const {
    salt = "use-dashed-ident",
  } = props || {};

  const id = useId();
  const name = `${salt}-${id.replace(/\W/g, "")}`;
  return `--${name}`;
};

export default useDashedIdent;
