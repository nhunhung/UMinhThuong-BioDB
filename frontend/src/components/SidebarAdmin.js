import React, { useState } from 'react';
import '../StyleCSS/SidebarAdmin.css';
import a1 from '../assets/images/a1.png';
import a2 from '../assets/images/a2.png';
import a3 from '../assets/images/a3.png';
import a4 from '../assets/images/a4.png';
import a5 from '../assets/images/a5.png';
import a6 from '../assets/images/a6.png';

import a7 from '../assets/images/a7.png';
import a8 from '../assets/images/a8.png';
import a9 from '../assets/images/a9.png';
const Sidebar = () => {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  // const handleDropdownToggle = (index) => {
  //   setActiveDropdown(activeDropdown === index ? null : index); // Toggle dropdown visibility
  // };
  // const handleDropdownToggle = (index) => {
  //   // Kiểm tra xem index đã mở chưa
  //   if (openDropdowns.includes(index)) {
  //     // Nếu đã mở, loại bỏ index khỏi mảng
  //     setOpenDropdowns(openDropdowns.filter((item) => item !== index));
  //   } else {
  //     // Nếu chưa mở, thêm index vào mảng
  //     setOpenDropdowns([...openDropdowns, index]);
  //   }
  // };
  // Dữ liệu nhóm sinh vật

  const handleDropdownToggle = (id) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const animalGroups = [
    { image: a1, label: "32" },
    { image: a2, label: "191" },
    { image: a3, label: "46" },
    { image: a4, label: "11" },
    { image: a5, label: "110" },
    { image: a6, label: "15" },
    { image: a7, label: "20" },
    { image: a8, label: "339" },
    { image: a9, label: "3" },
  ];

  return (
    <div className="sidebar-right">
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
          {openDropdowns.includes(1) && (
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
          {openDropdowns.includes(2) && (
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
          {openDropdowns.includes(3) && (
            <div className="filter-content">
              <select className="dropdown-select">
                <option value="">Chọn tên khoa học</option>
                <option value="A">Tên khoa học A</option>
                <option value="B">Tên khoa học B</option>
              </select>
            </div>
          )}
        </div>
        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(4)}
          >
            ► Tên địa phương
          </button>
          {openDropdowns.includes(4) && (
            <div className="filter-content">
              <select className="dropdown-select">
                <option value="">Chọn tên địa phương</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(5)}
          >
            ► Số hiệu
          </button>
          {openDropdowns.includes(5) && (
            <div className="filter-content">
              <select className="dropdown-select">
                <option value="">Chọn số hiệu</option>
                <option value="123">123</option>
                <option value="456">456</option>
              </select>
            </div>
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(6)}
          >
            ► Người ghi nhận
          </button>
          {openDropdowns.includes(6) && (
            <div className="filter-content">
              <select className="dropdown-select">
                <option value="">Chọn người ghi nhận</option>
                <option value="123">A</option>
                <option value="456">BB</option>
              </select>
            </div>
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(7)}
          >
            ► Tình trạng bảo tồn
          </button>
          {openDropdowns.includes(7) && (
            <div className="filter-content">
              <button className="filter-button">Danh mục đỏ IUCN</button>
              <button className="filter-button">Sách Đỏ Việt Nam</button>
              <button className="filter-button">Nghị định số 84/2021/NĐ-CP</button>
              <button className="filter-button">Nghị định số 64/2019/NĐ-CP</button>
            </div>
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(8)}
          >
            ► Loại đặc hữu
          </button>
          {openDropdowns.includes(8) && (
            <div className="filter-content">
              <button className="filter-button">Loài đặc hữu</button>

            </div>
          )}
        </div>

        <div className="filter-box">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownToggle(9)}
          >
            ► Loại ngoại lai
          </button>
          {openDropdowns.includes(9) && (
            <div className="filter-content">
              <button className="filter-button">Loài ngoại lai</button>

            </div>
          )}
        </div>



      </div>
    </div>
  );
};

export default Sidebar;
