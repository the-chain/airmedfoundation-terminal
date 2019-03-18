/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  baseUrl: 'http://localhost',

  passwordResetTokenTTL: 24*60*60*1000,
  emailProofTokenTTL:    24*60*60*1000,
  rememberMeCookieMaxAge: 30*24*60*60*1000,
  rememberMeCookieMinAge: 24*60*60*1000

};
