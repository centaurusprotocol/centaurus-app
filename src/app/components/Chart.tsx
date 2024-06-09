import React, { useEffect, useRef } from 'react';
import './Chart.css';
import { localSymbolToOriginal, localSymbolToTradingView } from '../utils';
import { useElementSize } from '@mantine/hooks';

let tvScriptLoadingPromise: any;

type Props = {
  symbol: string;
};

const TradingViewWidget: React.FC<Props> = props => {
  const onLoadScriptRef = useRef();
  const { ref, width } = useElementSize();

  useEffect(
    // @ts-ignore
    () => {
      (onLoadScriptRef as any).current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise(resolve => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(
        () => onLoadScriptRef.current && (onLoadScriptRef as any).current(),
      );

      return () => ((onLoadScriptRef as any).current = null);

      function createWidget() {
        if (
          document.getElementById('tradingview_931d0') &&
          'TradingView' in window
        ) {
          new (window as any).TradingView.widget({
            width: width,
            height: Math.min(460, width * 0.9),
            symbol: `${
              props.symbol === 'fsui'
                ? 'SUIUSD'
                : localSymbolToTradingView(props.symbol)
            }`,
            interval: '15',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            // hide_top_toolbar: true,
            hide_legend: true,
            save_image: false,
            container_id: 'tradingview_931d0',
          });
        }
      }
    },
    [props.symbol, width],
  );

  return (
    <div
      className="tradingview-widget-container flex-row align-center justify-center w-full"
      ref={ref}
    >
      <div id="tradingview_931d0" />
    </div>
  );
};

export default TradingViewWidget;
