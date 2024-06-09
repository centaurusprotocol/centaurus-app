import { WalletContextState } from "@suiet/wallet-kit";
import { useSuiClient } from "@mysten/dapp-kit";
import { suiSymbolToSymbol } from "../app/utils";
import { useState, useEffect, useRef, useCallback } from "react";
import { SLP_TOKEN_DECIMALS, IConsts } from "centaurus-ts-sdk";
import { ACCOUNT_REFRESH_INTERVAL } from "../app/constants";
import { type CoinBalance } from "@mysten/sui.js/client";

export interface ITokenBalance {
  symbol: string;
  balance: number;
}

export interface IAccountData {
  balance: ITokenBalance[];
  address: string;
  suiBalance: number;
}

export interface UserSignature {
  address: string;
  signature: string;
  timestamp: number;
}

export interface IWalletStatus {
  canTrade: boolean;
  canMintNft: boolean;
  traderVolumeLimitSurpassed: boolean;
  traderRanking: number;
  traderPoints: number;
  traderMintTier: string;
}

export const useAccountData = (
  wallet: WalletContextState,
  network: string,
  consts: IConsts
) => {
  const { account } = wallet;
  const emptyData: IAccountData = { balance: [], address: "", suiBalance: 0 };
  const [accountData, setAccountData] = useState<IAccountData>(emptyData);
  const [walletStatus, setWalletStatus] = useState<IWalletStatus>({
    canTrade: false,
    canMintNft: false,
    traderVolumeLimitSurpassed: false,
    traderRanking: 0,
    traderPoints: 0,
    traderMintTier: "Not Available",
  });
  const supportedTokenTypes = Object.values(consts.coins).map((e) => e.module);
  supportedTokenTypes.push(`${consts.centaurusCore.package}::slp::SLP`);
  supportedTokenTypes.push(`0x2::sui::SUI`);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<number>(0);
  const [userSignature, setUserSignature] = useState<UserSignature | null>(
    null
  );
  const [isSigning, setIsSigning] = useState<boolean>(false);

  const fetchIntervalId = useRef<number | null>(null);
  const provider = useSuiClient();

  const refreshWalletStatus = useCallback(async () => {
    if (!userSignature) {
      return;
    }

    const url = `https://api.sudofinance.xyz/verifyWalletStatus`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userSignature }),
    });

    const newWalletStatus = await res.json();

    setWalletStatus({
      ...newWalletStatus,
    });
  }, [userSignature, setWalletStatus]);

  useEffect(() => {
    refreshWalletStatus();
  }, [userSignature, refreshWalletStatus]);

  useEffect(() => {
    if (!account) {
      return;
    }

    refreshUserSignature();

    if (isLoading) return;
    setIsLoading(true);

    Promise.all([provider.getAllBalances({ owner: account?.address })])
      .then((values) => {
        let balances: CoinBalance[] = values[0] as CoinBalance[];

        const suiBalance =
          balances
            .find((balance) => balance.coinType === "0x2::sui::SUI")
            ?.totalBalance.toString() || "0";

        setAccountData({
          balance: balances.map((balance) => {
            const symbol = suiSymbolToSymbol(balance.coinType, consts);
            const decimals =
              symbol === "slp"
                ? SLP_TOKEN_DECIMALS
                : consts.coins[symbol]?.decimals ?? 9;
            return {
              symbol,
              balance:
                parseInt(balance.totalBalance.toString()) / 10 ** decimals,
            };
          }),
          address: account.address,
          suiBalance: parseInt(suiBalance),
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Clear the previous interval
    if (fetchIntervalId.current !== null) {
      window.clearInterval(fetchIntervalId.current);
    }

    // Setup a new interval
    fetchIntervalId.current = window.setInterval(() => {
      setRefreshToken((prevToken) => prevToken + 1);
    }, ACCOUNT_REFRESH_INTERVAL);

    return () => {
      if (fetchIntervalId.current !== null) {
        window.clearInterval(fetchIntervalId.current); // Cleanup interval on component unmount
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, network, refreshToken]);

  const refresh = () => {
    setRefreshToken((prevToken) => prevToken + 1);
  };

  const refreshUserSignature = async () => {
    if (isSigning || !wallet.address) {
      return;
    }

    // refresh if no signature or if user hasn't signed for a day
    if (!userSignature) {
      const signatureFromLocal = JSON.parse(
        localStorage.getItem(`userSignature-${wallet.address}`) || "{}"
      );

      if (
        signatureFromLocal &&
        signatureFromLocal.timestamp >= Date.now() - 86400 * 1000
      ) {
        setUserSignature(signatureFromLocal);
      } else {
        setIsSigning(true);
        try {
          const newSignatureTimestamp = Date.now();
          const signingOutput = await wallet.signMessage({
            message: new TextEncoder().encode(
              `Sign this message to verify your identity on Sudo. Timestamp: ${newSignatureTimestamp}`
            ),
          });
          const freshUserSignature = {
            address: wallet.address,
            signature: signingOutput.signature,
            timestamp: newSignatureTimestamp,
          };

          setUserSignature(freshUserSignature);
          localStorage.setItem(
            `userSignature-${wallet.address}`,
            JSON.stringify(freshUserSignature)
          );
          setIsSigning(false);
        } catch (error) {
          console.error("Failed to sign message: ", error);
          setIsSigning(false);
        }
      }
    } else {
      // always resign after switching wallet
      if (
        userSignature.address !== wallet.address ||
        userSignature.timestamp < Date.now() - 86400 * 1000
      ) {
        setIsSigning(true);
        try {
          const newSignatureTimestamp = Date.now();
          const signingOutput = await wallet.signMessage({
            message: new TextEncoder().encode(
              `Sign this message to verify your identity on Sudo. Timestamp: ${newSignatureTimestamp}`
            ),
          });
          const freshUserSignature = {
            address: wallet.address,
            signature: signingOutput.signature,
            timestamp: newSignatureTimestamp,
          };

          setUserSignature(freshUserSignature);
          localStorage.setItem(
            `userSignature-${wallet.address}`,
            JSON.stringify(freshUserSignature)
          );
          setIsSigning(false);
        } catch (error) {
          console.error("Failed to sign message: ", error);
          setIsSigning(false);
        }
      }
    }
  };

  return {
    accountData,
    isLoading,
    error,
    refresh,
    userSignature,
    walletStatus,
  };
};
