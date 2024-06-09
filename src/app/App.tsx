import { useWallet } from "@suiet/wallet-kit";
import React, { useContext, useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import "@mantine/core/styles.css";
import "./App.css";

import Header from "./components/header";
import "@suiet/wallet-kit/style.css";
import "../styles/wallet.css";
import { SnackbarProvider } from "notistack";
import { useNetwork } from "../hooks/useNetwork";
import { getConsts } from "centaurus-ts-sdk";
import {
  IAccountData,
  IWalletStatus,
  UserSignature,
  useAccountData,
} from "../hooks/useAccountData";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { createTheme, MantineProvider } from "@mantine/core";
import Button from "./components/Button";

const theme = createTheme({});

type ContextType = {
  wallet: ReturnType<typeof useWallet>;
  network: ReturnType<typeof useNetwork>;
  consts: ReturnType<typeof getConsts>;
  accountData: IAccountData;
  refreshAccount: () => void;
  prices: { [key: string]: number };
  priceLoading: boolean;
  walletStatus: IWalletStatus;
  userSignature: UserSignature;
};

const App: React.FC = () => {
  const wallet = useWallet();
  const network = useNetwork();
  const consts = getConsts(network);
  const {
    accountData,
    refresh: refreshAccount,
    walletStatus,
    userSignature,
  } = useAccountData(wallet, network, consts);
  const { tokenPrice: prices, isLoading: priceLoading } =
    useTokenPrice(network);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/nu", { replace: true });
  }, [location.pathname, navigate]);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <SnackbarProvider anchorOrigin={{ horizontal: "right", vertical: "top" }}>
        {isLoading ? (
          <div className="global-container loader-container">
            <div className="loader-content">
              <Button
                buttonStyle={"main"}
                text={"Try Centaurus"}
                onClick={() => {
                  setIsLoading(false);
                }}
                isLoading={false}
                className="app-loader-button"
              />
            </div>
          </div>
        ) : (
          <div className="global-container app-container">
            <Header />
            <Outlet
              context={{
                wallet,
                network,
                consts,
                accountData,
                refreshAccount,
                prices,
                priceLoading,
                walletStatus,
                userSignature,
              }}
            />
          </div>
        )}
      </SnackbarProvider>
    </MantineProvider>
  );
};

export function useEssential() {
  return useOutletContext<ContextType>();
}

export default App;
