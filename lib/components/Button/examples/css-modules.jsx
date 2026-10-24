import { Button } from "@components/Button/Button";
import styles from "./index.module.css";

export const CssButton = (props) => {
  return (
    <Button
      className={styles.Button}
      {...props}
    >
      Button
    </Button>
  );
};

export default CssButton;
