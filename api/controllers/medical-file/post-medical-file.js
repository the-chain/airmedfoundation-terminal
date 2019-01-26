var ipfs = require("../../../ipfs-api/ipfs_api");
var fabric = require("../../../fabric-api/chaincodeTransactions");
var key = require('../../../crypto/keys');
const fs = require('fs');

module.exports = {

  friendlyName: 'Post a medical file',

  description: 'Post in IPFS a medical file',

  files: ['imageFile'],

  inputs: {
    imageFile: {
      type: 'ref'
    },
    imageName:{
      type: 'string'
    },
    encrypt:{
      type: 'boolean'
    },
    receiverPublicKey: {
      type: 'string'
    },
    senderPublicKey: {
      type: 'string'
    },
  },

  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    },
    upload: {
      responseType: 'error-upload',
      description: 'Error subiendo la imagen'
    },
    ipfs: {
      responseType: 'ipfs-error2',
      description: 'Error subiendo la imagen'
    },
    ursa: {
      responseType: 'ursa-error',
      description: 'Error en la clave enviada'
    },
    fabric: {
      responseType: 'fabric-error',
      description: 'Error en la plataforma de hyperledger fabric' 
    }
  },

  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(!inputs.imageFile || !inputs.imageName || (inputs.encrypt && (!inputs.receiverPublicKey || !inputs.senderPublicKey))) 
      return exits.invalid();
    
    // Generate the new name of file
    let imageFileName = await sails.helpers.strings.random('url-friendly') + '.' + inputs.imageName.split('.').pop();

    // Save the Image
    inputs.imageFile.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/medical/'), saveAs: imageFileName }, function (err, uploadedFile){
      if (err) return res.serverError(err);
      // Image path
      var path = 'assets/images/medical/' + imageFileName;
      // IPFS
      ipfs.upload(path, async (err, hashFile) => {
        if (err)
          return exits.ipfs();
        
        // Response
        var customResponse = { 
          success: true, 
          message: inputs.imageName + ' uploaded successfully to IPFS network. A search hash for this file has been generated.',
        };
        
        // Encrypt file
        if (inputs.encrypt) {
          var msg, result;
          try{
            msg = await key.encryptIpfsHash(inputs.receiverPublicKey, hashFile); // ipfsHash encrypted
            await key.assertPublicKey(inputs.senderPublicKey);
            let args = [inputs.senderPublicKey, inputs.receiverPublicKey, msg]; // in blockchain senderPublicKey, receiverPublicKey and ipfsHash encrypted
            result = await fabric.invokeTransaction('mychannel', 'Org1MSP', 'airmed4', 'sendHash', args);
            if (result['status'] == 'SUCCESS') {
              customResponse.encrypted = true;
              customResponse.transactionMessage = 'Hyperledger Transaction Hash: ';
              customResponse.transactionHash = result['hash']; // hash of the fabric transaction
              customResponse.hash = msg;
            } else {
              console.log(result);
              return exits.fabric();
            }
          }catch(err){
            return exits.ursa();
          }
        } else {
          customResponse.encrypted = false;
          customResponse.ipfsMessage = 'The file is now publicly available from: ';
          customResponse.ipfsUrl = 'https://gateway.ipfs.io/ipfs/' + hashFile;
          customResponse.hash = hashFile;
        }
        // FALTA
        // CONFIRMAR LOS INPUTS DEL FROM, PARA NO ACEPTAR CUALQUIER COSA
        return exits.success(customResponse);
      });
    });
  }
};
