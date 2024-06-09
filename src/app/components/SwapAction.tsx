import React, { useState } from "react";
import { IConsts } from "centaurus-ts-sdk";
import { IAccountData } from "../../hooks/useAccountData";
import SettingModal from "../components/Setting";
import { SWAP_OP_MIN_FEE, TOKENS } from "../constants";
import { formatNumber } from "../utils";
import Button from "./Button";
import TokenInput from "./TokenInput";
import aftermathImage from "../../assets/aftermath.png";
import "./TradeAction.css";

type Props = {
  mode: "swap";
  setMode: (mode: "swap") => void;
  isRouteLoading: boolean;
  isSwapTxnLoading: boolean;
  prices: { [key: string]: number };
  payAmount: number | null;
  setPayAmount: (amount: number | null) => void;
  secondAmount: number | null;
  setSecondAmount: (amount: number | null) => void;
  setTypeOnFirst: (typeOnFirst: boolean) => void;
  clearStates: () => void;
  accountData: IAccountData;
  swapFromToken: string;
  swapToToken: string;
  setSwapFromToken: (token: string) => void;
  setSwapToToken: (token: string) => void;
  onChangeToken: () => void;
  confirmSwap: () => void;
  swapFee?: number;
  swapFromTokenList: string[];
  swapToTokenList: string[];
  consts: IConsts;
};

const SwapAction: React.FC<Props> = ({
  mode,
  setMode,
  isRouteLoading,
  isSwapTxnLoading,
  prices,
  payAmount,
  setPayAmount,
  secondAmount,
  setSecondAmount,
  setTypeOnFirst,
  clearStates,
  accountData,
  swapFromToken,
  swapToToken,
  setSwapFromToken,
  setSwapToToken,
  confirmSwap,
  swapFromTokenList,
  swapToTokenList,
  onChangeToken,
  swapFee = 0,
  consts,
}) => {
  const [openSetModal, setOpenSetModal] = useState(false);

  let actionDetail: JSX.Element = <div />;

  const checkValid = () => {
    if (isRouteLoading) {
      return "Finding Route...";
    }

    if (isSwapTxnLoading) {
      return "Swapping...";
    }

    return false;
  };

  const invalid = checkValid();
  if (mode === "swap") {
    actionDetail = (
      <div className="flex-col app-trade-action-detail">
        <TokenInput
          titlePrefix="Pay"
          token={TOKENS.filter((t) => t.symbol === swapFromToken)[0]}
          amount={payAmount}
          usdValue={formatNumber(prices[swapFromToken] * (payAmount || 0))}
          onChange={(e) => {
            setPayAmount(e);
            setTypeOnFirst(true);
          }}
          tokenList={TOKENS.filter((t) => swapFromTokenList.includes(t.symbol))}
          onChangeToken={(t) => {
            onChangeToken();
            if (t.symbol === swapToToken) {
              setSwapToToken(swapFromToken);
            }
            setTypeOnFirst(true);
            setSwapFromToken(t.symbol);
          }}
          showBalance={true}
          balance={
            accountData.balance.filter((b) => b.symbol === swapFromToken)[0]
              ?.balance || 0
          }
          showMax={true}
          onMax={() => {
            let balance =
              accountData.balance.filter((b) => b.symbol === swapFromToken)[0]
                ?.balance || 0;

            if (swapFromToken === "sui") {
              balance = balance - SWAP_OP_MIN_FEE;
              balance = balance < 0 ? 0 : balance;
            }
            setPayAmount(balance);
            setTypeOnFirst(true);
          }}
        />
        <div className="app-trade-action-switch-token"></div>
        <TokenInput
          titlePrefix={"Receive"}
          token={TOKENS.filter((t) => t.symbol === swapToToken)[0]}
          amount={secondAmount}
          usdValue={formatNumber(prices[swapToToken] * (secondAmount || 0))}
          onChange={(e) => {
            setSecondAmount(e);
            setTypeOnFirst(false);
          }}
          tokenList={TOKENS.filter((t) => swapToTokenList.includes(t.symbol))}
          onChangeToken={(t) => {
            onChangeToken();
            if (t.symbol === swapFromToken) {
              setSwapFromToken(swapToToken);
            }
            setSwapToToken(t.symbol);
            setTypeOnFirst(false);
          }}
          showBalance={true}
          balance={
            accountData.balance.filter((b) => b.symbol === swapToToken)[0]
              ?.balance || 0
          }
          editable={false}
        />
        <Button
          buttonStyle={invalid ? "disabled" : "main"}
          text={invalid ? invalid.toString() : `Trade`}
          onClick={() => {
            if (invalid) {
              return;
            }
            confirmSwap();
          }}
          className="app-trade-action-detail-btn"
          isLoading={false}
        />
      </div>
    );
  }
  return (
    <div className="flex-col justify-start app-card-white app-trade-action w-full h-full">
      <div className="app-trade-action-tab flex justify-between">
        <div className="app-swap-action-tab-item">
          Swap
          <img
            src={aftermathImage}
            alt="Aftermath"
            className="aftermath-icon"
          />
        </div>
      </div>
      <div className="flex mt-16 justify-between">
        <div
          onClick={() => {
            setOpenSetModal(true);
          }}
          className="flex items-center app-trade-action-setting justify-center cursor-pointer"
        >
          Setting
        </div>
      </div>
      <SettingModal
        setShowSettingOpen={setOpenSetModal}
        showSettingOpen={openSetModal}
        mode="swap"
      ></SettingModal>
      {actionDetail}
    </div>
  );
};

export default SwapAction;
