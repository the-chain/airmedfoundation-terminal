/**
 * Doctor.js
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

    specialty: {
      type: 'string',
      required: true,
      maxLength: 120
    }, 
    
    socialSecurityNumber: {
      type: 'number',
      required: true
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
    }

  },

};

