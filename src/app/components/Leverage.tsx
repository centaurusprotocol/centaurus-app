import React from 'react';
import './Leverage.css';
import styled from 'styled-components';
import ReactSlider from 'react-slider';
import {
  LONG_COLOR,
  LONG_LEVERAGE_MAX,
  LONG_LEVERAGE_MIN,
  LONG_LEVERAGE_STEP,
} from '../constants';

type LeverageProps = {
  leverage: number;
  onChange: (leverage: number) => void;
  className?: string;
  color?: string;
  min?: number;
  max?: number;
  step?: number;
};

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 20px;
  margin-top: 10px;
`;

const StyledThumb = styled.div`
  height: 20px;
  line-height: 20px;
  width: 20px;
  text-align: center;
  background-color: ${(props: any) => props.backgroundColor};
  color: #fff;
  cursor: grab;
`;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props: any) =>
    props.index === 0 ? props.backgroundColor : '#F6F6F6'};
`;

const Leverage: React.FC<LeverageProps> = ({
  leverage,
  onChange,
  className,
  color = LONG_COLOR,
  min = LONG_LEVERAGE_MIN,
  max = LONG_LEVERAGE_MAX,
  step = LONG_LEVERAGE_STEP,
}) => {
  const Thumb = (props: any, state: any) => (
    <StyledThumb {...props} backgroundColor={color}></StyledThumb>
  );

  const Track = (props: any, state: any) => (
    <StyledTrack {...props} backgroundColor={color} index={state.index} />
  );

  return (
    <div className={`app-leverage flex-col ${className || ''}`}>
      <div className="flex-row justify-between leverage-header align-center">
        <div className="app-leverage-title color-white-text">Leverage</div>
        <div className="app-leverage-input color-white-text font-700 text-14">
          <input
            className="font-700 text-14 color-white-text"
            type="number"
            value={leverage}
            onChange={e => {
              if (Number(e.target.value) > max) {
                onChange(max);
              } else if (Number(e.target.value) > 0) {
                onChange(Number(e.target.value));
              } else {
                // @ts-ignore
                onChange('');
              }
            }}
            onBlur={() => {
              if (leverage < min) {
                onChange(min);
              }
            }}
          />
          <span>x</span>
        </div>
      </div>
      <StyledSlider
        value={leverage}
        renderTrack={Track}
        renderThumb={Thumb}
        thumbActiveClassName="app-trade-leverage-thumb-active"
        onChange={e => onChange(Number(e))}
        min={min}
        max={max}
        step={step}
      />
      <div className="flex-row justify-between app-leverage-num">
        <div>{min}x</div>
        <div>{max}x</div>
      </div>
    </div>
  );
};

export default Leverage;
