const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');

module.exports = {

  friendlyName: 'Get files',

  description: 'Get all files related with a public key',

  inputs: {},

  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    },
    ursa: {
      responseType: 'ursa-error',
      description: 'La clave publica/privada es invalida'
    },
    fabric: {
      responseType: 'fabric-error',
      description: 'Error consultando la blockchain'
    }
  },

  fn: async function (inputs, exits) {

    var response, resp1, resp2, publicKey;

    // Check private key
    try {
        publicKey = await ursa.getPublicKey(this.req.session.auth.privateKey);
    }catch (err){
        return exits.ursa();
    }

    // Send transaction
    response = await fabric.queryChaincode('mychannel','Org1MSP','secure_rec','query',[publicKey]);
    resp1 = response[0].toString('utf8');
    resp2 = response[1].toString('utf8');
    if (!resp1)
      resp1 = '{"hashSent":[],"hashReceived":[]}';
    if (!resp2)
      resp2 = '{"hashSent":[],"hashReceived":[]}';

    // Check response from Fabric Peer
    try{
      response = JSON.parse(resp1);
    }catch(err){
      try{
        response = JSON.parse(resp2);
      }catch(err){
        return exits.fabric();
      }
    }

    // Send response
    return exits.success(
    { 
        success: true,
        userSender: response
    });
  }

};