type ParsedMessage = {
  module: string;
  errorCode: number;
};

const OPEN_POSITION_INSTRUCTION = 271;
const DECREASE_POSITION_INSTRUCTION = 268;

function parseErrorMessage(message?: string): ParsedMessage | null {
  if (!message) {
    return null;
  }
  const moduleRegex = /Identifier\("(.+?)"\)/;
  const errorCodeRegex = /MoveAbort\(.*?, (\d+)\)/;
  const instructionRegex = /instruction: (\d+)/;

  const moduleMatch = message.match(moduleRegex);
  const errorCodeMatch = message.match(errorCodeRegex);
  const instructionMatch = message.match(instructionRegex);

  if (moduleMatch && errorCodeMatch && instructionMatch) {
    let module = moduleMatch[1];
    const errorCode = parseInt(errorCodeMatch[1]);
    const instruction = parseInt(instructionMatch[1]);

    if (
      instruction === OPEN_POSITION_INSTRUCTION ||
      instruction === DECREASE_POSITION_INSTRUCTION
    ) {
      module = 'position';
    }

    return { module, errorCode };
  }

  return null;
}

const errors: { [key: string]: { [key: number]: string } } = {
  agg_price: {
    1: 'ERR_INVALID_PRICE_FEEDER',
    2: 'ERR_PRICE_STALED',
    3: 'ERR_EXCEED_PRICE_CONFIDENCE',
    4: 'ERR_INVALID_PRICE_VALUE',
  },
  position: {
    1: 'ERR_ALREADY_CLOSED',
    2: 'ERR_POSITION_NOT_CLOSED',
    3: 'ERR_INVALID_PLEDGE',
    4: 'ERR_INVALID_REDEEM_AMOUNT',
    5: 'ERR_INVALID_OPEN_AMOUNT',
    6: 'ERR_INVALID_DECREASE_AMOUNT',
    7: 'ERR_INSUFFICIENT_COLLATERAL',
    8: 'ERR_INSUFFICIENT_RESERVED',
    9: 'ERR_COLLATERAL_VALUE_TOO_LESS',
    10: 'ERR_HOLDING_DURATION_TOO_SHORT',
    11: 'ERR_LEVERAGE_TOO_LARGE',
    12: 'ERR_LIQUIDATION_TRIGGERED',
    13: 'ERR_LIQUIDATION_NOT_TRIGGERED',
    14: 'ERR_EXCEED_MAX_RESERVED',
    15: 'ERR_COLLATERAL_PRICE_EXCEED_THRESHOLD',
  },
  market: {
    1: 'ERR_FUNCTION_VERSION_EXPIRED',
    2: 'ERR_MARKET_ALREADY_LOCKED',
    3: 'ERR_ALREADY_HAS_REFERRAL',
    4: 'ERR_INVALID_DIRECTION',
    5: 'ERR_CAN_NOT_CREATE_ORDER',
    6: 'ERR_CAN_NOT_TRADE_IMMEDIATELY',
    7: 'ERR_VAULT_ALREADY_HANDLED',
    8: 'ERR_SYMBOL_ALREADY_HANDLED',
    9: 'ERR_VAULTS_NOT_TOTALLY_HANDLED',
    10: 'ERR_SYMBOLS_NOT_TOTALLY_HANDLED',
    11: 'ERR_UNEXPECTED_MARKET_VALUE',
    12: 'ERR_MISMATCHED_RESERVING_FEE_MODEL',
    13: 'ERR_SWAPPING_SAME_COINS',
    14: 'ERR_ORDER_COLLATERAL_VALUE_INSUFFICIENT',
    15: 'ERR_UNSUPPORTED_FEE_COIN',
    16: 'ERR_ORDER_FEE_INSUFFICIENT',
    17: 'ERR_INVALID_LIMIT_INDEX_PRICE',
  },
  pool: {
    1: 'ERR_VAULT_DISABLED',
    2: 'ERR_INSUFFICIENT_SUPPLY',
    3: 'ERR_INSUFFICIENT_LIQUIDITY',
    4: 'ERR_COLLATERAL_NOT_SUPPORTED',
    5: 'ERR_OPEN_DISABLED',
    6: 'ERR_DECREASE_DISABLED',
    7: 'ERR_LIQUIDATE_DISABLED',
    8: 'ERR_INVALID_SWAP_AMOUNT',
    9: 'ERR_INVALID_DEPOSIT_AMOUNT',
    10: 'ERR_INVALID_BURN_AMOUNT',
    11: 'ERR_UNEXPECTED_MARKET_VALUE',
    12: 'ERR_AMOUNT_OUT_TOO_LESS',
    13: 'ERR_MISMATCHED_RESERVING_FEE_MODEL',
    14: 'ERR_MISMATCHED_FUNDING_FEE_MODEL',
  },
  orders: {
    1: 'ERR_MISMATCHED_DECREASE_INTENTION',
    2: 'ERR_ORDER_ALREADY_EXECUTED',
    3: 'ERR_INDEX_PRICE_NOT_TRIGGERED',
    4: 'ERR_INVALID_DECREASE_AMOUNT',
  },
};

export function getErrorMessage(message?: string): string | undefined {
  const parsedMessage = parseErrorMessage(message);

  if (parsedMessage) {
    const { module, errorCode } = parsedMessage;
    const error = errors[module]?.[errorCode];

    if (error) {
      if (error === 'ERR_PRICE_STALED') {
        return 'Market is open from 14:30 UTC to 21:00 UTC. Please come back later.';
      }
      return error;
    }
  }

  return message;
}
