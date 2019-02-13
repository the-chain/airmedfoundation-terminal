/**
 * Transaction.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    transactionId: {
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
    owner: {
      model: 'block'
    },

    // reference to KeyIn
    read: {
      collection: 'keyIn',
      via: 'read'
    },

    // reference to KeyOut
    write: {
      collection: 'keyOut',
      via: 'write'
    },

    // reference o-o to KeyIn
    readChaincode: {
      collection: 'keyIn',
      via: 'readChaincode'
    }

  },

};

