const ursa = require('ursa');

module.exports = {

  friendlyName: 'Generate new identity',

  description: 'Generate new identity',

  fn: async function (inputs, exits) {
    // Generate a key pair
    const keyPair = ursa.generatePrivateKey(512,65537);
    
    return exits.success(
    { 
        success: true, 
        message: 'A new identity has been generated',
        publicKey: keyPair.toPublicPem('base64'), 
        secretKey: keyPair.toPrivatePem('base64'),
    });
  }

};
