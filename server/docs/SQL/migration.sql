ALTER TABLE `tbl_cases` ADD `review_additional_info` TEXT NULL DEFAULT NULL AFTER `additional_info`;

ALTER TABLE `tbl_cases` ADD `recommendations` VARCHAR(100) NULL DEFAULT NULL AFTER `review_additional_info`;

CREATE TABLE `tbl_case_review` (
  `review_id` int(11) NOT NULL,
  `case_id` int(11) NOT NULL,
  `reviewer_type` enum('CRT','HRM') NOT NULL DEFAULT 'CRT',
  `reviewer_user_id` int(11) NOT NULL,
  `reviewer_user_email` varchar(100) NOT NULL,
  `reviewer_user_name` varchar(200) DEFAULT NULL,
  `recommend_actions` varchar(200) DEFAULT NULL,
  `other_preactions` varchar(1000) DEFAULT NULL,
  `created_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `tbl_case_review`
  ADD PRIMARY KEY (`review_id`);

ALTER TABLE `tbl_case_review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

DROP TABLE `tbl_deparments`;

DROP TABLE `tbl_users`;

CREATE TABLE `tbl_deparments` (
  `deparment_id` int(11) NOT NULL,
  `deparment_name` varchar(200) NOT NULL,
  `is_active` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `tbl_deparments`
  ADD PRIMARY KEY (`deparment_id`),
  ADD UNIQUE KEY `deparment_name` (`deparment_name`);

INSERT INTO `tbl_deparments` (`deparment_id`, `deparment_name`, `is_active`) VALUES
(1, 'Commercial-Sales', 1),
(2, 'Commercial-Service', 1),
(3, 'Commercial-Marketing', 1),
(4, 'Human Resources', 1),
(5, 'Finance', 1),
(6, 'Legal', 1),
(7, 'IT', 1),
(8, 'GAMA', 1),
(9, 'Quality', 1),
(10, 'Regulatory', 1),
(11, 'Clinical', 1),
(12, 'Oncology', 1),
(13, 'R&D', 1),
(14, 'CMTO', 1),
(15, 'Engineering', 1),
(16, 'PMO', 1),
(17, 'Strategic Development', 1),
(18, 'Operations', 1),
(19, 'Commerical Sales & Operations', 1),
(20, 'Marketing', 1),
(21, 'Sr. HRBP-Global Customer Care', 1);

ALTER TABLE `tbl_deparments`
  MODIFY `deparment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `role` enum('HRM','CRT','HRBP') DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

INSERT INTO `tbl_users` (`user_id`, `role`, `email`, `pwd`, `first_name`, `last_name`) VALUES
(1, 'HRM', 'jennifer.marasco@cepheid.com', 'Admin@123', 'Jennifer Marasco', NULL),
(2, 'HRM', 'karen.frechou-armijo@cepheid.com', 'Admin@123', 'Karen Frechou-Armijo', NULL),
(3, 'HRM', 'candice.cuthbertson@cepheid.com', 'Admin@123', 'Candice Cuthbertson', NULL),
(4, 'HRM', 'leslie.molina@cepheid.com', 'Admin@123', 'Leslie Molina', NULL),
(5, 'CRT', 'laurent.bellon@cepheid.com', 'Admin@123', 'Laurent Bellon', NULL),
(6, 'CRT', 'shibu.gangadharan@cepheid.com', 'Admin@123', 'Shibu Gangadharan', NULL),
(7, 'CRT', 'dave.persing@cepheid.com', 'Admin@123', 'Dave Persing', NULL),
(8, 'CRT', 'michael.loeffelholz@cepheid.com', 'Admin@123', 'Michael Loeffelholz', NULL),
(9, 'CRT', 'fred.tenover@cepheid.com', 'Admin@123', 'Fred Tenover', NULL),
(10, 'CRT', 'dave.benjamin@cepheid.com', 'Admin@123', 'Dave Benjamin', NULL),
(11, 'CRT', 'kimberly.kullen@cepheid.com', 'Admin@123', 'Kimberly Kullen', NULL),
(12, 'CRT', 'robert.uhlfelder@cepheid.com', 'Admin@123', 'Rob Uhlfelder', NULL),
(13, 'HRBP', 'ramneet.sandhu@cepheid.com', 'Admin@123', 'Ramneet Sandhu', NULL),
(14, 'HRBP', 'rony.gaglianonecalhau@cepheid.com', 'Admin@123', 'Rony Gaglianone Calhau', NULL),
(15, 'HRBP', 'brett.mcknight@cepheid.com', 'Admin@123', 'Brett McKnight', NULL),
(16, 'HRBP', 'lyndsey.clogston@cepheid.com', 'Admin@123', 'Lyndsey Clogston', NULL),
(17, 'HRBP', 'regina.bhardwaj@cepheid.com', 'Admin@123', 'Regina Bhardwaj', NULL),
(18, 'HRBP', 'theresa.halol@cepheid.com', 'Admin@123', 'Theresa Halol', NULL),
(19, 'HRBP', 'melissa.monroe@cepheid.com', 'Admin@123', 'Melissa Monroe', NULL),
(20, 'HRBP', 'lin.torres@cepheid.com', 'Admin@123', 'Lin Torres', NULL),
(27, 'HRBP', 'teresa.ortiz-luna@cepheid.com', 'Admin@123', 'Teresa Ortiz-Luna', NULL),
(29, 'HRBP', 'linda.taylor@cepheid.com', 'Admin@123', 'Linda Taylor', NULL);

ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;  

CREATE TABLE `tbl_user_departments` (
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `tbl_user_departments`
  ADD PRIMARY KEY (`user_id`,`department_id`),
  ADD KEY `tbldpt` (`department_id`);
  
ALTER TABLE `tbl_user_departments`
  ADD CONSTRAINT `tbldpt` FOREIGN KEY (`department_id`) REFERENCES `tbl_deparments` (`deparment_id`),
  ADD CONSTRAINT `tbluser` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`);  

INSERT INTO `tbl_user_departments` (`user_id`, `department_id`) VALUES
(13, 1),
(13, 2),
(13, 3),
(14, 4),
(15, 5),
(15, 6),
(15, 7),
(15, 8),
(16, 9),
(16, 10),
(16, 11),
(17, 12),
(17, 13),
(17, 14),
(18, 15),
(18, 16),
(19, 18),
(20, 19),
(27, 20),
(29, 21);
