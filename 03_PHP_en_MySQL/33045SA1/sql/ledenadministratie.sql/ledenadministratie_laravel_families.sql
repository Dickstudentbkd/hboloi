-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ledenadministratie_laravel
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `families`
--

DROP TABLE IF EXISTS `families`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `families` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `family_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int NOT NULL,
  `addition` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Nederland',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `families`
--

LOCK TABLES `families` WRITE;
/*!40000 ALTER TABLE `families` DISABLE KEYS */;
INSERT INTO `families` VALUES (1,'van Doorn','Erdoğansingel',142,NULL,'8861KZ','Ittervoort','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(2,'Bezemer','Peeterssingel',76,NULL,'2841AK','Babyloniënbroek','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(3,'de Graaf','Elsjan of Wipperboulevard',71,NULL,'4142WE','Alphen','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(4,'Wolfswinkel','van der Walweg',93,NULL,'2266AA','Bocholtz','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(5,'Winklaar','Demircipad',125,NULL,'8231JL','Garderen','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(6,'van der Velde','Wrightboulevard',56,NULL,'4735AS','Smalle Ee','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(7,'Peeters','van Oudewaterhof',24,NULL,'8602XV','Waarde','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(8,'Bouwhuisen','van Haeftendreef',26,NULL,'2685VZ','Haulerwijk','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(9,'de Leeuw','de Leeuwdreef',6,NULL,'2333CW','Zeegse','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(10,'Ponci','van de Venweg',84,NULL,'2231DG','Eenrum','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(11,'Overeem','Loukiliboulevard',7,NULL,'6922EG','Bloemendaal','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(12,'van der Stael de Jonge','Poststeeg',144,NULL,'5754GE','Tull en \'t Waal','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(13,'Kort','Prinslaan',116,NULL,'6541AD','Wognum','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(14,'van der Velden','Meijerstraat',131,NULL,'5912SP','Farmsum','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(15,'Verbeek','van de Coterletboulevard',5,NULL,'1325EZ','Hellum','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(16,'van den Velden','de Swartlaan',44,NULL,'1354LM','Kuitaart','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(17,'Brisee','Bozkurtlaan',128,NULL,'5013BE','Sint Jansklooster','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(18,'Veltman','van Dongensteeg',21,NULL,'7833JJ','Ameide','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(19,'van Salm','Kuijpersboulevard',94,NULL,'7642EN','Valkenburg','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57'),(20,'van Bol\'es Rijnbende','Koningsring',4,NULL,'3439LB','Rijpwetering','Nederland',NULL,'2025-12-24 19:36:57','2025-12-24 19:36:57');
/*!40000 ALTER TABLE `families` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-24 21:26:56
