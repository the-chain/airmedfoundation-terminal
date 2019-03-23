module.exports = {

  friendlyName: 'Profile',

  description: 'Profile user Secure Rec.',
  
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/user/profile'
    }
  },

  fn: async function (inputs, exits) {
    // Search the user
    let user = await User.findOne({ id: 4 }).populate('provider').populate('insurance').populate('doctor').populate('patient');
    return exits.success({ 'user': user });

  }

};