module.exports = {

  friendlyName: 'Download',

  description: 'Download view',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'file/download'
    }
  },

  fn: async function (inputs, exits) {

    return exits.success();

  }


};
