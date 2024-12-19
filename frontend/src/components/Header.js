import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import '../StyleCSS/Header.css';

const Header = () => {
    return (
        <header className="header">
            {/* Logo */}
            <div className="header-logo">
                <img src="logo_UMT.png" alt="Logo" />
            </div>

            {/* Navigation */}
            <nav className="header-nav">
                <Link to="/">
                    <AiFillHome className="icon" /> Trang chủ
                </Link>
                <Link to="/search">
                    <AiOutlineSearch className="icon" /> Tra cứu dữ liệu
                </Link>
                <Link to="/contact">Liên hệ</Link>
            </nav>

            {/* Actions */}
            <div className="header-actions">
                <button className="btn-outline">Đăng nhập</button>
                <button className="btn-primary">Tiếng Việt</button>
            </div>
        </header>
    );
};

export default Header;
