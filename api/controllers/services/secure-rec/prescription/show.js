module.exports = {

    friendlyName: 'Secure Rec prescriptions',
    
    description: 'Secure Rec prescription.',
    
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'services/secure-rec/prescription/index'
      }
    },
    
    fn: async function (inputs, exits) {
        let user = this.req.session.auth;
        if (user.type == 'patient'){
            let insuranceCompanies, pharmacies;
            insuranceCompanies = await Patient.findOne({ emailAddress: user.emailAddress }).populate('insurances');
            insuranceCompanies = insuranceCompanies.insurances;
            pharmacies = await Patient.findOne({ emailAddress: user.emailAddress }).populate('providers', { where: { type: 'pharmacy'}});
            pharmacies = pharmacies.providers;
            return exits.success({ 'insuranceCompanies': insuranceCompanies, 'pharmacies': pharmacies });
        }
        return exits.success();
    }    
};