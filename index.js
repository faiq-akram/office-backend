const express = require('express');
const app = express();
const connection = require('./connection');
const ShipperRoutes = require('./routes/Shipper');  

app.use(express.json());

app.use('/shipper', ShipperRoutes);

module.exports = app;
