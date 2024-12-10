const express = require('express')
const router = express.Router();
const UsersController = require("../controller/UsersController");
const { authMiddleWareAdmin, authUserMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', UsersController.createUsers);
router.put('/update/:id', authMiddleWareAdmin, UsersController.updateUsers);
router.put('/update-password/:id', authUserMiddleWare, UsersController.updateUsersPassword);
router.delete('/delete/:id', authMiddleWareAdmin, UsersController.deleteUsers);
router.post('/sign-in', UsersController.loginUser);
module.exports = router