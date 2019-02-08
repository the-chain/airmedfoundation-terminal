/**
 * KeyOut.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
    },

    value: {
      type: 'string',
      required: true
    },


    // reference to transaction
    write: {
      model: 'transaction'
    },

  },

};

