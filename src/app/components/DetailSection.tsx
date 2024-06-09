import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './DetailSection.css';

type Props = {
  title: string;
  content?: string;
  node?: React.ReactNode;
  className?: string;
  active?: boolean;
  contentClassName?: string;
};

const DetailSection: React.FC<Props> = props => {
  const content = props.node || (
    <div
      className={`${
        props.active
          ? 'detail-section-content-active'
          : 'detail-section-content'
      } ${props.contentClassName || ''}`}
    >
      {props.content || <Skeleton width={100} />}
    </div>
  );
  return props.className?.includes('funding') ? (
    <div
      className={`flex-col align-start justify-start detail-section ${props.className}`}
      data-rh-at="bottom"
      data-rh="The purpose of the dynamic rate is to protect the overall security and stability of the protocol in extreme market conditions, when the rate is positive it means that Trader pays SLP, when the rate is negative it means that SLP pays Trader. The values shown are 8-hour averages."
    >
      <div className="detail-section-title">{props.title}</div>
      {content}
    </div>
  ) : props.className?.includes('pool-apr') ? (
    <div
      className={`flex-col align-start justify-start detail-section ${props.className}`}
      data-rh-at="bottom"
      data-rh="SLP receives 100% of the protocol revenue, and the APR calculation is based on a 7-day average."
    >
      <div className="detail-section-title">{props.title}</div>
      {content}
    </div>
  ) : (
    <div
      className={`flex-col align-start justify-start detail-section ${
        props.className || ''
      }`}
    >
      <div className="detail-section-title">{props.title}</div>
      {content}
    </div>
  );
};

export default DetailSection;
