const crypto = require('../../../../../crypto/keys');

module.exports = {

  friendlyName: 'New user',

  description: 'New user secure rec.',

  files: ['profileImageData'],

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

    ein: {
      type: 'string',
      minLength: 10,
      maxLength: 10
    },

    providerType: {
      type: 'string',
      maxLength: 10
    },

    lastName: {
      type: 'string',
      maxLength: 120
    },

    birthdate:{
      type: 'ref',
      columnType: 'date',
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

    profileImageType: {
      type: 'string'
    },

    profileImageData:{
      type: 'ref',
      description: 'Profile picture'
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
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    },

    emailAlreadyInUse: {
        responseType: 'email-conflict',
        description: 'El email propocionado ya esta registrado.'
    }
  },

  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(inputs.emailAddress === undefined || inputs.password === undefined || inputs.phone === undefined || inputs.country === undefined || inputs.state === undefined || inputs.address === undefined || inputs.type === undefined) 
      return exits.invalid();

    let newEmailAddress, newPassword, hashToVerify, website, ein, socialSecurityNumber, fileName, newUserObject, newUserRecord, emailVerification;
    const keys = await crypto.generateKeys();

    newEmailAddress = inputs.emailAddress.toLowerCase();
    newPassword = await sails.helpers.passwords.hashPassword(inputs.password);
    hashToVerify = await sails.helpers.strings.random('url-friendly');
    website = inputs.website === undefined ? 'none' : inputs.website;
    ein = inputs.ein === undefined ? '00-0000000' : inputs.ein;
    socialSecurityNumber = inputs.socialSecurityNumber === undefined ? '000-00-0000' : inputs.socialSecurityNumber;
    fileName = inputs.profileImageType === undefined ? 'default-profile-img.png' : await sails.helpers.strings.random('url-friendly') + '.' + inputs.profileImageType.split('/').pop();

    // Email verfication
    if (sails.config.email.emailVerification == 0) 
      emailVerification = 'active';
    else 
      emailVerification = 'unconfirmed';
    
    newUserObject = Object.assign({
      status: emailVerification,
      emailAddress: newEmailAddress,
      password: newPassword,
      publicKey: keys.publicKey,
      privateKey: keys.secretKey,
      phone: inputs.phone,
      country: inputs.country,
      state: inputs.state,
      address: inputs.address,
      type: inputs.type,
      tosAcceptedByIp: this.req.ip,
      emailProofToken: hashToVerify,
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL
    });

    await inputs.profileImageData.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/profiles/'), saveAs: fileName }, function (err, uploadedFile){
      if (err) 
        return exits.internalError();
    });

    switch (inputs.type) {
        case 'provider':
          // If one of required parameters is missing
          if(inputs.name === undefined || inputs.providerType === undefined)
            return exits.invalid();

          newUserRecord = await User.create(newUserObject)
          .intercept('E_UNIQUE', 'emailAlreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
  
          await Provider.create(Object.assign({
              user: newUserRecord.id,
              emailAddress: newEmailAddress,
              name: inputs.name,
              website: website,
              ein: ein,
              type: inputs.providerType
          }))
          .intercept({name: 'UsageError'}, 'invalid');
        break;

        case 'insurance':
          // If one of required parameters is missing
          if(inputs.name === undefined)
            throw 'invalid';

          newUserRecord = await User.create(newUserObject)
          .intercept('E_UNIQUE', 'emailAlreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
  
          await Insurance.create(Object.assign({
              user: newUserRecord.id,
              emailAddress: newEmailAddress,
              name: inputs.name,
              website: website,
              ein: ein
          }))
          .intercept({name: 'UsageError'}, 'invalid');
        break;

        case 'doctor':
          // If one of required parameters is missing
          if(inputs.name === undefined || inputs.lastName === undefined || inputs.specialty === undefined || inputs.birthdate === undefined)
            return exits.invalid();
          
          newUserRecord = await User.create(newUserObject)
          .intercept('E_UNIQUE', 'emailAlreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();

          await Doctor.create(Object.assign({
            user: newUserRecord.id,
            emailAddress: newEmailAddress,
            name: inputs.name,
            lastName: inputs.lastName,
            birthdate: inputs.birthdate,
            specialty: inputs.specialty,
            socialSecurityNumber: socialSecurityNumber,
            profilePicture: fileName
          }))
          .intercept({name: 'UsageError'}, 'invalid');
        break;

        case 'patient':
          // If one of required parameters is missing
          if(inputs.name === undefined || inputs.lastName === undefined || inputs.birthdate === undefined || inputs.bloodType === undefined || inputs.allergies === undefined || inputs.donor === undefined)
            return exits.invalid();
          
          newUserRecord = await User.create(newUserObject)
          .intercept('E_UNIQUE', 'emailAlreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();
  
          await Patient.create(Object.assign({
            user: newUserRecord.id,
            emailAddress: newEmailAddress,
            name: inputs.name,
            lastName: inputs.lastName,
            birthdate: inputs.birthdate,
            bloodType: inputs.bloodType,
            allergies: inputs.allergies,
            donor: inputs.donor,
            socialSecurityNumber: socialSecurityNumber,
            profilePicture: fileName
          }))
          .intercept({name: 'UsageError'}, 'invalid');
        break;

        case 'default':
          return exits.invalid();
        break;
    }
    // Send email verification to admin
    if ( sails.config.email.emailVerification == 1 ) {
      let messageBody = {
        email: sails.config.email.adminEmail,
        errorMessage: 'An error has occurred, sending the confirmation email. Please contact us.',
        successMessage: 'Thank you for registering an account on Secure Rec! Before we get started, we just need to confirm this is you. A confirmation email has been sent.',
        titleMessage: 'Welcome to Secure Rec!',
        message: 'Thank you for registering an account! Before we get started, we just need to confirm this is you. Click below to verify your email address: ',
        buttonName: 'Verify email',
        buttonUrl:   sails.config.custom.baseUrl + '/services/secure-rec/user/verify-email/' + hashToVerify,
        subject: 'Verify email address Secure Rec'
      }
      mailer.emailConfirmation(messageBody, function(err, messageMail){
        return exits.success({
          success: true, 
          message: messageMail.message,
          publicKey: keys.publicKey, 
          secretKey: keys.secretKey
        });
      });
    }
    // Send email verification to user
    else if ( sails.config.email.emailVerification == 2 ) {
      let messageBody = {
        email: newEmailAddress,
        errorMessage: 'An error has occurred, sending the confirmation email. Please contact us.',
        successMessage: 'Thank you for registering an account on Secure Rec! Before we get started, we just need to confirm this is you. A confirmation email has been sent.',
        titleMessage: 'Welcome to Secure Rec!',
        message: 'Thank you for registering an account! Before we get started, we just need to confirm this is you. Click below to verify your email address: ',
        buttonName: 'Verify email',
        buttonUrl:   sails.config.custom.baseUrl + '/services/secure-rec/user/verify-email/' + hashToVerify,
        subject: 'Verify email address Secure Rec'
      }
      mailer.emailConfirmation(messageBody, function(err, messageMail){
        return exits.success({
          success: true, 
          message: messageMail.message,
          publicKey: keys.publicKey, 
          secretKey: keys.secretKey
        });
      });
    // Just register the user without email verification 
    // ONLY FOR TESTING
    } else {
      return exits.success({
        success: true, 
        message: 'Thank you for registering an account on Secure Rec!',
        publicKey: keys.publicKey, 
        secretKey: keys.secretKey
      });
    }
  }
};