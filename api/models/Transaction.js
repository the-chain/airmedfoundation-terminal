/**
 * Transaction.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {

    id: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 64
    },
    
    number: {
      type: 'number',
      required: true
    },

    timestamp: {
      type: 'ref',
      columnType: 'bigint',
      required: true
    },

    channel: {
      type: 'string',
      required: true
    },

    status: {
      type: 'string'
    },

    type: {
      type: 'string',
      required: true
    },

    creator: {
      type: 'string',
      required: true
    },

    chaincodeName: {
      type: 'string'
    },

    chaincodeVersion: {
      type: 'string'
    },

    imputsArgs: {
      type: 'json'
    },

    peerEndorsment: {
      type: 'json'
    },

    
    // reference to block
    block: {
      model: 'block'
    },

    // reference to KeyIn
    read: {
      collection: 'keyIn',
      via: 'transaction'
    },

    // reference to KeyOut
    write: {
      collection: 'keyOut',
      via: 'transaction'
    }

  },

};

