module.exports = {

    friendlyName: 'Secure Rec download prescription',
  
    description: 'Secure Rec download prescription.',
  
    inputs: {
        ipfsHash: {
            type: 'string',
        }
    },

    exits: {
        invalid: {
            responseType: 'bad-combo',
            description: 'Los parámetros proporcionados son inválidos.'
        }
    },
  
    fn: async function (inputs, exits) {

        if ( inputs.ipfsHash === undefined )
            return exits.invalid();
        
        return exits.success({
            success: true,
            fileName: 'Name',
            file: 'url'
        });
  
    }
  
};  