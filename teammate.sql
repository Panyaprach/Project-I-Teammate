-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2017 at 11:37 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teammate`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertise`
--

CREATE TABLE `advertise` (
  `ads_id` int(11) NOT NULL,
  `content` varchar(250) DEFAULT NULL,
  `img_id` int(11) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `generate_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `advertise`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `con_id` int(11) NOT NULL,
  `lb_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `datesent` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `c_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `firstname` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `generate_date` datetime DEFAULT NULL,
  `image` int(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'Normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--


-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `img_id` int(11) NOT NULL,
  `path` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `image`
--

-- --------------------------------------------------------

--
-- Table structure for table `interesting`
--

CREATE TABLE `interesting` (
  `c_id` int(11) NOT NULL,
  `s_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `joinlobby`
--

CREATE TABLE `joinlobby` (
  `join_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `lb_id` int(11) NOT NULL,
  `is_head` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lobby`
--

CREATE TABLE `lobby` (
  `lb_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `sport` int(11) NOT NULL,
  `max_member` int(2) NOT NULL,
  `location` int(11) DEFAULT NULL,
  `chatroom` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `lc_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `latitude` varchar(15) NOT NULL,
  `longitude` varchar(15) NOT NULL,
  `by_admin` tinyint(1) NOT NULL,
  `c_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

-- --------------------------------------------------------

--
-- Table structure for table `medical`
--

CREATE TABLE `medical` (
  `m_id` int(11) NOT NULL,
  `content` varchar(75) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `medical`
--

-- --------------------------------------------------------

--
-- Table structure for table `notify`
--

CREATE TABLE `notify` (
  `n_id` int(11) NOT NULL,
  `content` varchar(250) NOT NULL,
  `from_user` int(11) NOT NULL,
  `to_user` int(11) NOT NULL,
  `have_read` tinyint(1) NOT NULL,
  `invite_to` int(11) DEFAULT NULL,
  `dateread` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `datesent` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sport`
--

CREATE TABLE `sport` (
  `s_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sport`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertise`
--
ALTER TABLE `advertise`
  ADD PRIMARY KEY (`ads_id`),
  ADD KEY `advertise_ibfk_1` (`img_id`);

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`con_id`),
  ADD KEY `c_id` (`c_id`),
  ADD KEY `lb_id` (`lb_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`c_id`),
  ADD KEY `image` (`image`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`img_id`);

--
-- Indexes for table `interesting`
--
ALTER TABLE `interesting`
  ADD KEY `c_id` (`c_id`),
  ADD KEY `s_id` (`s_id`);

--
-- Indexes for table `joinlobby`
--
ALTER TABLE `joinlobby`
  ADD PRIMARY KEY (`join_id`),
  ADD KEY `c_id` (`c_id`),
  ADD KEY `lb_id` (`lb_id`);

--
-- Indexes for table `lobby`
--
ALTER TABLE `lobby`
  ADD PRIMARY KEY (`lb_id`),
  ADD KEY `sport` (`sport`),
  ADD KEY `location` (`location`),
  ADD KEY `chatroom` (`chatroom`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`lc_id`),
  ADD KEY `u_id` (`c_id`);

--
-- Indexes for table `medical`
--
ALTER TABLE `medical`
  ADD PRIMARY KEY (`m_id`),
  ADD KEY `image` (`img_id`);

--
-- Indexes for table `notify`
--
ALTER TABLE `notify`
  ADD PRIMARY KEY (`n_id`),
  ADD KEY `from_user` (`from_user`),
  ADD KEY `to_user` (`to_user`),
  ADD KEY `invite_to` (`invite_to`);

--
-- Indexes for table `sport`
--
ALTER TABLE `sport`
  ADD PRIMARY KEY (`s_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advertise`
--
ALTER TABLE `advertise`
  MODIFY `ads_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT for table `joinlobby`
--
ALTER TABLE `joinlobby`
  MODIFY `join_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `lobby`
--
ALTER TABLE `lobby`
  MODIFY `lb_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `lc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `medical`
--
ALTER TABLE `medical`
  MODIFY `m_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `notify`
--
ALTER TABLE `notify`
  MODIFY `n_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sport`
--
ALTER TABLE `sport`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `advertise`
--
ALTER TABLE `advertise`
  ADD CONSTRAINT `advertise_ibfk_1` FOREIGN KEY (`img_id`) REFERENCES `image` (`img_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `conversation`
--
ALTER TABLE `conversation`
  ADD CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`),
  ADD CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`lb_id`) REFERENCES `lobby` (`lb_id`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`image`) REFERENCES `image` (`img_id`);

--
-- Constraints for table `interesting`
--
ALTER TABLE `interesting`
  ADD CONSTRAINT `interesting_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`),
  ADD CONSTRAINT `interesting_ibfk_2` FOREIGN KEY (`s_id`) REFERENCES `sport` (`s_id`);

--
-- Constraints for table `joinlobby`
--
ALTER TABLE `joinlobby`
  ADD CONSTRAINT `joinlobby_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`),
  ADD CONSTRAINT `joinlobby_ibfk_2` FOREIGN KEY (`lb_id`) REFERENCES `lobby` (`lb_id`);

--
-- Constraints for table `lobby`
--
ALTER TABLE `lobby`
  ADD CONSTRAINT `lobby_ibfk_1` FOREIGN KEY (`sport`) REFERENCES `sport` (`s_id`),
  ADD CONSTRAINT `lobby_ibfk_2` FOREIGN KEY (`location`) REFERENCES `location` (`lc_id`),
  ADD CONSTRAINT `lobby_ibfk_3` FOREIGN KEY (`chatroom`) REFERENCES `conversation` (`con_id`);

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`);

--
-- Constraints for table `medical`
--
ALTER TABLE `medical`
  ADD CONSTRAINT `img_id` FOREIGN KEY (`m_id`) REFERENCES `image` (`img_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notify`
--
ALTER TABLE `notify`
  ADD CONSTRAINT `notify_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `customer` (`c_id`),
  ADD CONSTRAINT `notify_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `customer` (`c_id`),
  ADD CONSTRAINT `notify_ibfk_3` FOREIGN KEY (`invite_to`) REFERENCES `lobby` (`lb_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
