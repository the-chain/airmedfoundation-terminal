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
    service: config.email.service,
    auth: {
        user: config.email.auth.user,
        pass: config.email.auth.pass
    },
    from: 'noreply@airmedfoundation.com'
};