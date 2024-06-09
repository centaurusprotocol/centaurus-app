import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiClient } from "@mysten/sui.js/client";
import { WalletContextState } from "@suiet/wallet-kit";
import { API, IConsts } from "centaurus-ts-sdk";
import { enqueueSnackbar } from "notistack";
import { getErrorMessage } from "./error";
import { TOKENS } from "./constants";
import { useEffect } from "react";

// FIXME: Hack to get around the fact that the SuiClient constructor requires a transport object
export const PACKAGE_VERSION = "0.39.0";
export const TARGETED_RPC_VERSION = "1.7.0";

export const RPC_LIST = {
  devnet: [
    {
      name: "Devnet RPC",
      rpc: "https://explorer-rpc.devnet.sui.io/",
      wss: "wss://explorer-rpc.devnet.sui.io/",
    },
  ],
  testnet: [
    {
      name: "Testnet RPC",
      rpc: "https://fullnode.testnet.sui.io/",
      wss: "wss://fullnode.testnet.sui.io/",
    },
  ],
  mainnet: [
    {
      name: "Sudo RPC",
      rpc: "https://api.shinami.com/node/v1/sui_mainnet_0216f59ebb7cd4b689a0a55de5c9c495",
      wss: "wss://api.shinami.com/node/v1/sui_mainnet_0216f59ebb7cd4b689a0a55de5c9c495",
    },
    {
      name: "Suiscan RPC",
      rpc: "https://rpc-mainnet.suiscan.xyz:443",
      wss: "wss://rpc-mainnet.suiscan.xyz/websocket",
    },
    {
      name: "TestnetPride RPC",
      rpc: "https://sui-rpc-mainnet.testnet-pride.com/",
      wss: "wss://sui-rpc-mainnet.testnet-pride.com/websocket",
    },
    {
      name: "Cosmostation RPC - Canada-2",
      rpc: "https://sui-mainnet-ca-2.cosmostation.io/",
      wss: "wss://sui-mainnet-ca-2.cosmostation.io/",
    },
    {
      name: "Cosmostation RPC - EU-1",
      rpc: "https://sui-mainnet-eu-1.cosmostation.io/",
      wss: "wss://sui-mainnet-eu-1.cosmostation.io/",
    },
    {
      name: "Cosmostation RPC - EU-2",
      rpc: "https://sui-mainnet-eu-2.cosmostation.io/",
      wss: "wss://sui-mainnet-eu-2.cosmostation.io/",
    },
    {
      name: "Cosmostation RPC - EU-3",
      rpc: "https://sui-mainnet-eu-3.cosmostation.io/",
      wss: "wss://sui-mainnet-eu-3.cosmostation.io/",
    },
    {
      name: "Cosmostation RPC - EU-4",
      rpc: "https://sui-mainnet-eu-4.cosmostation.io/",
      wss: "wss://sui-mainnet-eu-4.cosmostation.io/",
    },
    {
      name: "Cosmostation RPC - US-1",
      rpc: "https://sui-mainnet-us-1.cosmostation.io/",
      wss: "wss://sui-mainnet-us-1.cosmostation.io/",
    },
    {
      name: "Cosmostation RPC - US-2",
      rpc: "https://sui-mainnet-us-2.cosmostation.io/",
      wss: "wss://sui-mainnet-us-2.cosmostation.io/",
    },
    {
      name: "Triton One RPC",
      rpc: "https://mainnet.sui.rpcpool.com/",
      wss: "wss://mainnet.sui.rpcpool.com",
    },
    {
      name: "Chainode Tech RPC",
      rpc: "https://sui1mainnet-rpc.chainode.tech/",
      wss: "wss://sui1mainnet-ws.chainode.tech",
    },
    {
      name: "Brightlystake RPC",
      rpc: "https://sui-rpc-mainnet.brightlystake.com/",
      wss: "wss://sui-ws-mainnet.brightlystake.com/",
    },
  ],
};

export function getProvider(network: string = "mainnet") {
  const rpcList = RPC_LIST[network as "mainnet"];
  const currentRpcIndex = localStorage.getItem("custom-rpc-index")
    ? Number(localStorage.getItem("custom-rpc-index"))
    : 0;
  // connect to a custom RPC server
  return new SuiClient({ url: rpcList[currentRpcIndex].rpc });
}

export function getProviderUrl(network: string = "mainnet") {
  const rpcList = RPC_LIST[network as "mainnet"];
  const currentRpcIndex = localStorage.getItem("custom-rpc-index")
    ? Number(localStorage.getItem("custom-rpc-index"))
    : 0;
  return rpcList[currentRpcIndex].rpc;
}

export interface ITokenBalance {
  symbol: string;
  balance: string;
  objectId: string;
}

export async function getCoins(
  owner: string,
  coinType: string,
  suiClient: SuiClient
) {
  let _continue = true;
  let cursor = null;
  let coins: ITokenBalance[] = [];
  while (_continue) {
    const tmp: any = await suiClient.getCoins({ owner, coinType, cursor });
    if (tmp.hasNextPage) {
      cursor = tmp.nextCursor;
    } else {
      _continue = false;
    }
    coins = coins.concat(
      tmp.data.map((coin: any) => ({
        // eslint-disable-next-line
        symbol: coin.coinType.split("::")[2],
        balance: coin.balance.toString(),
        objectId: coin.coinObjectId,
      }))
    );
  }
  return coins;
}

export function formatNumber(
  num: number,
  decimalPlaces: number = 2,
  needComma: boolean = true
): string {
  if (!num) {
    return "0";
  }
  if (!needComma) {
    return num.toFixed(decimalPlaces);
  }
  // Round the number to the specified decimal places
  const multiplier = Math.pow(10, decimalPlaces);
  const roundedNum = Math.round(num * multiplier) / multiplier;

  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = roundedNum.toString().split(".");

  // Add commas to the integer part as thousand separators
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part and the decimal part
  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

export function getAllSymbols(data: any): string[] {
  const symbols: string[] = [];

  for (const key in data) {
    data[key].forEach((item: any) => {
      if (!symbols.includes(item.symbol)) {
        symbols.push(item.symbol);
      }
    });
  }

  return symbols;
}

type ApiCall = (api: API) => Promise<TransactionBlock>;
type OnSuccess = (res: any) => string | JSX.Element;
type OnError = (error: any) => string;

function calculateGasUsed(gasUsed: {
  computationCost: string;
  storageCost: string;
  storageRebate: string;
  nonRefundableStorageFee: string;
}) {
  return (
    BigInt(gasUsed.computationCost) +
    BigInt(gasUsed.storageCost) +
    // BigInt(gasUsed.storageRebate) +
    BigInt(gasUsed.nonRefundableStorageFee)
  );
}

export const executeApiCall = async (
  apiCall: ApiCall,
  onSuccess: OnSuccess,
  onError: OnError,
  wallet: WalletContextState,
  network: string,
  suiClient: SuiClient,
  refreshFunctions: (() => void)[],
  afterTxCallBacks?: (() => void)[],
  showEffects?: boolean,
  showEvents?: boolean
) => {
  const api = new API(network, suiClient);
  try {
    if (!wallet.address || !wallet.account) {
      enqueueSnackbar("Please connect your wallet.", { variant: "default" });
      return;
    }
    const txb = await apiCall(api);
    txb.setSender(wallet.address);
    const dryrunResult = await suiClient.dryRunTransactionBlock({
      transactionBlock: await txb.build({
        client: suiClient,
      }),
    });
    if (dryrunResult.effects.status.status === "failure") {
      enqueueSnackbar(
        onError(new Error(getErrorMessage(dryrunResult.effects.status.error))),
        { variant: "error" }
      );
      return;
    }
    txb.setGasBudget(calculateGasUsed(dryrunResult.effects.gasUsed));
    // txb.setGasBudget(1e9)
    const signedTx = await wallet.signTransactionBlock({
      // @ts-ignore
      transactionBlock: txb,
    });
    const res = await suiClient.executeTransactionBlock({
      transactionBlock: signedTx.transactionBlockBytes,
      signature: signedTx.signature,
      options: {
        showEffects,
        showEvents,
      },
    });
    if (res) {
      enqueueSnackbar("Sending", { variant: "default" });
    }
    if (afterTxCallBacks) {
      for (const afterTxCallBack of afterTxCallBacks) {
        afterTxCallBack();
      }
    }
    const getTransactionBlockWithRetry = async (
      maxRetries = 20,
      interval = 500,
      wait = 3000
    ) => {
      let retries = 0;

      const checkTransactionBlock = async () => {
        try {
          const txb = await suiClient.getTransactionBlock({
            digest: res?.digest,
            options: {
              showEffects: true,
              showEvents,
            },
          });
          if (txb.effects?.status.status === "success") {
            enqueueSnackbar(onSuccess(txb), { variant: "default" });
          } else {
            enqueueSnackbar(
              onError(new Error(getErrorMessage(txb.effects?.status.error))),
              { variant: "default" }
            );
          }
          for (const refreshFunction of refreshFunctions) {
            refreshFunction();
          }
          return true;
        } catch (e) {
          return false;
        }
      };

      const retry = async () => {
        const success = await checkTransactionBlock();

        if (!success && retries < maxRetries) {
          console.log("Retrying..., retries: ", retries);
          retries++;
          setTimeout(retry, interval);
        } else if (!success && retries >= maxRetries) {
          console.log("Max retries reached");
          const txb = await suiClient.getTransactionBlock({
            digest: res?.digest,
            options: {
              showEffects: true,
              showEvents,
            },
          });
          enqueueSnackbar(
            onError(
              new Error(
                "Max retries reached. Please check the block explorer for more details."
              )
            ),
            { variant: "default" }
          );
        }
      };

      await new Promise((resolve) => setTimeout(resolve, wait));
      await retry();
    };

    getTransactionBlockWithRetry().catch((err) => console.error);
  } catch (e: any) {
    if (e.message) {
      enqueueSnackbar(onError(new Error(getErrorMessage(e.message))), {
        variant: "default",
      });
    } else {
      enqueueSnackbar(onError(e), { variant: "default" });
    }
  }
};

export interface IToken {
  name: string;
  decimal: number;
}

export const parseSuiTypeToToken = async (
  provider: SuiClient,
  coinType: string
): Promise<IToken> => {
  const metaInfo = await provider.getCoinMetadata({ coinType });
  const name =
    metaInfo?.name.startsWith("Wrapped") &&
    metaInfo?.symbol.startsWith("W") &&
    metaInfo?.symbol.length >= 4
      ? metaInfo?.symbol.slice(1)
      : metaInfo?.symbol;
  const decimal = metaInfo?.decimals;
  return {
    name: name?.toLowerCase() || "unknown",
    decimal: decimal === undefined ? 9 : decimal,
  };
};

export function suiSymbolToSymbol(symbol: string, consts: IConsts): string {
  if (symbol === "0x2::sui::SUI") {
    return "sui";
  }
  if (symbol === `${consts.centaurusCore.package}::slp::SLP`) {
    return "slp";
  }
  const ret: { [key: string]: string } = {};
  for (const key of Object.keys(consts.coins)) {
    ret[consts.coins[key].module] = key;
  }
  if (symbol in ret) {
    return ret[symbol];
  } else {
    const coinSymbol = symbol.split("::")[1];
    return coinSymbol;
  }
}

export function upperFirstCharacter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getLocalToken(symbol: string) {
  return TOKENS.find((x) => x.symbol === symbol);
}

export function localSymbolToOriginal(symbol: string): string {
  if (!symbol) return "BTC";
  return getLocalToken(symbol)?.symbolDisplay || symbol.toUpperCase();
}

export function localSymbolToTradingView(symbol: string): string {
  if (!symbol) return "BTC";
  return getLocalToken(symbol)?.tradingViewSymbol || symbol.toUpperCase();
}

export function formatNumberWithLeadingZeroInfo(
  num: number,
  maxPrecision: number = 18,
  effectiveDigits: number = 2
): string {
  if (!num) {
    return "0";
  }
  const sign = num < 0 ? "-" : "";
  const absNum = Math.abs(num);
  const parts = absNum.toFixed(maxPrecision).split(".");
  const hasDecimalPart = parts.length === 2;
  const isInteger = Number.isInteger(absNum);
  const leadingZeros =
    !isInteger && hasDecimalPart ? parts[1].match(/^0+/)?.[0]?.length || 0 : 0;
  const significantDigits =
    !isInteger && hasDecimalPart
      ? parts[1].substr(leadingZeros, effectiveDigits)
      : "";

  let leadingZerosOutput = "";
  if (!isInteger) {
    if (leadingZeros > 2) {
      leadingZerosOutput = "0{" + leadingZeros + "}";
    } else if (leadingZeros > 0) {
      leadingZerosOutput = "0".repeat(leadingZeros);
    }
  }

  const formattedNumber =
    sign +
    parts[0] +
    (hasDecimalPart && !isInteger
      ? "." + leadingZerosOutput + significantDigits
      : "");
  return formattedNumber;
}

export function priceToString(price: number, needComma: boolean = true) {
  return price < 1
    ? formatNumberWithLeadingZeroInfo(price, 18, 4)
    : formatNumber(price, 4, needComma);
}

// call async effect in loop
export function useInterval(
  callback: () => void,
  timeout = 10_000,
  callOnStart = true
): void {
  useEffect(() => {
    if (timeout !== Infinity) {
      const interval = setInterval(callback, timeout);
      return () => {
        clearInterval(interval);
      };
    }
  }, [callback, timeout]);

  useEffect(() => {
    if (callOnStart) {
      callback();
    }
  }, [callback, callOnStart]);
}
