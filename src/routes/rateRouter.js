const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/addRate', rateController.addRate);
router.post('/addBankRate', rateController.addBankRate);

router.get('/getRate', rateController.getRate)
router.get('/getRateBank', rateController.getBankRate)
router.get('/remove/:id', rateController.borrar)

router.get('/home', authMiddleware ,rateController.home);
router.get('/getAll', rateController.getAll);



module.exports = router;