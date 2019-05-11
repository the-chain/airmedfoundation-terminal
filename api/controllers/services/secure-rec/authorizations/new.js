module.exports = {

    friendlyName: 'Secure Rec new authorization',
  
    description: 'Secure Rec new authorization.',

    inputs: {
        authorizationEmail:{
            type: 'string'
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

        if ( inputs.authorizationEmail === undefined )
            return exits.invalid();

        // Find users
        var authUser = await User.findOne({ emailAddress: this.req.session.auth.emailAddress });
        var user = await User.findOne({ emailAddress: inputs.authorizationEmail })
        .populate('doctor')
        .populate('patient')
        .populate('insurance')
        .populate('provider');

        // Check user
        if ( !user )
            return exits.notFound();

        // Validate types
        if ( user.type ==  authUser.type )
            return exits.invalid();
        
        try{
            switch( authUser.type ) {
                case 'doctor':
                    user.id = user[user.type][0].id; 
                    if ( user.type == 'patient' )
                        await Doctor.addToCollection(authUser.id, 'patients').members([user.id]);
                    else if (user.type == 'insurance')
                        await Doctor.addToCollection(authUser.id, 'insurances').members([user.id]);
                    else if (user.type == 'provider')
                        await Doctor.addToCollection(authUser.id, 'providers').members([user.id]);
                case 'patient':
                    user.id = user[user.type][0].id;
                    if ( user.type == 'doctor' )
                        await Patient.addToCollection(authUser.id, 'doctors').members([user.id]);
                    else if (user.type == 'insurance')
                        await Patient.addToCollection(authUser.id, 'insurances').members([user.id]);
                    else if (user.type == 'provider')
                        await Patient.addToCollection(authUser.id, 'providers').members([user.id]);
                case 'insurance':
                    user.id = user[user.type][0].id;
                    if ( user.type == 'patient' )
                        await Insurance.addToCollection(authUser.id, 'patients').members([user.id]);
                    else if (user.type  == 'doctor')
                        await Insurance.addToCollection(authUser.id, 'doctors').members([user.id]);
                    else if (user.type == 'provider')
                        await Insurance.addToCollection(authUser.id, 'providers').members([user.id]);
                case 'provider':
                    user.id = user[user.type][0].id;
                    if ( user.type == 'patient' )
                        await Provider.addToCollection(authUser.id, 'patients').members([user.id]);
                    else if (user.type == 'doctor')
                        await Provider.addToCollection(authUser.id, 'doctors').members([user.id]);
                    else if (user.type == 'insurance')
                        await Provider.addToCollection(authUser.id, 'insurances').members([user.id]);
            }            
        }catch(err){
            return exits.internalError();
        }

        return exits.success({
            success: true,
            message: 'Successfully authorized the '+user.type
        });
  
    }
  
};  