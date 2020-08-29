const coreService = require("./mysql_core_service");
var service = {};

service.getCases = async (userId) => {
    return coreService.query('SELECT * FROM tbl_cases');
};

service.getCase = async (caseId) => {
    return coreService.getOne("tbl_cases", { case_id: caseId });
};

service.addCase = async (caseData) => {
    caseData.created_on = "NOW()";
    var result = await coreService.insert('tbl_cases', caseData);
    if (result.insertId) {
        return { case_id: result.insertId };
    }
    return result;
};

service.addCRTReview = async (reviewData) => {
    var user_info = await service.getUserByEmail(reviewData.reviewer_user_email);
    var objData = {
        case_id: reviewData.case_id,
        reviewer_type: 'CRT',
        reviewer_user_id: user_info.user_id,
        reviewer_user_email: user_info.email,
        reviewer_user_name: user_info.first_name,
        recommend_actions: reviewData.recommend_actions,
        other_preactions: reviewData.other_preactions,
        created_on: "NOW()"
    };
    return coreService.insert('tbl_case_review', objData);
};

service.addHRMReview = async (reviewData) => {
    var user_info = await service.getUserByEmail(reviewData.reviewer_user_email);
    var objData = {
        case_id: reviewData.case_id,
        reviewer_type: 'HRM',
        reviewer_user_id: user_info.user_id,
        reviewer_user_email: user_info.email,
        reviewer_user_name: user_info.first_name,
        recommend_actions: reviewData.recommend_actions,
        other_preactions: reviewData.other_preactions,
        created_on: "NOW()"
    };
    await coreService.insert('tbl_case_review', objData);
    return service.updateCase(reviewData.case_id, { recommenddations: reviewData.recommend_actions });
};

service.updateCase = async (caseId, caseData = []) => {
    return coreService.updateById('tbl_cases', { case_id: caseId }, caseData);
};

service.addCaseAssociates = async (associates = []) => {
    var results = [];
    for (var i = 0; i < associates.length; i++) {
        var contactData = associates[i];
        var result = await coreService.insert('tbl_case_associate_contacts', contactData);
        if (result.insertId) {
            results.push(result.insertId);
        }
    }
    return results;
};

service.getUserByEmail = async (email) => {
    return coreService.getOne("tbl_users", { email: email });
};

service.getUserLogin = async (objData) => {
    return coreService.query("SELECT * FROM tbl_users WHERE email = '" + objData.email + "' AND pwd = '" + objData.pwd + "' ");
};

service.getDepartments = async () => {
    return coreService.query('SELECT * FROM tbl_deparments');
};

module.exports = service;