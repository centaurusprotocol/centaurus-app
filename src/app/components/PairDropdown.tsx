// PairDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { formatNumber, priceToString } from "../utils";
import "./PairDropdown.css";
import { Pair } from "../models";
import ArrowDownIcon from "../../assets/button-more.svg";
import SearchSvg from "../../assets/search.svg";
interface PairDropdownProps {
  options: Pair[];
  onChange: (indexToken: string) => void;
  editable?: boolean;
  selectedPair: Pair | null;
  prices: { [key: string]: number };
  priceChanges: { [key: string]: number };
}

const PairDropdown: React.FC<PairDropdownProps> = ({
  options,
  onChange,
  editable = true,
  selectedPair,
  prices,
  priceChanges,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState(options);

  useEffect(() => {
    if (isOpen) {
      setList(options);
    }
  }, [isOpen]);

  const handleChange = (val: string) => {
    val = val.replace(/[^a-zA-Z/]/g, "");
    setSearchValue(val);
    if (val) {
      const arr = options.filter((item) =>
        item.symbol0.toLowerCase().startsWith(val.toLowerCase())
      );
      setList(arr);
    } else {
      setList(options);
    }
  };
  const handleSelect = (pair: Pair) => {
    onChange(pair.indexToken);
    setIsOpen(false);
    setSearchValue("");
    setList(options);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchValue("");
      setList(options);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app-pair-dropdown" ref={dropdownRef}>
      <div
        className="app-pair-dropdown_header flex-row align-center app-pair-dropdown_item-icon"
        onClick={() => {
          if (!editable) return;
          setIsOpen(!isOpen);
        }}
        data-rh-at="bottom"
        data-rh={selectedPair?.description}
      >
        {selectedPair ? (
          <>
            {selectedPair.icon && (
              <img
                className={"app-pair-dropdown_header-image"}
                src={selectedPair.icon}
                alt=""
              />
            )}
            {`${selectedPair.symbol0}/${selectedPair.symbol1}`}
          </>
        ) : (
          <>{`${options[0].symbol0}/${options[0].symbol1}`}</>
        )}
        {editable ? (
          <img
            className={`ease-in app-pair-dropdown_arrow ${
              isOpen && "app-crypto-dropdown-header-active"
            }`}
            src={ArrowDownIcon}
            alt=""
          />
        ) : (
          <div />
        )}
      </div>
      {isOpen && editable && (
        <div className="app-pair-dropdown_list animation">
          <div className="flex search rounded-6 pt-4 pb-4 justify-center items-center mt-8 mb-4">
            <img src={SearchSvg} alt="search" className="search-img" />
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              maxLength={15}
              value={searchValue}
              onChange={(e: any) => {
                handleChange(e.target.value);
              }}
            />
          </div>
          <div className="app-crypto-dropdown-max-height">
            {list.map((pair, index) => (
              <div
                key={index}
                className="app-pair-dropdown_item"
                onClick={() => handleSelect(pair)}
              >
                <div className="flex items-center app-pair-dropdown_item-icon">
                  {pair.icon && (
                    <img
                      className={"app-pair-dropdown_crypto-image"}
                      src={pair.icon}
                      alt=""
                    />
                  )}
                  <div className="app-pair-dropdown_pair-symbol ml-8">
                    {pair.symbol0}/{pair.symbol1}
                  </div>
                </div>
                <div className="flex flex-col items-end font-400 ml-8">
                  <span className="color-white-text text-14">
                    {priceToString(prices[pair.indexToken])}
                  </span>
                  {/*                   <span className={`text-14 ${priceChanges[pair.indexToken] < 0 ? 'color-red-text':'color-blue-text 5'}`}>
                    {priceChanges[pair.indexToken] > 0? '+': ''}{formatNumber(priceChanges[pair.indexToken], 2)}%
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PairDropdown;
