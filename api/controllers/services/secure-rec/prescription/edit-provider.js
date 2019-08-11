module.exports = {

    friendlyName: 'Secure Rec edit prescription',
  
    description: 'Secure Rec edit prescription.',
  
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
            message: 'Edit prescription',
        });
  
    }
  
};  