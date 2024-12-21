import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng điều hướng trong React Router
import Map from "./MapContact";
import "./../StyleCSS/ContactForm.css";

const ContactForm = () => {
  const [fullName, setFullName] = useState(""); // Giữ ô nhập họ và tên
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // Kiểm tra token
    if (!token) {
      alert("Bạn cần đăng nhập để gửi tin nhắn.");
      navigate("/login"); // Điều hướng đến trang đăng nhập
      return;
    }

    try {
      const currentDate = new Date().toISOString(); // Lấy ngày gửi mặc định là ngày hiện tại
      const userId = 2; // Lấy id của user gửi, cần gán giá trị từ state hoặc context quản lý thông tin user

      const response = await fetch("http://localhost:3001/api/message/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          content: message,
          sent_date: currentDate,
          status: "sent", 
          users_id: userId, // Gán id người gửi tin nhắn
          fullName: fullName // Giữ ô nhập họ và tên
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Tin nhắn của bạn đã được gửi thành công!");
        setMessage(""); // Reset dữ liệu sau khi gửi thành công
        setFullName(""); // Reset ô nhập họ và tên
      } else {
        alert(`Lỗi: ${result.message}`);
      }
    } catch (error) {
      alert("Đã xảy ra lỗi khi gửi tin nhắn.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Bên trái: Map */}
        <div className="map-container">
          <Map />
        </div>

        {/* Bên phải: Form liên hệ */}
        <div className="form-container">
          <h2>Liên hệ với chúng tôi</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Nội dung tin nhắn</label>
              <textarea
                id="message"
                name="message"
                placeholder="Nội dung tin nhắn"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
