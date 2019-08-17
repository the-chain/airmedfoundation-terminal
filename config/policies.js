/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  //'*': 'isHTTPS',

  // API Rest
  'key-in/new':        'checkOrigin', 
  'key-out/new':        'checkOrigin',                         
  'transaction/new': 'checkOrigin',
  'block/new': 'checkOrigin',

  // Views
  'services/secure-rec/entrance/login': 'logout',
  'services/secure-rec/entrance/signup': 'logout',
  'services/secure-rec/home/index': 'logout',
  'services/secure-rec/files/index': 'login',
  'services/secure-rec/transaction/index': 'login',
  'services/secure-rec/user/profile': 'login',
  'services/secure-rec/user/dashboard': 'login',
  'services/secure-rec/user/change-password-view': 'login',

  // Sessions
  'services/secure-rec/entrance/password-recovery': 'logout',
  'services/secure-rec/session/new': 'logout',
  'services/secure-rec/user/new': 'logout',
  'services/secure-rec/session/destroy': 'login',
  'services/secure-rec/user/change-password': 'login',
  'services/secure-rec/user/verify-email': 'logout',

  // Transactions
  'services/secure-rec/transaction/upload-register': 'login',
  'services/secure-rec/transaction/download-register': 'login',
  'services/secure-rec/transaction/edit-notes': 'login',

  // Authorizations
  'services/secure-rec/authorizations/index': 'login',
  'services/secure-rec/authorizations/new': 'login',
  'services/secure-rec/authorizations/delete': 'login',

  // Prescription
  'services/secure-rec/prescription/new-index': ['login', 'isDoctor'],
  'services/secure-rec/prescription/show': 'login',
  'services/secure-rec/prescription/new': ['login', 'isDoctor'],
  'services/secure-rec/prescription/edit-patient': ['login', 'isPatient'],
  'services/secure-rec/prescription/edit-provider': ['login', 'isPharmacy'],
  'services/secure-rec/prescription/delete': ['login', 'isDoctor'],
};
