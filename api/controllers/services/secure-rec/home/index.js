module.exports = {

  friendlyName: 'Secure rec',

  description: 'Index secure rec.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/home/index'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};