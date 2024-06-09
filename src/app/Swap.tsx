import React, { useEffect, useState } from "react";
import "./Pool.css";

import { useSuiClient } from "@mysten/dapp-kit";
import { router, useAftermathRouter } from "../hooks/useAftermathRouter";
import { useEssential } from "./App";
import SwapAction from "./components/SwapAction";
import {
  DEFAULT_SWAP_FROM_TOKEN,
  DEFAULT_SWAP_TO_TOKEN,
  SWAP_TOKEN_SYMBOLS,
} from "./constants";
import { executeApiCall } from "./utils";

type Props = {
  className?: string;
};

const Swap: React.FC<Props> = (props) => {
  const suiClient = useSuiClient();
  const {
    wallet,
    network,
    consts,
    accountData,
    refreshAccount,
    prices: tokenPrice,
    priceLoading,
  } = useEssential();

  const [payAmount, setPayAmount] = useState<number | null>(null);
  const [nativePayAmount, setNativePayAmount] = useState<bigint>(BigInt(0));
  const [secondSwapAmount, setSecondSwapAmount] = useState<number | null>(null);
  const [typeOnFirst, setTypeOnFirst] = useState(true);
  const [swapFromToken, setSwapFromToken] = useState<string>(
    DEFAULT_SWAP_FROM_TOKEN
  );
  const [swapToToken, setSwapToToken] = useState<string>(DEFAULT_SWAP_TO_TOKEN);
  const [isSwapTxnLoading, setIsSwapTxnLoading] = useState(false);

  // debounced update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (payAmount) {
        setNativePayAmount(
          BigInt(payAmount * 10 ** consts.coins[swapFromToken].decimals)
        );
      } else {
        setNativePayAmount(BigInt(0));
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [payAmount, consts.coins, swapFromToken]);

  const {
    route,
    isLoading: isRouteLoading,
    error: routeFetchError,
    clearRouteState,
  } = useAftermathRouter(
    consts.coins[swapFromToken].module,
    consts.coins[swapToToken].module,
    nativePayAmount
  );

  const clearSwapStates = () => {
    setPayAmount(null);
    clearRouteState();
    setSwapFromToken(DEFAULT_SWAP_FROM_TOKEN);
    setSwapToToken(DEFAULT_SWAP_TO_TOKEN);
    setTypeOnFirst(true);
  };

  const onChangeToken = () => {
    setPayAmount(null);
    setNativePayAmount(BigInt(0));
    clearRouteState();
  };

  useEffect(() => {
    if (route && !isRouteLoading) {
      const toAmount =
        Number(route.coinOut.amount) / 10 ** consts.coins[swapToToken].decimals;

      if (!secondSwapAmount) {
        setSecondSwapAmount(toAmount);
      }
    } else if (!route || isRouteLoading) {
      if (secondSwapAmount) {
        setSecondSwapAmount(null);
      }
    }
  }, [
    route,
    isRouteLoading,
    setSecondSwapAmount,
    secondSwapAmount,
    consts,
    swapToToken,
  ]);

  const swapToken = () => {
    if (!route || isRouteLoading || !wallet.address) {
      return;
    }
    setIsSwapTxnLoading(true);
    executeApiCall(
      async (api) => {
        const priceSlippage = localStorage.getItem("swap-price-slippage")
          ? Number(localStorage.getItem("swap-price-slippage"))
          : 1;

        const tx = await router.getTransactionForCompleteTradeRoute({
          walletAddress: wallet.address!,
          completeRoute: route,
          slippage: priceSlippage,
        });

        return tx;
      },
      (res) => {
        clearSwapStates();
        const txnUrl = `https://suivision.xyz/txblock/${res?.digest}`;
        return (
          <a href={txnUrl} target="_blank" rel="noreferrer">
            {" "}
            Success send tx: {res?.digest}{" "}
          </a>
        );
      },
      (e) => {
        return `Error: ${e.message}`;
      },
      wallet,
      network,
      suiClient,
      [refreshAccount]
    ).finally(() => setIsSwapTxnLoading(false));
  };

  return (
    <div className={`section-container py-5 flex gap-6 !pb-40 sm:!pb-5`}>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[500px]">
          <SwapAction
            mode="swap"
            setMode={() => {}}
            isRouteLoading={isRouteLoading}
            isSwapTxnLoading={isSwapTxnLoading}
            payAmount={payAmount}
            setPayAmount={setPayAmount}
            secondAmount={secondSwapAmount}
            setSecondAmount={setSecondSwapAmount}
            prices={tokenPrice}
            setTypeOnFirst={setTypeOnFirst}
            clearStates={clearSwapStates}
            accountData={accountData}
            swapFromToken={swapFromToken}
            swapToToken={swapToToken}
            setSwapFromToken={setSwapFromToken}
            setSwapToToken={setSwapToToken}
            confirmSwap={swapToken}
            swapFromTokenList={SWAP_TOKEN_SYMBOLS}
            swapToTokenList={SWAP_TOKEN_SYMBOLS}
            onChangeToken={onChangeToken}
            consts={consts}
          />
        </div>
      </div>
    </div>
  );
};

export default Swap;
