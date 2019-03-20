module.exports = {

  friendlyName: 'Signup',

  description: 'Signup secure rec.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/entrance/signup'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};