-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 23, 2020 at 02:48 PM
-- Server version: 5.7.26
-- PHP Version: 7.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cepheid_app`
--
CREATE DATABASE IF NOT EXISTS `cepheid_app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cepheid_app`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cases`
--

CREATE TABLE `tbl_cases` (
  `case_id` int(11) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `emergency_conatct` varchar(100) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `is_working_remotely` tinyint(4) NOT NULL DEFAULT '0',
  `building_name` varchar(200) DEFAULT NULL,
  `area` varchar(200) DEFAULT NULL,
  `hrbp_name` varchar(200) DEFAULT NULL,
  `manager_name` varchar(200) DEFAULT NULL,
  `case_status` varchar(50) DEFAULT 'New',
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `tbl_deparments`
--

CREATE TABLE `tbl_deparments` (
  `deparment_id` int(11) NOT NULL,
  `deparment_name` varchar(200) NOT NULL,
  `is_active` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_deparments`
--

INSERT INTO `tbl_deparments` (`deparment_id`, `deparment_name`, `is_active`) VALUES
(1, 'Department 001', 1),
(2, 'Department 002', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `pwd` int(11) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `first_name` int(11) NOT NULL,
  `last_name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_cases`
--
ALTER TABLE `tbl_cases`
  ADD PRIMARY KEY (`case_id`);

--
-- Indexes for table `tbl_deparments`
--
ALTER TABLE `tbl_deparments`
  ADD PRIMARY KEY (`deparment_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_cases`
--
ALTER TABLE `tbl_cases`
  MODIFY `case_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_deparments`
--
ALTER TABLE `tbl_deparments`
  MODIFY `deparment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
