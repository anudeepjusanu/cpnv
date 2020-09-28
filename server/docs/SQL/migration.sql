ALTER TABLE `tbl_cases` ADD `parent_id` INT NULL DEFAULT NULL AFTER `case_id`;

CREATE TABLE `tbl_buildings` (
  `building_id` int(11) NOT NULL,
  `building_name` varchar(100) NOT NULL,
  `is_active` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `tbl_buildings`
  ADD PRIMARY KEY (`building_id`);

ALTER TABLE `tbl_buildings`
  MODIFY `building_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

INSERT INTO `tbl_buildings` (`building_id`, `building_name`, `is_active`) VALUES
(1, 'Sunnyvale Building 1', 1),
(2, 'Sunnyvale Building 2', 1),
(3, 'Sunnyvale Building 3', 1),
(4, 'Sunnyvale Building 4', 1),
(5, 'Sunnyvale Building 5', 1),
(6, 'Sunnyvale Building 6', 1),
(7, 'Sunnyvale Building 7', 1),
(8, 'Santa Clara Building 8', 1),
(9, 'Lodi', 1),
(10, 'Bothell', 1),
(11, 'Chicago', 1),
(12, 'Washington, DC', 1);

ALTER TABLE `tbl_cases` ADD `personal_email` varchar(100) NULL DEFAULT NULL AFTER `email`;

ALTER TABLE `tbl_cases` ADD `employee_symptoms` VARCHAR(1000) NULL DEFAULT NULL AFTER `diagnosis_test_date`;

ALTER TABLE `tbl_cases` ADD `doctor_comment` VARCHAR(1000) NULL DEFAULT NULL AFTER `consult_date`;

ALTER TABLE `tbl_users` CHANGE `role` `role` ENUM('HRM','CRT','HRBP','HRLOA') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

INSERT INTO `tbl_users` (`role`, `email`, `pwd`, `first_name`) VALUES ('HRLOA', 'surya.nalluri@cepheid.com', 'Admin@123', 'Surya');

CREATE TABLE `tbl_symptoms` (
  `symptom_id` int(11) NOT NULL,
  `symptom_name` varchar(200) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `tbl_symptoms`
  ADD PRIMARY KEY (`symptom_id`);

INSERT INTO `tbl_symptoms` (`symptom_id`, `symptom_name`, `is_active`) VALUES
(1, 'Fever or chills', 1),
(2, 'cough', 1),
(3, 'shortness of breath or difficulty breathing', 1),
(4, 'fatigue', 1),
(5, 'muscle or body aches', 1),
(6, 'headache', 1),
(7, 'new loss of taste or smell', 1),
(8, 'sore throat', 1),
(9, 'congestion or runny nose', 1),
(10, 'nausea or vomiting', 1),
(11, 'diarrhoea', 1);

ALTER TABLE `tbl_symptoms`
  MODIFY `symptom_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
