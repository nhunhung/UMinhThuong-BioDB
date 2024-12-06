const authorizeRole = (requiredRoleId) => {
    return (req, res, next) => {
        if (req.user.role_id !== requiredRoleId) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập.' });
        }
        next();
    };
};

module.exports = authorizeRole;
