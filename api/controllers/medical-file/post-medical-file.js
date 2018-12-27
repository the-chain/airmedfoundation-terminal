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

      return exits.success({ success: true, message: 'Uploaded successfully', hash: 'QmWmyoMoctfbAaiEs2G46gpeUmhqFRDW6KWo64y5r581Vz' });
    });

  }


};
