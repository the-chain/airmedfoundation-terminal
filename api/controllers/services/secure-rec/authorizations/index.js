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
        let sessionData, user, authorized, allUsers;

        sessionData = this.req.session.auth;
        user = await User.findOne({ emailAddress: sessionData.emailAddress });
      
        switch (sessionData.type) {
            case 'provider':
                authorized = await Provider.findOne({ 
                    user: user.id
                }).populate('doctors').populate('patients').populate('insurances');

                allUsers = await User.find({
                    where: { id: { '!=' : [user.id] }, type: { '!=' : 'provider' } },
                    select: ['emailAddress']
                });
                break;
        
            case 'doctor':
                authorized = await Doctor.findOne({
                    user: user.id
                }).populate('patients').populate('providers').populate('insurances');

                allUsers = await User.find({
                    where: { id: { '!=' : [user.id] }, type: { '!=' : 'doctor' } },
                    select: ['id', 'emailAddress']
                });
                break;

            case 'insurance':
                authorized = await Insurance.findOne({ 
                    user: user.id
                }).populate('patients').populate('providers').populate('doctors');

                allUsers = await User.find({
                    where: { id: { '!=' : [user.id] }, type: { '!=' : 'insurance' } },
                    select: ['emailAddress']
                });
                break;

            case 'patient':
                authorized = await Patient.findOne({ 
                    user: user.id
                }).populate('providers').populate('doctors').populate('insurances');

                allUsers = await User.find({
                    where: { id: { '!=' : [user.id] }, type: { '!=' : 'patient' } },
                    select: ['emailAddress']
                });
                break;
        }

        return exits.success({ 'authorized': authorized, 'allUsers': allUsers });
  
    }
  
};  