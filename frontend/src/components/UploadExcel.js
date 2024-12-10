import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import "../StyleCSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faListCheck, faDeleteLeft, faUpload } from "@fortawesome/free-solid-svg-icons";

const UploadExcel = () => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [logVisible, setLogVisible] = useState(false);
  const [dataVisible, setDataVisible] = useState(false);

  // Tiêu đề dữ liệu cố định
  const headers = [
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

  const handleFileUpload = (file) => {
    if (!file) {
      console.error("No file provided");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const abuf = e.target.result;
      const wb = XLSX.read(abuf, { type: 'array' });

      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const rows = jsonData.slice(1);
      setData(rows);
    };

    reader.readAsArrayBuffer(file);
  };


  // Hàm để kiểm tra dữ liệu (hiển thị log)
  const handleCheckData = () => {
    setLogVisible(true);
  };

  // Hàm để hiển thị dữ liệu
  const handleReadyData = () => {
    setDataVisible(true);
  };

  // Hàm để xóa dữ liệu và chọn file mới
  const handleDeleteLog = () => {
    setLogVisible(false);
    setDataVisible(false);
    setData([]);
    setFileName('');
  };

  //KEO THA FILE
  const handleFileDrop = (event) => {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      handleFileUpload(file);
    } else {
      console.error("No files found in the drop event.");
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
        <section id='form'>

          <div className="upload-container">
            <label
              htmlFor="file-upload"
              className="upload-button"
              onDragOver={handleDragOver}
              onDrop={handleFileDrop}
            >
              <FontAwesomeIcon style={{ fontSize: '30px', marginLeft: '30px', marginRight: '15px', color: '#5CACEE' }} icon={faUpload} /> {!fileName ? "Kéo và thả hoặc chọn tệp" : fileName}
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

          {/* Hiển thị log kiểm tra */}

          <div className='log'>
            {logVisible && (
              <>
                <FontAwesomeIcon icon={faCheck} />
                {' Log kiểm tra'}
              </>
            )}
          </div>

        </section>

        {/* Hiển thị dữ liệu dưới dạng bảng */}
        <section id='table'>
          <div className='button'>
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
                      <td colSpan={headers.length}>
                        No rows to show
                      </td>
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
