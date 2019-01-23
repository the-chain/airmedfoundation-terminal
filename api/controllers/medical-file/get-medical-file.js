var ipfs = require("../../../ipfs-api/ipfs_api");
const fs = require('fs');
const sleep = require('sleep');
const fileType = require('file-type');

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
		publicKey: {
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
    }
  },


  fn: async function (inputs, exits) {

    // If one of required parameters is missing
    if(!inputs.ipfsHash)
      return exits.invalid();
    
    // Get image from ipfs
    ipfs.download(inputs.ipfsHash, (err,file) => {
      if (err) 
        return exits.ipfs();

      // Save file
      var type = fileType(file);
      var path = 'assets/images/' + inputs.ipfsHash + '.' + type.ext;
      fs.writeFile(path, file, 'binary', (err)=>{
        if (err) 
          return exits.write();
        
        sleep.sleep(3);
        var datetime = new Date();
        return exits.success(
          { 
            success: true, 
            message: 'IPFS hash match with the following image',
            ipfsMessage: 'The file is publicly available from: ',
            ipfsUrl: 'https://gateway.ipfs.io/ipfs/' + inputs.ipfsHash,
            image: 'images/' + inputs.ipfsHash + '.' + type.ext, 
            imageName: datetime + '.' + type.ext,
            imageType: type.mime
          });
      });
    });
  }
};