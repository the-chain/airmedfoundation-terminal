var ipfs = require("../../../ipfs-api/ipfs_api");

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
    secretKey: {
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

      //IPFS
      ipfs.upload('assets/images/medical/'+imageFileName,(err, hashFile) => {
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
    });

  }


};
