const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth"); 
const { isAuthenticatedUser, authorizeAdmin } = require('../../middleware/auth');
const PrayerWallController = require("../../controllers/PrayerWall/prayerWallController");

router.post("/submitPrayer", isAuthenticatedUser, PrayerWallController.submitPrayerRequest);
router.get("/pending", isAuthenticatedUser, PrayerWallController.getPendingPrayers);
router.put( "/confirmPrayer/:prayerId", isAuthenticatedUser, PrayerWallController.confirmPrayerRequest);
router.get( "/confirmedPryers", isAuthenticatedUser, PrayerWallController.getConfirmedPrayers);
router.put("/toggle-like/:prayerId", isAuthenticatedUser, PrayerWallController.toggleLike);

module.exports = router;
