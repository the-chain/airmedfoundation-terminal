module.exports = {

    friendlyName: 'Search empty',
  
    description: 'Search Blockchain Explorer empty.',

    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'explorer/no-results'
      },
    },
  
    fn: async function (inputs, exits) {
        return exits.success();
    }
  
  };