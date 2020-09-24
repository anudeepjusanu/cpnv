
--
-- Table structure for table `tbl_buildings`
--

DROP TABLE IF EXISTS `tbl_buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_buildings` (
  `building_id` int(11) NOT NULL AUTO_INCREMENT,
  `building_name` varchar(100) NOT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_buildings`
--

LOCK TABLES `tbl_buildings` WRITE;
/*!40000 ALTER TABLE `tbl_buildings` DISABLE KEYS */;
INSERT INTO `tbl_buildings` VALUES (1,'Sunnyvale Building 1',1),(2,'Sunnyvale Building 2',1),(3,'Sunnyvale Building 3',1),(4,'Sunnyvale Building 4',1),(5,'Sunnyvale Building 5',1),(6,'Sunnyvale Building 6',1),(7,'Sunnyvale Building 7',1),(8,'Santa Clara Building 8',1),(9,'Lodi',1),(10,'Bothell',1),(11,'Chicago',1),(12,'Washington, DC',1);
/*!40000 ALTER TABLE `tbl_buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_case_associate_contacts`
--

DROP TABLE IF EXISTS `tbl_case_associate_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_case_associate_contacts` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `case_id` int(11) NOT NULL,
  `is_associate` tinyint(4) NOT NULL DEFAULT '1',
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `has_social_distance` tinyint(4) DEFAULT NULL,
  `ppe_worn` varchar(250) DEFAULT NULL,
  `duration` varchar(200) DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `created_on` datetime NOT NULL,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_case_review`
--

DROP TABLE IF EXISTS `tbl_case_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_case_review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `case_id` int(11) NOT NULL,
  `reviewer_type` enum('CRT','HRM') NOT NULL DEFAULT 'CRT',
  `reviewer_user_id` int(11) NOT NULL,
  `reviewer_user_email` varchar(100) NOT NULL,
  `reviewer_user_name` varchar(200) DEFAULT NULL,
  `recommend_actions` varchar(200) DEFAULT NULL,
  `other_preactions` varchar(1000) DEFAULT NULL,
  `created_on` datetime NOT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_cases`
--

DROP TABLE IF EXISTS `tbl_cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cases` (
  `case_id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `personal_email` varchar(100) DEFAULT NULL,
  `mobile` varchar(50) NOT NULL,
  `emergency_conatct` varchar(100) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `is_working_remotely` tinyint(4) NOT NULL DEFAULT '0',
  `building_name` varchar(200) DEFAULT NULL,
  `area` varchar(200) DEFAULT NULL,
  `hrbp_name` varchar(200) DEFAULT NULL,
  `manager_name` varchar(200) DEFAULT NULL,
  `case_status` varchar(50) DEFAULT 'New',
  `reason` enum('Exposed','Diagnosed','Symptoms','Quarantine') DEFAULT NULL,
  `exposure_date` date DEFAULT NULL,
  `exposure_describe` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `is_positive_diagnosis` tinyint(4) DEFAULT NULL,
  `diagnosis_received_date` date DEFAULT NULL,
  `diagnosis_test_date` date DEFAULT NULL,
  `employee_symptoms` varchar(1000) DEFAULT NULL,
  `symptoms_began_date` date DEFAULT NULL,
  `symptoms_respiratory` text,
  `have_consult_doctor` tinyint(4) DEFAULT NULL,
  `consult_date` date DEFAULT NULL,
  `doctor_comment` varchar(1000) DEFAULT NULL,
  `company_buildings` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `additional_info` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `review_additional_info` text,
  `recommendations` varchar(100) DEFAULT NULL,
  `final_test_result` tinyint(4) DEFAULT NULL,
  `final_quarantine_started` tinyint(4) DEFAULT NULL,
  `final_quarantine_start_date` date DEFAULT NULL,
  `final_quarantine_end_date` date DEFAULT NULL,
  `final_other_info` text,
  `created_on` datetime DEFAULT NULL,
  PRIMARY KEY (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_departments`
--

DROP TABLE IF EXISTS `tbl_departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(200) NOT NULL,
  `is_active` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_departments`
--

LOCK TABLES `tbl_departments` WRITE;
/*!40000 ALTER TABLE `tbl_departments` DISABLE KEYS */;
INSERT INTO `tbl_departments` VALUES (1,'Commercial-Sales',1),(2,'Commercial-Service',1),(3,'Commercial-Marketing',1),(4,'Human Resources',1),(5,'Finance',1),(6,'Legal',1),(7,'IT',1),(8,'GAMA',1),(9,'Quality',1),(10,'Regulatory',1),(11,'Clinical',1),(12,'Oncology',1),(13,'R&D',1),(14,'CMTO',1),(15,'Engineering',1),(16,'PMO',1),(17,'Strategic Development',1),(18,'Operations',1),(19,'Commerical Sales & Operations',1),(20,'Marketing',1),(21,'Sr. HRBP-Global Customer Care',1);
/*!40000 ALTER TABLE `tbl_departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user_departments`
--

DROP TABLE IF EXISTS `tbl_user_departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user_departments` (
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`department_id`),
  KEY `tbldpt` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user_departments`
--

LOCK TABLES `tbl_user_departments` WRITE;
/*!40000 ALTER TABLE `tbl_user_departments` DISABLE KEYS */;
INSERT INTO `tbl_user_departments` VALUES (13,1),(13,2),(13,3),(14,4),(15,5),(15,6),(15,7),(15,8),(16,9),(16,10),(16,11),(17,12),(17,13),(17,14),(18,15),(18,16),(19,18),(20,19),(27,20),(31,20),(29,21);
/*!40000 ALTER TABLE `tbl_user_departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` enum('HRM','CRT','HRBP') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'HRM','jennifer.marasco@cepheid.com','Admin@123','Jennifer Marasco',NULL),(2,'HRM','karen.frechou-armijo@cepheid.com','Admin@123','Karen Frechou-Armijo',NULL),(3,'HRM','candice.cuthbertson@cepheid.com','Admin@123','Candice Cuthbertson',NULL),(4,'HRM','leslie.molina@cepheid.com','Admin@123','Leslie Molina',NULL),(5,'CRT','laurent.bellon@cepheid.com','Admin@123','Laurent Bellon',NULL),(6,'CRT','shibu.gangadharan@cepheid.com','Admin@123','Shibu Gangadharan',NULL),(7,'CRT','dave.persing@cepheid.com','Admin@123','Dave Persing',NULL),(8,'CRT','michael.loeffelholz@cepheid.com','Admin@123','Michael Loeffelholz',NULL),(9,'CRT','fred.tenover@cepheid.com','Admin@123','Fred Tenover',NULL),(10,'CRT','dave.benjamin@cepheid.com','Admin@123','Dave Benjamin',NULL),(11,'CRT','kimberly.kullen@cepheid.com','Admin@123','Kimberly Kullen',NULL),(12,'CRT','robert.uhlfelder@cepheid.com','Admin@123','Rob Uhlfelder',NULL),(13,'HRBP','ramneet.sandhu@cepheid.com','Admin@123','Ramneet Sandhu',NULL),(14,'HRBP','rony.gaglianonecalhau@cepheid.com','Admin@123','Rony Gaglianone Calhau',NULL),(15,'HRBP','brett.mcknight@cepheid.com','Admin@123','Brett McKnight',NULL),(16,'HRBP','lyndsey.clogston@cepheid.com','Admin@123','Lyndsey Clogston',NULL),(17,'HRBP','regina.bhardwaj@cepheid.com','Admin@123','Regina Bhardwaj',NULL),(18,'HRBP','theresa.halol@cepheid.com','Admin@123','Theresa Halol',NULL),(19,'HRBP','melissa.monroe@cepheid.com','Admin@123','Melissa Monroe',NULL),(20,'HRBP','lin.torres@cepheid.com','Admin@123','Lin Torres',NULL),(27,'HRBP','teresa.ortiz-luna@cepheid.com','Admin@123','Teresa Ortiz-Luna',NULL),(29,'HRBP','linda.taylor@cepheid.com','Admin@123','Linda Taylor',NULL),(30,'HRM','anudeep.duri@cepheid.com','Admin@123','Anudeep','D'),(31,'HRBP','mohammed.sadiq@cepheid.com','Admin@123','Mohammed',NULL),(32,'CRT','afsarunnisa.afsarunnisa@cepheid.com','Admin@123','Afsarunnisa',NULL),(33,'','surya.nalluri@cepheid.com','Admin@123','Surya',NULL);
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

-- Dump completed on 2020-09-24 20:44:17
