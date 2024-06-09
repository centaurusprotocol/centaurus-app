import Sheet, { SheetRef } from 'react-modal-sheet';
import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';
import type { PropsWithChildren } from 'react';

const BottomToolbar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="fixed w-full bottom-0 left-0 text-lg lg:hidden bg-primary font-bold  border-t border-t-secondary">
        {children}
      </div>
    </>
  );
};

export default BottomToolbar;
