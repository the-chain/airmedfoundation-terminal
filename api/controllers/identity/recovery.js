const ursa = require('../../../crypto/keys');

module.exports = {

  friendlyName: 'Recovery',

  description: 'Recovery identity.',

  inputs: {
    privateKey: {
      type: 'string'
    }
  },

  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    },
    ursa: {
      responseType: 'ursa-error',
      description: ' Error con la clave privada'
    }
  },

  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(!inputs.privateKey)
      return exits.invalid();
    
    try {
      await ursa.assertPrivateKey(inputs.privateKey);
      var key = await ursa.getPublicKey(inputs.privateKey);
    }catch(err){
      return exits.ursa();
    }

    return exits.success({
      success: true, 
      message: 'Successful recovery, your public key is the following',
      publicKey: key
    });

  }

};
