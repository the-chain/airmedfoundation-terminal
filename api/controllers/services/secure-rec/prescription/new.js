const ipfs = require('../../../../../ipfs-api/ipfs_api');
const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');


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

        // Get the user who is uploading the prescription
        var owner = this.req.session.auth;
        const publicKey = await ursa.getPublicKey(owner.privateKey)
        if ( owner == undefined )
            return exits.invalid();
        
        let newName = inputs.fileName === undefined ? 'example.png' : inputs.fileName;
        let fileName = await sails.helpers.strings.random('url-friendly') + '.' + newName.split('.').pop();
        inputs.file.upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/prescriptions/'), saveAs: fileName }, function (err, uploadedFile){
            if (err) 
                return exits.upload();
            
            let path = 'assets/images/prescriptions/' + fileName;
            // Upload file to IPFS
            ipfs.upload(path, async (err, hashFile) => {
                if ( err ) 
                    return exits.ipfs();
                let data = {
                    hashFile: hashFile,
                    description: inputs.description
                }
                // Upload data to IPFS
                ipfs.uploadFromBuffer(Buffer.from(JSON.stringify(data)), async (err, hash) =>{
                    if (err)
                        return exits.ipfs();
                    try{
                        let user = await User.findOne({emailAddress: inputs.user.toLowerCase()});
                        let encryptedHash = await ursa.encryptIpfsHash(user.publicKey, hash);
                        let Args = [user.publicKey, publicKey, encryptedHash];
                        let result = await fabric.invokeTransaction('mychannel','Org1MSP','secureRec', 'createPrescription', Args);
                        if (result['status'] == 'SUCCESS') 
                            return exits.success({'success': true, 'message': 'Your prescription has been created successfully. Hyperledger transaction hash: ' + result['hash'], 'hash': encryptedHash });
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