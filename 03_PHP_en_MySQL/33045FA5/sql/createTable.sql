CREATE DATABASE  IF NOT EXISTS `rolapplicatie`;

USE rolapplicatie;

DROP TABLE IF EXISTS `user`;

CREATE TABLE user (
	id int NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(50) NOT NULL,
	PRIMARY KEY (id)
);
-- default users erin:
INSERT INTO user (username, password, role)
VALUES
('administrator', 'geheim', 'admin'),
('gebruiker', 'geheim', 'user');
                  