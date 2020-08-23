const config = require('../../config');

const SimpleLDAP = require('simple-ldap-search').default;
SimpleLDAP.LDAP_OPT_X_TLS_NEVER = 1;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const ldapConfig = {
  url: 'ldap://10.169.82.210:389',
  base: 'DC=CEPHEID,DC=PRI',
  dn:
    'CN=SVC webauth,OU=Service Admins,OU=Operations Accounts,DC=CEPHEID,DC=PRI',
  password: 'QgkVy7tj2HgUoAX0DYVJ',
};

const usersService = {};

usersService.getAssociateInfo = getAssociateInfo;

function getAssociateInfo(email) {
  let emailString = email.split('@cepheid.com')[0];
  return new Promise((resolve, reject) => {
    ldap = new SimpleLDAP(ldapConfig);
    const filter = '(sAMAccountName=' + emailString + ')';
    ldap.search(filter, '*').then(
      users => {
        if (users && users.length) {
          const user = users[0];
          resolve({
            mail: user.mail,
            name: user.displayName,
          });
        } else {
          reject({
            error: 'No data found',
          });
        }
      },
      err => {
        reject({
          error: 'No data found',
        });
      },
    );
  });
}

module.exports = usersService;
