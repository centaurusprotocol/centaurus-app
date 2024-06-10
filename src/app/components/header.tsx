import { Burger, Drawer, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ConnectButton } from "@suiet/wallet-kit";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ArrowDownIcon from "../../assets/button-more.svg";
import Discord from "../../assets/discord.svg";
import AppLogo from "../../assets/centaurus-logo.png";

import Telegram from "../../assets/telegram.svg";
import Twitter from "../../assets/twitter.svg";
import "./header.css";

// import SuiSvg from '../../assets/sui.svg'
// import RpcSetting from './Setting/Rpc'
// import { useRpc } from '../../hooks/useRpc'

const Header: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const [bridgeOpened, { open: openBridge, close: closeBridge }] =
    useDisclosure();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const {
  //   isCustom,
  //   setIsCustom,
  //   currentRpcIndex,
  //   setCurrentRpcIndex,
  //   rpcList,
  //   delayTimes,
  // } = useRpc()

  const socialComp = (
    <div className="flex items-center gap-2">
      {/* <div>
        <a
          href="https://discord.gg/6HYG9S2UyC"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "5px" }}
        >
          <img src={Discord} alt="Discord" />
        </a>
      </div>
      <div>
        <a
          href="https://x.com/centaurusfinance"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "5px" }}
        >
          <img src={Twitter} alt="X" />
        </a>
      </div>
      <div>
        <a
          href="https://t.me/centaurusfi"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "5px" }}
        >
          <img src={Telegram} alt="Telegram" />
        </a>
      </div> */}
    </div>
  );

  return (
    <>
      {/* mobile */}
      <div className="section-container flex py-5 sm:!hidden items-center justify-between">
        <div className="flex items-center gap-2 relative z-[10000]">
          <Burger size="sm" opened={opened} onClick={toggle}></Burger>
          <NavLink to="/nu">
            <div className="header-img">
              <img src={AppLogo} alt="Logo" />
            </div>
          </NavLink>
        </div>

        <ConnectButton children="Connect Wallet" />
      </div>
      {/* pc */}
      <div className="section-container hidden app-header sm:flex items-center !mt-0">
        <div className="flex items-center gap-2 flex-shrink-0">
          <NavLink to="/nu">
            <div className="header-img">
              <img src={AppLogo} alt="Logo" />
            </div>
          </NavLink>
          {socialComp}
        </div>

        <nav className="flex align-center justify-center flex-1 mx-[30px] overflow-x-auto">
          <NavLink
            to="/nu"
            className={({ isActive }) =>
              isActive ? "app-header-page-selected" : "app-loader-button"
            }
          >
            Nu Portal
          </NavLink>

          {/* <NavLink
            to="/reward"
            className={({ isActive }) =>
              isActive ? "app-header-page-selected" : "app-loader-button"
            }
          >
            S Rewards
          </NavLink>

          <NavLink
            to="/rank"
            className={({ isActive }) =>
              isActive ? "app-header-page-selected" : "app-loader-button"
            }
          >
            S Rank
          </NavLink> */}

          <Menu
            shadow="md"
            radius={0}
            classNames={{
              dropdown: "!bg-[#323546]",
              item: "!text-xs",
            }}
            arrowPosition="center"
            width={220}
            position="bottom-start"
          >
            <Menu.Target>
              <div className="relative flex items-center lg:!hidden">
                <a>More</a>
                <img
                  src={ArrowDownIcon}
                  alt=""
                  className={"!w-6 -translate-x-4"}
                />
              </div>
            </Menu.Target>

            <Menu.Dropdown></Menu.Dropdown>
          </Menu>
          {/* <NavLink to="/app/stats" className={({isActive}) => isActive? "app-header-page-selected": ""}>Stats</NavLink> */}
          {/* <NavLink to="/app/beta" className={({isActive}) => isActive? "app-header-page-selected": ""}>Beta+</NavLink> */}
          {/* <NavLink to="/app/event" className={({isActive}) => isActive? "app-header-page-selected": ""}>Event</NavLink> */}
          {/* <a
            href="https://centaurus.finance"
            className="!hidden lg:!block"
            target="_blank"
            rel="noreferrer"
          >
            Home Page
          </a>
          <a
            href="https://app.sentio.xyz/share/6ves8lfrm2al2vz8"
            target="_blank"
            rel="noreferrer"
            className="!hidden lg:!block"
          >
            Stats
          </a>
          <a
            href="https://centauruss-organization.gitbook.io/centaurus-fi/trade-on-centaurus/start-trading"
            target="_blank"
            rel="noreferrer"
            className="!hidden lg:!block"
          >
            How to trade
          </a> */}
        </nav>
        <div className="flex-row align-center justify-end">
          <ConnectButton children="Connect Wallet" />
          {/* <RpcSetting
            isCustom={isCustom}
            setIsCustom={setIsCustom}
            currentRpcIndex={currentRpcIndex}
            setCurrentRpcIndex={setCurrentRpcIndex}
            rpcList={rpcList}
            delayTimes={delayTimes}
          /> */}
        </div>
      </div>
      {/* <div className="section-container app-header  flex items-center justify-between !mt-0 !mb-2">
        <Tabs
          value={pathname.slice(1)}
          className="w-full"
          classNames={{
            tab: 'text-base ',
          }}
          color="#0eca82"
          onChange={value => {
            if (value === 'bridge') {
              openBridge();
              return;
            }
            navigate(`/${value}`);
          }}
        >
          <Tabs.List grow>
            <Tabs.Tab classNames={{}} value="trade">
              <div className="flex items-center justify-center">
                <div className="rounded-md bg-secondary p-2 !mr-4 hidden lg:block">
                  <AiFillSliders></AiFillSliders>
                </div>

                <div>
                  <div>Market</div>
                  <div className="hidden lg:block text-xs">
                    Trade Real World Asset
                  </div>
                </div>
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="pool">
              <div className="flex items-center justify-center">
                <div className="rounded-md bg-secondary p-2 !mr-4 hidden lg:block">
                  <MdGeneratingTokens></MdGeneratingTokens>
                </div>

                <div>
                  <div>SLP</div>
                  <div className="hidden lg:block text-xs">
                    Liquidity Provider
                  </div>
                </div>
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="nft">
              <div className="flex items-center justify-center">
                <div className="rounded-md bg-secondary !w-8 !h-8 !items-center !justify-center !mr-4 hidden lg:flex">
                  <HiOutlineCollection></HiOutlineCollection>
                </div>

                <div>
                  <div>"S" Card</div>
                  <div className="hidden lg:block text-xs">Sudo Dynamic NFT</div>
                </div>
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="swap">
              <div className="flex items-center justify-center">
                <div className="rounded-md bg-secondary !w-8 !h-8 !items-center !justify-center !mr-4 hidden lg:flex">
                  <MdOutlineSwapHoriz className="text-lg"></MdOutlineSwapHoriz>
                </div>

                <div>
                  <div>Swap</div>
                  <div className="hidden lg:block text-xs">The Best Price</div>
                </div>
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="bridge">
              <div className="flex items-center justify-center">
                <div className="rounded-md bg-secondary !w-8 !h-8 !items-center !justify-center !mr-4 lg:flex hidden">
                  <FaBridgeWater className="text-xs"></FaBridgeWater>
                </div>

                <div>
                  <div>Bridge</div>
                  <div className="hidden lg:block text-xs">
                    Transfer assets to Sui
                  </div>
                </div>
              </div>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div> */}
      <Drawer
        classNames={{
          content: "bg-secondary",
        }}
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <nav className="!mt-16 flex flex-col gap-4 text-md">
          <NavLink
            to="/scard"
            onClick={close}
            className={({ isActive }) => (isActive ? "!text-green" : "")}
          >
            Nu Portal
          </NavLink>
        </nav>
        <div className="flex justify-center mt-[20vh]">{socialComp}</div>
      </Drawer>
      {/* <BridgeModal opened={bridgeOpened} onClose={closeBridge}></BridgeModal> */}
    </>
  );
};

export default Header;
