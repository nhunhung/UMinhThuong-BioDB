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


const Sidebar = ({ onImageClick, onCheckboxChange }) => {
  const [openDropdowns, setOpenDropdowns] = useState([1, 2]); // Open the first two dropdowns by default
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const animalGroups = [
    { image: a1, label: "32", id: 1 },
    { image: a2, label: "191", id: 2 },
    { image: a3, label: "46", id: 3 },
    { image: a4, label: "11", id: 4 },
    { image: a5, label: "110", id: 5 },
    { image: a6, label: "15", id: 6 },
    { image: a7, label: "20", id: 7 },
    { image: a8, label: "339", id: 8 },
    { image: a9, label: "3", id: null },
  ];

  const handleImageClick = (id) => {
    console.log('Image ID:', id);
    if (onImageClick) {
      onImageClick(id);
    }
  };

  const handleCheckboxClick = (parentPage) => {
    if (selectedCheckbox === parentPage) {
      setSelectedCheckbox(null);
      onCheckboxChange(null);
    } else {
      setSelectedCheckbox(parentPage);
      onCheckboxChange(parentPage);
    }
  };

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
                {animalGroups.map((group) => (
                  <div className="group-item" key={group.id} onClick={() => handleImageClick(group.id)}>
                    <img src={group.image} alt={`Group ${group.id}`} />
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
                  <input
                    type="checkbox"
                    id="animalia"
                    checked={selectedCheckbox === 1} // Kiểm tra trạng thái
                    onChange={() => handleCheckboxClick(1)} // Gửi parentPage là 1
                  />
                  <label htmlFor="animalia">Animalia</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="plantae"
                    checked={selectedCheckbox === 2} // Kiểm tra trạng thái
                    onChange={() => handleCheckboxClick(2)} // Gửi parentPage là 2
                  />
                  <label htmlFor="plantae">Plantae</label>
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
