
module.exports = {

    friendlyName: 'Edit notes',

    description: 'Edit notes.',

    inputs: {
        notesId: {
            type: 'string',
            required: true,
            description: 'Note id'
        },
        newNote: {
            type: 'string',
            required: true,
            description: 'note'            
        }
    },
    exits: {
        invalid: {
          responseType: 'bad-combo',
          description: 'Los parámetros proporcionados son inválidos.'
        },
        internalError: {
            responseType: 'internal-error',
            description: 'Error changing password'
        }
    },
    fn: async function(inputs, exits){
        if ( !inputs.notesId || !inputs.newNote ) 
            return exits.invalid();
        try{
            await Note.updateOne({hash: inputs.notesId})
            .set({
                note: inputs.newNote
            });
        }catch(err){
            return exits.invalid();
        }
        return exits.success( {
            'success': true,
            'message': 'Note edited correctly'
        });
    }
}