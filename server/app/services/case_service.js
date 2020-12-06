const coreService = require('./mysql_core_service');
var service = {};

service.getCases = async (email) => {
    var user_info = await service.getUserByEmail(email);
    if (user_info && user_info.role) {
        if (user_info.role == 'CRT') {
            return coreService.query(`SELECT c.case_id, c.reason, c.is_working_remotely, c.building_name, c.area, c.exposure_date, c.exposure_describe, 
            c.is_positive_diagnosis, c.diagnosis_received_date, c.diagnosis_test_date, c.employee_symptoms, c.symptoms_began_date, c.symptoms_respiratory, 
            c.have_consult_doctor, c.consult_date, c.doctor_comment, c.company_buildings, c.additional_info, c.review_additional_info, c.created_on,
            (SELECT CASE WHEN cr.review_id IS NULL THEN 'New' ELSE 'Reviewed' END) AS case_status
            FROM tbl_cases c 
            LEFT JOIN tbl_case_review cr ON (c.case_id = cr.case_id AND cr.reviewer_user_id = '${user_info.user_id}')
            WHERE c.case_status = 'Under Review' OR c.case_status = 'CRT Reviewed'
            OR (cr.review_id IS NOT NULL AND c.case_status != 'Case Closed')
            ORDER BY c.case_id DESC `);
        } else if (user_info.role == 'HRBP') {
            return coreService.query(`SELECT DISTINCT c.*, d.department_name, hrbp.first_name AS hrbp_first_name, hrbp.last_name AS hrbp_last_name,
            (SELECT CASE WHEN COUNT(*) = 0 THEN 0 ELSE 1 END  FROM tbl_cases s WHERE s.parent_id = c.case_id) AS has_child_cases
            FROM tbl_cases c
            LEFT JOIN tbl_departments d ON c.department_id = d.department_id
            JOIN tbl_user_departments ud ON c.department_id = ud.department_id
            LEFT JOIN tbl_users hrbp ON c.review_added_user_id = hrbp.user_id
            JOIN tbl_users u ON ud.user_id = u.user_id WHERE u.email = '${email}'  ORDER BY case_id DESC `);
        } else if (user_info.role == 'HRM') {
            return coreService.query(`SELECT c.*, d.department_name, hrbp.first_name AS hrbp_first_name, hrbp.last_name AS hrbp_last_name,
            (SELECT CASE WHEN COUNT(*) = 0 THEN 0 ELSE 1 END  FROM tbl_cases s WHERE s.parent_id = c.case_id) AS has_child_cases
            FROM tbl_cases c
            LEFT JOIN tbl_departments d ON c.department_id = d.department_id
            LEFT JOIN tbl_users hrbp ON c.review_added_user_id = hrbp.user_id  ORDER BY case_id DESC `);
        } else if (user_info.role == "HRLOA") {
            return coreService.query(`SELECT c.*, d.department_name, hrbp.first_name AS hrbp_first_name, hrbp.last_name AS hrbp_last_name,
            FROM tbl_cases c
            LEFT JOIN tbl_departments d ON c.department_id = d.department_id 
            LEFT JOIN tbl_users hrbp ON c.review_added_user_id = hrbp.user_id 
            WHERE c.case_status = 'HRM Reviewed' OR c.case_status = 'Final Action' OR c.case_status = 'Case Closed'
            ORDER BY c.case_id DESC `);
        }
    }
    throw { message: "You don't have access this query!" };
};

service.getCaseReviews = async (caseId, query) => {
    return coreService.query(
        `SELECT * FROM tbl_case_review WHERE case_id = '${caseId}' `,
    );
};

service.getCase = async (caseId, email) => {
    var user_info = await service.getUserByEmail(email);
    var case_info = {
        associates: [],
        nonassociates: [],
        reviews: []
    };
    if (user_info && user_info.role) {
        if (user_info.role == 'CRT') {
            var case_info = await coreService.query(`SELECT c.case_id, c.case_status, c.reason, c.is_working_remotely, 
            c.building_name, c.area, c.exposure_date, c.exposure_describe, c.is_positive_diagnosis, c.diagnosis_received_date, 
            c.diagnosis_test_date, c.symptoms_began_date, c.symptoms_respiratory, c.have_consult_doctor, 
            c.consult_date, c.company_buildings, c.additional_info, c.review_additional_info, c.created_on,
            u.first_name AS hrbp_first_name, u.last_name AS hrbp_last_name
            FROM tbl_cases c 
            LEFT JOIN tbl_users u ON c.review_added_user_id = u.user_id
            WHERE case_id = '${caseId}' `);
            case_info = case_info[0] ? case_info[0] : {};
        } else {
            var case_info = await coreService.query(
                `SELECT c.*, d.department_name, u.first_name AS hrbp_first_name, u.last_name AS hrbp_last_name FROM tbl_cases c 
                LEFT JOIN tbl_departments d ON c.department_id = d.department_id
                LEFT JOIN tbl_users u ON c.review_added_user_id = u.user_id
                WHERE c.case_id = '${caseId}' `
            );
            case_info = (case_info[0]) ? case_info[0] : {};
        }
        case_info.associates = await coreService.query(
            `SELECT cac.*, c.case_id AS child_case_id,
            (SELECT CASE WHEN COUNT(*) = 0 THEN 0 ELSE 1 END  FROM tbl_cases s WHERE s.parent_contact_id = cac.contact_id) AS is_case_created 
            FROM tbl_case_associate_contacts cac 
            LEFT JOIN tbl_cases c ON c.parent_contact_id = cac.contact_id
            WHERE cac.is_associate = '1' AND cac.case_id = '${caseId}' `,
        );
        case_info.nonassociates = await coreService.query(
            `SELECT cac.*, c.case_id AS child_case_id,
            (SELECT CASE WHEN COUNT(*) = 0 THEN 0 ELSE 1 END  FROM tbl_cases s WHERE s.parent_contact_id = cac.contact_id) AS is_case_created 
            FROM tbl_case_associate_contacts cac 
            LEFT JOIN tbl_cases c ON c.parent_contact_id = cac.contact_id 
            WHERE cac.is_associate != '1' AND cac.case_id = '${caseId}' `,
        );

        case_info.reviews = await coreService.query(
            `SELECT * FROM tbl_case_review WHERE case_id = '${caseId}' `,
        );
        return case_info;
    }
    throw { message: "You don't have access this query!" };
};

service.addCase = async caseData => {
    caseData.created_on = 'NOW()';
    var result = await coreService.insert('tbl_cases', caseData);
    if (result.insertId) {
        return { case_id: result.insertId };
    }
    return result;
};

service.addCRTReview = async reviewData => {
    var user_info = await service.getUserByEmail(reviewData.email);
    var objData = {
        case_id: reviewData.case_id,
        reviewer_type: 'CRT',
        reviewer_user_id: user_info.user_id,
        reviewer_user_email: user_info.email,
        reviewer_user_name: user_info.first_name,
        recommend_actions: reviewData.recommend_actions,
        other_preactions: reviewData.other_preactions,
        created_on: 'NOW()',
    };
    var crt_result = {};
    var result = await coreService.insert('tbl_case_review', objData);
    if (result && result.insertId) {
        crt_result = await coreService.query(`UPDATE tbl_cases c SET c.case_status = 'CRT Reviewed' WHERE c.case_id = '${reviewData.case_id}' 
        AND (c.case_status = 'New' OR c.case_status = 'Under Review')  
        AND (SELECT COUNT(*) FROM tbl_case_review cr WHERE cr.case_id = '${reviewData.case_id}' ) >= 3 `);
    }
    return crt_result;
};

service.addHRMReview = async reviewData => {
    var user_info = await service.getUserByEmail(reviewData.reviewer_user_email);
    var objData = {
        case_id: reviewData.case_id,
        reviewer_type: 'HRM',
        reviewer_user_id: user_info.user_id,
        reviewer_user_email: user_info.email,
        reviewer_user_name: user_info.first_name,
        recommend_actions: reviewData.recommend_actions,
        other_preactions: reviewData.other_preactions,
        created_on: 'NOW()',
    };
    await coreService.insert('tbl_case_review', objData);
    await service.updateCase(reviewData.case_id, {
        recommendations: reviewData.recommend_actions,
    });
    return coreService.query(`UPDATE tbl_cases SET case_status = 'HRM Reviewed' WHERE case_id = '${reviewData.case_id}' AND case_status = 'CRT Reviewed' `);
};

service.updateCase = async (caseId, caseData = []) => {
    return coreService.updateById('tbl_cases', { case_id: caseId }, caseData);
};

service.addCaseAssociates = async (associates = []) => {
    var results = [];
    for (var i = 0; i < associates.length; i++) {
        var contactData = associates[i];
        var result = await coreService.insert(
            'tbl_case_associate_contacts',
            contactData,
        );
        if (result.insertId) {
            results.push(result.insertId);
        }
    }
    return results;
};

service.getUserByEmail = async email => {
    return coreService.getOne('tbl_users', { email: email });
};

service.getUserLogin = async objData => {
    return coreService.query("SELECT * FROM tbl_users WHERE email = '" + objData.email + "' AND pwd = '" + objData.pwd + "' ");
};

service.getActiveHRBPUsersByDepartmentId = async (departmentId = null) => {
    return coreService.query(`SELECT u.* FROM tbl_users u
    JOIN tbl_user_departments ud ON u.user_id = ud.user_id 
    WHERE u.is_active = '1' AND u.role = 'HRBP' AND ud.department_id = ${departmentId} `);
};

service.getActiveHRBPAndHRLOAUsers = async (caseId = null) => {
    return coreService.query(`SELECT u.* FROM tbl_users u
    LEFT JOIN tbl_user_departments ud ON (u.role = 'HRBP' AND u.user_id = ud.user_id)  
    LEFT JOIN tbl_cases c ON (case_id = '${caseId}' AND c.department_id = ud.department_id)
    WHERE u.is_active = '1' AND (u.role = 'HRLOA' OR (u.role = 'HRBP' AND c.case_id IS NOT NULL)) `);
};

service.getActiveHRMUsers = async (caseId = null) => {
    return coreService.query(`SELECT * FROM tbl_users WHERE role = 'HRM' AND is_active = '1' `);
};

service.getActiveCRTUsers = async (caseId = null) => {
    return coreService.query(`SELECT * FROM tbl_users WHERE role = 'CRT' AND is_active = '1' `);
};

service.getDepartments = async () => {
    return coreService.query(`SELECT d.department_id, d.department_name, u.email, u.first_name, u.last_name FROM tbl_departments d 
    LEFT JOIN tbl_user_departments ud ON d.department_id = ud.department_id
    LEFT JOIN tbl_users u ON ud.user_id = u.user_id
    WHERE d.is_active = '1' ORDER BY d.department_id ASC `);
};

service.getBuildings = async () => {
    return coreService.query(`SELECT * FROM tbl_buildings WHERE is_active = '1' ORDER BY building_name ASC `);
};

service.getSymptoms = async () => {
    return coreService.query(`SELECT * FROM tbl_symptoms WHERE is_active = '1' ORDER BY symptom_name ASC `);
};

module.exports = service;
