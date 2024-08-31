const express = require('express');
const router = express.Router();
const { getFreeSlots, createEvent, getEvents } = require('../controllers/eventController');

router.get('/free-slots', getFreeSlots);
router.post('/', createEvent);
router.get('/', getEvents);

module.exports = router;
