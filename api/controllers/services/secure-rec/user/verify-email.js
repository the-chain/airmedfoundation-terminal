module.exports = {


  friendlyName: 'Verify email',


  description: '',


  inputs: {
    hash: {
      type: 'string'
    }
  },


  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Error data provided'
    },
    internalError: {
      responseType: 'internal-error',
      description: 'Error changing password'
    }
  },


  fn: async function (inputs, exits) {

    if ( inputs.hash === undefined )
      return exits.invalid();

    // Find user
    var user = await User.findOne({
      emailProofToken: inputs.hash
    });
    if ( !user )
      return exits.invalid();
    
    // Update user
    var updatedUser = await User.updateOne({ emailAddress: user.emailAddress })
    .set({
        emailVerification: 'active'
    });
    if (!updatedUser)
      return exits.internalError();

    return exits.success();

  }


};
