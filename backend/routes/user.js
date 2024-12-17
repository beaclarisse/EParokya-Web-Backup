const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { registerUser, LoginUser, Logout, ForgotPassword, ResetPassword, Profile, updatePassword, UpdateProfile,
    AllUsers, getUserDetails, deleteUser, updateUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeAdmin } = require('../middleware/auth');

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', LoginUser);
router.get('/logout', Logout);
router.get('/profile', isAuthenticatedUser, Profile);

router.post('/password/forgot', ForgotPassword);
router.put('/password/reset/:token', ResetPassword);
router.put('/password/update', isAuthenticatedUser, updatePassword);
router.put('/profile/update', upload.single("avatar"), isAuthenticatedUser, UpdateProfile)

router.get('/admin/users', isAuthenticatedUser, authorizeAdmin("admin"), AllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeAdmin("admin"), getUserDetails).delete(isAuthenticatedUser,authorizeAdmin("admin"), deleteUser).put(isAuthenticatedUser,authorizeAdmin("admin"), updateUser)

// router.put('/profile/update', UpdateProfile);



module.exports = router;