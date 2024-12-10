import React, { useState } from 'react';
import './AccountManagement.css';
import EditAccountModal from './EditAccountModal';

function AccountManagement() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      username: "quantri@uminhthuong.girs.vn",
      role: "admin",
      email: "quantri@uminhthuong.girs.vn",
      lastName: "Thành viên",
      firstName: "Quản trị",
    },
    {
      id: 2,
      username: "editor@uminhthuong.girs.vn",
      role: "editor",
      email: "editor@uminhthuong.girs.vn",
      lastName: "Thành viên",
      firstName: "Nhập liệu",
    },
  ]);
  // State quản lý dữ liệu form nhập
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    email: "",
    lastName: "",
    firstName: "",
    role: "", 
  });
  const [editingAccount, setEditingAccount] = useState(null);
  //Thêm tài khoản mới
  const handleCreate = (event) => {
    event.preventDefault(); // Ngăn hành động submit form mặc định
    if (!newAccount.username || !newAccount.role) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    // Tạo tài khoản mới với ID tự tăng
    const newAccountWithId = { ...newAccount, id: accounts.length + 1 };
  
    setAccounts([...accounts, newAccountWithId]); // Cập nhật danh sách tài khoản
  
    // Reset form về trạng thái ban đầu
    setNewAccount({
      username: "",
      password: "",
      email: "",
      lastName: "",
      firstName: "",
      role: "", 
    });
  };
  
  // Hiển thị modal khi nhấn "Sửa"
  const handleEdit = (account) => {
    setEditingAccount({ ...account }); // Copy tài khoản đang chỉnh sửa
  };
   // Lưu chỉnh sửa
   const handleSave = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === editingAccount.id ? editingAccount : acc
      )
    );
    setEditingAccount(null); // Đóng modal
  };
  // Hủy chỉnh sửa
  const handleCancel = () => {
    setEditingAccount(null); // Đóng modal
  };

  // Cập nhật dữ liệu trong modal
  const handleChange = (updatedAccount) => {
    setEditingAccount(updatedAccount);
  };

  // Xóa tài khoản
  const handleDelete = (id) => {
    const updatedAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(updatedAccounts); // Cập nhật danh sách tài khoản
  };

  return (
    <div className="content">
     <h4>Đăng ký tài khoản</h4>
     <form className="form" onSubmit={handleCreate}>
      <input
        id="username"
        type="text"
        placeholder="Tài khoản"
        value={newAccount.username}
        onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
      />
      <input
        id="password"
        type="password"
        placeholder="Mật khẩu"
        value={newAccount.password}
        onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
      />
      <input
        id="gmail"
        type="text"
        placeholder="Gmail"
        value={newAccount.email}
        onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
      />
      <input
        id="Họ"
        type="text"
        placeholder="Họ"
        value={newAccount.lastName}
        onChange={(e) => setNewAccount({ ...newAccount, lastName: e.target.value })}
      />
      <input
        id="Tên"
        type="text"
        placeholder="Tên"
        value={newAccount.firstName}
        onChange={(e) => setNewAccount({ ...newAccount, firstName: e.target.value })}
      />
      <select
        id="role"
        value={newAccount.role}
        onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}
      >
        <option value=""></option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </select>
      <button type="submit">Tạo tài khoản</button>
    </form>


     <h4>Danh sách tài khoản</h4>
     <table className="account-list">
       <thead>
         <tr>
           <th>Tài khoản</th>
           <th>Quyền</th>
           <th>Họ và tên</th>
           <th>Thao tác</th>
         </tr>
       </thead>
       <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
                <td>{account.username}</td>
                <td>{account.role}</td>
                <td>
                  {account.lastName} {account.firstName}
                </td>
                <td>
                  <button className='edit-btn' onClick={() => handleEdit(account)}>
                    Sửa
                  </button>
                  <button className='delete-btn' onClick={() => handleDelete(account.id)}>Xóa</button>
                </td>
            </tr>
          ))}
       </tbody>
     </table>

     {/* Sử dụng Modal Component */}
     <EditAccountModal
        account={editingAccount}
        onSave={handleSave}
        onCancel={handleCancel}
        onChange={handleChange}
     />
   </div>
  );
}

export default AccountManagement;