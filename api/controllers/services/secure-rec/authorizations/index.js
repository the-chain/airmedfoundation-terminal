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
        user = await User.find({ emailAddress: sessionData.emailAddress });
      
        switch (sessionData.type) {
            case 'provider':
                authorized = await Provider.find({ 
                    user: user.id
                }).populate('doctors');

                allUsers = await User.find({
                    where: { id: { '!' : [user.id] }, type: 'doctor' },
                    select: ['id', 'emailAddress']
                }).populate('doctor');
                break;
        
            case 'doctor':
                authorized = await Doctor.find({
                    user: user.id
                }).populate('patients');

                allUsers = await User.find({
                    where: { id: { '!' : [user.id] }, type: 'patient' },
                    select: ['id', 'emailAddress']
                }).populate('patient');
                break;

            case 'insurance':
                authorized = await Insurance.find({ 
                    user: user.id
                }).populate('patients');

                allUsers = await User.find({
                    where: { id: { '!' : [user.id] }, type: 'patient' },
                    select: ['id', 'emailAddress']
                }).populate('patient');
                break;
        }

        return exits.success({ 'authorized': authorized, 'allUsers': allUsers });
  
    }
  
};  