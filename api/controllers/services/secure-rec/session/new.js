module.exports = {

  friendlyName: 'New',

  description: 'New session.',

  inputs: {

    emailAddress: {
      type: 'string',
      maxLength: 200
    },
    password: {
      type: 'string',
      minLength: 8
    }

  },

  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    },
    invalidPassword: {
      responseType: 'invalidPassword',
      description: 'Email o contraseña incorrecta'
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

    if ( inputs.password === undefined || inputs.emailAddress === undefined ) 
      return exits.invalid();

    // Find user
    let user = await User.findOne({
      emailAddress: inputs.emailAddress.toLowerCase()
    });

    if ( user === undefined )
      return exits.invalidPassword();

    let providerType = { type: 'N/A' };

    if(user.type === 'provider')
        providerType = await Provider.findOne({ user: user.id });

    // Check status
    if ( user.status == 'unconfirmed' )
      return exits.unconfirmedUser();
    else if ( user.status == 'suspended' )
      return exits.suspendedUser();

    // Verify password
    try {
      await sails.helpers.passwords.checkPassword(inputs.password, user.password);
    }catch(err){
      return exits.invalidPassword();
    }

    // Cookie
    this.req.session.auth = {
      emailAddress: user.emailAddress,
      privateKey: user.privateKey,
      type: user.type,
      providerType: providerType.type
    }
    this.req.session.save();
    // Login successfully
    return exits.success( {
      'success': true
    });
  }

};
