import React, { useState } from 'react';
import Modal from 'react-modal';
import ModalHeader from '../ModalHeader';
import TextSwitch from '../TextSwitch';
import Slippage from './Slippage';
import Button from '../Button';
import SettingIcon from '../../../assets/setting-header.svg';
type Props = {
  mode: 'swap' | 'perps';
  showSettingOpen: boolean;
  setShowSettingOpen: (show: boolean) => void;
};
const Setting = ({ showSettingOpen, setShowSettingOpen, mode }: Props) => {
  const [fees, setFees] = useState<boolean>(false);
  const [leverage, setLeverage] = useState<Boolean>(false);
  const [priceSlippage, setPriceSlippage] = useState<number>(
    localStorage.getItem('price-slippage')
      ? Number(localStorage.getItem('price-slippage'))
      : 0.3,
  );
  const [swapPriceSlippage, setSwapPriceSlippage] = useState<number>(
    localStorage.getItem('swap-price-slippage')
      ? Number(localStorage.getItem('swap-price-slippage'))
      : 1,
  );
  const [collateralSlippage, setCollateralSlippage] = useState<number>(
    localStorage.getItem('collateral-slippage')
      ? Number(localStorage.getItem('collateral-slippage'))
      : 0.3,
  );
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSetting = () => {
    setIsSubmitLoading(true);

    if (mode === 'perps') {
      localStorage.setItem('price-slippage', priceSlippage.toString());
    } else {
      localStorage.setItem('swap-price-slippage', swapPriceSlippage.toString());
    }

    localStorage.setItem('collateral-slippage', collateralSlippage.toString());
    setIsSaved(true);
    setIsSubmitLoading(false);
  };

  const setSlippage = (e: any) => {
    console.log(e);
    console.log('setting slippage');
    if (mode === 'perps') {
      setPriceSlippage(e);
    } else {
      setSwapPriceSlippage(e);
    }
  };

  return (
    <Modal
      className="app-pos-close-main modal-animation"
      isOpen={showSettingOpen}
      onRequestClose={() => {
        setIsSaved(false);
        setShowSettingOpen(false);
      }}
      style={{
        overlay: {
          zIndex: 10000,
        },
      }}
      shouldCloseOnOverlayClick={true}
    >
      <div className="app-pos-open-card">
        <ModalHeader
          icon={SettingIcon}
          text={'Settings'}
          setShowModal={() => {
            setIsSaved(false);
            setShowSettingOpen(false);
          }}
        />
        <Slippage
          text="Allowed Price Slippage"
          value={mode === 'perps' ? priceSlippage : swapPriceSlippage}
          onChange={e => setSlippage(e)}
        />
        {/* <Slippage
          text="Allowed Collateral Slippage"
          value={collateralSlippage}
          onChange={e => setCollateralSlippage(e)}
        />
        <div className="color-F9-bg border rounded-6 pt-8 pb-8 pr-8 pl-8 mt-16 mb-16">
          <div className="color-black-text-5 text-14 font-500">
            Take Profit Max Limit
          </div>
          <div className="flex justify-between items-center pt-8">
            <div className="text-20 color-black-text-7 font-700">Max</div>
            <button className="cursor-pointer color-white-text rounded-10 color-blue-bg pl-8 pr-8 text-14 pt-2 pb-2">
              Default
            </button>
          </div>
        </div>
        <div className="color-F9-bg border rounded-6 mt-16 mb-24">
          <TextSwitch
            title="Display PnL after fees"
            className={'border-bottom pt-8 pl-8 pb-8 pr-8'}
            onChange={(e) => {
              setFees(e)
            }}
          />
          <TextSwitch
            title="Include PnL leverage display"
            className={'pt-8 pl-8 pb-8 pr-8'}
            onChange={(e) => {
              setLeverage(e)
            }}
          />
        </div> */}
        <Button
          buttonStyle="main"
          text={isSaved ? 'Saved!' : 'Save Settings'}
          onClick={handleSetting}
          isLoading={isSubmitLoading}
        />
      </div>
    </Modal>
  );
};
export default Setting;
