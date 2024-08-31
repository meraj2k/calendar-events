const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/events', eventRoutes);

module.exports = app;
