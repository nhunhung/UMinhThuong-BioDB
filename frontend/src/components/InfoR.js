import React, { useState, useEffect } from 'react';
import '../StyleCSS/InfoR.css';

const InfoR = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Test API
    const fetchedData = {
      name: 'Abelmoschus moschatus',
      commonName: 'Bụp vàng',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.284460750962!2d105.09887!3d9.6011',
      morphology: 'Cỏ cao 30-100cm, có rễ củ trắng trắng; thân có lông phủ nhám...',
      ecology: 'Sinh cảnh sống: Dựa lò, gò ruộng...',
      economicUse: 'N/A',
      distribution: 'BTN, mùa khô',
      iucnStatus: 'LC',
      vietnamRedList: 'N/A',
      endemic: 'N/A',
      records: [
        {
          name: 'N/A',
          code: 'N/A',
          type: 'Dữ liệu kế thừa',
          quantity: 'N/A',
          date: '/./',
          project: 'Ramsar_2022Kế thừa',
        },
      ],
    };
    setData(fetchedData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="info-container">
      {/* Header */}
      <div className="info-header">
        <h2><i>{data.name}</i></h2>
        <p>{data.commonName}</p>
      </div>

      {/* Map Section */}
      <div className="info-map">
        <iframe
          title="Map"
          src={data.mapUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Main Content */}
      <div className="info-details">
        {/* Đặc điểm hình thái */}
        <div className="info-box">
          <h3>Đặc điểm hình thái</h3>
          <p>{data.morphology}</p>
        </div>

        {/* Khu vực phân bố */}
        <div className="info-box">
          <h3>Khu vực phân bố</h3>
          <p>{data.distribution}</p>
        </div>

        {/* Sinh thái */}
        <div className="info-box">
          <h3>Sinh thái</h3>
          <p>{data.ecology}</p>
          <p>Vật hậu học: {data.economicUse}</p>
        </div>


        {/* Tình trạng bảo tồn */}
        <div className="info-box">
          <h3>Tình trạng bảo tồn</h3>
          <p>Danh mục đỏ IUCN: {data.iucnStatus}</p>
          <p>Sách đỏ Việt Nam: {data.vietnamRedList}</p>
        </div>

        {/* Loài ngoại lai */}
        <div className="info-box">
          <h3>Loài ngoại lai</h3>
          <p>Thông tư 35/2018/TT-BTNMT: {data.vietnamRedList}</p>
        </div>

        {/* Đặc hữu */}
        <div className="info-box">
          <h3>Đặc hữu</h3>
          <p>{data.endemic}</p>
        </div>
      </div>

      {/* Ghi nhận */}
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
            {data.records.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.code}</td>
                <td>{record.type}</td>
                <td>{record.quantity}</td>
                <td>{record.date}</td>
                <td>{record.project}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoR;
