const express = require('express');
const router = express.Router();
const adminDateController = require('../controllers/adminDateController');

router.get('/getAllDates', adminDateController.getAllDates);
router.post('/createDate', adminDateController.createDate);
router.patch('/:adminDateId/toggle', adminDateController.toggleDate);
router.post('/:adminDateId/confirm', adminDateController.confirmParticipant);
router.delete('/:adminDateId/delete', adminDateController.deleteDate);

module.exports = router;