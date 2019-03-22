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

  'GET    /':                                       { action: 'home/index' },
  
  'GET    /upload':                                 { action: 'medical-file/upload-index' },
  'GET    /download':                               { action: 'medical-file/download-index' },
  'GET    /medical-file':                           { action: 'medical-file/get-medical-file' },
  'POST   /medical-file':                           { action: 'medical-file/post-medical-file' },

  'GET    /identity':                               { action: 'identity/index' },
  'GET    /new-identity':                           { action: 'identity/get-identity' },
  
  'GET    /files':                                  { action: 'files/index' },
  'GET    /get-files':                              { action: 'files/get-files' },
  
  'GET    /recovery':                               { action: 'identity/recovery-index' },
  'POST   /recovery-key':                           { action: 'identity/recovery' },

  'GET    /tutorial':                               { action: 'tutorial/index' },


  // Blockchain Explorer
  'GET    /explorer':                               { action: 'explorer/index' },
  'GET    /explorer/search':                        { action: 'explorer/no-results' },
  'GET    /explorer/charts':                        { action: 'explorer/charts' },
  'GET    /explorer/blocks':                        { action: 'explorer/blocks' },
  'GET    /explorer/transactions':                  { action: 'explorer/transactions' },
  'GET    /explorer/block/:id':                     { action: 'explorer/block-details' },
  'GET    /explorer/block/:id/transactions':        { action: 'explorer/block-transactions' },
  'GET    /explorer/transaction/:hash':             { action: 'explorer/transaction-details' },
  'GET    /explorer/address/:id':                   { action: 'explorer/address-transactions' },
  'POST   /explorer/search':                        { action: 'explorer/search' },

  // Secure Rec
  'GET    /services/secure-rec':                    { action: 'services/secure-rec/home/index' },
  'GET    /services/secure-rec/login':              { action: 'services/secure-rec/entrance/login' },
  'GET    /services/secure-rec/signup':             { action: 'services/secure-rec/entrance/signup' },
  'GET    /services/secure-rec/password-recovery':  { action: 'services/secure-rec/entrance/password-recovery-view' },

  'POST    /services/secure-rec/user/new':          { action: 'services/secure-rec/user/new' },
  'POST    /services/secure-rec/session/new':       { action: 'services/secure-rec/session/new' },
  'POST    /services/secure-rec/password-recovery': { action: 'services/secure-rec/entrance/password-recovery' },
  
  // Block model
  'GET    /block/:hash':                            { action: 'block/get' },
  'GET    /block/id/:id':                           { action: 'block/getbyid' },
  'GET    /block':                                  { action: 'block/get-count' },
  'GET    /blocks':                                 { action: 'block/get-all' },
  'GET    /gettotal':                               { action: 'block/gettotal' },
  'POST   /block':                                  { action: 'block/new' },
  'DELETE /block/:hash':                            { action: 'block/delete' },

  // Transaction model
  'GET    /transaction/:hash':                      { action: 'transaction/get' },
  'GET    /transaction':                            { action: 'transaction/get-count' },
  'GET    /transactions':                           { action: 'transaction/get-all' },
  'GET    /transactions/block/:hash':               { action: 'transaction/get-all-block' },
  'POST   /transaction':                            { action: 'transaction/new' },

  // KeyIn model
  'POST   /key-in':                                  { action: 'key-in/new' },

  // KeyOut model
  'POST   /key-out':                                 { action: 'key-out/new' },

  // ReadChaincode model
  'POST   /read-chaincode':                          { action: 'read-chaincode/new' },

};
