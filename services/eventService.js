const moment = require('moment-timezone');
const { createEvent, getEventsByDateRange } = require('../models/eventModel');

const {
  START_HOUR,
  END_HOUR,
  SLOT_DURATION,
  TIMEZONE,
} = require('../config/constants');

const {
  convertToTimezone,
  generateTimeSlots,
} = require('../utils/timeUtils');

const findFreeSlots = async (date, timezone = TIMEZONE) => {
  try {
    const startOfDay = moment.tz(date, TIMEZONE).startOf('day').add(START_HOUR, 'hours');
    const endOfDay = startOfDay.clone().add(END_HOUR - START_HOUR, 'hours');
    const events = await getEventsByDateRange(startOfDay.toDate(), endOfDay.toDate());
    const occupiedSlots = events.map(event => event.start.toDate().getTime());
    return generateTimeSlots(startOfDay, endOfDay, SLOT_DURATION)
      .filter(slot => !occupiedSlots.includes(slot.toDate().getTime()))
      .map(slot => convertToTimezone(slot, timezone));
  } catch (error) {
    throw new Error(error);
  }
};

const bookEvent = async (dateTime, duration) => {
  try {
    const newDateTime = moment.tz(moment(dateTime).toDate(), TIMEZONE);
    const date = newDateTime.format('YYYY-MM-DD');

    const freeSlots = await findFreeSlots(date);

    const isFree = freeSlots.includes(newDateTime.format());

    if (!isFree) {
      throw new Error('Slot already booked');
    }

    await createEvent({
      start: moment(dateTime).toDate(),
      duration: duration,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const fetchEvents = async (startDate, endDate) => {
  try {
    const events = await getEventsByDateRange(moment(startDate).toDate(), moment(endDate).toDate());
    return events.map(event => {
      return {
        start: convertToTimezone(moment(event.start.toDate()), TIMEZONE),
        duration: event.duration,
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  findFreeSlots,
  bookEvent,
  fetchEvents,
};
