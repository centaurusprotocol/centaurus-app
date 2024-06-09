import React from 'react';
import './InfoList.css';

type Props = {
  className?: string;
  content: [string, string | number | JSX.Element, string?][];
};

const InfoList: React.FC<Props> = ({ className, content }) => {
  return (
    <div className={`app-info-list flex-col ${className || ''}`}>
      {content.map(([title, value, hint]) => (
        <div
          key={title}
          className="app-info-list-row flex-row justify-between align-center"
        >
          <div
            className="app-info-list-row-title"
            data-rh={hint || undefined}
            style={hint ? { textDecoration: 'underline solid' } : {}}
          >
            {title}
          </div>
          <div
            className="app-info-list-row-value"
            data-rh={hint || undefined}
            style={hint ? { textDecoration: 'underline solid' } : {}}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoList;
