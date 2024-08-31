const admin = require('firebase-admin');
const serviceAccount = require('../dev-test-e7036-firebase-adminsdk-vg6zh-828afe5705.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
