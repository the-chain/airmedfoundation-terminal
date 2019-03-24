module.exports = {

    friendlyName: 'Destroy',
  
    description: 'Destroy session.',
  
    fn: async function (inputs, exits) {
      this.req.session.auth = undefined
      this.req.session.destroy();
      return this.res.redirect('/services/secure-rec');
    }
  
  };
  