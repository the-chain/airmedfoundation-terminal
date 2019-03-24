module.exports = {

  friendlyName: 'Secure Rec files',

  description: 'Secure Rec files.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/files/index'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};