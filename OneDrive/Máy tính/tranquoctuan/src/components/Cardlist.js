import React, { useState } from "react";
import '../StyleCSS/Cardlist.css';



const Cardlist = () => {
    const [viewMode, setViewMode] = useState("grid"); // Quản lý chế độ hiển thị
    const [searchTerm, setSearchTerm] = useState(""); // Quản lý giá trị ô tìm kiếm


    const items = Array(16).fill({
        title: "",
        description: "",
        group: "Nhóm sinh vật:",
        count: ""
    });


    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const renderGridView = () => (
        <div className="card-grid">
            {filteredItems.map((item, index) => (
                <div className="card" key={index}>
                    <img src="placeholder.png" alt="Item" />
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <p>{item.group}</p>
                    <p>{item.count}</p>
                </div>
            ))}
        </div>
    );


    const renderListView = () => (
        <ul className="card-list-view">
            {filteredItems.map((item, index) => (
                <li className="list-item" key={index}>
                    <img src="placeholder.png" alt="Item" />
                    <div>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <p>{item.group}</p>
                        <p>{item.count}</p>
                    </div>
                </li>
            ))}
        </ul>
    );


    const renderStatsView = () => (
        <div className="card-stats">
            <p>Số lượng ghi nhận: {filteredItems.length}</p>
            <p>Số nhóm sinh vật: 1</p>
            <p>Số loài đặc biệt: 2</p>
        </div>
    );


    const renderMapView = () => (
        <div className="card-map">
            <p>Bản đồ sinh vật đang được phát triển...</p>
        </div>
    );


    const renderView = () => {
        switch (viewMode) {
            case "grid":
                return renderGridView();
            case "list":
                return renderListView();
            case "stats":
                return renderStatsView();
            case "map":
                return renderMapView();
            default:
                return renderGridView();
        }
    };


    return (
        <div className="card-list-container">
            <div className="search-and-buttons">
                <input
                    type="text"
                    placeholder="Tìm theo tên khoa học, tên thông thường..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="view-buttons">
                    <button onClick={() => setViewMode("grid")}>Lưới</button>
                    <button onClick={() => setViewMode("list")}>Danh sách</button>
                    <button onClick={() => setViewMode("stats")}>Thống kê</button>
                    <button onClick={() => setViewMode("map")}>Bản đồ</button>
                </div>
            </div>
            {renderView()}
        </div>
    );
};


export default Cardlist;
