module.exports = {

  friendlyName: 'Generate new identity',

  description: 'Generate new identity',

  fn: async function (inputs, exits) {
    const crypto = require('asymmetric-crypto');
 
    // Generate a key pair
    const keyPair = crypto.keyPair();
    
    return exits.success(
    { 
        success: true, 
        message: 'A new identity has been generated',
        publicKey: keyPair.publicKey, 
        secretKey: keyPair.secretKey,
    });
  }

};
