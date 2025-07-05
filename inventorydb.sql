-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 05, 2025 at 02:59 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventorydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_table`
--

DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE IF NOT EXISTS `admin_table` (
  `admin_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin_table`
--

INSERT INTO `admin_table` (`admin_id`, `email`, `name`, `password`, `role`) VALUES
(2, 'admin.rohit@mail.com', 'rohit kuwar', '123', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK979liw4xk18ncpl87u4tygx2u` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `brand`, `category`, `created_at`, `description`, `name`, `price`, `quantity`, `updated_at`, `user_id`) VALUES
(1, 'Parle', 'Snacks', '2025-06-21 10:50:12.458799', 'Pack of 10 biscuits', 'Parle-G Biscuits', 10.5, 50, '2025-06-21 10:50:12.458799', 2),
(3, 'HP', 'Hardware', '2025-06-21 11:01:44.369854', 'Laptop HP 14 CK 2018 TU', 'HP Internationals', 49999, 20, '2025-06-21 11:01:44.369854', 2),
(4, 'Lays', 'Snacks', '2025-06-21 11:03:22.141839', 'Lays Chips', 'Lays Chips', 25.18, 20, '2025-06-21 11:03:22.141839', 16),
(6, NULL, NULL, '2025-07-05 08:08:54.596776', 'Halogen Light for home', 'Light Bulb', 300, 0, '2025-07-05 08:08:54.596776', 16);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `about` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `about`, `contact`, `email`, `password`, `role`, `username`) VALUES
(2, '', '1234567890', 'rohit@mail.com', '12345', 'Developer', 'ROHIT HIMMAT KOLI'),
(16, 'Sachin', '123456740', 'sachin@mail.com', '12345', 'User', 'Sachin'),
(17, 'Takla', '123456740', 'jatin@mail.com', 'JAtin12345', 'User', 'Jatin'),
(23, 'My Name is Premdas Bhil.', '9084589332', 'prem@mail.com', 'Prem@123', NULL, 'premdas'),
(24, 'Hello I\'m harry ', '1234567890', 'harish@mail.com', 'Harish@123', NULL, 'harish'),
(25, 'Jayesh@123', '1234567892', 'jayesh@gmail.com', 'Jayesh@1223', NULL, 'jayesh Koli');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK979liw4xk18ncpl87u4tygx2u` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
