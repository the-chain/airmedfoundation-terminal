/**
 * Compa.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200
    },

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

    EIN: {
      type: 'string',
      minLength: 10,
      maxLength: 10
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
    },

    // reference to insurance
    insurances: {
      collection: 'insurance',
      via: 'providers'
    },

    // reference to patients
    patients: {
      collection: 'patient',
      via: 'providers'
    }

  },

};