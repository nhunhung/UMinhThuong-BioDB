import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import "../CSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faListCheck, faDeleteLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const UploadExcel = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [logVisible, setLogVisible] = useState(false);
  const [logData, setLogData] = useState([]);
  const [dataVisible, setDataVisible] = useState(false);

  const headers = [
    // List of headers for the Excel file
    'Số hiệu thứ 1', 'Dự án', 'Kiểu ghi nhận', 'Mã bảo tàng', 'Mã mẫu vật',
    'Loại mẫu chuẩn', 'Số hiệu thứ 2', 'Số lượng mẫu vật', 'Người thu mẫu chính',
    'Cộng sự', 'Ngày ghi nhận', 'Tháng ghi nhận', 'Năm ghi nhận', 'Quốc gia',
    'Tỉnh', 'Huyện', 'Xã', 'Làng thu mẫu', 'Địa danh', 'Ghi chú về địa điểm ghi mẫu',
    'Vĩ độ', 'Bắc/Nam', 'Kinh độ', 'Đông/Tây', 'Độ Cao', 'Độ cao cao nhất loài phân bố',
    'Đơn vị độ cao', 'Kinh độ VN2000', 'Vĩ đồ VN2000', 'Nuôi trồng', 'Tình trạng định danh',
    'Tài liệu', 'Người định danh', 'Người định danh thứ 2', 'Ngày định danh', 'Tháng định danh',
    'Năm định danh', 'Cây chủ/Vật chủ', 'Ghi chú chung', 'Ghi chú bảo tang', 'Nguồn thông tin',
    'Giới', 'Ngành', 'Lớp', 'Bộ', 'Nhóm sinh vật', 'Họ', 'Chi', 'Tên loài cấp 1',
    'Tác giả thứ nhất', 'Dưới loài cấp 1', 'Tên loài cấp 2', 'Tác giả thứ hai', 'Dưới loài cấp 2',
    'Tên loài cấp 3', 'Tác giả thứ ba', 'Tình trạng danh pháp', 'Cấp độ danh pháp', 'Tên khoa học',
    'Tên tác giả', 'Tên thông thường', 'Tài liệu công bố của tên loài', 'Năm tác giả đặt tên',
    'Tên đồng danh', 'Dạng cây', 'Dạng sống', 'Ố sinh thái', 'Mô tả loài ghi nhận',
    'Sinh cảnh sống', 'Khu vực phân bố', 'Vật hậu học', 'Nhóm công dụng', 'Loài nguy cấp/quý hiếm',
    'Sách đỏ Thế giới', 'Phiên bản sách đỏ Thế giới', 'Thương mại quốc tế các loài động vật nguy cấp',
    'Sách đỏ Việt Nam', 'Nghị định số 81/2021/NĐ-CP', 'Nghị định số 64/2019/NĐ-CP', 'Đặc hữu',
    'Thông tư 35/2018/TT-BTNMT', 'Vị trí ảnh'
  ];

  // Upload file handler
  const handleFileUpload = (file) => {
    if (!file) {
      console.error("No file provided");
      return;
    }
    setFile(file);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const abuf = e.target.result;
      const wb = XLSX.read(abuf, { type: 'array' });

      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const rows = jsonData.slice(1); // Remove header row
      setData(rows);
    };
     setDataVisible(false);
    reader.readAsArrayBuffer(file);
  };

  // Check data handler
  const handleCheckData = async () => {
    if (!file) {
      alert('Vui lòng chọn file!'); // Alert if no file is selected
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/api/v1/upload_excel/checkData', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        const logs = response.data.logs;
        setLogData(logs);
        setLogVisible(true);
        // Kiểm tra nếu logs rỗng và hiển thị dữ liệu
        if (logs.length === 0) {
          setDataVisible(true);  // Hiển thị dữ liệu nếu không có logs
        }
      }
    } catch (error) {
      console.error('Có lỗi khi kiểm tra file:', error);
    }
  };

  // Upload data handler
  const handleReadyData = async () => {
    if (!file) {
      alert('Vui lòng chọn file để upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/api/v1/upload_excel/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('File đã được upload và dữ liệu đã được lưu!');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi upload file');
      console.error(error);
    }
  };

  // Delete log and reset the form
  const handleDeleteLog = () => {
    setLogVisible(false);
    setDataVisible(false);
    setData([]);
    setFileName('');
  };

  // Handle file drag and drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Upload Excel</h2>
      <div className="App">
        {/* Form upload file */}
        <section id="form">
          <div className="upload-container">
            <label
              htmlFor="file-upload"
              className="upload-button"
              onDragOver={handleDragOver}
              onDrop={handleFileDrop}
            >
              <FontAwesomeIcon style={{ fontSize: '30px', marginLeft: '30px', marginRight: '15px', color: '#5CACEE' }} icon={faUpload} />
              {!fileName ? "Kéo và thả hoặc chọn tệp" : fileName}
              <p className="file-format-note">
                Chỉ chấp nhận tệp Excel định dạng <strong>.xlsx</strong> hoặc <strong>.xls</strong>.
              </p>
              <input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            </label>
          </div>

          {/* Display log data */}
          <div className="log">
            {logVisible ? (
              logData.length > 0 ? (
                <table className="log-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logData.map((log, index) => (
                      <tr key={index} className={log.type === 'error' ? 'log-error' : 'log-warning'}>
                        <td>{log.type}</td>
                        <td>{log.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Sẵn sàng để upload và lưu dữ liệu</p>
              )
            ) : (
              <p>No logs to display</p>
            )}
          </div>

         

        </section>

        {/* Data table */}
        <section id="table">
          <div className="button">
            <button className="btnCheck" onClick={handleCheckData}>
              <FontAwesomeIcon icon={faCheck} /> Kiểm tra dữ liệu
            </button>
            <button className="btnOK" onClick={handleReadyData}>
              <FontAwesomeIcon icon={faListCheck} /> Sẵn sàng!
            </button>
            <button className="btnDelete" onClick={handleDeleteLog}>
              <FontAwesomeIcon icon={faDeleteLeft} /> Xóa Log
            </button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataVisible && (
                  data.length > 0 ? (
                    data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={headers.length}>No rows to show</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UploadExcel;
