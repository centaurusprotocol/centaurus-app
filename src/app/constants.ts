export const TOKENS = [
  {
    name: "Sui",
    symbol: "sui",
    description: "💧 Coin",
    icon: require("../assets/tokens/sui.svg").default,
    symbolDisplay: "SUI",
    tradingViewSymbol: "PYTH:SUIUSD",
    isMarketHourRestricted: false,
  },
  {
    name: "COIN",
    symbol: "coin",
    description: "Biggest licensed crypto exchange in U.S.",
    symbolDisplay: "C?IN",
    tradingViewSymbol: "PYTH:COIN",
    isMarketHourRestricted: true,
  },
  {
    name: "NVDA",
    symbol: "nvda",
    description: "Biggest graphic card and AI chips company",
    symbolDisplay: "NV?A",
    tradingViewSymbol: "PYTH:NVDA",
    isMarketHourRestricted: true,
  },
  {
    name: "Cetus",
    symbol: "cetus",
    description: "🐳 Coin on Sui",
    icon: require("../assets/tokens/cetus.png"),
    symbolDisplay: "CETUS",
    tradingViewSymbol: "PYTH:CETUSUSD",
    isMarketHourRestricted: false,
  },
  {
    name: "Tether (Portal from Ethereum)",
    symbol: "usdt",
    description: "USDT Coin",
    icon: require("../assets/tokens/usdt.svg").default,
    symbolDisplay: "USDT",
    tradingViewSymbol: "PYTH:USDTUSD",
    isMarketHourRestricted: false,
  },
  {
    name: "Centaurus Wrapped USDT",
    symbol: "ctUsdt",
    description: "Centaurus Wrapped USDT coin",
    icon: require("../assets/tokens/usdt.svg").default,
    symbolDisplay: "ctUSDT",
    tradingViewSymbol: "PYTH:USDTUSD",
    isMarketHourRestricted: false,
  },
  {
    name: "Suicune",
    symbol: "hsui",
    symbolDisplay: "HSUI",
    tradingViewSymbol: "",
    isMarketHourRestricted: false,
  },
  {
    name: "Sacabam",
    symbol: "scb",
    symbolDisplay: "SACABAM",
    tradingViewSymbol: "",
    isMarketHourRestricted: false,
  },
  {
    name: "FUD",
    symbol: "fud",
    symbolDisplay: "FUD",
    tradingViewSymbol: "",
    isMarketHourRestricted: false,
  },
  {
    name: "NAVX",
    symbol: "navx",
    symbolDisplay: "NAVX",
    icon: require("../assets/tokens/navx.svg").default,
    tradingViewSymbol: "",
    isMarketHourRestricted: false,
  },
  {
    name: "AFSUI",
    symbol: "afsui",
    symbolDisplay: "afSUI",
    tradingViewSymbol: "",
    isMarketHourRestricted: false,
  },
  {
    name: "USD Coin (Portal from Ethereum)",
    symbol: "usdc",
    icon: require("../assets/tokens/usdc.svg").default,
    symbolDisplay: "USDC",
    tradingViewSymbol: "USDCUSD",
    isMarketHourRestricted: false,
  },
  {
    name: "Sudo Liquidity Token",
    symbol: "slp",
    description: "Sudo LP Coin",
    symbolDisplay: "SLP",
    isMarketHourRestricted: true,
  },
  {
    name: "AAPL",
    symbol: "aapl",
    description: "📱",
    symbolDisplay: "A?PL",
    tradingViewSymbol: "PYTH:AAPL",
    isMarketHourRestricted: true,
  },
  {
    name: "TSLA",
    symbol: "tsla",
    description: "⚡️🚗 starting with T",
    symbolDisplay: "T?LA",
    tradingViewSymbol: "PYTH:TSLA",
    isMarketHourRestricted: true,
  },
  {
    name: "META",
    symbol: "meta",
    description: "M?taverse is coming?",
    symbolDisplay: "M?TA",
    tradingViewSymbol: "PYTH:META",
    isMarketHourRestricted: true,
  },
  {
    name: "TLT",
    symbol: "tlt",
    description: "Long term 💲🏛️",
    symbolDisplay: "T?T",
    tradingViewSymbol: "PYTH:TLT",
    isMarketHourRestricted: true,
  },
  {
    name: "GOVT",
    symbol: "govt",
    description: "1-30 year 💲🏛️",
    symbolDisplay: "G?VT",
    tradingViewSymbol: "PYTH:GOVT",
    isMarketHourRestricted: true,
  },
  {
    name: "BONK",
    symbol: "bonk",
    description: "The solana 🐶 coin",
    icon: require("../assets/tokens/bonk.svg").default,
    symbolDisplay: "BONK",
    tradingViewSymbol: "PYTH:BONKUSD",
    isMarketHourRestricted: false,
  },
  {
    name: "USD",
    symbol: "usd",
    icon: require("../assets/tokens/usd.svg").default,
    symbolDisplay: "USD",
    isMarketHourRestricted: true,
  },
];

export const SWAP_TOKEN_SYMBOLS = [
  "sui",
  "usdc",
  "usdt",
  "fud",
  "hsui",
  "scb",
  "navx",
  "cetus",
  "afsui",
];

export const MINT_TOKEN_SYMBOLS = ["sui", "usdc", "usdt"];

export const MAIN_COLOR = "#0ECA82";

export const LONG_COLOR = "#0ECA82";
export const SHORT_COLOR = "#FA3C58";
export const SWAP_COLOR = "#007AF0";

export const LONG_LEVERAGE_MIN = 1;
export const LONG_LEVERAGE_MAX = 20;
export const LONG_LEVERAGE_STEP = 0.5;

export const SHORT_LEVERAGE_MIN = 1;
export const SHORT_LEVERAGE_MAX = 20;
export const SHORT_LEVERAGE_STEP = 0.5;

export const DEFAULT_INDEX_TOKEN = "sui";
export const DEFAULT_COLLATERAL_TOKEN = "sui";
export const DEFAULT_SWAP_FROM_TOKEN = "sui";
export const DEFAULT_SWAP_TO_TOKEN = "usdc";
export const DEFAULT_LEVERAGE = 10;

export const ACCOUNT_REFRESH_INTERVAL = 5000;
export const PRICE_REFRESH_INTERVAL = 5000;

export const POOL_OP_MIN_FEE = 1;
export const SWAP_OP_MIN_FEE = 1;
export const PERP_OP_MIN_FEE = 0.2;
export const RELAYER_FEE = 1;
