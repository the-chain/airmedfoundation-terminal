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

var config = require('../appconfig.json');


module.exports.session = {
  //url: config.session.redis.url,
  host: config.session.redis.host,
  port: config.session.redis.port,
  //pass: config.session.redis.pass,
  db: config.session.redis.db,
  secret: config.session.secret,
  name: config.session.name,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true
  }
};
