const router = require('express').Router();
const accountController = require('../controller/account');

router.post('/add' , accountController.register);
//router.post('/login' , accountController.login);


module.exports = router;