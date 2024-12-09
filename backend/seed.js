const bcrypt = require('bcrypt');
const Role = require('./src/models/RoleModel');
const Users = require('./src/models/UsersModel');

const seedData = async () => {
    try {
        // Tìm hoặc tạo các vai trò Admin và User
        const [adminRole, createdAdminRole] = await Role.findOrCreate({ where: { name: 'Admin' } });
        const [userRole, createdUserRole] = await Role.findOrCreate({ where: { name: 'User' } });

        console.log('Admin Role:', adminRole);
        console.log('User Role:', userRole);

        // Mã hóa mật khẩu cho admin
        const newAdminPassword = await bcrypt.hash('admin123', 10);
        
        // Cập nhật mật khẩu của người dùng admin nếu tồn tại
        const adminUser = await Users.findOne({ where: { username: 'admin' } });
        if (adminUser) {
            adminUser.password = newAdminPassword;
            await adminUser.save();
            console.log('Admin password updated successfully.');
        } else {
            console.log('Admin user not found.');
        }

        // Mã hóa mật khẩu cho người dùng mới
        const newUserPassword = await bcrypt.hash('user123', 10);

        // Tạo người dùng mới với vai trò User
        const newUser = await Users.create({
            username: 'user',  // Tên người dùng mới
            password: newUserPassword, // Mã hóa mật khẩu
            firstname: 'John',
            lastname: 'Doe',
            role_id: userRole.role_id,  // Gán role_id từ role 'User'
        });

        console.log('New user created successfully with role user.');
    } catch (err) {
        console.error('Error during seeding:', err.message);
    }
};

seedData();
