import { useEffect, useState } from 'react';
import axios from 'axios';

interface MarketInfo {
  market_type: string;
  region: string;
  primary_exchanges: string;
  local_open: string;
  local_close: string;
  current_status: string;
  notes: string;
}

interface ApiResponse {
  endpoint: string;
  markets: MarketInfo[];
}

export const checkIsMarketHoliday = async () => {
  const today = new Date().toISOString().split('T')[0];
  // This is the Google Calendar of the USA market holidays. See post: https://stackoverflow.com/a/55952056
  const calendarId = '2jpqg4chp4djba5ea99b22b838@group.calendar.google.com';
  const googleApiKey = 'AIzaSyBfdxejdlwL54tcot7ZG6sodBtSOavi2zw';

  // Build the Google Calendar API request URL
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId,
  )}/events`;
  const params = {
    key: googleApiKey,
    maxResults: 1,
    timeMin: `${today}T09:00:00+00:00`, // if we put 00:00:01, the API still returns the previous holiday in the response
    timeMax: `${today}T23:59:59+00:00`,
  };

  try {
    const response = await axios.get(url, { params });
    const isHoliday = response.data.items && response.data.items.length > 0;
    return isHoliday;
  } catch (error) {
    console.error('Failed to fetch market holidays: ', error);
  }
};

const getNextMarketOpenDate = async () => {
  const now = new Date();
  const currentEasternTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/New_York' }),
  );

  const offset = now.getTime() - currentEasternTime.getTime();

  const currentHour = currentEasternTime.getHours();

  const nextMarketOpenDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/New_York' }),
  );

  const isHoliday = await checkIsMarketHoliday();

  if (!isHoliday) {
    if (currentEasternTime.getDay() === 0) {
      nextMarketOpenDate.setDate(currentEasternTime.getDate() + 1);
      nextMarketOpenDate.setHours(9, 30, 0, 0);
    } else if (currentEasternTime.getDay() === 6) {
      nextMarketOpenDate.setDate(currentEasternTime.getDate() + 2);
      nextMarketOpenDate.setHours(9, 30, 0, 0);
    } else if (currentEasternTime.getDay() === 5) {
      if (currentHour >= 16) {
        nextMarketOpenDate.setDate(currentEasternTime.getDate() + 3);
      }
      nextMarketOpenDate.setHours(9, 30, 0, 0);
    } else if (
      currentEasternTime.getDay() > 0 &&
      currentEasternTime.getDay() <= 4
    ) {
      if (currentHour >= 16) {
        nextMarketOpenDate.setDate(currentEasternTime.getDate() + 1);
      }
      nextMarketOpenDate.setHours(9, 30, 0, 0);
    }
  } else {
    // if current day is market holiday, return next day as the market open day for day 1 - day 4
    if (currentEasternTime.getDay() >= 1 && currentEasternTime.getDay() <= 4) {
      nextMarketOpenDate.setDate(currentEasternTime.getDate() + 1);
      nextMarketOpenDate.setHours(9, 30, 0, 0);
    } else if (currentEasternTime.getDay() === 5) {
      // add 3 days if current holiday is Friday
      nextMarketOpenDate.setDate(currentEasternTime.getDate() + 3);
      nextMarketOpenDate.setHours(9, 30, 0, 0);
    }
  }

  return new Date(nextMarketOpenDate.getTime() + offset);
};

export const useAfterHour = (targetMarket: string) => {
  const [isAfterHour, setIsAfterHour] = useState<boolean | null>(null);
  const [nextMarketOpenDate, setNextMarketOpenDate] = useState<Date | null>(
    null,
  );

  useEffect(() => {
    const checkAfterHours = async () => {
      const isHoliday = await checkIsMarketHoliday();

      // console.log('[afterHourCheck] isHoliday:', isHoliday);

      const now = new Date();
      const easternTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'America/New_York' }),
      );
      const marketOpen = new Date(easternTime.setHours(9, 30, 0, 0));
      const marketClose = new Date(easternTime.setHours(16, 0, 0, 0));
      const currentEasternTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'America/New_York' }),
      );
      const isWeekday =
        currentEasternTime.getDay() >= 1 && currentEasternTime.getDay() <= 5;

      const isWithinMarketHours =
        currentEasternTime >= marketOpen && currentEasternTime < marketClose;

      const marketIsOpen = isWeekday && isWithinMarketHours && !isHoliday;

      // console.log('[afterHourCheck] isWeekday:', isWeekday);
      // console.log(
      //   '[afterHourCheck] isWithinMarketHours:',
      //   isWithinMarketHours,
      // );
      // console.log('[afterHourCheck] marketIsOpen:', marketIsOpen);

      setIsAfterHour(!marketIsOpen);

      if (!marketIsOpen) {
        const nextMarketOpenDate = await getNextMarketOpenDate();
        setNextMarketOpenDate(nextMarketOpenDate);
      } else {
        setNextMarketOpenDate(null);
      }
    };

    checkAfterHours();
  }, [targetMarket]);

  return {
    isAfterHour: isAfterHour ?? false,
    nextMarketOpenDate: nextMarketOpenDate ?? null,
  };
};
