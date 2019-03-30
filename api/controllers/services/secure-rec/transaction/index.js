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
    
    patients = await Patient.find().populate('user');
    doctors = await Doctor.find().populate('user');
    insuranceCompanies = await Insurance.find().populate('user');
    clinics = await Provider.find({ type: 'clinic' }).populate('user');
    pharmacies = await Provider.find({ type: 'pharmacy' }).populate('user');
    laboratories = await Provider.find({ type: 'laboratory' }).populate('user');

    return exits.success({'patients': patients, 'doctors': doctors, 'insuranceCompanies': insuranceCompanies, 'clinics': clinics, 'laboratories': laboratories, 'pharmacies': pharmacies });

  }

};
