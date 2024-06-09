// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Modal } from '@mantine/core';
import { ReactNode } from 'react';

export function ModalBase({
  isOpen,
  closeModal,
  children,
  title = 'A modal',
}: {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  title: string;
}) {
  return (
    <Modal
      keepMounted
      centered
      opened={isOpen}
      onClose={closeModal}
      title={title}
      size="xl"
      lockScroll={false}
      styles={{
        body: { backgroundColor: 'black' },
      }}
    >
      <div className="h-[60vh] max-h-[700px]">
        {children}
      </div>
    </Modal>
  );
}
