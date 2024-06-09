import React from 'react';
import { Token } from '../models';
import './TokenInput.css';
import CryptoDropdown from './CryptoDropdown';
import { formatNumber } from '../utils';
import { FaBridgeWater } from 'react-icons/fa6';

type TokenInputProps = {
  token: Token;
  titlePrefix: string;
  tokenList?: Token[];
  amount: number | string | null;
  editable?: boolean;
  tokenEditable?: boolean;
  onChange?: (amount: number | null) => void;
  onChangeToken?: (token: Token) => void;
  usdValue?: number | string;
  className?: string;
  showBalance?: boolean;
  balance?: number;
  showMax?: boolean;
  showSolidMax?: boolean;
  onMax?: () => void;
  showLeverage?: boolean;
  showMark?: boolean;
  leverage?: number;
  mark?: number;
  isShowColon?: boolean;
  keepIconPlaceholder?: boolean;
  balanceLabel?: string;
  rightText?: string;
};

const TokenInput: React.FC<TokenInputProps> = ({
  token,
  titlePrefix,
  tokenList,
  amount,
  editable = true,
  tokenEditable = true,
  onChange,
  onChangeToken,
  usdValue,
  className,
  showBalance,
  balance,
  showMax,
  showSolidMax,
  onMax,
  showLeverage,
  showMark,
  leverage,
  mark,
  isShowColon = true,
  keepIconPlaceholder = true,
  balanceLabel = 'Balance',
  rightText,
}) => {
  const handleInput = (str: string) => {
    if (!onChange) return;
    if (str) {
      const regex = new RegExp(`^\\D*(\\d*(?:\\.\\d{0,18})?).*$`, 'g');
      const value = str.replace(regex, '$1');
      if (/^0\d/.test(value)) {
        const newValue = value.replace('0', '');
        onChange(newValue as unknown as number);
      } else {
        onChange(value as unknown as number);
      }
    } else {
      onChange(null);
    }
  };

  return (
    <div className={`app-token-input flex-col ${className || ''}`}>
      <div className="flex-row justify-between mb-8-important">
        <div className="app-token-input-usd flex-row justify-center align-center">
          {titlePrefix}
          {isShowColon && ':'} {usdValue === undefined ? '' : `${usdValue} USD`}
        </div>
        {rightText && (
          <span className="app-token-input-balance font-500 text-14 color-black-text-5">
            {rightText}:{formatNumber(10000)}
          </span>
        )}
        {showBalance && balance !== undefined && (
          <div className="app-token-input-balance flex-row justify-center align-center">
            {balanceLabel}: {formatNumber(balance)}
          </div>
        )}
        {showLeverage && leverage !== undefined && (
          <div className="app-token-input-balance flex-row justify-center align-center">
            Leverage: {leverage}
          </div>
        )}
        {showMark && (
          <div className="app-token-input-balance flex-row justify-center align-center">
            Mark: {mark}
          </div>
        )}
      </div>

      <div className="app-token-input-content flex-row justify-between align-center">
        <input
          type="text"
          className="app-token-input-input"
          value={amount || ''}
          placeholder="0"
          onChange={e => handleInput(e.target.value)}
          disabled={!editable}
        />
        <div className="flex-row justify-end align-center">
          {showMax ? (
            <div
              className="app-token-input-max flex-row justify-center align-center"
              onClick={onMax}
            >
              Max
            </div>
          ) : (
            <div />
          )}
          {showSolidMax ? (
            <div
              className="app-token-input-max color-blue-bg color-white-text flex-row justify-center align-center"
              onClick={onMax}
            >
              Max
            </div>
          ) : (
            <div />
          )}
          <div className={`app-token-input-token ${tokenEditable ? '' : ''}`}>
            <CryptoDropdown
              title={titlePrefix}
              selectedCrypto={token}
              options={tokenList || [token]}
              onChange={t => {
                if (onChangeToken) {
                  onChangeToken(t);
                }
              }}
              editable={tokenEditable}
              keepIconPlaceholder={
                titlePrefix === 'Price' ? false : keepIconPlaceholder
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
