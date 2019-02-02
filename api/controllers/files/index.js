module.exports = {

  friendlyName: 'Files',

  description: 'Files view',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'identity/files'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};
