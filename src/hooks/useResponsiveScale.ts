import { useEffect } from 'react';

interface UseResponsiveScaleProps {
  minWidth: number;
  maxWidth: number;
  minScale: number;
  maxScale: number;
}

function isFirefox(): boolean {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function useResponsiveScale({
  minWidth,
  maxWidth,
  minScale,
  maxScale,
}: UseResponsiveScaleProps): void {
  useEffect(() => {
    const setScaleFactor = () => {
      const width = window.innerWidth;
      let scaleFactor: number;

      if (isFirefox()) {
        scaleFactor = 1;
      } else if (width <= minWidth) {
        scaleFactor = minScale;
      } else if (width >= maxWidth) {
        scaleFactor = maxScale;
      } else {
        scaleFactor =
          minScale +
          ((maxScale - minScale) * (width - minWidth)) / (maxWidth - minWidth);
      }
    };

    setScaleFactor();
    window.addEventListener('resize', setScaleFactor);

    return () => {
      window.removeEventListener('resize', setScaleFactor);
    };
  }, [minWidth, maxWidth, minScale, maxScale]);
}

export default useResponsiveScale;
