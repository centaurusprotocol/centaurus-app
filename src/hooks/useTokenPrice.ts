import { OracleAPI } from "centaurus-ts-sdk";
import { useEffect, useState, useRef } from "react";

export function useTokenPrice(network: string) {
  const [tokenPrice, setTokenPrice] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const oracleAPI = new OracleAPI(network);

    oracleAPI
      .subOraclePrices(
        Object.keys(oracleAPI.consts.pythFeeder.feeder),
        (priceInfo) => {
          setTokenPrice((prevPrice) => ({
            ...prevPrice,
            [priceInfo.id]: priceInfo
              .getPriceUnchecked()
              .getPriceAsNumberUnchecked(),
          }));
        }
      )
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  return {
    tokenPrice,
    isLoading,
    error,
  };
}
