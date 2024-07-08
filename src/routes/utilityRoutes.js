const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');

// Manage bills route
router.get('/bills', utilityController.getAllBills);
router.get('/bills:billid', utilityController.getBillById);
router.post('/bills', utilityController.createBill);
router.put('/bills:billid', utilityController.updateBill);
router.delete('/bills:billid', utilityController.deleteBill);

// Manage utilities routes
router.get('/utilities', utilityController.getAllUtilities);
router.post('/utilities:utilityid', utilityController.addUtility);


module.exports = router;