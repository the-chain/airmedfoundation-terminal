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
            type: 'string',
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
        conflict: {
            responseType: 'conflict',
            description: 'Los parámetros proporcionados no son únicos.'
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

        var users = JSON.parse(inputs.users);
        // Validate controller inputs
        if ((!users.patient     &&  (!users.doctors || !users.insurances || !users.providers)) ||
            (!users.doctors     &&  (!users.patient || !users.insurances || !users.providers)) ||
            (!users.insurances  &&  (!users.patient || !users.doctors    || !users.providers)) ||
            (!users.providers   &&  (!users.patient || !users.doctors    || !users.insurances)))
          return exits.invalid();
        
        let fileName = await sails.helpers.strings.random('url-friendly') + '.' + inputs.fileName.split('.').pop();
        // Save the Image
        inputs.file.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/medical/'), saveAs: fileName }, function (err, uploadedFile){
            if (err) 
                return exits.internalError();

            // Image path
            var path = 'assets/images/medical/' + fileName;

            // Upload the file and data to ipfs
            var dataHash, fileHash, data = {};
            ipfs.upload(path, async (err, hashFile) => {
                if (err){
                    return exits.ipfs();
                }
                
                // Save data to IPFS
                data.pay = inputs.pay; data.description = inputs.description;
                data.patient = users.patient; data.doctors = users.doctors;
                data.insurances = users.insurances; data.providers = users.providers;
                data.fileHash = hashFile;
                ipfs.uploadFromBuffer(Buffer.from(JSON.stringify(data)), async (err,hash) =>{
                    if (err){
                        return exits.ipfs();
                    }
                    dataHash = hash;
                    // Encrypt the hash for every one
                    var from = await key.getPublicKey(owner.privateKey);
                    var Args = {
                        to: [],
                        dataHash: [],
                        fileHash: [],
                        copy: ''
                    };
                    Args.copy = await key.encryptIpfsHash(from,dataHash);
                    // Save notes
                    var notes = await Note.create(Object.assign({ hash: Args.copy, note: inputs.notes}))
                    .intercept('E_UNIQUE', 'conflict')
                    .intercept({name: 'UsageError'}, 'invalid')
                    .fetch();
                    var doctors = users.doctors, insurances = users.insurances, providers = users.providers;
                    var doctor, insurance, provider, patient = users.patient;
                    // Get all doctors
                    if ( doctors ) {
                        try{
                            for ( i = 0; i < doctors.length; i++ ){
                                doctor = await User.findOne({emailAddress: doctors[i].toLowerCase()});
                                Args.to.push(doctor.publicKey);
                                Args.dataHash.push(await key.encryptIpfsHash(doctor.publicKey,dataHash));
                            }
                        }catch(err){
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
                            }
                        }catch(err){
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
                            }
                        }catch(err){
                            return exits.internalError();
                        }
                    }
                    // Get the patient
                    if ( patient ) {
                        try{
                            patient = await User.findOne({emailAddress: patient.toLowerCase()});
                            Args.to.push(patient.publicKey);
                            Args.dataHash.push(await key.encryptIpfsHash(patient.publicKey,dataHash));
                        }catch(err){
                            return exits.internalError();
                        }
                    }
                    // Send transaction to Hyperledger Fabric
                    try{
                        let args = [from, JSON.stringify(Args)];
                        let result = await fabric.invokeTransaction('mychannel','Org1MSP','secureRec','sendRegister', args);
                        if (result['status'] == 'SUCCESS') 
                            return exits.success({'success': true, 'message': 'Your file has been sent successfully to every select user. Hyperledger transaction hash: ' + result['hash'] });
                        else
                            return exits.success({'success': false, 'message': result});
                    }catch(err){
                        return exits.fabric();
                    }
                });
            });
        });
    }
}