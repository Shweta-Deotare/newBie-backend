const userRouter = require('express').Router();
const {getAllUsers, login, register} = require('../controller/userController');

const allUsers = userRouter.get('/getUsers',getAllUsers);

const userLogin = userRouter.post('/login', login);

const registerUser = userRouter.post('/register', register);

module.exports = {allUsers, userLogin, registerUser};
