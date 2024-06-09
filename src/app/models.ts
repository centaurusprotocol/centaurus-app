export interface Token {
  name?: string;
  symbol: string;
  address?: string;
  icon?: string;
  symbolDisplay?: string;
  description?: string;
}

export interface Pair {
  symbol0: string;
  symbol1: string;
  icon: string;
  indexToken: string;
  description: string;
}
