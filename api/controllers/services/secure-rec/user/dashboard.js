module.exports = {
  
  friendlyName: 'Secure Rec Dashboard',

  description: 'Secure Rec Dashboard user.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'services/secure-rec/user/dashboard'
    }
  },

  fn: async function (inputs, exits) {
    // Search the user
    let user = await User.findOne({ emailAddress: this.req.session.auth.emailAddress }).populate(this.req.session.auth.type);
    return exits.success({ 'user': user });

  }

};