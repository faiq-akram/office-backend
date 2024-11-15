const express = require('express');
const connection = require('./connection');
const shipperRoutes = require('./routes/Shipper');
const shipperZoneRoutes = require('./routes/shipper_zone');  
const shipperCityRoutes = require('./routes/shipper_city');  

const app = express();

app.use(express.json());


app.use('/shipper', shipperRoutes);  
app.use('/shipper-zone', shipperZoneRoutes);  
app.use('/shipper-city', shipperCityRoutes);  

module.exports = app;
