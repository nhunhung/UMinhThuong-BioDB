import React, { useState } from 'react';
import '../StyleCSS/Sidebar.css';

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index); // Toggle dropdown visibility
  };

  // Dữ liệu nhóm sinh vật
  const animalGroups = [
    { image: "n1.png", label: "32" },
    { image: "n2.png", label: "191" },
    { image: "n3.png", label: "46" },
    { image: "n4.png", label: "11" },
    { image: "n5.png", label: "110" },
    { image: "n6.png", label: "15" },
    { image: "n7.png", label: "20" },
    { image: "n8.png", label: "339" },
    { image: "n9.png", label: "3" },
  ];

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
        {/* Nhóm sinh vật */}
        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(1)}
          >
            ► Nhóm sinh vật
          </button>
          {activeDropdown === 1 && (
            <div className="animal-groups">
              <div className="group-grid">
                {animalGroups.map((group, index) => (
                  <div className="group-item" key={index}>
                    <img src={group.image} alt={`Group ${index + 1}`} />
                    <p>{group.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Phân loại sinh học */}
        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(2)}
          >
            ► Phân loại sinh học
          </button>
          {activeDropdown === 2 && (
            <div className="classification-list">
              <ul>
                <li>
                  <input type="checkbox" id="animalia" />
                  <label htmlFor="animalia">Animalia</label>
                  <ul>
                    <li>
                      <input type="checkbox" id="chordata" />
                      <label htmlFor="chordata">Chordata</label>
                    </li>
                    <li>
                      <input type="checkbox" id="mollusca" />
                      <label htmlFor="mollusca">Mollusca</label>
                    </li>
                    <li>
                      <input type="checkbox" id="arthropoda" />
                      <label htmlFor="arthropoda">Arthropoda</label>
                    </li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="plantae" />
                  <label htmlFor="plantae">Plantae</label>
                  <ul>
                    <li>
                      <input type="checkbox" id="chordata-plant" />
                      <label htmlFor="chordata-plant">Chordata</label>
                    </li>
                    <li>
                      <input type="checkbox" id="tracheophyta" />
                      <label htmlFor="tracheophyta">Tracheophyta</label>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
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
            ► Số hiệu
          </button>
          {activeDropdown === 4 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(5)}
          >
            ► Người ghi nhận
          </button>
          {activeDropdown === 5 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(6)}
          >
            ► Tình trạng bảo tồn
          </button>
          {activeDropdown === 6 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(7)}
          >
            ► Loại đặc hữu
          </button>
          {activeDropdown === 7 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(8)}
          >
            ► Loại ngoại lai
          </button>
          {activeDropdown === 8 && (
            <input type="text" className="search-input" placeholder="Nhập tên địa phương..." />
          )}
        </div>



      </div>
    </div>
  );
};

export default Sidebar;
