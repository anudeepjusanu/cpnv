ALTER TABLE `tbl_cases` ADD `review_additional_info` TEXT NULL DEFAULT NULL AFTER `additional_info`;

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

