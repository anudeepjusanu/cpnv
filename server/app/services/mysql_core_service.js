const config = require('../../config');
const mysql = require('mysql');
const coreService = {
    conn: null,
};
const mysqlConsts = ['NOW()', 'NULL', 'null', 'UTC_TIMESTAMP', 'UTC_TIMESTAMP()'];

coreService.conn = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USERNAME,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
});
// var del = coreService.conn._protocol._delegateError;
// coreService.conn._protocol._delegateError = function (err, sequence) {
//     if (err.fatal) {
//         console.trace('fatal error: ' + err.message);
//     }
//     return del.call(this, err, sequence);
// };

coreService.conn.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        coreService.reconnect();
        return;
    }
    console.log('connected as id ' + coreService.conn.threadId);
    coreService.refreshConnect();
});

coreService.reconnect = function () {
    if (coreService.conn) {
        coreService.conn.destroy();
    }
    coreService.conn = mysql.createConnection({
        host: config.MYSQL_HOST,
        user: config.MYSQL_USERNAME,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE
    });

    coreService.conn.connect(function (err) {
        if (err) {
            setTimeout(coreService.reconnect, 2000);
        } else {
            return coreService.conn;
        }
    });
}

coreService.refreshConnect = function () {
    coreService.conn.query(`SELECT 1 `, function (error, results, fields) {
        if (error) {
            coreService.reconnect();
        }
        console.log("Refresh Connect: ", new Date());
        setTimeout(coreService.refreshConnect, 900000);
    });
}

// coreService.conn.on('error', function (err) {
//     console.log(err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//     } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//     } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//     } else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//     }
//     coreService.reconnect();
// });

coreService.query = async (sqlText, bindData = []) => {
    return new Promise(async (resolve, reject) => {
        coreService.conn.query(sqlText, async function (error, results, fields) {
            if (error) {
                console.log("Query Error Or Connection Error " + error);
                if (coreService.conn) {
                    coreService.conn.destroy();
                }
                coreService.conn = await mysql.createConnection({
                    host: config.MYSQL_HOST,
                    user: config.MYSQL_USERNAME,
                    password: config.MYSQL_PASSWORD,
                    database: config.MYSQL_DATABASE
                });
                await coreService.conn.connect();
                coreService.conn.query(sqlText, function (error, results, fields) {
                    if (error) { coreService.reconnect(); reject(error); }
                    resolve(results);
                });
            } else {
                // connected!
                resolve(results);
            }
        });
    });
};

coreService.getResult = async (tbl, bindData = []) => {
    return new Promise(async (resolve, reject) => {
        coreService.conn.query(sqlText, function (error, results, fields) {
            if (error) { coreService.reconnect(); reject(error); }
            // connected!
            resolve(results);
        });
    });
};

coreService.getOne = async (tbl, keyPair, fields = [], bindData = []) => {
    if (fields.length > 0) {
        var sqlText = 'SELECT ' + fields.join(', ') + ' FROM `' + tbl + '` ';
    } else {
        var sqlText = 'SELECT * FROM `' + tbl + '` ';
    }
    for (const [key, val] of Object.entries(keyPair)) {
        sqlText +=
            fields.join(', ') + ' WHERE `' + key + '` = ' + mysql.escape(val) + ' ';
    }

    var rows = await coreService.query(sqlText, bindData);
    return rows[0] ? rows[0] : {};
};

coreService.insert = async (tbl, pdata = {}) => {
    var bindData = [];
    var fieldKeys = [];
    var fieldVals = [];
    for (const [key, val] of Object.entries(pdata)) {
        fieldKeys.push(key);
        if (mysqlConsts.includes(val)) {
            fieldVals.push(val);
        } else {
            fieldVals.push(mysql.escape(val));
        }
    }
    var sqlText =
        'INSERT INTO `' +
        tbl +
        '` (' +
        fieldKeys.join(', ') +
        ') VALUES (' +
        fieldVals.join(', ') +
        ')';

    return coreService.query(sqlText, bindData);
};

coreService.updateById = async (tbl, keyPair, pdata = {}) => {
    var bindData = [];
    var fields = [];
    var sqlText = 'UPDATE `' + tbl + '` SET ';
    for (const [key, val] of Object.entries(pdata)) {
        var fieldVal = '';
        if (mysqlConsts.includes(val)) {
            fieldVal = val;
        } else {
            fieldVal = mysql.escape(val);
        }
        fields.push('`' + key + '` = ' + fieldVal + '');
    }
    for (const [key, val] of Object.entries(keyPair)) {
        sqlText +=
            fields.join(', ') + ' WHERE `' + key + '` = ' + mysql.escape(val) + ' ';
    }
    console.log(sqlText);

    return coreService.query(sqlText, bindData);
};

coreService.delete = async (sqlText, bindData = []) => {
    return new Promise(async (resolve, reject) => {
        coreService.conn.query(sqlText, function (error, results, fields) {
            if (error) reject(error);
            // connected!
            resolve(results);
        });
    });
};

coreService.nowDate = () => {
    var now = new Date();
    var nowDateTime = now.getFullYear() + "-";
    nowDateTime += (("0" + (now.getMonth() + 1)).slice(-2)) + "-";
    nowDateTime += (("0" + now.getDate()).slice(-2));
    return nowDateTime;
}

coreService.nowDateTime = () => {
    var now = new Date();
    var nowDateTime = now.getFullYear() + "-";
    nowDateTime += (("0" + (now.getMonth() + 1)).slice(-2)) + "-";
    nowDateTime += (("0" + now.getDate()).slice(-2)) + " ";
    nowDateTime += now.getHours() + ":";
    nowDateTime += now.getMinutes() + ":";
    nowDateTime += now.getSeconds();
    return nowDateTime;
}

module.exports = coreService;
