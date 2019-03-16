module.exports = {

  friendlyName: 'Signin',

  description: 'Signin secure rec.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/entrance/signin'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};