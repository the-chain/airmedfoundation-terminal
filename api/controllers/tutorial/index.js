module.exports = {

  friendlyName: 'Tutorial',

  description: 'Tutorial view',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'tutorial/index'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }

};
