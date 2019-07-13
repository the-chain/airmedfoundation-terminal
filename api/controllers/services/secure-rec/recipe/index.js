module.exports = {

friendlyName: 'Secure Rec recipe',

  description: 'Secure Rec recipe.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/recipe/index'
    }
  },

  fn: async function (inputs, exits) {
    let patients;
    let user = this.req.session.auth;
    patients = await Doctor.findOne({ emailAddress: user.emailAddress }).populate('patients');
    patients = patients.patients;
    return exits.success({'patients': patients});

  }


};
