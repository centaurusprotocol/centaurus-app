import { useEffect, useState } from 'react';

interface IconsMap {
  [key: string]: string;
}

const useSvgIcon = (tokenNames: string[]): IconsMap => {
  const [tokenIcons, setTokenIcons] = useState<IconsMap>({});

  useEffect(() => {
    const loadIcons = async () => {
      const newIcons: IconsMap = {};

      for (const token of tokenNames) {
        try {
          const icon = (await import(`../assets/tokens/${token}.svg`)).default;
          newIcons[token] = icon;
        } catch (error) {
          console.error(`Error loading icon for token '${token}': ${error}`);
        }
      }

      setTokenIcons(newIcons);
    };

    loadIcons();
  }, [tokenNames.join(',')]);

  return tokenIcons;
};

export default useSvgIcon;
