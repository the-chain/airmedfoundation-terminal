/**
 * User.js
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

    password: {
      type: 'string',
      required: true,
      protect: true,
      minLength: 8
    },

    publicKey: {
      type: 'string',
      required: true,
      minLength: 300,
      maxLength: 300
    },

    privateKey: {
      type: 'string',
      required: true,
      minLength: 920,
      maxLength: 924
    },

    phone: {
      type: 'string',
      required: true,
      maxLength: 100
    },

    country: {
      type: 'string',
      required: true,
      maxLength: 100
    },

    state: {
      type: 'string',
      required: true,
      maxLength: 200
    },

    address: {
      type: 'string',
      required: true,
      maxLength: 512
    },

    status: {
      type: 'string',
      isIn: ['unconfirmed', 'active', 'suspended'],
      defaultsTo: 'unconfirmed'
    },

    passwordResetToken: {
      type: 'string',
    },

    passwordResetTokenExpiresAt: {
      type: 'ref',
      columnType: 'bigint'
    },

    emailProofToken: {
      type: 'string',
      required: true
    },

    emailProofTokenExpiresAt: {
      type: 'ref',
      columnType: 'bigint'
    },

    emailStatus: {
      type: 'boolean',
      defaultsTo: false
    },

    tosAcceptedByIp: {
      type: 'string',
      description: 'The IP (ipv4) address of the request that accepted the terms of service.',
      extendedDescription: 'Useful for certain types of businesses and regulatory requirements (KYC, etc.)',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Know_your_customer'
    },

    lastSeenAt: {
      type: 'ref',
      columnType: 'bigint'
    },

    type: {
      type: 'string',
      isIn: ['provider', 'insurance', 'doctor', 'patient'],
      defaultsTo: 'provider'
    },

    // reference to provider
    provider: {
      collection: 'provider',
      via: 'user'
    },

    // reference to insurance
    insurance: {
      collection: 'insurance',
      via: 'user'
    },

    // reference to patient
    patient: {
      collection: 'patient',
      via: 'user'
    },

    // reference to doctor
    doctor: {
      collection: 'doctor',
      via: 'user'
    },

  },

};