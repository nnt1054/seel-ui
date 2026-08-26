import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider } from '@docs/decorators';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { useDashedIdent } from '@hooks/useDashedIdent/useDashedIdent';
import { Button as ActiveButton } from '@components/Button/Button';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import { ActiveList } from '@components/ActiveList/ActiveList';
import { Modal } from '@components/Modal/Modal';


const TitleScreen = () => {

	const ref = useRef();
  const anchorName = useDashedIdent();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

	return (
	   <InputProvider inputRef={ ref }>
			<ActiveContainer ref={ ref } initial={ 'startActions' }>
				<div>
					<ActiveButton
						node={ 'language' }
						adjacentNodes={{
							down: 'startActions',
						}}
						style={{ anchorName: anchorName, }}
						onClick={ openModal }
					> Language </ActiveButton>
					<Modal
						anchorName={ anchorName }
						isOpen={ isOpen }
						style={{ positionArea: 'bottom' }}
						initial={ 'languageDropdown' }
						hasFocus={ true }
					>
						<ActiveList node={ 'languageDropdown' }>
							<ActiveButton node={ 0 } onClick={ closeModal }> English </ActiveButton>
							<ActiveButton node={ 1 } onClick={ closeModal }> Spanish </ActiveButton>
							<ActiveButton node={ 2 } onClick={ closeModal }> French </ActiveButton>
						</ActiveList>
					</Modal>
				</div>
				<ActiveList
					node={ 'startActions' }
					adjacentNodes={{
						up: 'language',
						down: 'mediaLinks',
					}}
					orientation={ 'vertical' }
				>
					<ActiveButton node={ 0 }> Start </ActiveButton>
					<ActiveButton node={ 1 }> Settings </ActiveButton>
					<ActiveButton node={ 2 }> Credits </ActiveButton>
					<ActiveButton node={ 3 }> Exit </ActiveButton>
				</ActiveList>
				<ActiveList
					node={ 'mediaLinks' }
					adjacentNodes={{
						up: 'startActions'
					}}
					orientation={ 'horizontal' }
				>
					<ActiveButton node={ 0 }> Discord </ActiveButton>
					<ActiveButton node={ 1 }> Twitter </ActiveButton>
					<ActiveButton node={ 2 }> Icon </ActiveButton>
				</ActiveList>
			</ActiveContainer>
		</InputProvider>
	)
}


export default {
  title: 'Navigation/ActiveContainer',
  component: ActiveContainer,
  args: {
    hasFocus: true,
    node: 'button',
    columns: 5,
  },
  argTypes: {
    hasFocus: {
      control: 'boolean'
    },
    node: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: (props) => {
    return (
        <TitleScreen
          { ...props }
        />
    )
  }
};
