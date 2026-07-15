import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { Dialog } from './Dialog';
import { useDashedIdent } from '@hooks/useDashedIdent/useDashedIdent';


export default {
  title: 'Layout/Dialog',
  component: Dialog,
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const ref = useRef();
    const anchorName = useDashedIdent();
    const toggle = () => ref.current.togglePopover();

    return (
      <div>
        <Dialog ref={ ref } anchorName={ anchorName }>
          i am the dialog content here
        </Dialog>
        <button onClick={ toggle } style={{ anchorName, }}> toggle </button>
      </div>
    )
  }
};


export const Default = {};
