const express = require('express');
const { 
    getAllCustomEvents, 
    addCustomEvent,
    deleteCustomEvent } = require('../controllers/CustomEvent/customEventController');
const router = express.Router();
const { isAuthenticatedUser, authorizeAdmin } = require('../middleware/auth');

router.get('/getAllCustomEvents', isAuthenticatedUser, getAllCustomEvents);
router.post('/addEvent',isAuthenticatedUser,  addCustomEvent);
router.delete('/deleteEvent/:eventId', isAuthenticatedUser, deleteCustomEvent);

module.exports = router;
