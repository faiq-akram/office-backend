const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Helper function to wrap database queries with promises
function queryAsync(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                console.error("Database query error:", err);  // Log the error details
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


router.get('/shipper/:id?', async (req, res) => {
    const shipperId = req.params.id;
    let query = "SELECT * FROM shipper";
    let queryParams = [];

    if (shipperId) {
        query += " WHERE shipper_id = ?";
        queryParams.push(shipperId);
    }

    try {
        const results = await queryAsync(query, queryParams);
        res.status(200).json({ shippers: results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/shipper', async (req, res) => {
    const { shipper_name, shipper_logo, zones } = req.body;

    try {
        const insertShipperQuery = "INSERT INTO shipper (shipper_name, shipper_logo) VALUES (?, ?)";
        const shipperResult = await queryAsync(insertShipperQuery, [shipper_name, shipper_logo]);

        const shipperId = shipperResult.insertId;

        if (zones) {
            for (let zone of zones) {
                const insertZoneQuery = "INSERT INTO shipper_zone (shipper_id, zone_name) VALUES (?, ?)";
                const zoneResult = await queryAsync(insertZoneQuery, [shipperId, zone.zone_name]);

                const zoneId = zoneResult.insertId;

                if (zone.cities) {
                    for (let city of zone.cities) {
                        const insertCityQuery = "INSERT INTO shipper_city (zone_id, city_name) VALUES (?, ?)";
                        await queryAsync(insertCityQuery, [zoneId, city.city_name]);
                    }
                }
            }
        }

        res.status(200).json({ message: "Shipper created successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/shipper/:id', async (req, res) => {
    const shipperId = req.params.id;
    const { shipper_name, shipper_logo, zones } = req.body;

    try {
        const updateShipperQuery = "UPDATE shipper SET shipper_name = ?, shipper_logo = ? WHERE shipper_id = ?";
        await queryAsync(updateShipperQuery, [shipper_name, shipper_logo, shipperId]);

        if (zones) {
            for (let zone of zones) {
                const updateZoneQuery = "UPDATE shipper_zone SET zone_name = ? WHERE zone_id = ?";
                await queryAsync(updateZoneQuery, [zone.zone_name, zone.zone_id]);

                if (zone.cities) {
                    for (let city of zone.cities) {
                        const updateCityQuery = "UPDATE shipper_city SET city_name = ? WHERE city_id = ?";
                        await queryAsync(updateCityQuery, [city.city_name, city.city_id]);
                    }
                }
            }
        }

        res.status(200).json({ message: "Shipper updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
