module.exports = {

  friendlyName: 'Home',

  description: 'Home view',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'home/index'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};
