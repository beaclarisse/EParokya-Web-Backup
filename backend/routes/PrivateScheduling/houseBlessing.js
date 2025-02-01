const express = require('express');
const router = express.Router();
const houseBlessingController = require('../../controllers/PrivateScheduling/houseBlessingController');

router.post('/houseBlessingSubmit', houseBlessingController.createHouseBlessing);
router.get('/getAllhouseBlessing', houseBlessingController.getAllHouseBlessingRequests);

router.get('/getHouseBlessing/:blessingId', houseBlessingController.getHouseBlessingById);

router.put('/updateHouseBlessingDate/:blessingId', houseBlessingController.updateBlessingDate);
router.post('/:blessingId/commentBlessing',  houseBlessingController.addComment);

router.post('/:blessingId/confirmBlessing',  houseBlessingController.confirmBlessing);
router.post('/:blessingId/declinelessing',  houseBlessingController.declineBlessing);

// router.post('/updateAdditionalReq/:blessingId',  houseBlessingController.updateAdditionalReq);

router.get('/user/:userId', houseBlessingController.getUserHouseBlessingRequests);
router.put('/blessingStatus/:blessingId', houseBlessingController.updateHouseBlessingStatus);
// router.post('/comment/:blessingId', houseBlessingController.addCommentToHouseBlessing);

module.exports = router;
