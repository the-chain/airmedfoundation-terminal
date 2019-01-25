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
    publicKey: {
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
    }
  },

  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(!inputs.imageFile || !inputs.imageName) 
      return exits.invalid();
    
    // Generate the new name of file
    let imageFileName = await sails.helpers.strings.random('url-friendly') + '.' + inputs.imageName.split('.').pop();

    // Save the Image
    inputs.imageFile.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/medical/'), saveAs: imageFileName }, function (err, uploadedFile){
      if (err) return res.serverError(err);
      // Image path
      var path = 'assets/images/medical/'+imageFileName;
      /* -------------------------------------- */
      // Encrypt file
      if ( inputs.encrypt ) {
        try{
          // Read public key
          // var pubKey = ursa.createPublicKey(inputs.secretKey,'base64');
        }catch(err){
          return exits.ursa();
        }
      /* -------------------------------------- */
      }else{
        // No encrypt file
        //IPFS
        ipfs.upload(path,(err, hashFile) => {
          if (err)
            return exits.ipfs();

          return exits.success(
            { 
              success: true, 
              message: inputs.imageName + ' uploaded successfully to IPFS network. A search hash for this file has been generated.', 
              ipfsMessage: 'The file is now publicly available from: ',
              ipfsUrl: 'https://gateway.ipfs.io/ipfs/' + hashFile,
              hash: hashFile
            });
        });
      }
    });
  }
};
