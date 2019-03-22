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
    let user = await User.findOne({ id: 1 }).populate('provider');

    return exits.success(user);

  }

};