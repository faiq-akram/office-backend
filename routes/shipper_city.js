const express = require('express');
const router = express.Router();
const connection = require('../connection');

// router.post('/addShipperCity', (req, res) => {
//     let shipperCity = req.body;

//     const query = "SELECT shipper_city_id FROM shipper_city WHERE shipper_city_id = ?";
//     connection.query(query, [shipperCity.shipper_city_id], (err, results) => {
//         if (!err) {
//             if (results.length === 0) {
//                 const insertQuery = `
//                     INSERT INTO shipper_city (shipper_zone_id, city_name)
//                     VALUES (?, ?)`;

//                 connection.query(insertQuery, [shipperCity.shipper_zone_id, shipperCity.city_name], (err) => {
//                     if (!err) {
//                         return res.status(200).json({ message: "Shipper City successfully added" });
//                     } else {
//                         return res.status(500).json(err);
//                     }
//                 });
//             } else {
//                 return res.status(400).json({ message: "Shipper City already exists" });
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// });

// router.get('/getAllShipperCities', (req, res) => {
//     const query = "SELECT * FROM shipper_city"; 
//     connection.query(query, (err, results) => {
//         if (!err) {
//             if (results.length > 0) {
//                 return res.status(200).json({ shipper_city: results });
//             } else {
//                 return res.status(404).json({ message: "No shipper cities found" });
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// });


// router.put('/updateShipperCity/:id', (req, res) => {
//     const shipper_city_id = req.params.id;
//     const shipperCity = req.body;

//     const updateQuery = `
//         UPDATE shipper_city
//         SET shipper_zone_id = ?, city_name = ? WHERE shipper_city_id = ?
//     `;

//     connection.query(updateQuery, [shipperCity.shipper_zone_id, shipperCity.city_name, shipper_city_id], (err, results) => {
//         if (!err) {
//             if (results.affectedRows > 0) {
//                 return res.status(200).json({ message: "Shipper City updated successfully" });
//             } else {
//                 return res.status(404).json({ message: "Shipper City not found" });
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// });

module.exports = router;
