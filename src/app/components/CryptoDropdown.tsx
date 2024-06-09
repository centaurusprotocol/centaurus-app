import React, { useState, useRef, useEffect } from "react";
import "./CryptoDropdown.css";
import { Token } from "../models";
import ArrowDownIcon from "../../assets/button-more.svg";
import SearchSvg from "../../assets/search.svg";

interface CryptoDropdownProps {
  options: Token[];
  onChange: (t: Token) => void;
  editable?: boolean;
  selectedCrypto: Token | null;
  title: string;
  keepIconPlaceholder?: boolean;
}

const CryptoDropdown: React.FC<CryptoDropdownProps> = ({
  options,
  onChange,
  editable = true,
  selectedCrypto,
  title,
  keepIconPlaceholder = true,
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

  const handleSelect = (crypto: Token) => {
    onChange(crypto);
    setIsOpen(false);
    setSearchValue("");
    setList(options);
  };
  const handleChange = (val: string) => {
    val = val.replace(/[^a-zA-Z/]/g, "");
    setSearchValue(val);
    if (val) {
      const arr = options.filter((item) =>
        item.symbol.toLowerCase().startsWith(val.toLowerCase())
      );
      setList(arr);
    } else {
      setList(options);
    }
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
  const getTitleBgColor = (name: string) => {
    const data = {
      Pay: "color-blue-bg",
      Long: "color-blue-bg",
      Short: "color-red-bg",
    };
    return data[name as keyof typeof data];
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app-crypto-dropdown-dropdown" ref={dropdownRef}>
      <div
        className="app-crypto-dropdown-header flex-row align-center"
        onClick={() => {
          if (!editable) return;
          setIsOpen(!isOpen);
        }}
      >
        {selectedCrypto
          ? selectedCrypto?.symbolDisplay
          : options[0]?.symbolDisplay}
        {editable ? (
          <img
            src={ArrowDownIcon}
            alt=""
            className={`ease-in app-crypto-dropdown-arrow ${
              isOpen && "app-crypto-dropdown-header-active"
            }`}
          />
        ) : keepIconPlaceholder ? (
          <div />
        ) : (
          ""
        )}
      </div>
      {isOpen && editable && (
        <div className="app-crypto-dropdown-list animation">
          <div className="app-crypto-dropdown-title color-white-text flex">
            <span
              className={`rounded-6 flex mr-8 ${getTitleBgColor(title)}`}
              style={{ width: "20px", height: "20px" }}
            ></span>
            {title}
          </div>

          <div className="flex search rounded-6 pt-4 pb-4 justify-center items-center mt-8 mb-4">
            <img src={SearchSvg} alt="search" className="search-img" />
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              maxLength={10}
              value={searchValue}
              onChange={(e: any) => {
                handleChange(e.target.value);
              }}
            />
          </div>
          <div className="app-crypto-dropdown-max-height">
            {list.map((crypto, index) => (
              <div
                key={index}
                className="app-crypto-dropdown-item"
                onClick={() => handleSelect(crypto)}
              >
                <div>
                  <div className="app-crypto-dropdown-symbol">
                    {crypto.symbolDisplay}
                  </div>
                  <div className="app-crypto-dropdown-name">{crypto.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoDropdown;
