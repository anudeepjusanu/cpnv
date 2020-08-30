const coreService = require('./mysql_core_service');
var service = {};

service.getCases = async (email) => {
    var user_info = await service.getUserByEmail(email);
    console.log(user_info);
    if (user_info && user_info.role) {
        if (user_info.role == 'CRT') {
            return coreService.query(`SELECT case_id, department_id,
            case_status, reason, exposure_date, exposure_describe, is_positive_diagnosis, diagnosis_received_date, diagnosis_test_date,
            symptoms_began_date, symptoms_respiratory, have_consult_doctor, consult_date, company_buildings, additional_info, review_additional_info, created_on
            FROM tbl_cases `);
        } else if (user_info.role == 'HRBP') {
            return coreService.query(`SELECT DISTINCT c.*, d.department_name FROM tbl_cases c
            LEFT JOIN tbl_departments d ON c.department_id = d.department_id
            JOIN tbl_user_departments ud ON c.department_id = ud.department_id
            JOIN tbl_users u ON ud.user_id = u.user_id WHERE u.email = '${email}' `);
        } else if (user_info.role == 'HRM') {
            return coreService.query(`SELECT c.*, d.department_name FROM tbl_cases c
            LEFT JOIN tbl_departments d ON c.department_id = d.department_id `);
        }
    }
    throw { message: "You don't have access this query!" };
};

service.getCaseReviews = async (caseId, query) => {
    //var user_info = await service.getUserByEmail(query.email);
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
            var case_info = await coreService.query(`SELECT case_id, department_id,
            case_status, reason, exposure_date, exposure_describe, is_positive_diagnosis, diagnosis_received_date, diagnosis_test_date,
            symptoms_began_date, symptoms_respiratory, have_consult_doctor, consult_date, company_buildings, additional_info, review_additional_info, created_on
            FROM tbl_cases WHERE case_id = '${caseId}' `);
            case_info = case_info[0] ? case_info[0] : {};
        } else {
            var case_info = await coreService.getOne('tbl_cases', { case_id: caseId });
            case_info.associates = await coreService.query(
                `SELECT * FROM tbl_case_associate_contacts WHERE is_associate = '1' AND case_id = '${caseId}' `,
            );
            case_info.nonassociates = await coreService.query(
                `SELECT * FROM tbl_case_associate_contacts WHERE is_associate != '1' AND case_id = '${caseId}' `,
            );
            case_info.reviews = await coreService.query(
                `SELECT * FROM tbl_case_review WHERE case_id = '${caseId}' `,
            );
        }
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
    var user_info = await service.getUserByEmail(reviewData.reviewer_user_email);
    console.log(user_info);
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
    return coreService.insert('tbl_case_review', objData);
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
    return service.updateCase(reviewData.case_id, {
        recommendations: reviewData.recommend_actions,
    });
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
    return coreService.query(
        "SELECT * FROM tbl_users WHERE email = '" +
        objData.email +
        "' AND pwd = '" +
        objData.pwd +
        "' ",
    );
};

service.getDepartments = async () => {
    return coreService.query('SELECT * FROM tbl_departments');
};

module.exports = service;
