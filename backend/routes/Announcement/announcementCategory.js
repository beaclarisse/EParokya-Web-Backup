const express = require('express');
const router = express.Router();
const announcementCategoryController = require('../../controllers/Announcement/AnnouncementCategoryController');
const { isAuthenticatedUser, authorizeAdmin } = require('../../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/create/announcementCategory', isAuthenticatedUser, authorizeAdmin('admin'), upload.single('images'), announcementCategoryController.createAnnouncementCategory);
router.get('/getAllannouncementCategory', announcementCategoryController.getAnnouncementCategory);
router.put('/updateAnnouncementCategory/:announcementCategoryId', announcementCategoryController.updateAnnouncementCategory);
router.delete('/deleteAnnouncementCategory/:announcementCategoryId', announcementCategoryController.deleteAnnouncementCategory);

module.exports = router;