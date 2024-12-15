import React from "react";
import Map from "./Map";
import "./../StyleCSS/ContactForm.css";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã gửi liên hệ!");
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
