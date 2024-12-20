import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../StyleCSS/LoginForm.css";
import logoUMT from "../assets/logo_UMT.png";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Thêm useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Kiểm tra xem email và mật khẩu có trống không
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/admin-sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Lưu token
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Đăng nhập thành công!");
        navigate("/admin"); // Sử dụng navigate thay cho window.location.href
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logoUMT} alt="Logo" className="logo" />
      </div>
      <div className="login-right">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Tài khoản"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
