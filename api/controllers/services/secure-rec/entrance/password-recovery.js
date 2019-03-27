module.exports = {

  friendlyName: 'Password Recovery',

  description: 'Password Recovery Secure Rec',

  inputs: {
    key: {
      type: 'string'
    },
  },

  exits: {

  },

  fn: async function (inputs, exits) {
    // Search the user
    let user = await User.findOne({ privateKey: inputs.key });
    
    // Si es valido genera una key temporal y un tiempo, e insertar en el usuario, luego manda el correo

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
        temporalCode: user.temporalCode,
        conditions: messageBody.conditions
      },
      {
        to: user.email,
        subject: messageBody.subject
      },
          function(err) {
            if (err)
              cb(err, { type: 'error', message: messageBody.errorMessage });
            else
              cb(null, { type: 'info', message: messageBody.infoMessage });
        }
      );
    
    return exits.success();

  }

};