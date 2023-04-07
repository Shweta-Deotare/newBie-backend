const router = require('express').Router();
const accountController = require('../controller/account');

router.get('/getAllUsers', accountController.getAllUser);
router.post('/add' , accountController.register);
router.post('/login' , accountController.login);
router.get('/getUser/:id', accountController.getUser);



module.exports = router;