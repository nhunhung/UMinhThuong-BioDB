const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Lấy token từ header Authorization

    if (!token) {
        return res.status(401).json({
            message: 'Token is missing',
            status: 'ERROR',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication failed',
                status: 'ERROR',
            });
        }

        if (user?.role_id === 1 || user?.role_id === 2) {
            next();
        } else {
            return res.status(404).json({
                message: 'The authentication failed',
                status: 'ERROR',
            });
        }
    });
};


const authMiddleWareAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Lấy token từ header Authorization

    if (!token) {
        return res.status(401).json({
            message: 'Token is missing',
            status: 'ERROR',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication failed',
                status: 'ERROR',
            });
        }

        if (user?.role_id === 1) {
            req.user = user;  // Lưu thông tin người dùng vào req.user
            next();
        } else {
            return res.status(404).json({
                message: 'The authentication failed',
                status: 'ERROR',
            });
        }
    });
};





const authMiddleWareUpdate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Lấy token từ header Authorization

    if (!token) {
        return res.status(401).json({
            message: 'Token is missing',
            status: 'ERROR',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication failed',
                status: 'ERROR',
            });
        }

        if (user?.role_id === 1 || user?.role_id === 2) {
            next();
        } else {
            return res.status(404).json({
                message: 'The authentication failed',
                status: 'ERROR',
            });
        }
    });
};


const authUserMiddleWare = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Lấy token từ header Authorization
    const userId = req.params.id;

    if (!token) {
        return res.status(401).json({
            message: 'Token is missing',
            status: 'ERROR',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication failed',
                status: 'ERROR',
            });
        }

        if (user?.role_id === 3 && user?.id === Number(userId)) {
            req.user = user;  // Lưu thông tin người dùng vào req.user
            next();
        } else {
            return res.status(404).json({
                message: 'The authentication failed',
                status: 'ERROR',
            });
        }
    });
};




const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Đảm bảo lấy đúng token từ header
    if (!token) {
        return res.status(401).json({
            message: 'Token is missing',
            status: 'ERROR',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Token is invalid or expired',
                status: 'ERROR',
            });
        }
        req.user = user; // Lưu thông tin người dùng vào req.user
        next();  // Tiếp tục với các middleware hoặc controller
    });
};


module.exports = {
    authMiddleWare,
    authMiddleWareAdmin,
    authMiddleWareUpdate,
    authUserMiddleWare,
    authenticateToken

}