module.exports = {

    friendlyName: 'Secure Rec new prescription',
    
    description: 'Secure Rec new prescription.',
    
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'services/secure-rec/prescription/new'
      }
    },
    
    fn: async function (inputs, exits) {
      let user, patients;
      user = this.req.session.auth;
      patients = await Doctor.findOne({ emailAddress: user.emailAddress }).populate('patients');
      patients = patients.patients;
      return exits.success({ 'patients': patients });
    }    
};