import React from 'react';
import Sidebar from '../components/Sidebar';
import CardList from '../components/Cardlist';

function LookupPage() {
    const [selectedId, setSelectedId] = React.useState(null);
    const [checkboxId, setCheckboxId] = React.useState(null);
    const [iucnRedList, setiucnRedList] = React.useState(null);
    const [decree81, setdecree81] = React.useState(null);
    const [decree64, setdecree64] = React.useState(null);
    const [endemic, setendemic] = React.useState(null);
    const [vietnamRedList, setvietnamRedList] = React.useState(null);


    const handleImageClick = (id) => {
        console.log('Image ID:', id);
        setSelectedId(id);  // Lưu giá trị id vào state
        console.log('selectedId ID:', selectedId);
    };

    const handleCheckiucnRedList = (data) => {

        setiucnRedList(data);
        console.log('iucnRedList xxx', data);
    };
    const handleCheckdecree81 = (data) => {

        setdecree81(data)
        console.log('decree81 xxx ', data);
    };
    const handleCheckdecree64 = (data) => {

        setdecree64(data);  // Lưu giá trị id vào state
        console.log('decree64xxx', data);
    };
    const handleCheckendemic = (data) => {

        setendemic(data)  // Lưu giá trị id vào state
        console.log('endemic xxx ', data);
    };
    const handleCheckvietnamRedList = (data) => {

        setvietnamRedList(data)  // Lưu giá trị id vào state
        console.log('vietnamredlist xxx', data);
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
                    <Sidebar onImageClick={handleImageClick} onCheckboxChange={handleCheckboxClick} handleCheckdecree64={handleCheckdecree64} handleCheckdecree81={handleCheckdecree81} handleCheckendemic={handleCheckendemic} handleCheckvietnamRedList={handleCheckvietnamRedList} handleCheckiucnRedList={handleCheckiucnRedList} />
                </div>
                <div className="card-list">
                    <CardList selectedImageId={selectedId} checkboxId={checkboxId} decree81={decree81} iucnRedList={iucnRedList} decree64={decree64} endemic={endemic} vietnamRedList={vietnamRedList} />
                </div>
            </div>
        </div>
    );
}

export default LookupPage;
