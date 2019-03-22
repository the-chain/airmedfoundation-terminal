const crypto = require('../../../../../crypto/keys');

module.exports = {

  friendlyName: 'New user',

  description: 'New user secure rec.',

  inputs: {
    emailAddress: {
      type: 'string',
      maxLength: 200
    },

    password: {
      type: 'string',
      protect: true,
      minLength: 8
    },

    phone: {
      type: 'string',
      maxLength: 100
    },

    country: {
      type: 'string',
      maxLength: 100
    },

    state: {
      type: 'string',
      maxLength: 200
    },

    address: {
      type: 'string',
      maxLength: 512
    },

    type: {
      type: 'string',
      maxLength: 10
    },

    name: {
      type: 'string',
      maxLength: 120
    },
    
    website: {
      type: 'string',
      maxLength: 120
    },

    providerType: {
      type: 'string',
      maxLength: 10
    },

    lastName: {
      type: 'string',
      maxLength: 120
    },

    specialty: {
      type: 'string',
      maxLength: 120
    }, 
    
    socialSecurityNumber: {
      type: 'string',
      minLength: 11,
      maxLength: 11
    },

    bloodType: {
      type: 'string',
      maxLength: 20
    },
    
    allergies: {
      type: 'json'
    }, 
    
    donor: {
      type: 'boolean'
    },

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'Los parámetros proporcionados son inválidos.'
    },

    emailAlreadyInUse: {
        statusCode: 409,
        description: 'El email propocionado ya esta registrado.'
    }
  },

  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(inputs.emailAddress === undefined || inputs.password === undefined || inputs.phone === undefined || inputs.country === undefined || inputs.state === undefined || inputs.address === undefined || inputs.type === undefined) 
      throw 'invalid';

    let newEmailAddress, newPassword, hashToVerify, website, newUserObject, newUserRecord, newRecord;
    const keys = await crypto.generateKeys();

    newEmailAddress = inputs.emailAddress.toLowerCase();
    newPassword = await sails.helpers.passwords.hashPassword(inputs.password);
    hashToVerify = await sails.helpers.strings.random('url-friendly');
    website = inputs.website === undefined ? 'none' : inputs.website;
   
    newUserObject = Object.assign({
      emailAddress: newEmailAddress,
      password: newPassword,
      publicKey: keys.publicKey,
      privateKey: keys.secretKey,
      phone: inputs.phone,
      country: inputs.country,
      state: inputs.state,
      address: inputs.address,
      tosAcceptedByIp: this.req.ip,
      emailProofToken: hashToVerify,
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL
    });

    switch (inputs.type) {
        case 'provider':
          // If one of required parameters is missing
          if(inputs.name === undefined || inputs.providerType === undefined)
            throw 'invalid';
          
          newUserRecord = await User.create(newUserObject)
          .intercept('E_UNIQUE', 'emailAlreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
  
          newRecord = await Provider.create(Object.assign({
              user: newUserRecord.id,
              name: inputs.name,
              website: website,
              type: inputs.providerType
          }))
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
        break;

        case 'insurance':
          // If one of required parameters is missing
          if(inputs.name === undefined)
            throw 'invalid';

          newUserRecord = await User.create(newUserObject)
          .intercept('E_UNIQUE', 'emailAlreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
  
          newRecord = await Insurance.create(Object.assign({
              user: newUserRecord.id,
              name: inputs.name,
              website: website
          }))
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
        break;

        case 'doctor':
          // If one of required parameters is missing
          if(inputs.name === undefined || inputs.lastName === undefined || inputs.specialty === undefined || inputs.socialSecurityNumber === undefined)
            throw 'invalid';
          
          newUserRecord = await User.create(newUserObject)
          .intercept('E_UNIQUE', 'emailAlreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();

          newRecord = await Doctor.create(Object.assign({
            user: newUserRecord.id,
            name: inputs.name,
            lastName: inputs.lastName,
            specialty: inputs.specialty,
            socialSecurityNumber: inputs.socialSecurityNumber,
          }))
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
        break;

        case 'patient':
          // If one of required parameters is missing
          if(inputs.name === undefined || inputs.lastName === undefined || inputs.bloodType === undefined || inputs.allergies === undefined || inputs.donor === undefined)
            throw 'invalid';
          
          newUserRecord = await User.create(newUserObject)
          .intercept('E_UNIQUE', 'emailAlreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
  
          newRecord = await Patient.create(Object.assign({
            user: newUserRecord.id,
            name: inputs.name,
            lastName: inputs.lastName,
            bloodType: inputs.bloodType,
            allergies: inputs.allergies,
            donor: inputs.donor
          }))
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
        break;

        case 'default':
          throw 'invalid';
        break;
    }
    // Message 1
    return exits.success({
        success: true, 
        message: 'Thank you for registering an account on Secure Rec! Before we get started, we just need to confirm this is you. A confirmation email has been sent.',
        publicKey: keys.publicKey, 
        secretKey: keys.secretKey
    });

  }

};