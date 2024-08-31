const db = require('../config/firestore');
const eventsRef = db.collection('events');

const createEvent = async (event) => {
  try {
    await eventsRef.add(event);
  } catch (error) {
    throw new Error(error);
  }
};

const getEventsByDateRange = async (start, end) => {
  try {
    const snapshot = await eventsRef
      .where('start', '>=', start)
      .where('start', '<=', end)
      .get();

    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = {
  createEvent,
  getEventsByDateRange
};
