import React, { useState } from 'react';
type Props = {
  children?: React.ReactNode;
  data?: string[];
  className?: string;
  onChange?: (name: string) => void;
};
const Tabs = ({ children, data = [], onChange, className }: Props) => {
  const [mode, getMode] = useState(data[0]);
  return (
    <div className="w-full app-trade-action-tab adjust-actions flex justify-between">
      {children}
      {data.map(item => {
        return (
          <div
            key={item}
            onClick={() => {
              getMode(item);
              onChange && onChange(item);
            }}
            className={`ease-in app-trade-action-tab-item ${
              mode === item ? className : ''
            }`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
export default Tabs;
