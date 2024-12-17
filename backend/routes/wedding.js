const express = require('express');
const router = express.Router();
const WeddingFormController = require('../controllers/Wedding/WeddingController');
const { isAuthenticatedUser, authorizeAdmin } = require('../middleware/auth');

//FormSubmission
router.post('/submit',  WeddingFormController.submitWeddingForm);
router.patch('/:id/confirm', WeddingFormController.confirmWedding);
router.get('/confirmed', isAuthenticatedUser, authorizeAdmin("admin"), WeddingFormController.getConfirmedWeddings);
router.post('/decline', isAuthenticatedUser, authorizeAdmin("admin"),  WeddingFormController.declineWedding);

//WeddingDates
router.get('/weddingDate',  WeddingFormController.getAvailableDates);
router.post('/book/date',  WeddingFormController.bookDate);

//AdminWeddingDate
router.post('/admin/available-dates', isAuthenticatedUser, authorizeAdmin, WeddingFormController.addAvailableDate);
router.delete('/admin/available-dates/:id', isAuthenticatedUser, authorizeAdmin, WeddingFormController.removeAvailableDate);

//GeneralDisplay
router.get('/getAllWeddings', isAuthenticatedUser, authorizeAdmin("admin"), WeddingFormController.getAllWeddings);
router.get('/getWedding/:id', isAuthenticatedUser, authorizeAdmin("admin"), WeddingFormController.getWeddingById);

//wedding dates
// router.get('/weddingdates', WeddingFormController.getWeddingSummary)

// router.put('/:id', WeddingFormController.updateWedding);

module.exports = router;