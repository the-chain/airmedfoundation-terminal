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
    ipfs: {
      responseType: 'ipfs-error2',
      description: 'Error uploading the image'
    },
    ursa: {
      responseType: 'ursa-error',
      description: 'La clave publica/privada es invalida'
    },
    fabric: {
      responseType: 'fabric-error',
      description: 'Error consultando la blockchain'
    },
    serverError: {
      responseType: 'view',
      viewTemplatePath: '500'
    }
  },

  fn: async function (inputs, exits) {

    var response, resp, publicKey;

    // Check private key
    try {
        publicKey = await ursa.getPublicKey(this.req.session.auth.privateKey);
    }catch (err){
        return exits.serverError();
    }

    // Send transaction
    response = await fabric.queryChaincode('mychannel','Org1MSP','secureRec','query',[publicKey]);
    resp = response[0].toString('utf8');

    if (!resp)
      resp = '{"hashSent":[],"hashReceived":[], "copyToSender": []}';


    // Check response from Fabric Peer
    try{
      response = JSON.parse(resp);
    }catch(err){
      return exits.serverError();
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
          data = JSON.parse(data.toString('utf8'));
          try{
            var notes = await Note.findOne({hash: response.copyToSender[i]});
            data.notes = notes.note;
            data.noteId = response.copyToSender[i];
          }catch(err){
            data.notes = '';
          }
        }catch(err){
          return exits.serverError();
        }
        files.hashSent.push(data);
      }
    }
    // Download files received 
    if ( response.hashReceived.length > 0){
      var data, user;
      for ( var i = 0; i < response.hashReceived.length; i++ ){
        var hash = await ursa.decryptIpfsHash(this.req.session.auth.privateKey,response.hashReceived[i].dataHash);
        try{
          data = await ipfs.asyncDownload(hash);
          data = JSON.parse(data.toString('utf8'));
          user = await User.findOne({publicKey: response.hashReceived[i].from});
          data.from = {emailAddress: user.emailAddress, type: user.type};
        }catch(err){
          return exits.serverError();
        }
        files.hashReceived.push(data);
      }
    }
    // Send response
    return exits.success(
    { 
        success: true,
        userSender: files
    });

  }

};