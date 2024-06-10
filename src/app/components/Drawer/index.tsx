import { NavLink } from "react-router-dom";
import Medium from "../../../assets/footer/medium.svg";
import Discord from "../../../assets/footer/discord.svg";
import Twitter from "../../../assets/footer/twitter.svg";
import Email from "../../../assets/footer/email.svg";
import Guide from "../../../assets/footer/guide.svg";
import Logo from "../../../assets/footer/logo.svg";
type Props = {
  closeDrawer: () => void;
};
const Drawer = ({ closeDrawer }: Props) => {
  const data = [
    {
      name: "Trade",
      url: "/app/trade",
    },
    {
      name: "Pool",
      url: "/app/pool",
    },
    // {
    //   name: 'Event',
    //   url: '/',
    // },
  ];
  return (
    <div
      className="drawer flex flex-col pl-16 pr-16 font-500 color-white-color"
      onClick={closeDrawer}
    >
      <div className="drawer-text flex flex-col align-end text-16">
        {data.map((item) => {
          return (
            <NavLink
              to={item.url}
              key={item.name}
              className={({ isActive }) =>
                isActive
                  ? "color-blue-bg color-white-text ease-in rounded-6"
                  : "ease-in rounded-6"
              }
            >
              <span>{item.name}</span>
            </NavLink>
          );
        })}
        <a
          href="https://centauruss-organization.gitbook.io/centaurus-fi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Docs</span>
        </a>
      </div>
      <div className="media-link drawer-link flex-col justify-center align-end">
        <a
          href="https://discord.com/invite/RRfXR9VTfd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Discord} alt="Discord" className="app-footer-logo" />
        </a>
        <a
          href="https://twitter.com/centaurusfinance"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Twitter} alt="Twitter" className="app-footer-logo" />
        </a>
        <a
          href="mailto: centaurus.team.fi@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Email} alt="Email" className="app-footer-logo" />
        </a>
        <a
          href="https://centauruss-organization.gitbook.io/centaurus-fi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Guide} alt="Email" className="app-footer-logo" />
        </a>
      </div>
    </div>
  );
};

export default Drawer;
