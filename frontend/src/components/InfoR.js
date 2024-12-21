import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../StyleCSS/InfoR.css';
import Map from "./Map";

const InfoR = () => {
  const { id } = useParams();  
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/api/organism/${id}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);  // Chỉ fetch lại khi id thay đổi

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="info-container">
      <div className="info-header">
        <h2><i>{data.scientificName}</i></h2>
        <p>{data.commonName}</p>
      </div>

      <div className="info-map">
        <Map />
      </div>

      <div className="info-details">
        <div className="info-box">
          <h3>Đặc điểm hình thái</h3>
          <p>{data['Đặc điểm hình thái'] || 'Mẫu đặc điểm hình thái'}</p>
        </div>

        <div className="info-box">
          <h3>Khu vực phân bố</h3>
          <p>{data['Khu vực phân bố'] || 'Mẫu khu vực phân bố'}</p>
        </div>

        <div className="info-box">
          <h3>Sinh thái</h3>
          <p>{data['Sinh cảnh sống'] || 'Mẫu sinh thái'}</p>
        </div>

        <div className="info-box">
          <h3>Tình trạng bảo tồn</h3>
          <p>Danh mục đỏ IUCN: {data.iucnStatus || 'Mẫu IUCN'}</p>
          <p>Sách đỏ Việt Nam: {data.vietnamRedList || 'Mẫu sách đỏ'}</p>
        </div>

        <div className="info-box">
          <h3>Loài ngoại lai</h3>
          <p>Thông tư 35/2018/TT-BTNMT: {data.vietnamRedList || 'Mẫu ngoại lai'}</p>
        </div>

        <div className="info-box">
          <h3>Đặc hữu</h3>
          <p>{data.endemic || 'Mẫu đặc hữu'}</p>
        </div>
      </div>

      <div className="info-record">
        <h3>Ghi nhận</h3>
        <table>
          <thead>
            <tr>
              <th>Người ghi nhận</th>
              <th>Số hiệu thứ 1</th>
              <th>Kiểu ghi nhận</th>
              <th>Số lượng mẫu vật</th>
              <th>Ngày ghi nhận</th>
              <th>Tên dự án</th>
            </tr>
          </thead>
          <tbody>
            {data.records ? data.records.map((record, index) => (
              <tr key={index}>
                <td>{record.name || 'N/A'}</td>
                <td>{record.code || 'N/A'}</td>
                <td>{record.type || 'N/A'}</td>
                <td>{record.quantity || 'N/A'}</td>
                <td>{record.date || '/./'}</td>
                <td>{record.project || 'N/A'}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6">Dữ liệu ghi nhận trống</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoR;
