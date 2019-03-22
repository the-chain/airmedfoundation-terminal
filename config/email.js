/**
 * 
 * 
 *  Email configuration
 * 
 * 
 * 
 * 
 * 
 */
var config = require('../appconfig.json');

module.exports.email = {
    adminEmail: config.email.admin,
    service: config.email.service,
    auth: {
        user: config.email.auth.user,
        pass: config.email.auth.pass
    },
    //  0 = No verification, 1 = User verification, 2 = Admin verification
    emailVerification: config.email.emailVerification,
    from: 'noreply@airmedfoundation.com'
};