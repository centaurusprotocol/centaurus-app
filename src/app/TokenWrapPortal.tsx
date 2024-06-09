import React, { useEffect, useState } from "react";

import { useGeoBlocking } from "../hooks/useGeoBlocking";
import { useEssential } from "./App";
import { executeApiCall } from "./utils";

import { useSuiClient } from "@mysten/dapp-kit";
import { Button } from "./components/Base/Button";
import TokenInput from "./components/TokenInput";
import { TOKENS } from "./constants";
import { Token } from "./models";
import { getCoins } from "./utils";

const TokenWrapPortal: React.FC = (props) => {
  const suiClient = useSuiClient();
  const { wallet, network, consts, accountData, refreshAccount, priceLoading } =
    useEssential();

  const [invalid, setInvalid] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [mode, setMode] = useState<"buy" | "sell">("sell");
  const [amount, setAmount] = useState<number | null>(null);
  const [secondAmount, setSecondamount] = useState<number | null>(null);

  console.log("checking account data: ", accountData);

  const [token, setToken] = useState<Token>(
    TOKENS.filter((x) => x.symbol === "usdt")[0]
  );
  const isBlocked = useGeoBlocking();

  useEffect(() => {
    if (isBlocked === null || priceLoading) {
      setInvalid("Loading");
      return;
    }

    if (!accountData.address) {
      setInvalid("Please connect wallet");
      return;
    }
    setInvalid("");
  }, [isBlocked, priceLoading, accountData.address]);

  const clearStates = () => {};

  const wrapToken = () => {
    if (invalid) {
      console.log("returning because invalid");
      return;
    }
    setIsSubmitLoading(true);

    console.log(token.symbol);

    console.log(consts.coins);
    executeApiCall(
      async (api) => {
        const coins = await getCoins(
          accountData.address,
          consts.coins[token.symbol.toLowerCase()].module,
          suiClient
        );

        const coinObjects = coins.map((e) => e.objectId);

        console.log("checking deposit amount: ", amount);
        return api.wrapToken(
          token.symbol,
          "ctUsdt",
          coinObjects,
          (amount || 0) * 10 ** consts.coins[token.symbol].decimals
        );
      },
      (res) => {
        const txnUrl = `https://suivision.xyz/txblock/${res?.digest}`;
        return (
          <a href={txnUrl} target="_blank" rel="noreferrer">
            {" "}
            Success send tx: {res?.digest}{" "}
          </a>
        );
      },
      (e) => {
        console.error(e.stack);
        return `Error: ${e.message}`;
      },
      wallet,
      network,
      suiClient,
      [refreshAccount]
    ).finally(() => setIsSubmitLoading(false));
  };

  const unwrapToken = () => {
    if (invalid) {
      return;
    }
    setIsSubmitLoading(true);
    executeApiCall(
      async (api) => {
        const coins = await getCoins(
          accountData.address,
          consts.coins["ct_usdt"].module,
          suiClient
        );
        const coinObjects = coins.map((e) => e.objectId);
        return api.unwrapToken(
          token.symbol,
          "ctUsdt",
          coinObjects,
          (amount || 0) * 10 ** consts.coins[token.symbol].decimals
        );
      },
      (res) => {
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
    ).finally(() => setIsSubmitLoading(false));
  };

  const depositSlpComponent = (
    <>
      <TokenInput
        token={TOKENS.filter((x) => x.symbol === "usdt")[0]}
        titlePrefix={"Wrap"}
        amount={amount}
        onChange={setAmount}
        onChangeToken={setToken}
        keepIconPlaceholder={false}
        tokenList={TOKENS.filter(
          (x) => x.symbol === "usdt" || x.symbol === "ct_usdt"
        )}
        tokenEditable={mode === "buy"}
        showBalance={true}
        balance={
          accountData.balance.length
            ? mode === "buy"
              ? accountData.balance.filter((e) => e.symbol === token.symbol)[0]
                  ?.balance || 0
              : accountData.balance.filter((e) => e.symbol === "usdt")[0]
                  ?.balance || 0
            : 0
        }
        showMax={true}
        onMax={() => {
          setAmount(
            accountData.balance.filter((e) => e.symbol === "usdt")[0].balance
          );
        }}
      />
      <TokenInput
        token={TOKENS.filter((x) => x.symbol === "ct_usdt")[0]}
        titlePrefix={""}
        isShowColon={false}
        amount={amount}
        onChange={setAmount}
        onChangeToken={setToken}
        keepIconPlaceholder={false}
        tokenList={TOKENS.filter(
          (x) => x.symbol === "ct_usdt" || x.symbol === "usdt"
        )}
        tokenEditable={false}
        showBalance={true}
        balance={
          accountData.balance.length
            ? mode === "buy"
              ? accountData.balance.filter((e) => e.symbol === token.symbol)[0]
                  ?.balance || 0
              : accountData.balance.filter((e) => e.symbol === "ct_usdt")[0]
                  ?.balance || 0
            : 0
        }
        showMax={false}
      />
      {
        <Button onClick={wrapToken} className="app-loader-button bg-primary">
          Wrap
        </Button>
      }
      {/* {
        <Button
          onClick={withdrawSlpFromPrizePool}
          className="app-loader-button bg-primary"
        >
          Unwrap
        </Button>
      } */}
    </>
  );

  // kiosk management screen.
  return (
    <div className={`section-container py-5 sm:py-10 sm:px-14 px-5 relative`}>
      <div>{depositSlpComponent}</div>
    </div>
  );
};

export default TokenWrapPortal;
