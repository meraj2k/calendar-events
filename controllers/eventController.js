const { successResponse, errorResponse } = require('../utils/responseHandler');
const { findFreeSlots, bookEvent, fetchEvents } = require('../services/eventService');
const { TIMEZONE } = require('../config/constants');

const getFreeSlots = async (req, res) => {
  try {
    const { date, timezone } = req.query;
    const slots = await findFreeSlots(date, timezone);
    return successResponse(res, slots);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const createEvent = async (req, res) => {
  try {
    const { dateTime, duration } = req.body;
    await bookEvent(dateTime, duration);
    return successResponse(res, 'Event created successfully');
  } catch (error) {
    return errorResponse(res, error.message, 422);
  }
};

const getEvents = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const events = await fetchEvents(startDate, endDate);
    return successResponse(res, events);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

module.exports = {
  getFreeSlots,
  createEvent,
  getEvents,
};
