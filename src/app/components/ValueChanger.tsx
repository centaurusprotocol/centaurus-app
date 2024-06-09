import React from 'react';

interface Props {
  originalValue: string;
  newValue?: string;
}

export const ValueChanger: React.FC<Props> = ({ originalValue, newValue }) => {
  return (
    <div>
      {newValue ? (
        <div>
          <del>{originalValue}</del> {`->`} {newValue}
        </div>
      ) : (
        originalValue
      )}
    </div>
  );
};
