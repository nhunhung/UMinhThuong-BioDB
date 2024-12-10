import React, { useState } from "react";
import '../StyleCSS/Cardlist.css';
import L from "leaflet";
/*
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
*/

/*
Cài đặt biểu đồ trước khi chạy. Lệnh: npm install chart.js react-chartjs-2
Cài đặt biểu đồ trước khi chạy. Lệnh: npm install chart.js react-chartjs-2
*/ 

// Đăng ký các phần của Chart.js mà bạn cần sử dụng



const Cardlist = () => {
    const [viewMode, setViewMode] = useState("grid"); // Quản lý chế độ hiển thị
    const [searchTerm, setSearchTerm] = useState(""); // Quản lý giá trị ô tìm kiếm


    const items = Array(36).fill({
        title: "",
        description: "",
        group: "",
        count: ""
    });


    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /*
    // Dữ liệu cho biểu đồ tròn
  const chartData1 = {
    labels: ["undefined", "Thực vật hạt kín", "Khuyết thực vật", "Chim", "Cá", "Thú", "Bò sát", "Động vật không xương sống", "Lưỡng cư"],
    datasets: [
      {
        label: "Loài",
        data: [50, 200, 150, 50, 80, 120, 60, 20, 40], // Giá trị mẫu, back-end sẽ truyền vào
        backgroundColor: [
          "#FFC107", // undefined
          "#4CAF50", // Thực vật hạt kín
          "#FF5722", // Khuyết thực vật
          "#00BCD4", // Chim
          "#3F51B5", // Cá
          "#8BC34A", // Thú
          "#FF9800", // Bò sát
          "#E91E63", // Động vật không xương sống
          "#9C27B0", // Lưỡng cư
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartData2 = {
    labels: ["undefined", "Thực vật hạt kín", "Khuyết thực vật", "Chim", "Cá", "Thú", "Bò sát", "Động vật không xương sống", "Lưỡng cư"],
    datasets: [
      {
        label: "Ghi nhận",
        data: [100, 500, 300, 150, 250, 200, 90, 30, 40], // Giá trị mẫu, back-end sẽ truyền vào
        backgroundColor: [
          "#FFC107", // undefined
          "#4CAF50", // Thực vật hạt kín
          "#FF5722", // Khuyết thực vật
          "#00BCD4", // Chim
          "#3F51B5", // Cá
          "#8BC34A", // Thú
          "#FF9800", // Bò sát
          "#E91E63", // Động vật không xương sống
          "#9C27B0", // Lưỡng cư
        ],
        borderWidth: 1,
      },
    ],
  };

  */


    // Chế độ hiển thị dạng lưới (grid)
    const renderGridView = () => {
        return (
            <div className="card-grid">
                {filteredItems.map((item, index) => (
                    <div className="card" key={index}>
                        <img src={item.avatar} alt="Hình đại diện" className="card-avatar" />
                        <h4>{item.genus}</h4>
                        <p>{item.localName}</p>
                        <p>{item.group}</p>
                    </div>
                ))}
            </div>
        );
    };


    // Chế độ hiển thị dạng danh sách (list)
    const renderListView = () => {
        return (
            <table className="card-list-view">
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
                    {filteredItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.details}</td>
                            <td>
                                <img src={item.avatar} alt="Hình đại diện" className="table-avatar" />
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
        );
    };




    // Chế độ hiển thị dạng đồ thị tròn (stats)

    const renderStatsView = () => (
      <div className="card-stats">
          <p>Số lượng ghi nhận: {filteredItems.length}</p>
          <p>Số nhóm sinh vật: 1</p>
          <p>Số loài đặc biệt: 2</p>
      </div>
  );

    /*
    const renderStatsView = () => (
        <div className="card-stats">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "45%" }}>
              <h4>Loài</h4>
              <Pie data={chartData1} />
            </div>
            <div style={{ width: "45%" }}>
              <h4>Ghi nhận</h4>
              <Pie data={chartData2} />
            </div>
          </div>
        </div>
      );
      */

    

    // Chế độ hiển thị dạng bản đồ (map)
    const renderMapView = () => (
        <div className="card-map">
          <div id="map" style={{ height: "100%" }}></div>
        </div>
      );
    
      // Khởi tạo bản đồ Leaflet
      React.useEffect(() => {
        if (viewMode === "map") {
          const map = L.map("map").setView([9.58739, 105.0552], 10); // Vị trí ban đầu của bản đồ
    
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);
    
          L.marker([9.58739, 105.0552]).addTo(map).bindPopup("Đây là vị trí mẫu").openPopup();
        }
      }, [viewMode]);


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
            <div className="search-and-buttons-row">
                <input
                    type="text"
                    placeholder="Tìm theo tên khoa học, tên thông thường..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
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
