const fabric = require('../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../crypto/keys');

module.exports = {

  friendlyName: 'Get files',

  description: 'Get all files related with a public key',

  inputs: {
    key: {
      type: 'string'
    },
  },

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
    // If one of required parameters is missing
    if(!inputs.key)
      return exits.invalid();
    var response;
    // Check private/public key
    if (await ursa.isPrivateKey(inputs.key)) {
      var arg = await ursa.getPublicKey(inputs.key);
      response = await fabric.queryChaincode('mychannel','Org1MSP','airmed','query',[arg]);
    }else if (await ursa.isPublicKey(inputs.key)) {
      response = await fabric.queryChaincode('mychannel','Org1MSP','airmed','query',[inputs.key]);
    }else{
      return exits.ursa();
    }
    fabricResp = response[0].toString('utf8');
    if (!fabricResp)
      fabricResp = '{"hashSent":[],"hashReceived":[]}';

    // Check response from Fabric Peer
    try{
      response = JSON.parse(fabricResp);
    }catch(err){
        return exits.fabric();
    }
    // Send response
    return exits.success(
    { 
        success: true,
        userSender: response
    });
  }

};