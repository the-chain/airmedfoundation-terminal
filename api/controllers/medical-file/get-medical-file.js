var ipfs = require("../../../ipfs-api/ipfs_api");
const fs = require('fs');
const sleep = require('sleep');
const fileType = require('file-type');
const ursa = require('../../../crypto/keys');

module.exports = {

  friendlyName: 'Get medical file',

  description:  'Get a specific IPFS medical file.',

  inputs: {
    ipfsHash: {
      type: 'string'
    },
		encrypted: {
      type: 'boolean'
    },
		secretKey: {
      type: 'string'
    },
  },

  exits: {
    noImageFound: {
      responseType: 'not-found',
      description: 'No se pudo encontrar la imagen.'
    },
    invalid: {
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    },
    write: {
      responseType: 'internal-error',
      description: 'Error escribiendo el archivo'
    },
    ipfs: {
      responseType: 'ipfs-error',
      description: 'Imagen no encontrada o hash inválido'
    },
    ursa:{
      responseType: 'ursa-error2',
      description: 'Error en la clave privada'
    },
    ursa2: {
      responseType: 'ursa-error3',
      description: 'Error en clave privada o invalido hash IPFS'
    }
  },


  fn: async function (inputs, exits) {

    // If one of required parameters is missing
    if(!inputs.ipfsHash)
      return exits.invalid();
    var hash, customResponse;
    // Response
    customResponse = { 
      success: true
    };
    // Encrypted
    if (inputs.encrypted) {
      try{
        await ursa.assertPrivateKey(inputs.secretKey);
      }catch(err){
        return exits.ursa();
      }
      try {
        hash = await ursa.decryptIpfsHash(inputs.secretKey, inputs.ipfsHash);
      }catch(err){
        return exits.ursa2();
      }
      customResponse.encrypted = true;
      customResponse.message = 'Encrypted IPFS hash match with the following file';
    }else{
      hash = inputs.ipfsHash;
      customResponse.encrypted = false;
      customResponse.message = 'IPFS hash match with the following file';
      customResponse.ipfsMessage = 'The file is publicly available from: ';
      customResponse.ipfsUrl  = 'https://gateway.ipfs.io/ipfs/' + hash;
    }
    // Get image from ipfs
    ipfs.download(hash, (err, file) => {
      if (err) 
        return exits.ipfs();
      // Save file
      var type = fileType(file);
      if (!type) {
        type = {
          ext: 'unknownType',
          mime: 'file/unknownType'
        }
      }
      var path = 'assets/images/' + hash + '.' + type.ext;
      customResponse.image = 'images/' + hash + '.' + type.ext;
      customResponse.imageType = type.mime;
      fs.writeFile(path, file, 'binary', (err)=>{
        if (err) 
          return exits.write();
        sleep.sleep(2);
        var datetime = new Date();
        customResponse.imageName = datetime + '.' + type.ext;
        return exits.success(customResponse);
      });
    });
  }
};