/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  ssl: {
    ca: require('fs').readFileSync('./config/ssl/chain.pem', 'utf8').toString(),
    key: require('fs').readFileSync('./config/ssl/privkey.pem', 'utf8').toString(),
    cert: require('fs').readFileSync('./config/ssl/cert.pem', 'utf8').toString()
  },

  port: 443,

};
