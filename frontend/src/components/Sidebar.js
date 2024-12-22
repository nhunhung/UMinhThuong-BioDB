import React, { useEffect, useState } from 'react';
import '../StyleCSS/Sidebar.css';
import a1 from '../assets/images/a1.png';
import a2 from '../assets/images/a2.png';
import a3 from '../assets/images/a3.png';
import a4 from '../assets/images/a4.png';
import a5 from '../assets/images/a5.png';
import a6 from '../assets/images/a6.png';

import a7 from '../assets/images/a7.png';
import a8 from '../assets/images/a8.png';
import a9 from '../assets/images/a9.png';

const Sidebar = ({ onImageClick, onCheckboxChange, handleCheckiucnRedList, handleCheckdecree81, handleCheckdecree64, handleCheckvietnamRedList, handleCheckendemic }) => {
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [isDropdownOpenButton, setIsDropdownOpenButton] = useState(null); // Quản lý trạng thái hiển thị danh sách
  const [selectedOptionsButton, setSelectedOptionsButton] = useState([]); // Lưu trữ các lựa chọn
  const options = ["EX", "EW", "CR", "EN", "VU", "NT", "LC", "DD", "N/A"];
  // const toggleDropdownButton = () => {
  //   setIsDropdownOpenButton(!isDropdownOpenButton);
  // };
  // const handleCheckboxChange = (option) => {
  //   setSelectedOptionsButton((prevSelected) =>
  //     prevSelected.includes(option)
  //       ? prevSelected.filter((item) => item !== option) // Bỏ chọn nếu đã có
  //       : [...prevSelected, option] // Thêm vào danh sách chọn
  //   );
  // };
  const toggleDropdownButton = (index) => {
    setIsDropdownOpenButton(isDropdownOpenButton === index ? null : index);
  };

  // Xử lý khi checkbox được chọn
  // const handleCheckboxChange = (option) => {
  //   console.log('option', option)
  //   setSelectedOptionsButton((prevSelected) =>
  //     prevSelected.includes(option)
  //       ? prevSelected.filter((item) => item !== option)
  //       : [...prevSelected, option]
  //   );
  // };


  const handleCheckboxChangeiucnRedList = (index, option) => {
    console.log('option', option)
    handleCheckiucnRedList(option);
    const updatedSelection = [...selectedOptionsButton];
    updatedSelection[index] = updatedSelection[index] === option ? null : option; // Chỉ chọn một option cho mỗi danh sách
    setSelectedOptionsButton(updatedSelection);
  };
  const handleCheckboxChangedecree81 = (index, option) => {
    console.log('option', option)
    handleCheckdecree81(option)
    const updatedSelection = [...selectedOptionsButton];
    updatedSelection[index] = updatedSelection[index] === option ? null : option; // Chỉ chọn một option cho mỗi danh sách
    setSelectedOptionsButton(updatedSelection);
  };
  const handleCheckboxChangedecree64 = (index, option) => {
    console.log('option', option)
    handleCheckdecree64(option)
    const updatedSelection = [...selectedOptionsButton];
    updatedSelection[index] = updatedSelection[index] === option ? null : option; // Chỉ chọn một option cho mỗi danh sách
    setSelectedOptionsButton(updatedSelection);
  };
  const handleCheckboxChangeendemic = (index, option) => {
    console.log('option', option)
    handleCheckendemic(option)
    const updatedSelection = [...selectedOptionsButton];
    updatedSelection[index] = updatedSelection[index] === option ? null : option; // Chỉ chọn một option cho mỗi danh sách
    setSelectedOptionsButton(updatedSelection);
  };
  const handleCheckboxChangvietnamRedList = (index, option) => {
    console.log('option', option)
    handleCheckvietnamRedList(option)
    const updatedSelection = [...selectedOptionsButton];
    updatedSelection[index] = updatedSelection[index] === option ? null : option; // Chỉ chọn một option cho mỗi danh sách
    setSelectedOptionsButton(updatedSelection);
  };



  //   const handleCheckboxChange = (option) => {
  //     console.log('Label được chọn:', option);
  //     // Cập nhật trạng thái selectedOptionsButton
  //     if (selectedOptionsButton.includes(option)) {
  //         setSelectedOptionsButton(selectedOptionsButton.filter((item) => item !== option));
  //     } else {
  //         setSelectedOptionsButton([...selectedOptionsButton, option]);
  //     }
  // };





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


  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {


      const response = await fetch('http://localhost:3001/api/conservationstatus/get-all', {
        method: 'GET',

      });

      if (!response.ok) {
        throw new Error(`Lỗi API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('data', data);

      if (data.status === 'OK') {
        const formattedAccounts = data.data.map(conservationstatus => ({
          iucnRedList: conservationstatus.iucnRedList,
          decree81: conservationstatus.decree81,
          decree64: conservationstatus.decree64,
          endemic: conservationstatus.endemic,
          vietnamRedList: conservationstatus.vietnamRedList

        }));
        setAccounts(formattedAccounts);
      } else {
        alert('Không thể tải danh sách ');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error.message || error);
    }
  };
  // Loại bỏ phần tử trùng lặp
  const uniqueArray = (array) => [...new Set(array)];

  const iucnRedList = uniqueArray(accounts.map((item) => item.iucnRedList));
  console.log('iu', iucnRedList);

  const decree81 = uniqueArray(accounts.map((item) => item.decree81));
  console.log('decree81', decree81);

  const decree64 = uniqueArray(accounts.map((item) => item.decree64));
  console.log('decree64', decree64);

  const endemic = uniqueArray(accounts.map((item) => item.endemic));
  console.log('endemic', endemic);

  const vietnamRedList = uniqueArray(accounts.map((item) => item.vietnamRedList));
  console.log('vietnamRedList', vietnamRedList);


  return (
    <div className="sidebar">
      <div className="filter-header">
        <h3 className="sidebar-title">Lọc dữ liệu</h3>
        <div className="filter-buttons">
          <button className="apply-btn">Áp dụng</button>
          <button
            className="reset-btn"
            onClick={() => (window.location.href = "http://localhost:3000/search")}
          >
            Xóa lọc
          </button>
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
              <div>
                <button
                  className="filter-button"
                  onClick={() => toggleDropdownButton(0)} // Hiển thị danh sách đầu tiên
                >
                  Danh mục đỏ IUCN
                </button>
                {isDropdownOpenButton === 0 && (
                  <div className="dropdown-menu">
                    {iucnRedList.map((option) => (
                      <div key={option} className="dropdown-item">
                        <input
                          type="checkbox"
                          id={option}
                          checked={selectedOptionsButton[0] === option} // Chỉ cho phép một checkbox được chọn
                          onChange={() => handleCheckboxChangeiucnRedList(0, option)} // Gửi danh sách và option khi thay đổi
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  className="filter-button"
                  onClick={() => toggleDropdownButton(1)} // Hiển thị danh sách thứ hai
                >
                  Sách Đỏ Việt Nam
                </button>
                {isDropdownOpenButton === 1 && (
                  <div className="dropdown-menu">
                    {vietnamRedList.map((option) => (
                      <div key={option} className="dropdown-item">
                        <input
                          type="checkbox"
                          id={option}
                          checked={selectedOptionsButton[1] === option} // Chỉ cho phép một checkbox được chọn
                          onChange={() => handleCheckboxChangvietnamRedList(1, option)} // Gửi danh sách và option khi thay đổi
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  className="filter-button"
                  onClick={() => toggleDropdownButton(2)} // Hiển thị danh sách thứ ba
                >
                  Nghị định số 84/2021/NĐ-CP
                </button>
                {isDropdownOpenButton === 2 && (
                  <div className="dropdown-menu">
                    {decree81.map((option) => (
                      <div key={option} className="dropdown-item">
                        <input
                          type="checkbox"
                          id={option}
                          checked={selectedOptionsButton[2] === option} // Chỉ cho phép một checkbox được chọn
                          onChange={() => handleCheckboxChangedecree81(2, option)} // Gửi danh sách và option khi thay đổi
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  className="filter-button"
                  onClick={() => toggleDropdownButton(3)} // Hiển thị danh sách thứ tư
                >
                  Nghị định số 64/2019/NĐ-CP
                </button>
                {isDropdownOpenButton === 3 && (
                  <div className="dropdown-menu">
                    {decree64.map((option) => (
                      <div key={option} className="dropdown-item">
                        <input
                          type="checkbox"
                          id={option}
                          checked={selectedOptionsButton[3] === option} // Chỉ cho phép một checkbox được chọn
                          onChange={() => handleCheckboxChangedecree64(3, option)} // Gửi danh sách và option khi thay đổi
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
              <div>
                <button
                  className="filter-button"
                  onClick={() => toggleDropdownButton(3)} // Hiển thị danh sách thứ tư
                >
                  Loài đặc hữu
                </button>
                {isDropdownOpenButton === 3 && (
                  <div className="dropdown-menu">
                    {endemic.map((option) => (
                      <div key={option} className="dropdown-item">
                        <input
                          type="checkbox"
                          id={option}
                          checked={selectedOptionsButton[4] === option} // Chỉ cho phép một checkbox được chọn
                          onChange={() => handleCheckboxChangeendemic(4, option)} // Gửi danh sách và option khi thay đổi
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
