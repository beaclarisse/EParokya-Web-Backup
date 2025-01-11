const express = require('express');
const router = express.Router();
const BaptismController = require('../controllers/Baptism/BinyagController');
const { isAuthenticatedUser, authorizeAdmin } = require('../middleware/auth');

router.get('/list', BaptismController.listBaptismForms);
router.post('/create', isAuthenticatedUser, BaptismController.submitBaptismForm);
router.get('/mySubmittedForms', isAuthenticatedUser, BaptismController.getMySubmittedForms);
router.get('/confirmedBaptism', BaptismController.getConfirmedBaptisms);

router.get('/stats/baptsimsPerMonth',  BaptismController.getBaptismPerMonth);
router.get('/stats/baptismStatusCount', isAuthenticatedUser, BaptismController.getBaptismStatusCounts);

router.post('/decline/:baptismId', BaptismController.declineBaptism);
router.post('/:baptismId/admin/addComment', BaptismController.addBaptismComment);

router.get('/getBaptism/:id', BaptismController.getBaptismById);
router.post('/:baptismId/confirm', BaptismController.confirmBaptism);

module.exports = router;
