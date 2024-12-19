import React from 'react';
import InfoR from './components/InfoR';
import InfoL from './components/InfoL';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main">
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

export default App;
