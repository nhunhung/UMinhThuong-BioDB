import { useState } from 'react';
import { BsFillHouseDoorFill, BsFillTelephoneFill, BsSearch } from "react-icons/bs";

const Header = () => {
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const [language, setLanguage] = useState('vi'); // 'vi' for Vietnamese, 'en' for English

    const toggleLanguageMenu = () => {
        setIsLanguageMenuOpen(!isLanguageMenuOpen);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsLanguageMenuOpen(false);
    };

    const translations = {
        vi: {
            home: "Trang chủ",
            search: "Tra cứu dữ liệu",
            contact: "Liên hệ",
            login: "Đăng nhập",
            language: "Tiếng Việt"
        },
        en: {
            home: "Home",
            search: "Data Search",
            contact: "Contact",
            login: "Login",
            language: "Vietnamese"
        }
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-[rgb(226,232,240)] text-slate-600 transition-all">
            {/* Logo and Menu */}
            <div className="flex items-center">
                <div className="mr-10">
                    <img src="./assets/images/logo-9478606c.png" alt="Logo" className="h-16 w-20 object-contain" />
                </div>
                {/* Menu */}
                <ul className="flex space-x-6">
                    <li className="relative p-2 hover:bg-white hover:shadow-lg rounded transition-all">
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-gray-800 transition-all"
                        >
                            <BsFillHouseDoorFill className="relative z-10" />
                            <span className="relative z-10">{translations[language].home}</span>
                        </a>
                    </li>
                    <li className="relative p-2 hover:bg-white hover:shadow-lg rounded transition-all">
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-gray-800 transition-all"
                        >
                            <BsSearch className="relative z-10" />
                            <span className="relative z-10">{translations[language].search}</span>
                        </a>
                    </li>
                    <li className="relative p-2 hover:bg-white hover:shadow-lg rounded transition-all">
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-gray-800 transition-all"
                        >
                            <BsFillTelephoneFill className="relative z-10" />
                            <span className="relative z-10">{translations[language].contact}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex space-x-4">
                <div className="px-4 py-2 border border-gray-300 bg-white text-[rgb(22,78,99)] rounded shadow-sm hover:bg-[rgb(226,232,240)] cursor-pointer">
                    <a href="#" className="text-black">{translations[language].login}</a>
                </div>
                <div className="relative">
                    <div
                        className="px-4 py-2 border border-gray-300 bg-[rgb(22,78,99)] text-white rounded shadow-sm hover:bg-[rgb(42,93,113)] cursor-pointer"
                        onClick={toggleLanguageMenu}
                    >
                        <span className="text-black">{translations[language].language}</span>
                    </div>
                    {isLanguageMenuOpen && (
                        <div className="absolute right-0 w-36 mt-2 bg-white border border-gray-300 rounded shadow-lg z-50">
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                onClick={() => changeLanguage('vi')}
                            >
                                Tiếng Việt (VN)
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
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
