module.exports = {

  friendlyName: 'Secure Rec transaction',

  description: 'Secure Rec transaction.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/transaction/index'
    }
  },

  fn: async function (inputs, exits) {
    let patients, doctors, insuranceCompanies, clinics, laboratories, pharmacies;
    let user = this.req.session.auth;
    if ( user.type == 'patient'){
      doctors = await Patient.findOne({ emailAddress: user.emailAddress }).populate('doctors');
      doctors = doctors.doctors;
      insuranceCompanies = await Patient.findOne({ emailAddress: user.emailAddress }).populate('insurances');
      insuranceCompanies = insuranceCompanies.insurances;
      clinics = await Patient.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'clinic'}});
      clinics = clinics.providers;
      pharmacies = await Patient.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'pharmacy'}});
      pharmacies = pharmacies.providers;
      laboratories = await Patient.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'laboratory'}});
      laboratories = laboratories.providers;
    }else if ( user.type == 'doctor') {
      patients = await Doctor.findOne({ emailAddress: user.emailAddress }).populate('patients');
      patients = patients.patients;
      insuranceCompanies = await Doctor.findOne({ emailAddress: user.emailAddress }).populate('insurances');
      insuranceCompanies = insuranceCompanies.insurances;
      clinics = await Doctor.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'clinic'}});
      clinics = clinics.providers;
      pharmacies = await Doctor.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'pharmacy'}});
      pharmacies = pharmacies.providers;
      laboratories = await Doctor.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'laboratory'}});
      laboratories = laboratories.providers;
    }else if ( user.type == 'insurance') {
      doctors = await Insurance.findOne({ emailAddress: user.emailAddress }).populate('doctors');
      doctors = doctors.doctors;
      patients = await Insurance.findOne({ emailAddress: user.emailAddress }).populate('patients');
      patients = patients.patients;
      clinics = await Insurance.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'clinic'}});
      clinics = clinics.providers;
      pharmacies = await Insurance.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'pharmacy'}});
      pharmacies = pharmacies.providers;
      laboratories = await Insurance.findOne({ emailAddress: user.emailAddress }).populate('providers',{ where: { type: 'laboratory'}});
      laboratories = laboratories.providers; 
    }else if ( user.type == 'provider' ){
      doctors = await Provider.findOne({ emailAddress: user.emailAddress }).populate('doctors');
      doctors = doctors.doctors;
      patients = await Provider.findOne({ emailAddress: user.emailAddress }).populate('patients');
      patients = patients.patients;
      insuranceCompanies = await Provider.findOne({ emailAddress: user.emailAddress }).populate('insurances');
      insuranceCompanies = insuranceCompanies.insurances;
    }
    return exits.success({'patients': patients, 'doctors': doctors, 'insuranceCompanies': insuranceCompanies, 'clinics': clinics, 'laboratories': laboratories, 'pharmacies': pharmacies });

  }

};
