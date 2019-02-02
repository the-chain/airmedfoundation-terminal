module.exports = {

  friendlyName: 'Recovery',

  description: 'Recovery view',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'identity/recovery'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};
