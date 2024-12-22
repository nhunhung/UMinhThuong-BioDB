import React from 'react';
import Sidebar from '../components/SidebarAdmin';
import Cardlist from '../components/CardlistAdmin';

function LookupPage() {

    const [selectedId, setSelectedId] = React.useState(null);

    const handleImageClick = (id) => {
        console.log('Image ID:', id);
        setSelectedId(id);  // Lưu giá trị id vào state
        console.log('selectedId ID:', selectedId);
    };

    return (
        <div className="app">
            <div className="main">
                <div className="sidebar-right">
                    <Sidebar onImageClick={handleImageClick} />
                </div>
                <div className="card-list">
                    <Cardlist selectedImageId={selectedId} />
                </div>
            </div>
        </div>
    );
}

export default LookupPage;
