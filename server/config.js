// const dotenv = require('dotenv');
// dotenv.config();
module.exports = {
  MYSQL_HOST: 'intakeapp.cxeot4p6uhwv.ap-south-1.rds.amazonaws.com',
  MYSQL_USERNAME: 'admin',
  MYSQL_PASSWORD: 'Dev#1234',
  MYSQL_DATABASE: 'intakeapp',
  v1_base_path: '/api/v1',
  PORT: 3000,
  LDAP_URL: 'ldap://10.169.82.210:389',
  LDAP_BASE: 'DC=CEPHEID,DC=PRI',
  LDAP_DN:
    'CN=SVC webauth,OU=Service Admins,OU=Operations Accounts,DC=CEPHEID,DC=PRI',
  LDAP_PASSWORD: 'QgkVy7tj2HgUoAX0DYVJ',
  JWT_SECRET: 'ceheidcovidapp',
};
