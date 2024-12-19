import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../StyleCSS/LoginForm.css';
import logoUMT from '../assets/logo_UMT.png';

const LoginForm = () => {
  const navigate = useNavigate(); 

  const handleGuestClick = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src={logoUMT}
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="login-right">
        <h2>Đăng nhập</h2>
        <form>
          <input
            type="text"
            placeholder="Tài khoản"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="input-field"
          />
          <div className="button-container">
            <button type="submit" className="login-button">
              Đăng nhập
            </button>
            <button
              type="button"
              className="guest-button"
              onClick={handleGuestClick} 
            >
              Khách
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
