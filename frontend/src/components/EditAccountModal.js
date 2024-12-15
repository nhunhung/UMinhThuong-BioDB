import React from 'react';
import '../StyleCSS/EditAccountModal.css';

function EditAccountModal({ account, onSave, onCancel, onChange }) {
    if (!account) return null;
  
    return (
      <div className="modal-backdrop">
        <form className="form-edit" onSubmit={(e) => e.preventDefault()}>
          <h3>Chỉnh sửa tài khoản</h3>
          <div className="form-group">
            <label>Tài khoản</label>
            <input
              type="text"
              value={account.username}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => onChange({ ...account, password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={account.email || ""}
              onChange={(e) => onChange({ ...account, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Họ</label>
            <input
              type="text"
              value={account.lastName || ""}
              onChange={(e) => onChange({ ...account, lastName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Tên</label>
            <input
              type="text"
              value={account.firstName || ""}
              onChange={(e) => onChange({ ...account, firstName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Quyền</label>
            <select
              value={account.role || ""}
              onChange={(e) => onChange({ ...account, role: e.target.value })}
            >
              <option value="admin">Quản trị</option>
              <option value="editor">Nhập liệu</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="save-btn" type="button" onClick={onSave}>
              Lưu
            </button>
            <button className="cancel-btn" type="button" onClick={onCancel}>
              Bỏ qua
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  export default EditAccountModal;
  
