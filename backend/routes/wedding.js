const express = require('express');
const router = express.Router();
const WeddingFormController = require('../controllers/Wedding/WeddingController');
const { isAuthenticatedUser, authorizeAdmin } = require('../middleware/auth');

//FormSubmission
router.post('/submit',  WeddingFormController.submitWeddingForm);
router.get('/getAllWeddings', isAuthenticatedUser, authorizeAdmin("admin"), WeddingFormController.getAllWeddings);
router.get('/confirmed', isAuthenticatedUser, authorizeAdmin("admin"), WeddingFormController.getConfirmedWeddings);

router.get('/weddingDate',  WeddingFormController.getAvailableDates);
router.post('/book/date',  WeddingFormController.bookDate);
router.post('/admin/available-dates', isAuthenticatedUser, authorizeAdmin, WeddingFormController.addAvailableDate);

router.get('/getWeddingById/:weddingId', isAuthenticatedUser, authorizeAdmin("admin"), WeddingFormController.getWeddingById);
router.post('/:weddingId/confirm',  WeddingFormController.confirmWedding);
router.post('/:weddingId/decline', WeddingFormController.declineWedding);
router.delete('/admin/available-dates/:weddingId', isAuthenticatedUser, authorizeAdmin, WeddingFormController.removeAvailableDate);

//wedding dates
// router.get('/weddingdates', WeddingFormController.getWeddingSummary)
// router.put('/:id', WeddingFormController.updateWedding);

module.exports = router;