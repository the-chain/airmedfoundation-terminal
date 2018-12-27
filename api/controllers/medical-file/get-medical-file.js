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
  },


  fn: async function (inputs, exits) {

    // If one of required parameters is missing
    if(!inputs.hash) 
      throw 'invalid';

    // Search the Image

    return exits.success({ success: true, message: 'IPFS hash match with the following image', image: 'images/upload.png', imageName: 'upload.png' });

  }

};