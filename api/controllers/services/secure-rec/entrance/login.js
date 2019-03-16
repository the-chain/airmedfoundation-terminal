module.exports = {

  friendlyName: 'Login',

  description: 'Login secure rec.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/entrance/login'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};