var ipfs = require("../../../ipfs-api/ipfs_api");
const fs = require('fs');
const sleep = require('sleep');
module.exports = {

  friendlyName: 'Get medical file',

  description:  'Get a specific IPFS medical file.',

  inputs: {
    hash: {
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
    // Variables
    var path = 'assets/images/'+inputs.hash + '.png';

    // If one of required parameters is missing
    if(!inputs.hash) 
      return exits.invalid();

    // Search the Image
    ipfs.download(inputs.hash, (err,file) => {
      if (err) 
        return exits.ipfs();
      
      fs.writeFile(path,file,'binary', (err)=>{
        if (err) 
          return exits.write();
        await sleep.sleep(2);
        return exits.success({ success: true, message: 'IPFS hash match with the following image', image: 'images/'+inputs.hash + '.png', imageName: 'hash.png' });
      });
    });
  }
};