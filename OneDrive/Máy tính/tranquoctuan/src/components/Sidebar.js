import React, { useState } from 'react';
import '../StyleCSS/Sidebar.css';



const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);


  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index); // Toggle dropdown visibility
  };


  return (
    <div className="sidebar">
      <div className="filter-header">
        <h3 className="sidebar-title">Lọc dữ liệu</h3>
        <div className="filter-buttons">
          <button className="apply-btn">Áp dụng</button>
          <button className="reset-btn">Xóa lọc</button>
        </div>
      </div>




      <div className="filter-options">
        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(1)}
          >
            ► Nhóm sinh vật
          </button>
          {activeDropdown === 1 && (
            <input type="text" className="search-input" placeholder="Nhập nhóm sinh vật..." />
          )}
        </div>


        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(2)}
          >
            ► Phân loại sinh học
          </button>
          {activeDropdown === 2 && (
            <input type="text" className="search-input" placeholder="Nhập phân loại sinh học..." />
          )}
        </div>


        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(3)}
          >
            ► Tên khoa học
          </button>
          {activeDropdown === 3 && (
            <input type="text" className="search-input" placeholder="Nhập tên khoa học..." />
          )}
        </div>


        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(4)}
          >
            ► Tên địa phương
          </button>
          {activeDropdown === 4 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>


        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(4)}
          >
            ► Số hiệu
          </button>
          {activeDropdown === 4 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>


        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(4)}
          >
            ► Người ghi nhận
          </button>
          {activeDropdown === 4 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>


        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(4)}
          >
            ► Tình trạng bảo tồn
          </button>
          {activeDropdown === 4 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>


        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(4)}
          >
            ► Loại đặc hữu
          </button>
          {activeDropdown === 4 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>


        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(4)}
          >
            ► Loại ngoại lai
          </button>
          {activeDropdown === 4 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>




        {/* Add more dropdowns as needed */}
      </div>
    </div>
  );
};


export default Sidebar;
