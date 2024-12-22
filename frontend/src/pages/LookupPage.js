import React from 'react';
import Sidebar from '../components/Sidebar';
import CardList from '../components/Cardlist';

function LookupPage() {
    const [selectedId, setSelectedId] = React.useState(null);
    const [checkboxId, setCheckboxId] = React.useState(null)

    const handleImageClick = (id) => {
        console.log('Image ID:', id);
        setSelectedId(id);  // Lưu giá trị id vào state
        console.log('selectedId ID:', selectedId);
    };

    const handleCheckboxClick = (parentPage) => {
        console.log('parentPage ID:', parentPage);
        setCheckboxId(parentPage);  // Lưu giá trị id vào state
        console.log('parentPage ID:', parentPage);
    };

    return (
        <div className="app">
            <div className="main">
                <div className="sidebar">
                    <Sidebar onImageClick={handleImageClick} onCheckboxChange={handleCheckboxClick} />
                </div>
                <div className="card-list">
                    <CardList selectedImageId={selectedId} checkboxId={checkboxId} /> 
                </div>
            </div>
        </div>
    );
}

export default LookupPage;
