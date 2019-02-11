module.exports = {

  friendlyName: 'Blockchain explorer',

  description: 'Blockchain explorer index.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'explorer/index'
    }
  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
