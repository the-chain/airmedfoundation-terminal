/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /':                     { view:   'pages/upload' },
  
  'GET  /upload':              { view:   'pages/upload' },
  'GET  /download':            { view:   'pages/download' },
  'GET  /medical-file':        { action: 'medical-file/get-medical-file' },
  'POST /medical-file':        { action: 'medical-file/post-medical-file' },

};
