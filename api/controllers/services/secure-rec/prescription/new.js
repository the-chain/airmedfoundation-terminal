module.exports = {

    friendlyName: 'Upload prescription',

    description: 'Upload prescription to IPFS and save in Hyperledger Fabric',
  
    files: ['file'],

    inputs: {
        file: {
            type: 'ref',
            description: 'Uploaded file'
        },
        fileName:{
            type: 'string',
            description: 'File name'
        },
        user: {
            type: 'string',
            required: true
        },
        description:{
            type: 'string',
            description: 'Description of the register',
            required: true
        }
    },

    exits: {
        invalid: {
            responseType: 'bad-combo',
            description: 'The parameters provided are invalid.'
        }
    },

    fn: async function (inputs, exits) {

        // Get the user who is uploading the prescription
        var owner = this.req.session.auth;
        if ( owner == undefined )
            return exits.invalid();
        
        let newName = inputs.fileName === undefined ? 'example.png' : inputs.fileName;
        let fileName = await sails.helpers.strings.random('url-friendly') + '.' + newName.split('.').pop();

        console.log(inputs.user);
        console.log(inputs.description);

        inputs.file.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/prescriptions/'), saveAs: fileName }, function (err, uploadedFile){
            return exits.success({'success': true, 'message': 'message' });
        });
    }
}