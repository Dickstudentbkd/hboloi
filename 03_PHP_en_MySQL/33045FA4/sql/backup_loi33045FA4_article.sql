CREATE DATABASE  IF NOT EXISTS `loi33045FA4` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `loi33045FA4`;
--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `articlename` varchar(50) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` 
VALUES 
(1,'Milk',1.50,'2025-11-18 15:35:26','2025-11-18 15:35:26'),
(3,'Eggs',3.05,'2025-11-18 15:35:26','2025-11-25 13:47:24'),
(4,'Cheese',4.00,'2025-11-18 15:35:26','2025-11-18 15:35:26'),
(5,'Butter',5.05,'2025-11-18 15:35:26','2025-11-25 13:47:31'),
(6,'Sausage',6.00,'2025-11-18 15:35:26','2025-11-18 15:35:26'),
(7,'Ham',7.05,'2025-11-18 15:35:26','2025-11-25 13:44:05'),
(8,'Chicken',8.05,'2025-11-18 15:35:26','2025-11-25 14:20:42'),
(9,'Beef',9.00,'2025-11-18 15:35:26','2025-11-18 15:35:26'),
(10,'Pork',10.00,'2025-11-18 15:35:26','2025-11-18 15:35:26'),
(11,'Hagelslag puur',2.45,'2025-11-25 14:33:30','2025-11-25 14:33:30');

-- Dump completed on 2025-11-25 19:10:14
