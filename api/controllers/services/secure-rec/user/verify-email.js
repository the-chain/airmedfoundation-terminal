module.exports = {

  friendlyName: 'Verify email',

  description: 'Verify email Secure Rec',

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

    if ( inputs.hash === undefined ) {
      this.req.addFlash('error', 'Invalid data provided');
      return this.res.redirect('/services/secure-rec/login');
    }
      
    // Find user
    var user = await User.findOne({
      emailProofToken: inputs.hash
    });
    if ( !user ) {
      this.req.addFlash('error', 'Invalid data provided');
      return this.res.redirect('/services/secure-rec/login');
    }
    
    // Update user
    var updatedUser = await User.updateOne({ emailAddress: user.emailAddress })
    .set({
        emailVerification: 'active'
    });
    if (!updatedUser) {
      this.req.addFlash('error', 'Internal Error');
      return this.res.redirect('/services/secure-rec/login');
    }

    this.req.addFlash('success', 'Welcome to Secure Rec! Thank you for verifying your account! Now you can login.');
    return this.res.redirect('/services/secure-rec/login');
    
  }

};