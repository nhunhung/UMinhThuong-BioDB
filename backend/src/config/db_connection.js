const sequelize = require("./database");
const Role = require("../models/Role");


const DbConnect = async () => {
    try {
        // Connect to database
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Đồng bộ tất cả các model với cơ sở dữ liệu
        await sequelize.sync({ alter: true }); // Dùng { force: true } nếu muốn xóa và tạo lại bảng
        console.log('Database synchronized successfully!');

        // // Thêm dữ liệu mẫu (nếu cần)
        // const defaultRole = await Role.findOne({ where: { name: 'Tesing' } });
        // if (!defaultRole) {
        //     await Role.create({ name: 'Testing' });
        //     console.log('Sample data added to the database!');
        // } else {
        //     console.log('Sample data already exists.');
        // }
    } catch (error) {
        console.error('Error during database initialization:', error.message);
    }
};

// DbConnect(); // Gọi hàm để thực hiện kết nối và khởi tạo

module.exports = DbConnect;
