import React, { useState } from 'react';
type Props = {
  title: string;
  onChange?: (isSwitch: boolean) => void;
  className?: string;
};
const TextSwitch = ({ title, className, onChange }: Props) => {
  let [isSwitch, setSwitch] = useState(false);
  const handleClick = () => {
    setSwitch((isSwitch = !isSwitch));
    if (onChange) {
      onChange(isSwitch);
    }
  };
  return (
    <>
      <div className={`w-full flex justify-between items-center ${className}`}>
        <div className="text-15 font-700 color-white-text">{title}</div>
        <div
          onClick={() => {
            handleClick();
          }}
          className={`ease-in cursor-pointer tradeAction-switch rounded-25 flex items-center ${
            !isSwitch
              ? 'justify-start color-grey-bg-16'
              : 'justify-end color-blue-bg'
          }`}
        >
          <div className="mt-1 mb-1 mr-1 ml-1 tradeAction-switch-solid rounded-25 color-white-bg ease-in"></div>
        </div>
      </div>
    </>
  );
};
export default TextSwitch;
