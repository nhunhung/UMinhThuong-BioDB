import React, { useState, useEffect } from 'react'; 
import '../StyleCSS/AccountManagement.css';
import EditAccountModal from './EditAccountModal';

function AccountManagement() {
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState({
        username: '',
        password: '',
        email: '',
        lastName: '',
        firstName: '',
        role: '',
    });
    const [editingAccount, setEditingAccount] = useState(null);

    const accessToken = localStorage.getItem('accessToken');
    console.log('AccessToken:', accessToken);

    // Fetch accounts from API
    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                alert('AccessToken không tồn tại!');
                return;
            }

            const response = await fetch('http://localhost:3001/api/users/all-users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Lỗi API: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.status === 'SUCCESS') {
                const formattedAccounts = data.data.map(user => ({
                    id: user.users_id,
                    username: user.username, 
                    role: user.role_id === 1 ? 'Admin' : user.role_id === 2 ? 'Editor' : user.role_id === 3 ? 'Guest' : 'Unknown Role',
                    email: user.email,
                    lastName: user.lastname,
                    firstName: user.firstname,
                }));
                setAccounts(formattedAccounts);
            } else {
                alert('Không thể tải danh sách tài khoản!');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error.message || error);
        }
    };

    // Add new account
    const handleCreate = async (event) => {
        event.preventDefault();
        if (!newAccount.username || !newAccount.role) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:3001/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    username: newAccount.username,
                    password: newAccount.password,
                    email: newAccount.email,
                    lastname: newAccount.lastName,
                    firstname: newAccount.firstName,
                    role_id: newAccount.role === 'admin' ? 1 : newAccount.role === 'editor' ? 2 : 3,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Tạo tài khoản thành công!');
                fetchAccounts(); // Refresh account list
                setNewAccount({
                    username: '',
                    password: '',
                    email: '',
                    lastName: '',
                    firstName: '',
                    role: '',
                });
            } else {
                alert(`Tạo tài khoản thất bại: ${result.message}`);
            }
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản:', error);
        }
    };

    // Show edit modal
    const handleEdit = (account) => {
        setEditingAccount({ ...account });
    };

    const handleSave = async () => {
        if (!editingAccount) return;

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:3001/api/users/update/${editingAccount.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    username: editingAccount.username,
                    password: editingAccount.password,
                    firstname: editingAccount.firstName,
                    lastname: editingAccount.lastName,
                    email: editingAccount.email,
                    role_id: editingAccount.role === 'admin' ? 1 : editingAccount.role === 'editor' ? 2 : 3,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Cập nhật tài khoản thành công!');
                fetchAccounts(); // Refresh account list
                setEditingAccount(null);
            } else {
                alert(`Cập nhật tài khoản thất bại: ${result.message}`);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
        }
    };

    const handleCancel = () => {
        setEditingAccount(null);
    };

    const handleChange = (updatedAccount) => {
        setEditingAccount(updatedAccount);
    };

    const handleDelete = async (id) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:3001/api/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== id));
            } else {
                alert('Xóa tài khoản thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi xóa tài khoản:', error);
        }
    };

    return (
        <div className="content" style={{ marginLeft: '60px' }}>
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
                            <td>{account.email}</td>
                            <td>{account.role}</td>
                            <td>
                                {account.lastName} {account.firstName}
                            </td>
                            <td>
                                <div className="button-container">
                                    <button className="edit-btn" onClick={() => handleEdit(account)}>
                                        Sửa
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(account.id)}>
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
