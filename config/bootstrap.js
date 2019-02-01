/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

var http = require('http');

module.exports.bootstrap = async function(cb) {

    if (sails.config.environment === 'development') 
  	    http.createServer(sails.hooks.http.app).listen(80);
    cb();
};
