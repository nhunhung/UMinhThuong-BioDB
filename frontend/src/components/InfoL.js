import React, { useState, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';  // Import ReactDOMServer
import '../StyleCSS/InfoL.css';
import { useParams } from 'react-router-dom';

const InfoL = () => {
    const { id } = useParams(); 
    const [activeInfo, setActiveInfo] = useState('Info1');
    const [infoDetails, setInfoDetails] = useState('');
    const [data, setData] = useState(null);

    // Fetch dữ liệu từ API khi component mount
    useEffect(() => {
        fetch(`http://127.0.0.1:3001/api/organism/${id}`) 
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);

    // Hàm hiển thị Info1 (Phân loại sinh học)
    const renderInfo1 = () => {
        if (!data) return null;

        return (
            <div className="info1" >
                <table>
                    <tbody>
                        <tr>
                            <td>Giới</td>
                            <td>{data.Giới || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Ngành</td>
                            <td>{data.Ngành || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Lớp</td>
                            <td>{data.Lớp || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Bộ</td>
                            <td>{data.order || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Nhóm sinh vật</td>
                            <td>{data.goo || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Họ</td>
                            <td>{data.family || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Chi</td>
                            <td>{data.genus || 'N/A'}</td>
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
                            <td>{data['Đặc điểm hình thái'] || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Khu vực phân bố</td>
                            <td>{data['Khu vực phân bố'] || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Sinh thái</td>
                            <td>{data['Sinh cảnh sống'] || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Tình trạng bảo tồn</td>
                            <td>{data['Tình trạng bảo tồn'] || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Loài đặc hữu</td>
                            <td>{data['Loài đặc hữu'] || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Loài ngoại lai</td>
                            <td>{data['Loài ngoại lai'] || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Ghi nhận</td>
                            <td>{data['Ghi nhận'] || 'N/A'}</td>
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
                1. Giới: ${data.Giới || 'N/A'}
                2. Ngành: ${data.Ngành || 'N/A'}
                3. Lớp: ${data.Lớp || 'N/A'}
                4. Bộ: ${data.order || 'N/A'}
                5. Nhóm sinh vật: ${data.goo || 'N/A'}
                6. Họ: ${data.family || 'N/A'}
                7. Chi: ${data.genus || 'N/A'}`
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
                click
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
