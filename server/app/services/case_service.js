const coreService = require("./mysql_core_service");
var service = {};

service.getCases = async (userId) => {
    return coreService.query('SELECT * FROM tbl_cases');
};

service.getCase = async (caseId) => {
    return coreService.query("SELECT * FROM tbl_cases WHERE case_id = '" + caseId + "' ");
};

service.addCase = async (params) => {
    return coreService.insert('tbl_cases', params);
};

service.updateCase = async () => {
    return coreService.query('SELECT * FROM tbl_deparments');
};

service.getDepartments = async () => {
    return coreService.query('SELECT * FROM tbl_deparments');
};

module.exports = service;