var ipfs = require("../../../ipfs-api/ipfs_api");

module.exports = {

  friendlyName: 'Post a medical file',

  description: 'Post in IPFS a medical file',

  files: ['imagefile'],

  inputs: {
    imagefile: {
      type: 'ref'
    },
    imagename:{
      type: 'string'
    }
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
    if(!inputs.imagefile) 
      return exits.invalid();
    
    // Generate the new name of file
    let imageFile = await sails.helpers.strings.random('url-friendly');

    // Save the Image
    inputs.imagefile.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/medical/'), saveAs: imageFile}, function (err, uploadedFile){
      if (err) return res.serverError(err);

      //IPFS
      ipfs.upload('assets/images/medical/'+imageFile,(err,hashFile) => {
        if ( err )
          return exits.ipfs();

        return exits.success(
          { 
            success: true, 
            message: inputs.imagename + ' uploaded successfully to IPFS network. A search hash for this file has been generated.', 
            ipfsMessage: 'The file is now publicly available from: ',
            ipfsUrl: 'https://gateway.ipfs.io/ipfs/' + hashFile,
            hash: hashFile
          });
      });
    });

  }


};
