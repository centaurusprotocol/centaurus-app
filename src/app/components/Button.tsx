import React, { useState } from 'react';
import './Button.css';

type Props = {
  buttonStyle: 'main' | 'long' | 'short' | 'disabled';
  text: string;
  bubbleText?: string;
  onClick: () => void;
  isLoading: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({
  text,
  onClick,
  isLoading,
  buttonStyle,
  className,
}) => {
  return (
    <div
      className={`app-button flex-row justify-center align-center ${
        className || ''
      }`}
      onClick={() => {
        if (!isLoading) {
          onClick();
        }
      }}
      button-style={isLoading ? 'loading' : buttonStyle}
    >
      {isLoading ? 'Loading...' : text}
    </div>
  );
};

export default Button;
