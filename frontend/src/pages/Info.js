import React from 'react';
import InfoR from '../components/InfoR';
import InfoL from '../components/InfoL';
import '../App.css';

function Info() {
  return (
    <div className="info-container">
      <div className="info-main">
        <div className="info-left">
          <InfoL />
        </div>
        <div className="info-right">
          <InfoR />
        </div>
      </div>
    </div>
  );
}

export default Info;
