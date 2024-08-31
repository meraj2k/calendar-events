const moment = require('moment-timezone');

const convertToTimezone = (time, timezone) => {
  return time.clone().tz(timezone).format();
};

const generateTimeSlots = (start, end, duration) => {
  const slots = [];
  let current = start.clone();

  while (current.isBefore(end)) {
    slots.push(current.clone());
    current.add(duration, 'minutes');
  }

  return slots;
};

module.exports = {
  convertToTimezone,
  generateTimeSlots,
};
