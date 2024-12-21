import React from 'react';
import Sidebar from '../components/Sidebar';
import CardList from '../components/Cardlist';

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
                <div className="sidebar">
                    <Sidebar onImageClick={handleImageClick} />
                </div>
                <div className="card-list">
                    <CardList selectedImageId={selectedId} /> 
                </div>
            </div>
        </div>
    );
}

export default LookupPage;
