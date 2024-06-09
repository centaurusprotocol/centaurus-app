import { useEffect, useRef, useState } from 'react';
import SettingSvg from '../../../assets/set.svg';

interface Props {
  isCustom: boolean;
  setIsCustom: (state: boolean) => void;
  currentRpcIndex: number;
  setCurrentRpcIndex: (index: number) => void;
  rpcList: { name: string; rpc: string; wss: string }[];
  delayTimes: { number: string; time: number }[];
}

const RpcSetting = ({
  isCustom,
  setIsCustom,
  currentRpcIndex,
  setCurrentRpcIndex,
  rpcList,
  delayTimes,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const statusClass = (data: { number: string; time: number }) => {
    if (Number(data.number) <= 0) return 'red';
    if (data.time < 100) return 'green';
    if (data.time < 1000) return 'orange';
    return 'red';
  };

  const handleIsCustom = (state: boolean) => {
    setIsCustom(state);
    if (state) {
      localStorage.setItem('is-custom-rpc', '1');
    } else {
      localStorage.removeItem('is-custom-rpc');
    }
  };

  const handleCustomRpc = (index: number) => {
    setCurrentRpcIndex(index);
    localStorage.setItem('custom-rpc-index', index.toString());
  };

  return (
    <div className="align-center ml-12 rpc-set" ref={dropdownRef}>
      <img src={SettingSvg} alt="rpc-set" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="rpc-set-container animation">
          <div className="current-rpc-node">
            <div className="rpc-node-text">Current RPC Node</div>
            <div className="current-rpc-node-info">
              <div className="rpc-node-auto">
                {isCustom ? 'Custom' : 'Auto'}
              </div>
              <div className="rpc-name">{rpcList[currentRpcIndex].name}</div>
              <div className="rpc-speed">
                <span>{delayTimes[currentRpcIndex].time || '--'}ms</span>
                <span
                  className={`status ${statusClass(
                    delayTimes[currentRpcIndex],
                  )}`}
                ></span>
              </div>
            </div>
          </div>
          <div className="custom-rpc-node">
            <span>Use a custom RPC node</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isCustom}
                onChange={() => handleIsCustom(!isCustom)}
              />
              <span className="slider"></span>
            </label>
          </div>
          {isCustom && (
            <div className="rpc-node-list-container animation">
              <div className="rpc-node-text">RPC Node</div>
              {rpcList.map((item, index) => (
                <label
                  key={item.name}
                  className="rpc-node-list-item"
                  htmlFor={item.name}
                >
                  <div>
                    <input
                      type="radio"
                      name="radio"
                      id={item.name}
                      checked={currentRpcIndex === index}
                      onChange={() => handleCustomRpc(index)}
                    />
                  </div>
                  <div className="rpc-name">{item.name}</div>
                  <div className="rpc-speed">
                    <span>{delayTimes[index].time || '--'}ms</span>
                    <span
                      className={`status ${statusClass(delayTimes[index])}`}
                    ></span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RpcSetting;
