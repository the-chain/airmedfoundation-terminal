/**
 * KeyIn.js
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

    blockNumber: {
      type: 'number',
      required: true
    },

    transactionNumber: {
      type: 'number',
      required: true
    },


    // reference to transaction
    read: {
      model: 'transaction'
    },

    // reference o-o to transaction
    readChaincode: {
      model: 'transaction',
      unique: true
    }

  },

};

