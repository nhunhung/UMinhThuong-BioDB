const bcrypt = require('bcryptjs');
const { sequelize } = require('./src/config/database'); // Ensure sequelize is imported correctly

const insertUser = async () => {
    const hashedPassword1 = bcrypt.hashSync('admin123', 8);
    const hashedPassword2 = bcrypt.hashSync('editor123', 8);
    const hashedPassword3 = bcrypt.hashSync('guest123', 8);

    const sql = `
        INSERT INTO "Users" (username, password, firstname, lastname, "role_id", email, "createdAt", "updatedAt")
        VALUES
        ('adminUserNew', '${hashedPassword1}', 'Admin', 'User', 2, 'adminusernew@example.com', NOW(), NOW()),
        ('editorUserNew', '${hashedPassword2}', 'Editor', 'User', 1, 'editorusernew@example.com', NOW(), NOW()),
        ('guestUserNew', '${hashedPassword3}', 'Guest', 'User', 3, 'guestusernew@example.com', NOW(), NOW());
    `;

    try {
        await sequelize.query(sql);  // Use the sequelize instance to execute the query
        console.log("Users inserted successfully");
    } catch (err) {
        console.error("Error inserting users:", err);
    }
};

insertUser();
