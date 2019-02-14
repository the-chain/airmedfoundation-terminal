module.exports = {

  friendlyName: 'Delete',

  description: 'Delete block.',

  inputs: {
    hash: {
      type: 'string',
      maxLength: 64
    },
  },

  exits: {
    success: {
      responseType: 'success',
      description: 'Bloque eliminado correctamente.',
    },

  },

  fn: async function (inputs, exits) {

    await Block.destroy({ hash: inputs.hash }).fetch();

    return exits.success();

  }

};