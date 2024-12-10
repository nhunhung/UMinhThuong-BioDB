import React from 'react';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'; // Import icons
import '../StyleCSS/Header.css'; // Đường dẫn đến CSS

const Header = () => {
    return (
        <header className="header">
            {/* Logo */}
            <div className="header-logo">
                <img src="logo_UMT.png" alt="Logo" />
            </div>

            {/* Navigation */}
            <nav className="header-nav">
                <a href="/">
                    <AiFillHome className="icon" /> Trang chủ
                </a>
                <a href="/search">
                    <AiOutlineSearch className="icon" /> Tra cứu dữ liệu
                </a>
                <a href="/contact">Liên hệ</a>
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
