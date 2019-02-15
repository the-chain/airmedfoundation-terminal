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

  'GET    /':                         { action: 'home/index' },
  
  'GET    /upload':                   { action: 'medical-file/upload-index' },
  'GET    /download':                 { action: 'medical-file/download-index' },
  'GET    /medical-file':             { action: 'medical-file/get-medical-file' },
  'POST   /medical-file':             { action: 'medical-file/post-medical-file' },

  'GET    /identity':                 { action: 'identity/index' },
  'GET    /new-identity':             { action: 'identity/get-identity' },
  
  'GET    /files':                    { action: 'files/index' },
  'GET    /get-files':                { action: 'files/get-files' },
  
  'GET    /recovery':                 { action: 'identity/recovery-index' },
  'POST   /recovery-key':             { action: 'identity/recovery' },

  'GET    /tutorial':                 { action: 'tutorial/index' },

  'GET    /explorer':                 { action: 'explorer/index' },

  
  // Block model
  'GET    /block/:hash':              { action: 'block/get' },
  'GET    /block/id/:id':             { action: 'block/getbyid' },
  'GET    /block':                    { action: 'block/get-count' },
  'GET    /blocks':                   { action: 'block/get-all' },
  'GET    /gettotal':                 { action: 'block/gettotal' },
  'POST   /block':                    { action: 'block/new' },
  'DELETE /block/:hash':              { action: 'block/delete' },

  // Transaction model
  'GET    /transaction/:hash':        { action: 'transaction/get' },
  'GET    /transaction':              { action: 'transaction/get-count' },
  'GET    /transactions':             { action: 'transaction/get-all' },
  'GET    /transactions/block/:hash': { action: 'transaction/get-all-block' },
  'POST   /transaction':              { action: 'transaction/new' },

  // KeyIn model
  'POST   /key-in':                   { action: 'key-in/new' },

  // KeyOut model
  'POST   /key-out':                  { action: 'key-out/new' },

  // ReadChaincode model
  'POST   /read-chaincode':           { action: 'read-chaincode/new' },

};
