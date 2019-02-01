module.exports = {

  friendlyName: 'Identity',

  description: 'Identity view',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'identity/new'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};
