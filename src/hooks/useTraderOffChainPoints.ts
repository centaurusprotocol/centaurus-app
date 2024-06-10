import { useState, useEffect } from "react";

const useTraderOffChainPoints = (address: string): number => {
  const [traderPoints, setTraderPoints] = useState<number>(0);

  useEffect(() => {
    const fetchTraderPoints = async () => {
      try {
        const response = await fetch(
          "https://api.centaurusfinance.xyz/traderPoints?address=" + address
        );
        const data = await response.json();
        setTraderPoints(data.offChainPoints);
      } catch (error) {
        console.error("Error fetching trader points:", error);
      }
    };

    fetchTraderPoints();
  }, [address]);

  return traderPoints;
};

export default useTraderOffChainPoints;
