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
    let user = await User.findOne({ emailAddress: this.req.session.auth.emailAddress }).populate(this.req.session.auth.type);
    return exits.success({ 'user': user });

  }

};