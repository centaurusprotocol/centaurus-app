import React from 'react';
import WormholeBridge, {
  WormholeConnectConfig,
} from '@wormhole-foundation/wormhole-connect';

const config: WormholeConnectConfig = {
  env: 'mainnet',
  mode: 'dark',
  bridgeDefaults: {
    toNetwork: 'sui',
    fromNetwork: 'ethereum',
    requiredNetwork: 'sui',
    token: 'USDT',
  },
  rpcs: {
    solana:
      'https://solana-mainnet.rpc.extrnode.com/9dc643c1-d940-481e-9257-5a921851b861',
  },
  pageHeader: '',
  showHamburgerMenu: false,
};

const Bridge: React.FC = () => {
  return <WormholeBridge config={config} />;
};

export default Bridge;
