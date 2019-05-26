/**
 * Doctor.js
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

    specialty: {
      type: 'string',
      required: true,
      maxLength: 120
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

    // reference to provider
    providers: {
      collection: 'provider',
      via: 'doctors'
    },

    // reference to patient
    patients: {
      collection: 'patient',
      via: 'doctors'
    },

    insurances: {
      collection: 'insurance',
      via: 'doctors'
    }

  },

};

