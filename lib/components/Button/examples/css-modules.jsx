import styles from './index.module.css';
import { Button } from '@components/Button/Button';


export const CssButton = (props) => {
  return (
    <Button
      className={ styles.Button }
      { ...props }
    >Button</Button>
  )
}

export default CssButton;
