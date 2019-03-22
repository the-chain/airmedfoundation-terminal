module.exports = {

  friendlyName: 'Password recovery',

  description: 'Password recovery secure rec.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/entrance/password-recovery'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};