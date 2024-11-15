CREATE TABLE shipper (
    shipper_id int AUTO_INCREMENT PRIMARY KEY,
    shipper_name varchar(100) NOT NULL,
    shipper_logo varchar(200)
);

CREATE TABLE shipper_zone (
    zone_id int AUTO_INCREMENT PRIMARY KEY,
    shipper_id int,
    FOREIGN KEY (shipper_id) REFERENCES shipper(shipper_id)
);


CREATE TABLE shipper_city (
    city_id int AUTO_INCREMENT PRIMARY KEY,
    zone_id int,
    FOREIGN KEY (zone_id) REFERENCES shipper_zone(zone_id)
);
