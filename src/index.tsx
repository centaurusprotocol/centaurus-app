import { SuiClientProvider } from "@mysten/dapp-kit";
import { WalletProvider } from "@suiet/wallet-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import ReactHintFactory from "react-hint";
import "react-hint/css/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppPage from "./app/App";
import TokenWrapPortal from "./app/TokenWrapPortal";
import { getProviderUrl } from "./app/utils";
import "./common.css";
import { KisokClientProvider } from "./context/KioskClientContext";
import { wallets } from "./services/suiet";
import "./styles/index.scss";

const ReactHint = ReactHintFactory(React);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          defaultNetwork="testnet"
          networks={{
            mainnet: {
              url: getProviderUrl("mainnet"),
            },
            testnet: { url: getProviderUrl("testnet") },
          }}
        >
          <WalletProvider defaultWallets={wallets}>
            <KisokClientProvider>
              <AppPage />
            </KisokClientProvider>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/nu",
        element: <TokenWrapPortal />,
      },
      { path: "*", element: <Navigate to="/nu" replace /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ReactHint autoPosition events />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
