// GeoBlockedWarning.tsx

import React from 'react';
import './GeoBlockedWarning.css';

type GeoBlockedWarningProps = {
  isGeoBlocked: boolean;
};

const GeoBlockedWarning: React.FC<GeoBlockedWarningProps> = ({
  isGeoBlocked,
}) => {
  if (!isGeoBlocked) return null;

  return (
    <div className="geoBlockedWarning">
      <strong>Geoblocked</strong>
      <p>
        You are not allowed to use Sudo from a restricted territory (U.S.,
        Canada).
      </p>
    </div>
  );
};

export default GeoBlockedWarning;
