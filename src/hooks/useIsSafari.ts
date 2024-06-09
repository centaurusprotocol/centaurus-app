import { useEffect, useState } from 'react';

const useIsSafari = (): boolean => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isChrome = /Chrome/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !isChrome;
    setIsSafari(isSafari);
  }, []);

  return isSafari;
};

export default useIsSafari;
