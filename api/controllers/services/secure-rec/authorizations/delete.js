module.exports = {

    friendlyName: 'Secure Rec delete authorization',
  
    description: 'Secure Rec delete authorization.',
  
    inputs: {
        emailAddress: {
            type: 'string',
            
        }
    },

    exits: {
        invalid: {
            responseType: 'bad-combo',
            description: 'Los parámetros proporcionados son inválidos.'
        },
        notFound: {
            responseType: 'not-found',
            description: 'Email not found'
        },
        internalError: {
            responseType: 'internal-error',
            description: 'Error escribiendo el archivo'
        }
    },
  
    fn: async function (inputs, exits) {

        if ( inputs.emailAddress === undefined )
            return exits.invalid();

        var authUser = await User.findOne({ emailAddress: this.req.session.auth.emailAddress })
        .populate('doctor')
        .populate('patient')
        .populate('insurance')
        .populate('provider');
        var deleteAuth = await User.findOne({ emailAddress: inputs.emailAddress })
        .populate('doctor')
        .populate('patient')
        .populate('insurance')
        .populate('provider');

        if ( authUser.type == deleteAuth.type )
            return exits.invalid();

        // Remove from collection
        authUser.id = authUser[authUser.type][0].id; 
        deleteAuth.id = deleteAuth[deleteAuth.type][0].id;
        try{
            switch(deleteAuth.type){
                case 'patient':
                    await Patient.removeFromCollection(deleteAuth.id, authUser.type + 's').members([authUser.id]);
                    break;
                case 'doctor':
                    await Doctor.removeFromCollection(deleteAuth.id, authUser.type + 's').members([authUser.id]);
                    break;
                case 'insurance':
                    await Insurance.removeFromCollection(deleteAuth.id, authUser.type + 's').members([authUser.id]);
                    break;
                case 'provider':
                    await Provider.removeFromCollection(deleteAuth.id, authUser.type + 's').members([authUser.id]);
                    break;
            }
        }catch(err){
            return exits.internalError();
        }

        if ( !deleteAuth )
            return exits.notFound();

        return exits.success({
            success: true,
            message: 'Deleted '+deleteAuth.type+' authorized',
        });
  
    }
  
};  