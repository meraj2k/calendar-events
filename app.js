const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const { successResponse } = require('./utils/responseHandler');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/events', eventRoutes);

app.use("/", (req, res) => {
    successResponse(res, { message: "Hellow World!" })
});

module.exports = app;
