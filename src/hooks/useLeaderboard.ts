import { useState, useEffect } from "react";

export interface TraderPoints {
  address: string;
  points: number;
}

const useLeaderboard = (): TraderPoints[] => {
  const [leaderboard, setLeaderboard] = useState<TraderPoints[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://api.centaurusfinance.xyz/leaderboard"
        );
        const data: TraderPoints[] = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return leaderboard;
};

export default useLeaderboard;
