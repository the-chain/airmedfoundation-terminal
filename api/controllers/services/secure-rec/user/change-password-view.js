module.exports = {

  friendlyName: 'Change password',

  description: 'Change password user secure-rec',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/user/change-password'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};