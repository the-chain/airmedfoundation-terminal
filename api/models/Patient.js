/**
 * Patient.js
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

    lastName: {
      type: 'string',
      required: true,
      maxLength: 120
    },

    profilePicture: {
      type: 'string',
      defaultsTo: 'default-avatar.png',
      maxLength: 120
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
    }

  },

};