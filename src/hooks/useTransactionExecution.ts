import {
  SuiTransactionBlockResponseOptions,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletContextState } from '@suiet/wallet-kit';

import { useSuiClient } from '@mysten/dapp-kit';

// A helper to execute transactions by:
// 1. Signing them using the wallet
// 2. Executing them using the rpc provider
export function useTransactionExecution(wallet: WalletContextState) {
  const provider = useSuiClient();

  // tx: TransactionBlock
  const signAndExecute = async ({
    wallet,
    tx,
    options = { showEffects: true },
  }: {
    wallet: WalletContextState;
    tx: TransactionBlock;
    options?: SuiTransactionBlockResponseOptions | undefined;
  }) => {
    const signedTx = await wallet.signTransactionBlock({
      transactionBlock: tx,
    });

    const res = await provider.executeTransactionBlock({
      transactionBlock: signedTx.transactionBlockBytes,
      signature: signedTx.signature,
      options,
    });

    if (res.timestampMs === null) {
      res.timestampMs = undefined;
    }

    const status =
      (res as SuiTransactionBlockResponse)?.effects?.status.status ===
      'success';

    if (status) return true;
    else throw new Error('Transaction execution failed.');
  };

  return { signAndExecute };
}
