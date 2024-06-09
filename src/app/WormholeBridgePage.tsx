import WormholeBridge, {
  WormholeConnectConfig,
} from '@wormhole-foundation/wormhole-connect';
import './WormholeBridgePage.css';
import Bridge from './components/Bridge';

import React from 'react';

const WormholeBridgePage: React.FC = () => {
  return (
    <div className="section-container bg-primary min-h-[600px]">
      <Bridge></Bridge>
    </div>
  );
};

export default WormholeBridgePage;
