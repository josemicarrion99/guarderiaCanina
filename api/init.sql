CREATE DATABASE  IF NOT EXISTS `guarderia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `guarderia`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: guarderia
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `commentPostId_idx` (`postId`),
  KEY `commentUserId_idx` (`userId`),
  CONSTRAINT `commentPostId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commentUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (24,'Que monos!!','2023-07-22 17:39:34',45,60),(27,'La contratamos una vez y estamos muy contentos con el resultado!!','2023-07-24 01:24:52',45,61),(28,'Totalmente de acuerdo!','2023-07-24 01:25:25',22,61);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `likesUserId_idx` (`userId`),
  KEY `likesPostId_idx` (`postId`),
  CONSTRAINT `likesPostId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likesUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (29,45,60),(31,45,61),(34,22,74);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(2000) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `pinned` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (59,'Que bien me lo ha pasado hoy en el parque con Coco!!','1690039950674perro.jpg',20,'2023-07-22 17:32:30',0),(60,'Si buscas a un cuidador con amplia experiencia en cuidado de animales de compañía ponte en contacto conmigo!!','1690040113731persona2.jpg',20,'2023-07-22 17:35:13',1),(61,'Soy una veterinaria a la que le encanta cuidar de perros en su tiempo libre, si quieres un cuidador con conocimientos técnicos contacta conmigo! PD: el perro de la foto es Coco, es muy cariñoso y le encanta conocer perros nuevos','1690040546135persona3.jpg',21,'2023-07-22 17:42:26',1),(74,'hola','',20,'2023-07-24 11:41:27',0);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationships`
--

DROP TABLE IF EXISTS `relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerUserId` int NOT NULL,
  `followedUserId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `message` varchar(200) NOT NULL,
  `estado` enum('Pendiente','Aceptado','Rechazado') NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `followedUser_idx` (`followedUserId`),
  KEY `followerUser_idx` (`followerUserId`),
  CONSTRAINT `followedUser` FOREIGN KEY (`followedUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followerUser` FOREIGN KEY (`followerUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationships`
--

LOCK TABLES `relationships` WRITE;
/*!40000 ALTER TABLE `relationships` DISABLE KEYS */;
INSERT INTO `relationships` VALUES (112,45,20,'2023-07-24 11:40:02','CUidame al perro','Aceptado','1690191602457perro.jpg'),(113,20,45,'2023-07-24 11:40:20','vale','Aceptado','');
/*!40000 ALTER TABLE `relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(45) NOT NULL,
  `coverPic` varchar(300) DEFAULT NULL,
  `profilePic` varchar(300) DEFAULT NULL,
  `city` varchar(300) DEFAULT '',
  `language` varchar(100) DEFAULT '',
  `type` enum('Cliente','Cuidador','Administrador') NOT NULL,
  `phone` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'cuidador','cuidador@gmail.com','$2a$10$a5zBseBX1fxdTz1dWB1s6eAWm9Uy/D589QusndAMVJ12/WkY.GNRS','Juan Sánchez','1689350959335cover2.jpg','1687807248898persona2.jpg','Alicante, España','Español Inglés','Cuidador','601024578'),(21,'cuidador2','cuidador2@gmail.com','$2a$10$F8Rp/HOrMZgEw4Ox2GJye.N8/ZwcPyrFfpcEbVu2rq63pQEo8RJdm','María Pérez','1687807659936cover3.jpg','1687807278771persona3.jpg','Alicante, España','Inglés','Cuidador','601639965'),(22,'cliente2','cliente2@gmail.com','$2a$10$Xhv24s0eT9hzEph/U68XwOVRFUnKpwpjLoCJyRuGSYCs8LittqB8i','cliente2','1687807690624cover4.jpg','1687807690635persona4.jpg','Alicante, España','Inglés','Cliente','602567849'),(44,'admin','admin@gmail.com','$2a$10$Rc3McyhMCtKEA4x4Egi.QeYiLZT01CNsj/Clsb59v1DyWNcPx1JGa','admin',NULL,NULL,'','','Administrador',''),(45,'cliente','cliente@gmail.com','$2a$10$ZiozQu7HyamMz0LmqjEL7OCHCwiGKzJzfTBq5kpyUWvIfYvDNzxw2','cliente','1689351000621cover.jpg','1689351000644persona.jpg','Elche, España','Español, Inglés','Cliente','965325680');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 22:13:35
