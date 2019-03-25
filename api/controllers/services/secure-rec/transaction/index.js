module.exports = {

  friendlyName: 'Secure Rec transaction',

  description: 'Secure Rec transaction.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/transaction/index'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};
