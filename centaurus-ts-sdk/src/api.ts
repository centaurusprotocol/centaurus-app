import { SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { OracleAPI } from "./oracle";

export class API extends OracleAPI {
  constructor(network: string = "testnet", provider: SuiClient | null = null) {
    super(network, provider);
  }

  #processCoins = (
    tx: TransactionBlock,
    coin: string,
    coinObjects: string[]
  ) => {
    if (coin === "sui") {
      return tx.gas;
    } else {
      if (coinObjects.length > 1) {
        tx.mergeCoins(
          tx.object(coinObjects[0]),
          coinObjects.slice(1).map((coinObject) => tx.object(coinObject))
        );
      }
      return tx.object(coinObjects[0]);
    }
  };

  wrapToken = async (
    coin: string,
    wrappedCoin: string,
    coinObjects: string[],
    amount: number,
    minAmountOut: number = 0
  ) => {
    const tx = new TransactionBlock();
    const coinObject = this.#processCoins(tx, coin, coinObjects);
    const [depositObject] = tx.splitCoins(coinObject, [tx.pure(amount)]);

    tx.moveCall({
      target: `${this.consts.centaurusCore.package}::market::wrap_token`,
      typeArguments: [
        this.consts.coins[wrappedCoin].module,
        this.consts.coins[coin].module,
      ],
      arguments: [
        tx.object(this.consts.centaurusCore.markets[wrappedCoin]),
        depositObject,
        tx.pure(minAmountOut),
      ],
    });
    return tx;
  };

  unwrapToken = async (
    coin: string,
    wrappedCoin: string,
    wrappedCoinObjects: string[],
    amount: number,
    minAmountOut: number = 0
  ) => {
    const tx = new TransactionBlock();
    const wrappedCoinObject = this.#processCoins(
      tx,
      wrappedCoin,
      wrappedCoinObjects
    );
    const [withdrawObject] = tx.splitCoins(wrappedCoinObject, [
      tx.pure(amount),
    ]);

    tx.moveCall({
      target: `${this.consts.centaurusCore.package}::market::unwrap_token`,
      typeArguments: [
        this.consts.coins[wrappedCoin].module,
        this.consts.coins[coin].module,
      ],
      arguments: [
        tx.object(this.consts.centaurusCore.markets[wrappedCoin]),
        withdrawObject,
        tx.pure(minAmountOut),
      ],
    });
    return tx;
  };
}
