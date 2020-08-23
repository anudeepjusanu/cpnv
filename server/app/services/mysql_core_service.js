const config = require('../../config');
const mysql = require('mysql');
const coreService = {
    conn: null,
};
coreService.conn = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USERNAME,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE
});
coreService.conn.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + coreService.conn.threadId);
});

coreService.query = async (sqlText, bindData = []) => {
    return new Promise(async (resolve, reject) => {
        coreService.conn.query(sqlText, function (error, results, fields) {
            if (error) reject(error);
            // connected!
            resolve(results);
        });
    });
}

coreService.getOne = async (sqlText, bindData = []) => {
    return new Promise(async (resolve, reject) => {
        coreService.conn.query(sqlText, function (error, results, fields) {
            if (error) reject(error);
            // connected!
            resolve(results);
        });
    });
}

coreService.insert = async (tbl, pdata = {}) => {
    var bindData = [];
    var fieldKeys = [];
    var fieldVals = [];
    for (const [key, val] of Object.entries(pdata)) {
        fieldKeys.push(key);
        fieldVals.push('?');
        bindData.push(val);
    }
    var sqlText = "INSERT INTO `" + tbl + "` ( " + fieldKeys.join(",") + " ) VALUES (" + fieldVals.join(",") + ")";
    console.log(sqlText);
    console.log(bindData);
    return coreService.query(sqlText, bindData);
}

coreService.update = async (tbl, bindData = []) => {
    return new Promise(async (resolve, reject) => {
        coreService.conn.query(sqlText, function (error, results, fields) {
            if (error) reject(error);
            // connected!
            resolve(results);
        });
    });
}

coreService.delete = async (sqlText, bindData = []) => {
    return new Promise(async (resolve, reject) => {
        coreService.conn.query(sqlText, function (error, results, fields) {
            if (error) reject(error);
            // connected!
            resolve(results);
        });
    });
}

module.exports = coreService;