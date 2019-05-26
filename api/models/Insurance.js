/**
 * Insurance.js
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
      maxLength: 120
    },

    EIN: {
      type: 'string',
      minLength: 10,
      maxLength: 10
    }, 

    // reference to user
    user: {
      model: 'user'
    },

    // reference to patient
    patients: {
      collection: 'patient',
      via: 'insurances'
    },

    // reference to doctors
    doctors: {
      collection: 'doctor',
      via: 'insurances'
    },

    // reference to providers
    providers: {
      collection: 'provider',
      via: 'insurances'
    }

  },

};