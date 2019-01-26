const crypto = require('../../../crypto/keys');

module.exports = {

  friendlyName: 'Generate new identity',

  description: 'Generate new identity',

  fn: async function (inputs, exits) {
    // Generate a key pair
    const keys = await crypto.generateKeys();
    return exits.success(
    { 
        success: true, 
        message: 'A new identity has been generated',
        publicKey: keys.publicKey, 
        secretKey: keys.secretKey
    });
  }

};
