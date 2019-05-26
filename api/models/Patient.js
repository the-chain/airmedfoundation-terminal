/**
 * Patient.js
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

    lastName: {
      type: 'string',
      required: true,
      maxLength: 120
    },

    birthdate: {
      type: 'ref',
      columnType: 'date',
      required: true,
    },

    bloodType: {
      type: 'string',
      required: true,
      maxLength: 20
    },
    
    allergies: {
      type: 'json',
      required: true,
    }, 
    
    donor: {
      type: 'boolean',
      defaultsTo: false
    },

    socialSecurityNumber: {
      type: 'string',
      minLength: 11,
      maxLength: 11
    },

    profilePicture: {
      type: 'string',
      maxLength: 256
    },

    // reference to user
    user: {
      model: 'user'
    },

    // reference to doctors
    doctors: {
      collection: 'doctor',
      via: 'patients'
    },

    // reference to insurance
    insurances: {
      collection: 'insurance',
      via: 'patients'
    },

    // reference to provider
    providers: {
      collection: 'provider',
      via: 'patients'
    }

  },

};