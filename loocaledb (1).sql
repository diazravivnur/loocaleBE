-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2023 at 05:51 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loocaledb`
--

-- --------------------------------------------------------

--
-- Table structure for table `connects`
--

CREATE TABLE `connects` (
  `id` int(11) NOT NULL,
  `background` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `connects`
--

INSERT INTO `connects` (`id`, `background`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'http://localhost:5000/1666337771838-bike_touring.png', 'Bike Touring', '2022-10-21 07:36:11', '2022-10-21 07:36:11'),
(2, 'http://localhost:5000/1666337792969-hiking.png', 'Hiking', '2022-10-21 07:36:32', '2022-10-21 07:36:32'),
(3, 'http://localhost:5000/1666337806551-camping.png', 'Camping', '2022-10-21 07:36:46', '2022-10-21 07:36:46'),
(4, 'http://localhost:5000/1666337822362-temple.png', 'Temple Admirer', '2022-10-21 07:37:02', '2022-10-21 07:37:02'),
(5, 'http://localhost:5000/1666337838057-architecture.png', 'Architecture', '2022-10-21 07:37:18', '2022-10-21 07:37:18'),
(6, 'http://localhost:5000/1666337971918-spicy.png', 'Spicy Culinary', '2022-10-21 07:39:31', '2022-10-21 07:39:31'),
(7, 'http://localhost:5000/1666337988203-traditional.png', 'Traditional Culinary', '2022-10-21 07:39:48', '2022-10-21 07:39:48'),
(8, 'http://localhost:5000/1666338005043-vegan.png', 'Vegan On Look', '2022-10-21 07:40:05', '2022-10-21 07:40:05'),
(9, 'http://localhost:5000/1666338019683-chicken.png', 'Chicken Lovers', '2022-10-21 07:40:19', '2022-10-21 07:40:19'),
(10, 'http://localhost:5000/1666338030654-meat.png', 'Meat No. 1', '2022-10-21 07:40:30', '2022-10-21 07:40:30'),
(11, 'http://localhost:5000/1666338042662-coffee.png', 'Coffee Experts', '2022-10-21 07:40:42', '2022-10-21 07:40:42');

-- --------------------------------------------------------

--
-- Table structure for table `discovers`
--

CREATE TABLE `discovers` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `href` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discovers`
--

INSERT INTO `discovers` (`id`, `image`, `location`, `createdAt`, `updatedAt`, `href`) VALUES
(1, 'http://localhost:5000/1666247987348-pulau-marabatua.jpg', 'Pulau Marabatua, Kab. Kota Baru', '2022-10-20 06:39:47', '2022-10-20 06:39:47', 'https://goo.gl/maps/qVXSioSzzRBKZjsv7'),
(2, 'http://localhost:5000/1666248059437-desa-batara.jpg', 'Desa Batara, Banten', '2022-10-20 06:40:59', '2022-10-20 06:40:59', 'https://goo.gl/maps/PfQ5u7EM2c9QW2646'),
(3, 'http://localhost:5000/1666248080000-kampung-warna.jpg', 'Kampung Warna, Malang', '2022-10-20 06:41:20', '2022-10-20 06:41:20', 'https://goo.gl/maps/kdGi8Q2wDyAuWLHa7'),
(4, 'http://localhost:5000/1666248099346-danau-situpatenggang.jpg', 'Danau Situpatenggang, Bandung', '2022-10-20 06:41:39', '2022-10-20 06:41:39', 'https://goo.gl/maps/dWxWCWz2D74iffgAA'),
(5, 'http://localhost:5000/1666248117870-pecatu-badung.jpg', 'Pecatu, Badung', '2022-10-20 06:41:57', '2022-10-20 06:41:57', 'https://goo.gl/maps/J7vXEfLSantpn3tB7'),
(6, 'http://localhost:5000/1666248141352-tumpak-sewu.jpg', 'Air Terjun Tumpak Sewu, Lumajang', '2022-10-20 06:42:21', '2022-10-20 06:42:21', 'https://goo.gl/maps/X7oaC4PFwUxuMTU49'),
(7, 'http://localhost:5000/1666248159674-stasiun-mrt.jpg', 'Stasiun MRT, Jakarta', '2022-10-20 06:42:39', '2022-10-20 06:42:39', 'https://goo.gl/maps/ir5chrHQWe7g8P2C8'),
(8, 'http://localhost:5000/1666248643761-masjid-baiturrahman.jpg', 'Masjid Baiturrahman', '2022-10-20 06:50:43', '2022-10-20 06:50:43', 'https://goo.gl/maps/fVUrFWLLGTw6tME56'),
(9, 'http://localhost:5000/1666248678586-kawah-ijen.jpg', 'Kawah Ijen, Banyuwangi', '2022-10-20 06:51:18', '2022-10-20 06:51:18', 'https://goo.gl/maps/CUevFWofiqhNEwdC6'),
(10, 'http://localhost:5000/1666248738710-pantai-klingking.jpg', 'Pantai Kelingking, Kab. Klungkung', '2022-10-20 06:52:18', '2022-10-20 06:52:18', 'https://goo.gl/maps/YZH2K4bPNkqDPyif9'),
(11, 'http://localhost:5000/1666248771686-grand-luley.jpg', 'Grand Luley, Manado', '2022-10-20 06:52:51', '2022-10-20 06:52:51', 'https://goo.gl/maps/kCC1szBnvfQbX6b16'),
(12, 'http://localhost:5000/1666248804216-lawang-sewu.jpg', 'Lawang Sewu, Semarang', '2022-10-20 06:53:24', '2022-10-20 06:53:24', 'https://goo.gl/maps/GMbWHm958fGURM6Q8'),
(13, 'http://localhost:5000/1666248839049-situ-gunung.jpg', 'Situ Gunung, Sukabumi', '2022-10-20 06:53:59', '2022-10-20 06:53:59', 'https://goo.gl/maps/E3Gq5PHUU1T5XuLJ6'),
(14, 'http://localhost:5000/1666248878170-gunung-bromo.jpg', 'Gunung Bromo, Pasuruan', '2022-10-20 06:54:38', '2022-10-20 06:54:38', 'https://goo.gl/maps/dkwbaJQ2djxwojA89'),
(15, 'http://localhost:5000/1666248910648-jembrana.jpg', 'Jembrana, Bali', '2022-10-20 06:55:10', '2022-10-20 06:55:10', 'https://goo.gl/maps/b7HXEaMZAc89kPGu7');

-- --------------------------------------------------------

--
-- Table structure for table `profilecommunities`
--

CREATE TABLE `profilecommunities` (
  `id` int(11) NOT NULL,
  `profileId` int(11) NOT NULL,
  `connectId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210525134731-create-user.js'),
('20221011150718-create-discover.js'),
('20221011154606-create-connect.js'),
('20221203010001-create-profiles.js'),
('20221203013627-create-profile-communities.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `OTP` int(11) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connects`
--
ALTER TABLE `connects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discovers`
--
ALTER TABLE `discovers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profilecommunities`
--
ALTER TABLE `profilecommunities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profileId` (`profileId`),
  ADD KEY `connectId` (`connectId`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `connects`
--
ALTER TABLE `connects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `discovers`
--
ALTER TABLE `discovers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `profilecommunities`
--
ALTER TABLE `profilecommunities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `profilecommunities`
--
ALTER TABLE `profilecommunities`
  ADD CONSTRAINT `profilecommunities_ibfk_1` FOREIGN KEY (`profileId`) REFERENCES `profiles` (`id`),
  ADD CONSTRAINT `profilecommunities_ibfk_2` FOREIGN KEY (`connectId`) REFERENCES `connects` (`id`);

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
