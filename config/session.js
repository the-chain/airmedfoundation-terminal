/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  host: "127.0.0.1",
  port: 6379,
  db: 15,
  secret: "079666aa3233f80748ecf0cf1a49cf58",
  name: "sails.sid",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true
  }
};
