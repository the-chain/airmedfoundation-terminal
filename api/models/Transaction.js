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

    timestamp: {
      type: 'number',
      required: true
    },

    channel: {
      type: 'string',
      required: true
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
      type: 'string',
      required: true
    },

    chaincodeVersion: {
      type: 'string',
      required: true
    },

    imputsArgs: {
      type: 'json',
      required: true
    },

    peerEndorsment: {
      type: 'json',
      required: true
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
    },

    // reference to ReadChaincode
    readChaincode: {
      collection: 'readChaincode',
      via: 'transaction'
    }

  },

};

