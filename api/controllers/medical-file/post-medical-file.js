var ipfs = require("../../../ipfs-api/ipfs_api");

module.exports = {

  friendlyName: 'Post a medical file',

  description: 'Post in IPFS a medical file',

  files: ['imagefile'],

  inputs: {
    imagefile: {
      type: 'ref'
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
    }
  },

  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(!inputs.imagefile) 
      throw 'invalid';
    
    // Generate the new name of file
    let imageFile = await sails.helpers.strings.random('url-friendly');

    // Save the Image
    inputs.imagefile.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/medical/'), saveAs: imageFile + '.png' }, function (err, uploadedFile){
      if (err) return res.serverError(err);

      //IPFS
      ipfs.upload('assets/images/medical/'+imageFile+'.png',(err,hashFile) => {
        if ( err ) {
          console.log(err);
          throw 'upload'
        }
        return exits.success(
          { success: true, 
            message: 'Uploaded successfully', 
            hash: hashFile
          });
      });
    });

  }


};
