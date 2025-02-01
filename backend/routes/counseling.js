const express = require('express');
const router = express.Router();
const counselingController = require('../controllers/Counseling/counselingController'); 

router.post('/counselingSubmit', counselingController.createCounseling);
router.get('/getAllcounseling', counselingController.getAllCounselingRequests);
router.get('/getCounseling/:counselingId', counselingController.getCounselingById);

router.post('/:counselingId/confirmCounseling', counselingController.confirmCounseling);
router.post('/:counselingId/declineCounseling', counselingController.declineCounseling);
router.post('/:counselingId/commentCounseling', counselingController.addComment);
router.post('/addPriest/:counselingId', counselingController.addCommentToCounseling);

router.put('/:updateCounselingDate/:counselingId', counselingController.updateCounselingDate);

router.get('/counseling/user/:userId', counselingController.getUserCounselingRequests);
router.put('/counseling/:counselingId/status', counselingController.updateCounselingStatus);
router.post('/counseling/:counselingId/comment', counselingController.addCommentToCounseling);

module.exports = router;
