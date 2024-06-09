import { useEffect, useState } from 'react';

interface CryptoPrice {
  usd_24h_change: number;
}

interface CryptoPriceResponse {
  [key: string]: CryptoPrice;
}

const coingeckoMap: { [key: string]: string } = {
  sui: 'sui',
  btc: 'bitcoin',
  eth: 'ethereum',
  doge: 'dogecoin',
  pepe: 'pepe',
  fsui: 'sui',
  bnb: 'binancecoin',
  dot: 'polkadot',
  avax: 'avalanche-2',
  usdt: 'tether',
  usdc: 'usd-coin',
  sol: 'solana',
  ltc: 'litecoin',
  ada: 'cardano',
};

const useCryptoPriceChange = (cryptoIds: string[]) => {
  const [priceChanges, setPriceChanges] = useState<{ [id: string]: number }>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoPriceChange = async () => {
      try {
        const idsToFetch = cryptoIds;
        const idsParam = idsToFetch.map(e => coingeckoMap[e]).join(',');
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd&include_24hr_change=true`,
          {
            headers: {
              accept: 'application/json',
            },
          },
        );

        const data: CryptoPriceResponse = await response.json();
        const changes: { [id: string]: number } = {};

        for (const id of idsToFetch) {
          changes[id] = data[coingeckoMap[id]].usd_24h_change;
        }

        setPriceChanges(changes);
        setIsLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setIsLoading(false);
      }
    };

    fetchCryptoPriceChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoIds.join(',')]);

  return { priceChanges, isLoading, error };
};

export default useCryptoPriceChange;
