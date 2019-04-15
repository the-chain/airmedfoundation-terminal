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
    },
    expired: {
      responseType: 'tokenExpired',
      description: 'Token expired'
    }
  },

  fn: async function (inputs, exits) {

    if (sails.config.email.emailVerification == 0)
      return this.res.redirect('/services/secure-rec');

    if ( inputs.hash === undefined ) {
      this.req.flash('error', 'Invalid data provided');
      return this.res.redirect('/services/secure-rec/login');
    }
      
    // Find user
    var user = await User.findOne({
      emailProofToken: inputs.hash
    });
    if ( !user ) {
      this.req.flash('error', 'Invalid data provided');
      return this.res.redirect('/services/secure-rec/login');
    } else if ( user.status == 'active' ) {
      this.req.flash('info', 'User is confirmed');
      return this.res.redirect('/services/secure-rec/login');
    }
    
    var hashToVerify, updatedUser, dateNow = Date.now();

    // Check if expired the token
    if ( user.emailProofTokenExpiresAt < dateNow && sails.config.email.emailVerification == 2) {
      // The token is expired
      hashToVerify = await sails.helpers.strings.random('url-friendly');
      updatedUser = await User.updateOne( { emailAddress: user.emailAddress } )
      .set({
        emailProofToken: hashToVerify,
        emailProofTokenExpiresAt: dateNow + sails.config.custom.emailProofTokenTTL
      });
      let messageBody = {
        email: user.emailAddress,
        errorMessage: 'An error has occurred, sending the confirmation email. Please contact us.',
        successMessage: 'Thank you for registering an account on Secure Rec! Before we get started, we just need to confirm this is you. A confirmation email has been sent.',
        titleMessage: 'Welcome to Secure Rec!',
        message: 'Thank you for registering an account! Before we get started, we just need to confirm this is you. Click below to verify your email address: ',
        buttonName: 'Verify email',
        buttonUrl:   sails.config.custom.baseUrl + '/services/secure-rec/user/verify-email/' + hashToVerify,
        subject: 'Verify email address Secure Rec'
      }
      // Send new token
      mailer.emailConfirmation(messageBody, 
        function(err){
          if (err)
            this.req.flash('error','An error has occurred, sending the confirmation email. Please contact us.');
          else
            this.req.flash('error','The verify email was expired, a new verify email was sended');
          return this.res.redirect('/services/secure-rec/login');
        }
      );

    }else{

      // Update user
      updatedUser = await User.updateOne({ emailAddress: user.emailAddress })
      .set({
        status: 'active'
      });

      if (!updatedUser) {
        this.req.flash('error', 'Internal Error');
        return this.res.redirect('/services/secure-rec/login');
      }
      // Send success registration email
      let messageBody = {
        email: user.emailAddress,
        errorMessage: 'An error has occurred.',
        successMessage: 'Success',
        titleMessage: 'Welcome to Secure Rec!',
        message: 'Thank you for verifying your account! Now you can login.',
        subject: 'Welcome to Secure Rec!'
      }
      mailer.successRegistration(messageBody,(err, json)=>{
        if (err)
          console.group(err,json);
        //else
          //console.log(json);
      });
      this.req.flash('success', 'Welcome to Secure Rec! Thank you for verifying your account! Now you can login.');
      return this.res.redirect('/services/secure-rec/login');
    }
  }

};