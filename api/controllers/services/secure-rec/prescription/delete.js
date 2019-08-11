module.exports = {

    friendlyName: 'Secure Rec delete prescription',
  
    description: 'Secure Rec delete prescription.',
  
    inputs: {
        hash: {
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

        if ( inputs.hash === undefined )
            return exits.invalid();

        console.log(inputs.hash);
        
        return exits.success({
            success: true,
            message: 'Deleted prescription',
        });
  
    }
  
};  