module.exports = {

  friendlyName: 'Upload',

  description: 'Upload view',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'file/upload'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};
