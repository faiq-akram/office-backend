const express = require('express');
const router = express.Router();
const connection = require('../connection');


// router.post('/addShipperZone', (req, res) => {
//     let shipperZone = req.body;

//     const query = "SELECT shipper_zone_id FROM shipper_zone WHERE shipper_zone_id = ?";
//     connection.query(query, [shipperZone.shipper_zone_id], (err, results) => {
//         if (!err) {
//             if (results.length === 0) {
//                 const insertQuery = `
//                     INSERT INTO shipper_zone (shipper_id, zone_name)
//                     VALUES (?, ?)`;

//                 connection.query(insertQuery, [shipperZone.shipper_id, shipperZone.zone_name], (err) => {
//                     if (!err) {
//                         return res.status(200).json({ message: "Shipper Zone successfully added" });
//                     } else {
//                         return res.status(500).json(err);
//                     }
//                 });
//             } else {
//                 return res.status(400).json({ message: "Shipper Zone already exists" });
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// });

// router.get('/getAllShipperZones', (req, res) => {
//     const query = "SELECT * FROM shipper_zone"; 
//     connection.query(query, (err, results) => {
//         if (!err) {
//             if (results.length > 0) {
//                 return res.status(200).json({ shipper_zone: results });
//             } else {
//                 return res.status(404).json({ message: "No shipper zones found" });
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// });

// router.put('/updateShipperZone/:id', (req, res) => {
//     const shipper_zone_id = req.params.id;
//     const shipperZone = req.body;

//     const updateQuery = `
//         UPDATE shipper_zone
//         SET shipper_id = ?, zone_name = ? WHERE shipper_zone_id = ?`;

//     connection.query(updateQuery, [shipperZone.shipper_id, shipperZone.zone_name, shipper_zone_id], (err, results) => {
//         if (!err) {
//             if (results.affectedRows > 0) {
//                 return res.status(200).json({ message: "Shipper Zone updated successfully" });
//             } else {
//                 return res.status(404).json({ message: "Shipper Zone not found" });
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// });

module.exports = router;
