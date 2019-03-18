/**
 * Compa.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    name: {
      type: 'string',
      required: true,
      maxLength: 120
    },
    
    website: {
      type: 'string',
      maxLength: 120,
      defaultsTo: 'none'
    },

    type: {
      type: 'string',
      isIn: ['clinic', 'laboratory', 'pharmacy'],
      defaultsTo: 'clinic'
    },

    // reference to user
    user: {
      model: 'user'
    },

    // reference to doctor
    doctors: {
      collection: 'doctor',
      via: 'providers'
    }

  },

};