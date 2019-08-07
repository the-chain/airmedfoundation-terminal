module.exports = {

    friendlyName: 'Secure Rec prescriptions',
    
    description: 'Secure Rec prescription.',
    
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'services/secure-rec/prescription/index'
      }
    },
    
    fn: async function (inputs, exits) {
      return exits.success();
    }    
};