import React, { useState } from 'react';
import { priceToString } from '../../utils';
type Props = {
  title: string;
  token: string;
  amount: number;
  isLoss?: boolean;
  isProfit?: boolean;
  onChange?: (value: number) => void;
};
const PendingOrderSettings = (Props: Props) => {
  let [getValue, handleSetValue] = useState<number>(10);
  const settingValue: any = [10, 25, 50, 100];
  Props.isProfit && settingValue.push('200', 'max');
  Props.isLoss && settingValue.push('None');
  const getUnit = () => {
    return !isNaN(getValue) ? '%' : '';
  };
  const getOnchange = () => {
    if (Props.onChange) {
      Props.onChange(getValue);
    }
  };
  const handleSub = () => {
    handleSetValue(x => x - 1);
    getOnchange();
  };
  const handleAdd = () => {
    handleSetValue(x => x + 1);
    getOnchange();
  };
  const handleGetValue = (item: any) => {
    getOnchange();
    handleSetValue(item);
  };
  return (
    <div className="border-5 mt-16 w-full color-F9-bg pt-8 pb-8 pl-8 pr-8 rounded-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="min-width-59 color-black-text-5 font-500 text-14 mb-2">
            {Props.title}
          </span>
          <span className="flex justify-center w-20 rounded-30 text-8 color-black-bg-7 color-white-text min-width-45">
            {Props.token}
          </span>
        </div>
        <div className="color-black-text-7 text-20 font-700">
          {priceToString(Props.amount)}
        </div>
        <div className="rounded-30 border flex" style={{ overflow: 'hidden' }}>
          <button
            disabled={['None', 'max', 1].includes(getValue)}
            onClick={() => {
              handleSub();
            }}
            className="flex items-center color-black-text-7 color-white-bg text-20 font-700 border-right pl-5 pr-5 cursor-pointer"
          >
            <span className="minus ml-5 mr-5"></span>
          </button>
          <input
            type="text"
            className="flex reset-input text-center pt-5 pb-4"
            value={`${getValue}${getUnit()}`}
          />
          <button
            disabled={['None', 'max', Props.amount].includes(getValue)}
            onClick={() => {
              handleAdd();
            }}
            className="flex items-center color-black-text-7 color-white-bg text-20 font-700 border-left pl-5 pr-5 cursor-pointer"
          >
            <span className="plus ml-5 mr-5"></span>
          </button>
        </div>
      </div>
      <div
        className={`mt-8 flex justify-between grid grid-template-columns-${settingValue.length} gap-12 text-14 font-500 color-black-text-5 `}
      >
        {settingValue.map((item: any, index: number) => {
          return (
            <span
              key={index}
              onClick={() => {
                handleGetValue(item);
              }}
              className={`ease-in rounded-25 flex justify-center items-center cursor-pointer ${
                item === getValue
                  ? 'color-blue-bg color-white-text'
                  : 'color-white-bg'
              }`}
            >
              {item}
              {!isNaN(item) && '%'}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default PendingOrderSettings;
