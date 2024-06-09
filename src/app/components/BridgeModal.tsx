import React from 'react';
import { Modal } from '@mantine/core';
import Bridge from './Bridge';

type Props = {
  opened: boolean;
  onClose: any;
};

const BridgeModal: React.FC<Props> = ({ opened, onClose }) => {
  return (
    <Modal
      keepMounted
      centered
      opened={opened}
      onClose={onClose}
      title="Bridge"
      size="xl"
      lockScroll={false}
    >
      <div className="h-[60vh] max-h-[700px]">
        <Bridge></Bridge>
      </div>
    </Modal>
  );
};

export default BridgeModal;
