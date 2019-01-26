const fabric = require('../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../crypto/keys');

module.exports = {

  friendlyName: 'Get files',

  description: 'Get all files related with a public key',

  inputs: {
    publicKey: {
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
    if(!inputs.publicKey)
      return exits.invalid();
    var response;
    // Check private/public key
    if ( ursa.isPrivateKey(inputs.publicKey) ) {
      response = await fabric.queryChaincode('mychannel','Org1MSP','airmed4','query',[inputs.publicKey]);
    }else if ( ursa.isPublicKey(inputs.publicKey) ) {
      response = await fabric.queryChaincode('mychannel','Org1MSP','airmed4','query',[inputs.publicKey]);
    }else{
      return exits.ursa();
    }
    response = JSON.parse(response.toString('utf8'));
    // Check response from Fabric Peer
    if ( response[0] ){
      response = response[0]
    }else if(response[1]){
      response = response[1]
    }else{
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