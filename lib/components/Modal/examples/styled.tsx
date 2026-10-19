import { useContext } from "react";
import type { ComponentProps } from "react";
import styled from "styled-components";

import { StyledActiveListItem } from "@components/ActiveList/examples/styled";
import { Modal, ModalContext } from "@components/Modal/Modal";

export const StyledModal = styled(Modal)`
	position-area: bottom;

	appearance: none;
	outline: none;

	color: white;

	padding: 8px;
	border:  2px solid transparent;
	border-radius: 12px;
	background-color: rgba(18, 18, 18, .6);
	backdrop-filter: blur(10px);

	flex-direction: column;
	align-items: center;
	justify-content: center;

	&[data-focused] {
		border-color: #FFC067;
	}
`;

type StyledModalListItemProps = ComponentProps<typeof StyledActiveListItem>;

export const StyledModalListItem = (props: StyledModalListItemProps) => {
  const store = useContext(ModalContext);
  const onConfirm = () => {
    if (!store) return;
    const { closeModal } = store.getState();
    closeModal();
  };

  return (
    <StyledActiveListItem
      {...props}
      onConfirm={onConfirm}
    />
  );
};
