module.exports = {

    friendlyName: 'Secure Rec authorizations',
  
    description: 'Secure Rec authorizations.',
  
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'services/secure-rec/authorizations/index'
      }
    },
  
    fn: async function (inputs, exits) {
        let sessionData, user, authorized, allUsers, providers, providersId, doctors, doctorsId, insurances, insurancesId, patients, patientsId;

        sessionData = this.req.session.auth;
        user = await User.findOne({ emailAddress: sessionData.emailAddress });
        allUsers = { };
        providersId = [];
        doctorsId = [];
        insurancesId = [];
        patientsId = [];
      
        switch (sessionData.type) {
            case 'provider':
                authorized = await Provider.findOne({ 
                    user: user.id
                }).populate('doctors').populate('insurances').populate('patients');

                authorized.doctors.forEach(doctor => {
                    doctorsId.push(doctor.id);
                });

                authorized.insurances.forEach(insurance => {
                    insurancesId.push(insurance.id);
                });

                authorized.patients.forEach(patient => {
                    patientsId.push(patient.id);
                });

                doctors = await Doctor.find({
                    id: { 'nin' : doctorsId }
                }).populate('user');

                insurances = await Insurance.find({
                    id: { 'nin' : insurancesId }
                }).populate('user');

                patients = await Patient.find({
                    id: { 'nin' : patientsId }
                }).populate('user');

                allUsers.doctors = doctors;
                allUsers.insurances = insurances;
                allUsers.patients = patients;
                break;
        
            case 'doctor':
                authorized = await Doctor.findOne({
                    user: user.id
                }).populate('providers').populate('insurances').populate('patients');

                authorized.providers.forEach(provider => {
                    providersId.push(provider.id);
                });

                authorized.insurances.forEach(insurance => {
                    insurancesId.push(insurance.id);
                });

                authorized.patients.forEach(patient => {
                    patientsId.push(patient.id);
                });

                providers = await Provider.find({
                    id: { 'nin' : providersId }
                }).populate('user');

                insurances = await Insurance.find({
                    id: { 'nin' : insurancesId }
                }).populate('user');

                patients = await Patient.find({
                    id: { 'nin' : patientsId }
                }).populate('user');

                allUsers.providers = providers;
                allUsers.insurances = insurances;
                allUsers.patients = patients;
                break;

            case 'insurance':
                authorized = await Insurance.findOne({ 
                    user: user.id
                }).populate('providers').populate('doctors').populate('patients');

                authorized.providers.forEach(provider => {
                    providersId.push(provider.id);
                });

                authorized.doctors.forEach(doctor => {
                    doctorsId.push(doctor.id);
                });

                authorized.patients.forEach(patient => {
                    patientsId.push(patient.id);
                });

                providers = await Provider.find({
                    id: { 'nin' : providersId }
                }).populate('user');

                doctors = await Doctor.find({
                    id: { 'nin' : doctorsId }
                }).populate('user');

                patients = await Patient.find({
                    id: { 'nin' : patientsId }
                }).populate('user');

                allUsers.providers = providers;
                allUsers.doctors = doctors;
                allUsers.patients = patients;
                break;

            case 'patient':
                authorized = await Patient.findOne({ 
                    user: user.id
                }).populate('providers').populate('doctors').populate('insurances');

                authorized.providers.forEach(provider => {
                    providersId.push(provider.id);
                });

                authorized.insurances.forEach(insurance => {
                    insurancesId.push(insurance.id);
                });

                authorized.doctors.forEach(doctor => {
                    doctorsId.push(doctor.id);
                });

                providers = await Provider.find({
                    id: { 'nin' : providersId }
                }).populate('user');

                insurances = await Insurance.find({
                    id: { 'nin' : insurancesId }
                }).populate('user');

                doctors = await Doctor.find({
                    id: { 'nin' : doctorsId }
                }).populate('user');

                allUsers.providers = providers;
                allUsers.insurances = insurances;
                allUsers.doctors = doctors;
                break;
        }
        
        return exits.success({ 'authorized': authorized, 'allUsers': allUsers });
  
    }
  
};  