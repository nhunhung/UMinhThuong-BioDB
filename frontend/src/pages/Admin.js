import '../StyleCSS/Admin.css';
import React, { useState } from 'react';
import AccountManagement from '../components/AccountManagement';
import UploadExcel from '../components/UploadExcel';
import DataSearch from './LookupPage'

function Admin() {
  const [activeMenu, setActiveMenu] = useState('uploadExcel');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="main">
      <nav className="header">
        <div className="header-left">BIODIVERSITY</div>
        <div className="header-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="account-icon"
            fill="currentColor"
          >
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
          </svg>
          <span className="account-name">quantri@uminhthuong.girs.vn</span>
        </div>
      </nav>



      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul className="menu">
            <li
              className={`menu-item ${activeMenu === 'uploadExcel' ? 'active' : ''}`}
              onClick={() => handleMenuClick('uploadExcel')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="menu-icon"
                fill="currentColor"
              >
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
              <span className="menu-name">Upload Excel</span>
            </li>
            <li
              className={`menu-item ${activeMenu === 'accountManagement' ? 'active' : ''}`}
              onClick={() => handleMenuClick('accountManagement')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="menu-icon"
                fill="currentColor"
              >
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
              </svg>
              <span className="menu-name">Quản trị tài khoản</span>
            </li>
            <li
              className={`menu-item ${activeMenu === 'dataSearch' ? 'active' : ''}`}
              onClick={() => handleMenuClick('dataSearch')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="menu-icon"
                fill="currentColor"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <span className="menu-name">Tra cứu dữ liệu</span>
            </li>
          </ul>
        </aside>

        <div className='body'>
          {activeMenu === 'accountManagement' && <AccountManagement />}
          {activeMenu === 'uploadExcel' && <UploadExcel />}
          {activeMenu === 'dataSearch' && <DataSearch />}
        </div>
      </div>
    </div>
  );
}
export default Admin;
