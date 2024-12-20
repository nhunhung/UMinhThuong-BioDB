import React from 'react';
import InfoL from '../components/InfoL'; 
import InfoR from '../components/InfoR'; 
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