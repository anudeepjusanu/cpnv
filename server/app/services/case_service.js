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
    return coreService.insert('tbl_cases', caseData);
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

service.getDepartments = async () => {
    return coreService.query('SELECT * FROM tbl_deparments');
};

module.exports = service;