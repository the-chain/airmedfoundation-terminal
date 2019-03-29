const ipfs      = require('../../../../../ipfs-api/ipfs_api');
const fabric    = require('../../../../../fabric-api/chaincodeTransactions');
const key       = require('../../../../../crypto/keys');

module.exports = {

    friendlyName: 'Upload register',

    description: 'Upload registers to IPFS and save in Hyperledger Fabric',
  
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
        users: {
            type: 'json',
            required: true,
            description: 'Arrays of involved users'
        },
        pay: {
            type: 'bool',
            description: 'If the patient pay or the secures pay it'
        },
        description:{
            type: 'string',
            description: 'Description of the register',
            required: true
        },
        notes: {
            type: 'string'
        }

    },

    exits: {
        invalid: {
            responseType: 'bad-combo',
            description: 'The parameters provided are invalid.'
        },
        upload: {
            responseType: 'error-upload',
            description: 'Error uploading the image'
        },
        ipfs: {
            responseType: 'ipfs-error2',
            description: 'Error uploading the image'
        },
        ursa: {
            responseType: 'ursa-error',
            description: 'Error en la clave enviada'
        },
        fabric: {
            responseType: 'fabric-error',
            description: 'Error Hyperledger Fabric' 
        },
        internalError: {
            responseType: 'internal-error',
            description: 'Error changing password'
        }
    },

    fn: async function (inputs, exits) {

        // Get the user who is uploading the register
        var owner = this.req.session.auth;
        if ( owner == undefined )
            return exits.invalid();

        // Validate controller inputs
        if (!inputs.users.patient  &&  inputs.users.doctors &&  inputs.users.insurances &&  inputs.users.providers ||
             inputs.users.patient  && !inputs.users.doctors &&  inputs.users.insurances &&  inputs.users.providers ||
             inputs.users.patient  &&  inputs.users.doctors && !inputs.users.insurances &&  inputs.users.providers ||
             inputs.users.patient  &&  inputs.users.doctors &&  inputs.users.insurances && !inputs.users.providers )
          return exits.invalid();
        
        
        let imageFileName = await sails.helpers.strings.random('url-friendly') + '.' + inputs.imageName.split('.').pop();
        // Save the Image
        inputs.imageFile.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/medical/'), saveAs: imageFileName }, function (err, uploadedFile){
            if (err) 
                return exits.internalError();

            // Image path
            var path = 'assets/images/medical/' + imageFileName;

            // Upload the file and data to ipfs
            var dataHash, fileHash, data = {}; 
            ipfs.upload(path, async (err, hashFile) => {
                if (err){
                    console.log(err);
                    return exits.ipfs();
                }
                fileHash = hashFile;
                data.pay = inputs.pay; data.notes = inputs.notes;  data.description = inputs.description;
                try {
                    dataHash = ipfs.uploadFromBuffer(Buffer.from(JSON.stringify(data)));
                    console.log(dataHash, fileHash);

                    // Encrypt the hash for every one
                    var from = await key.getPublicKey(owner.privateKey);
                    var Args = {
                        to: new Array(),
                        dataHash: new Array(),
                        fileHash: new Array()
                    };
                    var doctors = inputs.users.doctors, insurances = inputs.users.insurances, providers = inputs.users.providers;
                    var doctor, insurance, provider, patient = inputs.users.patient;
                    // Get all doctors
                    if ( doctors ) {
                        try{
                            for ( i = 0; i < doctors.length; i++ ){
                                doctor = await User.findOne({emailAddress: doctors[i].toLowerCase()});
                                Args.to.push(doctor.publicKey);
                                Args.dataHash.push(await key.encryptIpfsHash(doctor.publicKey,dataHash));
                                Args.fileHash.push(await key.encryptIpfsHash(doctor.publicKey,fileHash));
                            }
                        }catch(err){
                            console.log(err);
                            return exits.internalError();
                        }
                    }
                    // Get all insurances
                    if ( insurances ){
                        try{
                            for ( i = 0; i < insurances.length; i++ ){
                                insurance = await User.findOne({emailAddress: insurances[i].toLowerCase()});
                                Args.to.push(insurance.publicKey);
                                Args.dataHash.push(await key.encryptIpfsHash(insurance.publicKey,dataHash));
                                Args.fileHash.push(await key.encryptIpfsHash(insurance.publicKey,fileHash));
                            }
                        }catch(err){
                            console.log(err);
                            return exits.internalError();
                        }
                    }
                    // Get all providers
                    if ( providers ){
                        try{
                            for ( i = 0; i < providers.length; i++ ){
                                provider = await User.findOne({emailAddress: providers[i].toLowerCase()});
                                Args.to.push(provider.publicKey);
                                Args.dataHash.push(await key.encryptIpfsHash(provider.publicKey,dataHash));
                                Args.fileHash.push(await key.encryptIpfsHash(provider.publicKey,fileHash));
                            }
                        }catch(err){
                            console.log(err);
                            return exits.internalError();
                        }
                    }
                    // Get the patient
                    if ( patient ) {
                        try{
                            patient = await User.findOne({emailAddress: patient.toLowerCase()});
                            Args.to.push(patient.publicKey);
                            Args.dataHash.push(await key.encryptIpfsHash(patient.publicKey,dataHash));
                            Args.fileHash.push(await key.encryptIpfsHash(patient.publicKey,fileHash));
                        }catch(err){
                            console.log(err);
                            return exits.internalError();
                        }
                    }
                    // Send transaction to Hyperledger Fabric
                    try{
                        let args = [from, JSON.stringify(Args)];
                        let result = await fabric.invokeTransaction('mychannel','Org1MSP','secureRec','sendRegister', args);
                        if (result['status'] == 'SUCCESS') 
                            return exits.success({'success': true});
                        else
                            return exits.success({'success': false, 'message': result});
                    }catch(err){
                        console.log(err);
                        return exits.fabric();
                    }
                }catch(err){
                    console.log(err);
                    return exits.ipfs();
                }
            });
        });
    }
}