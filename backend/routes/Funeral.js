const express = require('express');
const router = express.Router();
const funeralController = require('../controllers/Funeral/FuneralController');
const { isAuthenticatedUser, authorizeAdmin } = require('../middleware/auth');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const upload = require('../utils/multer'); 
router.get('/getAllFunerals', funeralController.getFunerals);

router.post(
    '/funeralCreate', 
    upload.fields([
    { name: 'deathCertificate', maxCount: 1 },]),
    isAuthenticatedUser, funeralController.createFuneral);

router.get('/confirmed', funeralController.getConfirmedFunerals);
router.get('/mySubmittedForms', isAuthenticatedUser, funeralController.getMySubmittedForms);
router.get('/stats/funeralsPerMonth', isAuthenticatedUser, funeralController.getFuneralsPerMonth);
router.get('/stats/funeralStatusCount', isAuthenticatedUser, funeralController.getFuneralStatusCounts);

router.post('/commentFuneral/:funeralId', funeralController.createComment);
// router.post('/addPriest/:funeralId', funeralController.addPriest);
router.put('/updateFuneralDate/:funeralId', funeralController.updateFuneralDate);


router.delete('/comment/:funeralId/:commentId', funeralController.deleteComment);
router.put('/comment/:funeralId/:commentId', funeralController.updateComment);

router.get('/getFuneral/:funeralId', funeralController.getFuneralById);
router.put('/update/:id', funeralController.updateFuneral);
router.delete('/delete/:id', funeralController.deleteFuneral);
router.put('/confirmFuneral/:funeralId', funeralController.confirmFuneral);
router.put('/declineFuneral/:funeralId', funeralController.cancelFuneral);

module.exports = router;
