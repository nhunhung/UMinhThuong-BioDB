import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server';  // Import ReactDOMServer
import '../StyleCSS/InfoL.css';

const InfoL = () => {
    // State để theo dõi thông tin đang hiển thị (Info1 hoặc Info2)
    const [activeInfo, setActiveInfo] = useState('Info1');
    // State để lưu thông tin của bảng khi nhấn ô chữ nhật
    const [infoDetails, setInfoDetails] = useState('');

    // Hàm hiển thị Info1 (Phân loại sinh học)
    const renderInfo1 = () => {
        const data = {
            gioi: "Plantae",
            nganh: "Tracheophyta",
            lop: "Magnoliopsida",
            bo: "Malvales",
            nhomSinhVat: "Thực vật hạt kín",
            ho: "Malvaceae",
            chi: "Abelmoschus"
        };
    
        return (
            <div className="info1">
                <table>
                    <tbody>
                        <tr>
                            <td>Giới</td>
                            <td>{data.gioi}</td>
                        </tr>
                        <tr>
                            <td>Ngành</td>
                            <td>{data.nganh}</td>
                        </tr>
                        <tr>
                            <td>Lớp</td>
                            <td>{data.lop}</td>
                        </tr>
                        <tr>
                            <td>Bộ</td>
                            <td>{data.bo}</td>
                        </tr>
                        <tr>
                            <td>Nhóm sinh vật</td>
                            <td>{data.nhomSinhVat}</td>
                        </tr>
                        <tr>
                            <td>Họ</td>
                            <td>{data.ho}</td>
                        </tr>
                        <tr>
                            <td>Chi</td>
                            <td>{data.chi}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">Thư viện ảnh trống</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    // Hàm hiển thị Info2 (Thư viện ảnh trống)
    const renderInfo2 = () => {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Đặc điểm hình thái</td>
                        </tr>
                        <tr>
                            <td>Khu vực phân bố</td>
                        </tr>
                        <tr>
                            <td>Sinh thái</td>
                        </tr>
                        <tr>
                            <td>Tình trạng bảo tồn</td>
                        </tr>
                        <tr>
                            <td>Loài đặc hữu</td>
                        </tr>
                        <tr>
                            <td>Loài ngoại lai</td>
                        </tr>
                        <tr>
                            <td>Ghi nhận</td>
                        </tr>
                        <tr>
                            <td colSpan="2">Thư viện ảnh trống</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    // Hàm xử lý khi nhấn vào nút "Phân loại sinh học"
    const showInfo1 = () => {
        setActiveInfo('Info1');
    };

    // Hàm xử lý khi nhấn vào nút "Phân loại"
    const showInfo2 = () => {
        setActiveInfo('Info2');
    };

    // Hàm xử lý khi nhấn vào ô chữ nhật phía trên
    const handleRectangleClick = () => {
        if (activeInfo === 'Info1') {
            setInfoDetails(
                `Thông tin bảng: 
                1. Giới: Plantae
                2. Ngành: Tracheophyta
                3. Lớp: Magnoliopsida
                4. Bộ: Malvales
                5. Nhóm sinh vật: Thực vật hạt kín
                6. Họ: Malvaceae
                7. Chi: Abelmoschus`
            );
        } else if (activeInfo === 'Info2') {
            setInfoDetails('Thông tin Thư viện ảnh trống');
        }
    };

    // Hàm xử lý in thông tin
    const handlePrint = () => {
        // Render component thành HTML string
        const printContent = activeInfo === 'Info1' ? renderInfo1() : renderInfo2();
        const printWindow = window.open('', '', 'height=600,width=800');
        
        // Sử dụng ReactDOMServer để render nội dung thành chuỗi HTML
        const printHTML = ReactDOMServer.renderToString(printContent);

        // Mở cửa sổ in và thêm HTML
        printWindow.document.write('<html><head><title>In thông tin</title></head><body>');
        printWindow.document.write(printHTML);  // In nội dung HTML
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print(); // Kích hoạt cửa sổ in
    };

    return (
      <div>
        {/* Nút In thông tin, thay thế ô chữ nhật màu trắng */}
        <div className="info-box" onClick={handlePrint}>
            {/* Nội dung trong ô chữ nhật có thể được làm trống hoặc hiển thị gì đó */}
        </div>

        {/* Hiển thị thông tin chi tiết khi nhấn vào ô chữ nhật */}
        <div className="info-details">
            {infoDetails && <pre>{infoDetails}</pre>}
        </div>

        {/* Các nút nằm cùng một hàng */}
        <div className="button-container">
          <button className="button-left" onClick={showInfo1}>
            Phân loại sinh học
          </button>
          <button className="button-right" onClick={showInfo2}>
            Phân loại
          </button>
        </div>

        {/* Hiển thị Info1 hoặc Info2 tùy vào trạng thái */}
        {activeInfo === 'Info1' ? renderInfo1() : renderInfo2()}
      </div>
    );
};

export default InfoL;
