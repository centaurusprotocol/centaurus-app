import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import './Table.css';

interface TableProps {
  className?: string;
  titles: string[];
  rows: (string | JSX.Element)[][];
  loading?: boolean;
  onChange?: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  className,
  titles,
  rows,
  loading = false,
  onChange,
}) => {
  const [current, setCurrent] = useState(1);

  const onShowSizeChange = (page: number) => {
    if (onChange) {
      onChange(page);
    }
    setCurrent(page);
  };

  return (
    <>
      <div
        className={`app-table app-card-white ${className || ''}`}
        style={{
          gridTemplate: `auto 0 repeat(${rows.length}, 50px) / 20px repeat(${titles.length}, auto) 20px`,
        }}
      >
        <div className="app-table-row app-table-row-header">
          <div />
          {titles.map((title, index) => {
            let minWidth = 'auto';
            if (
              [
                'Entry Prc',
                'Mark Prc',
                'Order Type',
                'Mark Price',
                'Txn Detail',
              ].includes(title)
            ) {
              minWidth = '90px';
            } else if (['PNL'].includes(title)) {
              minWidth = '70px';
            } else if (['Adjust', 'Close', 'PNL%'].includes(title)) {
              minWidth = '70px';
            } else if (['Trigger Price'].includes(title)) {
              minWidth = '110px';
            }
            return (
              <div
                className="app-table-header-cell flex-row align-center justify-start"
                key={index}
                style={{
                  minWidth,
                }}
                dangerouslySetInnerHTML={{ __html: title }}
              ></div>
            );
          })}
          <div />
        </div>
        <div
          style={{
            width: '100%',
            height: 16,
            gridColumnStart: '1',
            gridColumnEnd: `${titles.length + 3}`,
            borderTop: '1px solid RGBA(0, 0, 0, 0.15)',
          }}
        />
        {loading ? (
          <div className="app-table-row">
            <div />
            {titles.map((title, index) => (
              <div
                className="app-table-cell flex-row align-center justify-start"
                key={index}
              >
                <Skeleton count={1} width={50} />
              </div>
            ))}
            <div />
          </div>
        ) : (
          rows.map((row, i) => (
            <div className="app-table-row" key={i}>
              <div />
              {row.map((cell, j) => (
                <div
                  className="app-table-cell flex-row align-center justify-start1"
                  key={`${i}${j}`}
                  style={{
                    borderRadius:
                      j === 0
                        ? '10px 0 0 10px'
                        : j === row.length - 1
                          ? '0 10px 10px 0'
                          : '0',
                  }}
                >
                  {cell}
                </div>
              ))}
              <div />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Table;
