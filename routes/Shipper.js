const express = require('express');
const router = express.Router();
const connection = require('../connection');


router.route('/shipper/:id')
    
    .get((req, res) => {
        const shipperId = req.params.id;

        let query = "SELECT * FROM shipper";
        let queryParams = [];

        if (shipperId) {
            query += " WHERE shipper_id = ?";
            queryParams.push(shipperId);
        }

        connection.query(query, queryParams, (err, shippers) => {
            if (err) return res.status(500).json({ error: err.message });

            if (shippers.length === 0) {
                return res.status(404).json({ message: "Shipper not found" });
            }

        
            if (shipperId) {
                const zoneQuery = `
                    SELECT sz.zone_id, sz.shipper_id, sz.zone_name, sc.city_id, sc.city_name
                    FROM shipper_zone sz
                    LEFT JOIN shipper_city sc ON sz.zone_id = sc.zone_id
                    WHERE sz.shipper_id = ?`;

                connection.query(zoneQuery, [shipperId], (err, zonesAndCities) => {
                    if (err) return res.status(500).json({ error: err.message });

                    return res.status(200).json({
                        shipper: shippers[0],
                        zonesAndCities: zonesAndCities
                    });
                });
            } else {
                return res.status(200).json({ shippers });
            }
        });
    })
    

    .post((req, res) => {
        const { shipper_name, shipper_logo, zones } = req.body; 

    
        const shipperQuery = `
            INSERT INTO shipper (shipper_name, shipper_logo)
            VALUES (?, ?)`;

        connection.query(shipperQuery, [shipper_name, shipper_logo], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            const shipperId = results.insertId;

            
            if (zones && Array.isArray(zones)) {
                zones.forEach(zone => {
                    const zoneQuery = `
                        INSERT INTO shipper_zone (shipper_id, zone_name)
                        VALUES (?, ?)`;

                    connection.query(zoneQuery, [shipperId, zone.zone_name], (err, zoneResults) => {
                        if (err) return res.status(500).json({ error: err.message });

                        const zoneId = zoneResults.insertId;

                        if (zone.cities && Array.isArray(zone.cities)) {
                            zone.cities.forEach(city => {
                                const cityQuery = `
                                    INSERT INTO shipper_city (zone_id, city_name)
                                    VALUES (?, ?)`;

                                connection.query(cityQuery, [zoneId, city.city_name], (err) => {
                                    if (err) return res.status(500).json({ error: err.message });
                                });
                            });
                        }
                    });
                });
            }

            return res.status(200).json({ message: "Shipper, zones, and cities created successfully" });
        });
    })
    

    .put((req, res) => {
        const shipperId = req.params.id;
        const { shipper_name, shipper_logo, zones } = req.body; 

        const shipperQuery = `
            UPDATE shipper
            SET shipper_name = ?, shipper_logo = ?
            WHERE shipper_id = ?`;

        connection.query(shipperQuery, [shipper_name, shipper_logo, shipperId], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            if (zones && Array.isArray(zones)) {
                zones.forEach(zone => {
                    const zoneQuery = `
                        UPDATE shipper_zone
                        SET zone_name = ?
                        WHERE shipper_id = ? AND zone_id = ?`;

                    connection.query(zoneQuery, [zone.zone_name, shipperId, zone.zone_id], (err) => {
                        if (err) return res.status(500).json({ error: err.message });

                     
                        if (zone.cities && Array.isArray(zone.cities)) {
                            zone.cities.forEach(city => {
                                const cityQuery = `
                                    UPDATE shipper_city
                                    SET city_name = ?
                                    WHERE zone_id = ? AND city_id = ?`;

                                connection.query(cityQuery, [city.city_name, zone.zone_id, city.city_id], (err) => {
                                    if (err) return res.status(500).json({ error: err.message });
                                });
                            });
                        }
                    });
                });
            }

            return res.status(200).json({ message: "Shipper, zones, and cities updated successfully" });
        });
    });

module.exports = router;
