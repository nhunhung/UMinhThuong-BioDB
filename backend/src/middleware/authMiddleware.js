const jwt = require('jsonwebtoken')
require('dotenv').config()
const authMiddleWare = (req, res, next) => {
    console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authencation',
                status: 'ERROR',
            })
        }
        if (user?.role_id === 1 || user?.role_id === 2) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authencation',
                status: 'ERROR',
            })
        }
        console.log('User', user)
    });

}

const authMiddleWareAdmin = (req, res, next) => {
    console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        // if (err) {
        //     return res.status(404).json({
        //         message: 'The authencation',
        //         status: 'ERROR',
        //     })
        // }
        console.log('Decoded User from Token:', user);

        if (user?.role_id === 1) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authencation',
                status: 'ERROR',
            })
        }
        console.log('User', user)
    });
}
const authMiddleWareUpdate = (req, res, next) => {
    // console.log()
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user){
        if(err){
            return res.status(404).json({
                message:'The authencation',
                status: 'ERROR',
            })
        }
        if(user?.role_id === 1 || user?.role_id === 2){next()}
        else { return res.status(404).json({ message: 'The authencation', status: 'ERROR'})};
    })

}

const authUserMiddleWare = (req, res, next) => {

    console.log('req.header', req.headers)
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            console.log('err', err);
            return res.status(404).json({
                message: 'The authencation',
                status: 'ERRORRRRRR',
            })
        }

        console.log('user', user);
        console.log('users_id', user?.id)
        console.log('userID', userId)
        console.log('check', user?.role_id === 3)
        console.log('check', user?.id === userId)
        if (user?.role_id === 3 && user?.id === Number(userId)) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authencation',
                status: 'ERROR',
            })
        }
        console.log('User', user)
    });


}

module.exports = {
    authMiddleWare,
    authMiddleWareAdmin,
    authMiddleWareUpdate,
    authUserMiddleWare,
    

}