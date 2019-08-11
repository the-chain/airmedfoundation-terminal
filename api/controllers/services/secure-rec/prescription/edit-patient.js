module.exports = {

    friendlyName: 'Secure Rec edit prescription patient',
  
    description: 'Secure Rec edit prescription patient.',
  
    inputs: {
        hash: {
            type: 'string',
        },

        pharmacy: {
            type: 'string',
        },

        selfPayment:{
            type: 'bool',
            description: 'If the patient pay or the secures pay it'
        },

        insurance:{
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

        if (inputs.hash === undefined || inputs.pharmacy === undefined || inputs.pharmacy === '' || inputs.selfPayment === undefined)
            return exits.invalid();

        console.log(inputs.hash);
        console.log(inputs.pharmacy);
        console.log(inputs.selfPayment);
        console.log(inputs.insurance);
        
        return exits.success({
            success: true,
            message: 'Edit prescription',
        });
  
    }
  
};  