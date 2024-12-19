import React from 'react';
import Sidebar from '../components/SidebarAdmin';
import Cardlist from '../components/CardlistAdmin';

function LookupPage() {
    return (
        <div className="app">
            <div className="main">
                <div className="sidebar-right">
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
