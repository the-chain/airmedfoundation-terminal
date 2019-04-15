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

module.exports.passwordRecovery = function(data, cb) {
  // If one of required parameters is missing
  if(data.errorMessage === undefined || data.infoMessage === undefined || data.titleMessage === undefined || data.message === undefined || data.newPassword === undefined || data.conditions === undefined || data.subject === undefined || data.email === undefined)
          throw 'invalid';

  return sails.hooks.email.send(
    'passwordRecovery',
    {
      title:  data.titleMessage,
      message: data.message,
      temporalCode: data.newPassword,
      conditions: data.conditions
    },
    {
      to: data.email,
      subject: data.subject
    },
    function(err) {
        if (err)
          cb(err, { status: 'error', message: data.errorMessage });
        else
          cb(null, { status: 'info', message: data.infoMessage });
    }
  );
}

module.exports.successRegistration = function(data,cb){
  return sails.hooks.email.send(
    'successRegistration', 
    {
      title:  data.titleMessage,
      message: data.message
    },
    {
      to: data.email,
      subject: data.subject
    },
    function(err) {
        if (err)
          cb(err, { status: 'error', message: data.errorMessage });
        else
          cb(null, { status: 'info', message: data.infoMessage });
    }
  );
};