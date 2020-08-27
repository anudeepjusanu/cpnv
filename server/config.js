// const dotenv = require('dotenv');
// dotenv.config();
module.exports = {
  MYSQL_HOST: '10.169.77.124',
  MYSQL_USERNAME: 'master',
  MYSQL_PASSWORD: 'a40Rh6*KnpLni',
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
