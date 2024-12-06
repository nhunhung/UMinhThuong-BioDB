import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Cardlist from './components/Cardlist';
import './App.css';


function App() {
    return (
        <div className="app">
            <Header />
            <div className="main">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="card-list">
                    <Cardlist />
                </div>
            </div>
        </div>
    );
}




export default App;
