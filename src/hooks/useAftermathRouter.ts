import { Aftermath } from 'aftermath-ts-sdk';
import { useEffect, useState } from 'react';

export const router = new Aftermath('MAINNET').Router();

export function useAftermathRouter(
  swapFromToken: string,
  swapToToken: string,
  swapAmount: bigint,
) {
  const [route, setRoute] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearRouteState = () => {
    setRoute(null);
    setIsLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (isLoading) return;
    if (swapAmount <= 0) return;
    if (route) {
      setRoute(null);
    }

    const swapRequestBody = {
      coinInType: swapFromToken,
      coinOutType: swapToToken,
      coinInAmount: swapAmount,
      referrer:
        '0x9b8b59f9f3361f7491571e9d4bf6e6deb6a896b4b83ef42c9cc7aedee30dfe11',
      externalFee: {
        recipient:
          '0x9b8b59f9f3361f7491571e9d4bf6e6deb6a896b4b83ef42c9cc7aedee30dfe11',
        feePercentage: 0.001,
      },
    };

    const getRoute = async () => {
      setIsLoading(true);
      const route =
        await router.getCompleteTradeRouteGivenAmountIn(swapRequestBody);
      setRoute(route);
    };

    getRoute()
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapFromToken, swapToToken, swapAmount]);

  return {
    route,
    isLoading,
    error,
    clearRouteState,
  };
}
