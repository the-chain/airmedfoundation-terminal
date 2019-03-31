module.exports = {

  friendlyName: 'Password Recovery',

  description: 'Password Recovery Secure Rec',

  inputs: {
    privateKey: {
      type: 'string'
    },
  },

  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Error data provided'
    },
    invalidPrivKey: {
      responseType: 'ursa-error2',
      description: 'Invalid private key'
    },
    internalError: {
      responseType: 'internal-error',
      description: 'Error changing password'
    },
    timeOut: {
      responseType: 'passwordTimeout',
      description: 'Wait one day to generate a new password'
    },
    unconfirmedUser: {
      responseType: 'unconfirmedUser',
      description: 'Usuario sin verificar email'
    },
    suspendedUser: {
      responseType: 'suspendedUser',
      description: 'Usuario suspendido'
    }
  },

  fn: async function (inputs, exits) {
    if ( inputs.privateKey === undefined )
      return exits.invalid();
    
    // Find user
    var user = await User.findOne({
      privateKey: inputs.privateKey
    });

    if ( !user ) 
      return exits.invalidPrivKey();

    // Check status
    if ( user.status == 'unconfirmed' )
      return exits.unconfirmedUser();
    else if ( user.status == 'suspended' )
      return exits.suspendedUser();
      
    if ( user.passwordResetTokenExpiresAt != null && user.passwordResetTokenExpiresAt > Date.now() )
      return exits.timeOut();
    
    // Create new password
    var newPassword = await sails.helpers.strings.random();
    var hashedPassword = await sails.helpers.passwords.hashPassword(newPassword);
    var ExpiresAt = Date.now() + sails.config.custom.passwordResetTokenTTL;

    // Update user password
    var updatedUser = await User.updateOne({ emailAddress: user.emailAddress })
    .set({
        password: hashedPassword,
        passwordResetTokenExpiresAt: ExpiresAt
    });
    if (!updatedUser)
      return exits.internalError();

    // Send new password
    let messageBody = {
			errorMessage: 'An error has occurred sending the temporary key, please contact us.',
			infoMessage: 'An email with a temporary password has been sent, please follow the instructions.',
			titleMessage: 'Password Recovery',
			message: 'Hi, to verify your identity, please use the following code: ',
			conditions: ', this code will only be valid for 24 hours. Please change your password when you enter in Secure Rec.',
      subject: 'Secure Rec Password Recovery',
      newPassword: newPassword,
      email:  user.emailAddress
    }

    mailer.passwordRecovery(messageBody, function(err, messageMail){
      return exits.success({
        status: messageMail.status, 
        message: messageMail.message
      });
    });

  }
};