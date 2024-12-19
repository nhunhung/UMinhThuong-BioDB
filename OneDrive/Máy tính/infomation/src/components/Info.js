import React from 'react';
import InfoL from './InfoL'; 
import InfoR from './InfoR'; 
import '../StyleCSS/Info.css';

function Info() {
  return (
    <div className="Info">
      <div className="info-main">
        <div className="InfoL">
          <InfoL />
        </div>
        <div className="InfoR">
          <InfoR />
        </div>
      </div>
    </div>
  );
}

export default Info;
