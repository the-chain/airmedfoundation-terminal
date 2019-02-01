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

  'GET /':                     { action: 'home/index' },
  
  'GET  /upload':              { action: 'medical-file/upload-index' },
  'GET  /download':            { action: 'medical-file/download-index' },
  'GET  /medical-file':        { action: 'medical-file/get-medical-file' },
  'POST /medical-file':        { action: 'medical-file/post-medical-file' },

  'GET  /identity':            { action: 'identity/index' },
  'GET  /new-identity':        { action: 'identity/get-identity' },
  
  'GET  /files':               { action: 'files/index' },
  'GET  /get-files':           { action: 'files/get-files' },
  
  'GET  /recovery':            { action: 'identity/recovery-index' },
  'POST /recovery-key':        { action: 'identity/recovery' },

  'GET  /tutorial':            { action: 'tutorial/index' },

};
