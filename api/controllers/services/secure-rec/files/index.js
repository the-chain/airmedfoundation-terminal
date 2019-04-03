const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');
const ipfs = require('../../../../../ipfs-api/ipfs_api');


module.exports = {

  friendlyName: 'Secure Rec files',

  description: 'Secure Rec files.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/files/index'
    },
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
    response = await fabric.queryChaincode('mychannel','Org1MSP','secureRec','query',[publicKey]);
    resp1 = response[0].toString('utf8');
    resp2 = response[1].toString('utf8');
    if (!resp1)
      resp1 = '{"hashSent":[],"hashReceived":[], "copyToSender": []}';
    if (!resp2)
      resp2 = '{"hashSent":[],"hashReceived":[], "copyToSender": []}';

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
    let files = {
      hashSent: [],
      hashReceived: []
    }

    // Download files sended
    if ( response.copyToSender.length > 0){
      for ( var i = 0; i < response.copyToSender.length; i++ ){
        var hash = await ursa.decryptIpfsHash(this.req.session.auth.privateKey,response.copyToSender[i]);
        try{
          var data = await ipfs.asyncDownload(hash);
        }catch(err){
          return exits.ipfs();
        }
        files.hashSent.push(JSON.parse(data.toString('utf8')));
      }
    }
    // Download files received 
    if ( response.hashReceived.length > 0){
      files.hashReceived.data = []; files.hashReceived.from = [];
      for ( var i = 0; i < response.hashReceived.length; i++ ){
        var hash = await ursa.decryptIpfsHash(this.req.session.auth.privateKey,response.hashReceived[i].dataHash);
        try{
          var data = await ipfs.asyncDownload(hash);
        }catch(err){
          return exits.ipfs();
        }
        files.hashReceived.data.push(JSON.parse(data.toString('utf8')));
        var user = await User.findOne({publicKey: response.hashReceived[i].from});
        files.hashReceived.from.push({emailAddress: user.emailAddress, type: user.type});
      }
    }
    console.log(files);
    console.log(files.hashReceived.data);
    console.log(files.hashReceived.from);
    // Send response
    return exits.success(
    { 
        success: true,
        userSender: files
    });

  }

};