const {
  LDAP_URL,
  LDAP_BASE,
  LDAP_DN,
  LDAP_PASSWORD,
  JWT_SECRET,
} = require('../../config');
var jwt = require('jsonwebtoken');
const SimpleLDAP = require('simple-ldap-search').default;
SimpleLDAP.LDAP_OPT_X_TLS_NEVER = 1;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const ldapConfig = {
  url: LDAP_URL,
  base: LDAP_BASE,
  dn: LDAP_DN,
  password: LDAP_PASSWORD,
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
          var token = jwt.sign({ mail: user.mail }, JWT_SECRET);
          resolve({
            mail: user.mail,
            name: user.displayName,
            token: token,
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
