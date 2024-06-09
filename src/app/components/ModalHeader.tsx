import React from 'react';
import CloseBtn from '../../assets/close.svg';
import './ModalHeader.css';

type Props = {
  className?: string;
  text: string;
  setShowModal: (show: boolean) => void;
  icon: string;
};

const ModalHeader: React.FC<Props> = ({
  className,
  text,
  setShowModal,
  icon,
}) => {
  return (
    <div
      className={`app-modal-card-header flex-row justify-between ${
        className || ''
      }`}
    >
      <div className="app-modal-card-header-title flex-row align-center">
        {text}
      </div>
      <div
        className="app-modal-card-header-close flex-row align-center"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <img src={CloseBtn} alt="" />
      </div>
    </div>
  );
};

export default ModalHeader;
