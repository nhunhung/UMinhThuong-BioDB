import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import { BsFillHouseDoorFill, BsFillTelephoneFill, BsSearch } from "react-icons/bs";

const Header = () => {
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const [language, setLanguage] = useState('vi'); // 'vi' for Vietnamese, 'en' for English
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu người dùng từ localStorage hoặc state đăng nhập
        const userData = JSON.parse(localStorage.getItem('user')) || null;
        setUser(userData);
    }, []);

    const toggleLanguageMenu = () => {
        setIsLanguageMenuOpen(!isLanguageMenuOpen);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsLanguageMenuOpen(false);
    };

    const handleLogout = () => {
        // Xóa dữ liệu user và token khỏi localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    const translations = {
        vi: {
            home: "Trang chủ",
            search: "Tra cứu dữ liệu",
            contact: "Liên hệ",
            login: "Đăng nhập",
            logout: "Đăng xuất",
            welcome: "Xin chào",
            language: "Tiếng Việt"
        },
        en: {
            home: "Home",
            search: "Data Search",
            contact: "Contact",
            login: "Login",
            logout: "Logout",
            welcome: "Welcome",
            language: "Vietnamese"
        }
    };

    return (
        <header className="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-4 tw-bg-[rgb(226,232,240)] tw-text-slate-600 tw-transition-all">
            {/* Logo and Menu */}
            <div className="tw-flex tw-items-center">
                <div className="tw-mr-10">
                    <img src="./assets/images/logo-9478606c.png" alt="Logo" className="tw-h-16 tw-w-20 tw-object-contain" />
                </div>
                {/* Menu */}
                <ul className="tw-flex tw-space-x-6">
                    <li className="tw-relative tw-p-2 hover:tw-bg-white hover:tw-shadow-lg tw-rounded tw-transition-all">
                        <Link to="/" className="tw-flex tw-items-center tw-gap-2 hover:tw-text-gray-800 tw-transition-all">
                            <BsFillHouseDoorFill className="tw-relative tw-z-10" />
                            <span className="tw-relative tw-z-10">{translations[language].home}</span>
                        </Link>
                    </li>
                    <li className="tw-relative tw-p-2 hover:tw-bg-white hover:tw-shadow-lg tw-rounded tw-transition-all">
                        <Link to="/search" className="tw-flex tw-items-center tw-gap-2 hover:tw-text-gray-800 tw-transition-all">
                            <BsSearch className="tw-relative tw-z-10" />
                            <span className="tw-relative tw-z-10">{translations[language].search}</span>
                        </Link>
                    </li>
                    <li className="tw-relative tw-p-2 hover:tw-bg-white hover:tw-shadow-lg tw-rounded tw-transition-all">
                        <Link to="/contact" className="tw-flex tw-items-center tw-gap-2 hover:tw-text-gray-800 tw-transition-all">
                            <BsFillTelephoneFill className="tw-relative tw-z-10" />
                            <span className="tw-relative tw-z-10">{translations[language].contact}</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Đăng nhập / Đăng xuất và Xin chào */}
            <div className="tw-flex tw-items-center tw-space-x-4">
                {user ? (
                    <div className="tw-flex tw-items-center tw-space-x-4">
                        <span className="tw-text-[rgb(22,78,99)]">
                            {translations[language].welcome}, {user.firstname} {user.lastname}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-bg-[rgb(22,78,99)] tw-text-white tw-rounded tw-shadow-sm hover:tw-bg-[rgb(42,93,113)] tw-cursor-pointer"
                        >
                            {translations[language].logout}
                        </button>
                    </div>
                ) : (
                    <div className="tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-bg-white tw-text-[rgb(22,78,99)] tw-rounded tw-shadow-sm hover:tw-bg-[rgb(226,232,240)] tw-cursor-pointer">
                        <Link to="/login" className="tw-text-black">{translations[language].login}</Link>
                    </div>
                )}

                {/* Menu chọn ngôn ngữ */}
                <div className="tw-relative">
                    <div
                        className="tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-bg-[rgb(22,78,99)] tw-text-white tw-rounded tw-shadow-sm hover:tw-bg-[rgb(42,93,113)] tw-cursor-pointer"
                        onClick={toggleLanguageMenu}
                    >
                        <span className="tw-text-black">{translations[language].language}</span>
                    </div>
                    {isLanguageMenuOpen && (
                        <div className="tw-absolute tw-right-0 tw-w-36 tw-mt-2 tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-shadow-lg tw-z-50">
                            <button
                                className="tw-block tw-w-full tw-px-4 tw-py-2 tw-text-left hover:tw-bg-gray-200"
                                onClick={() => changeLanguage('vi')}
                            >
                                Tiếng Việt (VN)
                            </button>
                            <button
                                className="tw-block tw-w-full tw-px-4 tw-py-2 tw-text-left hover:tw-bg-gray-200"
                                onClick={() => changeLanguage('en')}
                            >
                                English (US)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
