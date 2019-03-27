module.exports = {

    friendlyName: 'Change password',
  
    description: 'Change password user secure-rec',
    
    inputs: {
        oldPassword: {
            type: 'string',
            protect: true,
            minLength: 8
        },
        newPassword: {
            type: 'string',
            protect: true,
            minLength: 8
        },
    },

    exits: {
        invalid: {
            responseType: 'badRequest',
            description: 'Los parámetros proporcionados son inválidos.'
        },
        invalidPassword: {
            responseType: 'invalidPassword',
            description: 'Contraseña incorrecta'
        },
        internalError: {
            responseType: 'internal-error',
            description: 'Error changing password'
        }
    },
  
    fn: async function (inputs, exits) {

      if ( inputs.oldPassword === undefined || inputs.newPassword === undefined ) 
        return exits.invalid();

      // Find user
      var user = await User.findOne({
        emailAddress: this.req.session.auth.emailAddress
      });

      // Verify password
      try {
        await sails.helpers.passwords.checkPassword(inputs.oldPassword, user.password);
      }catch(err){
        return exits.invalidPassword();
      }

      // Hash new password
      var newPassword = await sails.helpers.passwords.hashPassword(inputs.newPassword);

      // Change password
      var updatedUser = await User.updateOne({ emailAddress: this.req.session.auth.emailAddress })
      .set({
          password: newPassword
      });
      if (!updatedUser)
        return exits.internalError();

      return exits.success({
        'success': true,
        'message': 'Password change successfully.'
      });
  
    }
  
  };