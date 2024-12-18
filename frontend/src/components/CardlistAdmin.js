import React, { useState } from "react";
import '../StyleCSS/CardlistAdmin.css';
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
        const itemsPerPageGrid = 20;
        const totalPagesGrid = Math.ceil(filteredItems.length / itemsPerPageList);
        const indexOfLastItemGrid = currentPageGrid * itemsPerPageList;
        const indexOfFirstItemGrid = indexOfLastItemGrid - itemsPerPageList;
        const currentItemsGrid = filteredItems.slice(indexOfFirstItemGrid, indexOfLastItemGrid);

        return (
            <div>
                <div className="card-grid">
                    {currentItemsGrid.map((item, index) => (
                        <div className="card" key={index}>
                            <img src={b1} alt="Hình đại diện" className="card-avatar" />
                            <h4>{item.genus}</h4>
                            <p>{item.localName}</p>
                            <p>{item.group}</p>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button
                        onClick={() => setCurrentPageGrid(currentPageGrid - 1)}
                        disabled={currentPageGrid === 1}
                    >
                        Previous
                    </button>
                    <span>{`Page ${currentPageGrid} of ${totalPagesGrid}`}</span>
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

        return (
            <div>
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
                        {currentItemsList.map((item, index) => (
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

                <div className="pagination">
                    <button
                        onClick={() => setCurrentPageList(currentPageList - 1)}
                        disabled={currentPageList === 1}
                    >
                        Previous
                    </button>
                    <span>{`Page ${currentPageList} of ${totalPagesList}`}</span>
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

    const renderView = () => {
        switch (viewMode) {
            case "grid":
                return renderGridView();
            case "list":
                return renderListView();
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
                </div>
            </div>
            {renderView()}
        </div>
    );
};

export default Cardlist;
