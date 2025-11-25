CREATE DATABASE loi33045FA4;

USE loi33045FA4;

CREATE TABLE article (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    articlename varchar(50),
    price decimal(5,2),
    create_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
    
INSERT INTO article (articlename, price)
VALUES('Milk', '1.50'),
('Bread', 2.00),
('Eggs', 3.00),
('Cheese', 4.00),
('Butter', 5.00),
('Sausage', 6.00),
('Ham', 7.00),
('Chicken', 8.00),
('Beef', 9.00),
('Pork', 10.00);

SELECT * FROM article;
-- DROP TABLE article;

