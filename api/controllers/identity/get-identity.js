const crypto = require('ursa');

module.exports = {

  friendlyName: 'Generate new identity',

  description: 'Generate new identity',

  fn: async function (inputs, exits) {
    // Generate a key pair
    
    const keys = crypto.generatePrivateKey(256+512, 65537);

    
    return exits.success(
    { 
        success: true, 
        message: 'A new identity has been generated',
        publicKey: keys.toPublicPem('base64'), 
        secretKey: keys.toPrivatePem('base64')
    });
  }

};
