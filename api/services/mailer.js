module.exports.emailConfirmation = function(data, cb) {
    // If one of required parameters is missing
    if(data.errorMessage === undefined || data.successMessage === undefined || data.titleMessage === undefined || data.message === undefined || data.buttonName === undefined || data.buttonUrl === undefined || data.subject === undefined || data.email === undefined)
            throw 'invalid';

    return sails.hooks.email.send(
      'emailConfirmation',
      {
        title:  data.titleMessage,
        message: data.message,
        buttonName: data.buttonName,
        buttonUrl: data.buttonUrl
      },
      {
        to: data.email,
        subject: data.subject
      },
      function(err) {
        if (err)
          cb(err, { type: 'error', message: data.errorMessage });
        else {
          cb(null, { type: 'success', message: data.successMessage });
        }
          
      }
    );
}