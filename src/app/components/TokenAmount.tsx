import React from 'react';
import './TokenAmount.css';
import { formatNumber } from '../utils';

type TokenAmountProps = {
  amount: number;
  symbol: string;
  backgroundColor?: string;
  className?: string;
  precision?: number;
};

const TokenAmount: React.FC<TokenAmountProps> = ({
  amount,
  symbol,
  className,
  precision = 4,
}) => {
  return (
    <div
      className={`app-token-amount flex-col align-start justify-center ${
        className || ''
      }`}
    >
      <div
        className="app-token-amount-amount"
        data-rh={formatNumber(amount, precision)}
      >
        {formatNumber(amount, precision)}
      </div>
      <div className="app-token-amount-symbol">{symbol}</div>
    </div>
  );
};

export default TokenAmount;
