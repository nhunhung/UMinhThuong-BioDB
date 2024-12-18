import React from 'react';
import Header from '../layout/header';
import Sidebar from '../components/Sidebar';
import Cardlist from '../components/Cardlist';

function LookupPage() {
    return (
        <div className="app">
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

export default LookupPage;
