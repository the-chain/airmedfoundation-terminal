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

  'GET /':                     { view:   'home/index' },
  
  'GET  /upload':              { view:   'file/upload' },
  'GET  /download':            { view:   'file/download' },
  'GET  /medical-file':        { action: 'medical-file/get-medical-file' },
  'POST /medical-file':        { action: 'medical-file/post-medical-file' },

  'GET  /identity':            { view:   'identity/new' },
  'GET  /new-identity':        { action: 'identity/get-identity' },
  
  'GET  /files':               { view:   'identity/files' },
  'GET  /get-files':           { action: 'files/get-files' },
  
  'GET  /recovery':            { view:   'identity/recovery' },
  'POST /recovery-key':        { action: 'identity/recovery' },

  'GET  /guide':               { view:   'guide/index' },

};
