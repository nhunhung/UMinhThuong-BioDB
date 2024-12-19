import React, { useState } from "react";
import '../StyleCSS/Cardlist.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import L from 'leaflet';
import '../StyleCSS/leaflet.css';
import b1 from '../assets/images/b1.png';

const Cardlist = () => {
    const [viewMode, setViewMode] = useState("grid"); // Quản lý chế độ hiển thị
    const [searchTerm, setSearchTerm] = useState(""); // Quản lý giá trị ô tìm kiếm
    const [currentPageGrid, setCurrentPageGrid] = useState(1); // Phân trang riêng cho Grid
    const [currentPageList, setCurrentPageList] = useState(1); // Phân trang riêng cho List

    const items = Array(400).fill({
        title: "",
        description: "",
        group: "",
        count: ""
    });

    const itemsPerPageList = 20;

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Phân trang cho list
    const indexOfLastItemList = currentPageList * itemsPerPageList;
    const indexOfFirstItemList = indexOfLastItemList - itemsPerPageList;
    const currentItemsList = filteredItems.slice(indexOfFirstItemList, indexOfLastItemList);

    // Chế độ hiển thị dạng lưới (grid)
    const renderGridView = () => {
        const itemsPerPageGrid = 20; // 20 items mỗi trang
        const totalPagesGrid = Math.ceil(filteredItems.length / itemsPerPageGrid);
        const indexOfLastItemGrid = currentPageGrid * itemsPerPageGrid;
        const indexOfFirstItemGrid = indexOfLastItemGrid - itemsPerPageGrid;
        const currentItemsGrid = filteredItems.slice(indexOfFirstItemGrid, indexOfLastItemGrid);
        return (
            <div>
                {/* Hiển thị các card */}
                <div className="card-grid-user">
                    {currentItemsGrid.map((item, index) => (
                        <div className="card-user" key={index}>
                            <img src={b1} alt="Hình đại diện" className="card-avatar-user" />
                            <h4>{item.genus}</h4>
                            <p>{item.localName}</p>
                            <p>{item.group}</p>
                        </div>
                    ))}
                </div>

                {/* Phân trang */}
                <div className="pagination-user">
                    <button
                        onClick={() => setCurrentPageGrid(currentPageGrid - 1)}
                        disabled={currentPageGrid === 1}
                    >
                        Previous
                    </button>
                    <span>
                        {`Page ${currentPageGrid} of ${totalPagesGrid}`}
                    </span>
                    <button
                        onClick={() => setCurrentPageGrid(currentPageGrid + 1)}
                        disabled={currentPageGrid === totalPagesGrid}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    // Chế độ hiển thị dạng danh sách (list)
    const renderListView = () => {
        const totalPagesList = Math.ceil(filteredItems.length / itemsPerPageList);
        const indexOfLastItemList = currentPageList * itemsPerPageList;
        const indexOfFirstItemList = indexOfLastItemList - itemsPerPageList;
        const currentItemsList = filteredItems.slice(indexOfFirstItemList, indexOfLastItemList);

        return (
            <div>
                <table className="card-list-view-user">
                    <thead>
                        <tr>
                            <th>Chi tiết</th>
                            <th>Hình đại diện</th>
                            <th>Nhóm sinh vật</th>
                            <th>Bộ</th>
                            <th>Họ</th>
                            <th>Chi</th>
                            <th>Tên khoa học</th>
                            <th>Tên tác giả</th>
                            <th>Tên địa phương</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItemsList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.details}</td>
                                <td>
                                    <img src={item.avatar} alt="Hình đại diện" className="table-avatar-user" />
                                </td>
                                <td>{item.group}</td>
                                <td>{item.order}</td>
                                <td>{item.family}</td>
                                <td>{item.genus}</td>
                                <td>{item.scientificName}</td>
                                <td>{item.author}</td>
                                <td>{item.localName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="pagination-user">
                    <button
                        onClick={() => setCurrentPageList(currentPageList - 1)}
                        disabled={currentPageList === 1}
                    >
                        Previous
                    </button>
                    <span>
                        {`Page ${currentPageList} of ${totalPagesList}`}
                    </span>
                    <button
                        onClick={() => setCurrentPageList(currentPageList + 1)}
                        disabled={currentPageList === totalPagesList}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    // Chế độ hiển thị dạng đồ thị tròn (stats)
    const renderStatsView = () => {
        const speciesData = [
            { name: 'undefined', value: 50 },
            { name: 'Thực vật hạt kín', value: 120 },
            { name: 'Khuyết thực vật', value: 80 },
            { name: 'Chim', value: 150 },
            { name: 'Thú', value: 100 },
            { name: 'Bò sát', value: 90 },
            { name: 'Động vật không xương sống', value: 70 },
            { name: 'Lưỡng cư', value: 30 },
            { name: 'Cá', value: 77 },
        ];

        const recordsData = [
            { name: 'undefined', value: 100 },
            { name: 'Thực vật hạt kín', value: 300 },
            { name: 'Khuyết thực vật', value: 200 },
            { name: 'Chim', value: 400 },
            { name: 'Thú', value: 300 },
            { name: 'Bò sát', value: 250 },
            { name: 'Động vật không xương sống', value: 150 },
            { name: 'Lưỡng cư', value: 80 },
            { name: 'Cá', value: 150 },
        ];

        const COLORS = [
            '#f9c74f',
            '#90be6d',
            '#f94144',
            '#43aa8b',
            '#577590',
            '#277da1',
            '#f3722c',
            '#4d908e',
            '#577590',
        ];

        return (
            <div className="card-stats-user" style={{ display: 'flex', justifyContent: 'space-around' }}>
                {/* Biểu đồ 1 */}
                <div>
                    <h3>Loài: 767</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={speciesData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {speciesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                {/* Biểu đồ 2 */}
                <div>
                    <h3>Ghi nhận: 1664</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={recordsData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {recordsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        );
    };

    // Chế độ hiển thị dạng bản đồ (map)
    const renderMapView = () => (
        <div className="card-map-user">
            <div id="map-user" style={{ height: "100%" }}></div>
        </div>
    );

    // Khởi tạo bản đồ Leaflet
    React.useEffect(() => {
        const mapContainer = document.getElementById("map-user");

        if (mapContainer && !mapContainer._leaflet_id) {
            const map = L.map("map-user").setView([9.58739, 105.0552], 10);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([9.58739, 105.0552])
                .addTo(map)
                .bindPopup("Đây là vị trí mẫu")
                .openPopup();

            setTimeout(() => {
                map.invalidateSize(); // Xử lý lỗi không load kích thước
            }, 100);
        }
    }, []);

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
        <div className="card-list-container-user">
            <div className="search-and-buttons-row-user">
                <input
                    type="text"
                    placeholder="Tìm theo tên khoa học, tên thông thường..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar-user"
                />
                <div className="view-buttons-button-user">
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
