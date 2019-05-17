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
        },
        dataExist: {
            responseType: 'data-exist',
            description: 'El dato existe'
        }
    },
  
    fn: async function (inputs, exits) {

        if ( inputs.authorizationEmail === undefined )
            return exits.invalid();

        // Find users
        var authUser = await User.findOne({ emailAddress: this.req.session.auth.emailAddress })
        .populate('doctor')
        .populate('patient')
        .populate('insurance')
        .populate('provider');
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
        
        // Validate if is inside the collection
        var validAuth;
        switch( authUser.type ){
            case 'patient':
                validAuth = await Patient.findOne({emailAddress: this.req.session.auth.emailAddress})
                .populate(user.type+'s', { where: { emailAddress: inputs.authorizationEmail }});
                break;
            case 'doctor':
                validAuth = await Doctor.findOne({emailAddress: this.req.session.auth.emailAddress})
                .populate(user.type+'s', { where: { emailAddress: inputs.authorizationEmail }});
                break;
            case 'provider':
                validAuth = await Provider.findOne({emailAddress: this.req.session.auth.emailAddress})
                .populate(user.type+'s', { where: { emailAddress: inputs.authorizationEmail }});
                break;
            case 'insurance':
                validAuth = await Insurance.findOne({emailAddress: this.req.session.auth.emailAddress})
                .populate(user.type+'s', { where: { emailAddress: inputs.authorizationEmail }});
                break;
        }
        if (validAuth[user.type+'s'].length > 0)
            return exits.dataExist();
            
        // Add new authorization
        user.id = user[user.type][0].id;
        authUser.id = authUser[authUser.type][0].id; 
        try{
            switch( authUser.type ) {
                case 'doctor':
                    await Doctor.addToCollection(authUser.id, user.type + 's').members([user.id]);
                    break;
                case 'patient':
                    await Patient.addToCollection(authUser.id, user.type + 's').members([user.id]);
                    break;
                case 'insurance':
                    await Insurance.addToCollection(authUser.id, user.type + 's').members([user.id]);
                    break;
                case 'provider':
                    await Provider.addToCollection(authUser.id, user.type + 's').members([user.id]);
                    break;
            }            
        }catch(err){
            return exits.internalError();
        }

        // Send updated user
        var updatedUser = await User.findOne({ emailAddress: inputs.authorizationEmail })
        .populate('doctor')
        .populate('patient')
        .populate('insurance')
        .populate('provider');

        return exits.success({
            success: true,
            message: 'Successfully authorized the ' + user.type,
            user: updatedUser
        });
  
    }
  
};  