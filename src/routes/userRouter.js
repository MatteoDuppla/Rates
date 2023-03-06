const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const loggedMiddleware = require('../middleware/loggedMiddleware');



router.post('/register', usersController.register);

router.get('/update/:id', usersController.update)
router.get('/remove/:id', usersController.borrar)
router.get('/login',loggedMiddleware, usersController.login)
router.post('/login', usersController.loginProcess)


module.exports = router;