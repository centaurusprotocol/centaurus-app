import { useEffect, useState } from 'react';

type GeoLocationResponse = {
  country_name: string;
  // ... other fields from the API response
};

export const useGeoBlocking = () => {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then((data: GeoLocationResponse) => {
        const blockedCountries: string[] = ['United States', 'Canada'];
        setIsBlocked(blockedCountries.includes(data.country_name));
      })
      .catch(error => {
        console.error('Error fetching user location:', error);
        setIsBlocked(null);
      });
    setIsBlocked(false);
  }, []);

  return isBlocked;
};
