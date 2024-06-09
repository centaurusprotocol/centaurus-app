// AfterHourWarning.tsx

import React from 'react';
import './AfterHourWarning.css';
import Countdown from 'react-countdown';

type AfterHourWarningProps = {
  isAfterHour: boolean;
  nextMarketOpenDate: Date | null;
};

const AfterHourWarning: React.FC<AfterHourWarningProps> = ({
  isAfterHour,
  nextMarketOpenDate,
}) => {
  if (!isAfterHour) return null;

  return (
    <div className="afterHourWarning">
      {nextMarketOpenDate && (
        <div className="text-xl lg:text-[24px] leading-snug">
          Market will open in
          <br />
          <Countdown date={nextMarketOpenDate} />
        </div>
      )}
      <p>
        You are not allowed to trade during after hour. Check{' '}
        <a
          href="https://sudos-organization.gitbook.io/sudo-fi/trade-on-sudo/start-trading/market-hours"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          here{' '}
        </a>{' '}
        for details.{' '}
      </p>
    </div>
  );
};

export default AfterHourWarning;
