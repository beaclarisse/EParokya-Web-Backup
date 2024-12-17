const express = require('express');
const router = express.Router();
const BaptismController = require('../controllers/Baptism/BinyagController');
const { isAuthenticatedUser, authorizeAdmin } = require('../middleware/auth');

router.get('/list', BaptismController.listBaptismForms);

router.post('/create', isAuthenticatedUser, BaptismController.submitBaptismForm);
router.get('/mySubmittedForms', isAuthenticatedUser, BaptismController.getMySubmittedForms);
router.get('/confirmed', BaptismController.getConfirmedBaptisms);

router.post('/decline/:id', BaptismController.declineBaptism);
router.post('/:id/admin/addComment', BaptismController.addBaptismComment);

router.get('/getBaptism/:id', BaptismController.getBaptismById);
router.post('/:id/confirm', BaptismController.confirmBaptism);

module.exports = router;
