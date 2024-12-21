import React from 'react'; 
import '../StyleCSS/EditAccountModal.css';

function EditAccountModal({ account, onSave, onCancel, onChange }) {
    if (!account) return null;

    const handleSave = async () => {
        try {
            const updatedAccount = {
                username: account.username,
                password: account.password,
                firstname: account.firstName,
                lastname: account.lastName,
                email: account.email,
                role_id: account.role === 'admin' ? 1 : account.role === 'editor' ? 2 : 3,
            };
            await onSave(updatedAccount); // Call the provided save function
        } catch (error) {
            console.error('Error saving account:', error);
        }
    };

    return (
        <div className="modal-backdrop">
            <form className="form-edit" onSubmit={(e) => e.preventDefault()}>
                <h3>Chỉnh sửa tài khoản</h3>
                <div className="form-group">
                    <label>Tài khoản</label>
                    <input
                        type="text"
                        value={account.email}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        placeholder="********"
                        value={account.password}
                        onChange={(e) => onChange({ ...account, password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Tên tài khoản</label>
                    <input
                        type="text"
                        value={account.username || ""}
                        onChange={(e) => onChange({ ...account, username: e.target.value })}
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
                    <button className="save-btn" type="button" onClick={handleSave}>
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
