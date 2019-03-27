module.exports = {

  friendlyName: 'Password Recovery',

  description: 'Password Recovery Secure Rec',

  inputs: {
    email: {
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
    }
  },

  fn: async function (inputs, exits) {
    
    if ( inputs.email === undefined )
      return exits.invalid();
    
    // Find user
    var user = await User.findOne({
      emailAddress: inputs.email.toLowerCase()
    });

    if ( !user ) 
      return exits.invalidPrivKey();


    // Create new password
    var newPassword = await sails.helpers.strings.random();
    var hashedPassword = await sails.helpers.passwords.hashPassword(newPassword);
    console.log(newPassword);
    // Update user password
    var updatedUser = await User.updateOne({ emailAddress: user.emailAddress })
    .set({
        password: hashedPassword
    });
    if (!updatedUser)
      return exits.internalError();

    // Send new password
    let messageBody = 
		{
			errorMessage: 'An error has occurred sending the temporary key, please contact us.',
			infoMessage: 'An email with a temporary password has been sent, please follow the instructions.',
			titleMessage: 'Password Recovery',
			message: 'Hi, to verify your identity, please use the following code: ',
			conditions: ', this code will only be valid for 24 hours. Please change your password when you enter in Secure Rec.',
			subject: 'Secure Rec Password Recovery'
    }

    sails.hooks.email.send(
      'PasswordRecovery',
      {
        title:  messageBody.titleMessage,
        message: messageBody.message,
        temporalCode: newPassword,
        conditions: messageBody.conditions
      },
      {
        to: user.emailAddress,
        subject: messageBody.subject
      },
          function(err) {
            if (err)
              return exits.success({ status: 'error', message: messageBody.errorMessage });
            else
              return exits.success({ status: 'info', message: messageBody.infoMessage });
        }
      );    
  }
};