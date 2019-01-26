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
    }
  },


  fn: async function (inputs, exits) {

    // If one of required parameters is missing
    if(!inputs.ipfsHash)
      return exits.invalid();
    var hash;
    // Encrypted
    if (inputs.encrypted) {
      try{
        await ursa.assertPrivateKey(inputs.secretKey);
      }catch(err){
        return exits.ursa();
      }
      hash = await ursa.decryptIpfsHash(inputs.secretKey, inputs.ipfsHash);
    }else{
      hash = inputs.ipfsHash;
    }
    // Get image from ipfs
    ipfs.download(hash, (err,file) => {
      if (err) 
        return exits.ipfs();

      // Save file
      var type = fileType(file);
      if ( !type ) {
        type = {
          ext: 'unknownType',
          mime: 'file/unknownType'
        }
      }
      var path = 'assets/images/' + hash + '.' + type.ext;
      fs.writeFile(path, file, 'binary', (err)=>{
        if (err) 
          return exits.write();
        
        sleep.sleep(2);
        var datetime = new Date();
        return exits.success(
          { 
            success: true, 
            message: 'IPFS hash match with the following image',
            ipfsMessage: 'The file is publicly available from: ',
            ipfsUrl: 'https://gateway.ipfs.io/ipfs/' + hash,
            image: 'images/' + hash + '.' + type.ext, 
            imageName: datetime + '.' + type.ext,
            imageType: type.mime
          });
      });
    });
  }
};