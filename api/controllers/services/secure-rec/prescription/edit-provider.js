const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');
const ipfs = require('../../../../../ipfs-api/ipfs_api');

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
        },
        ursa: {
            responseType: 'ursa-error',
            description: 'Error en la clave enviada'
        },
        fabric: {
            responseType: 'fabric-error',
            description: 'Error Hyperledger Fabric' 
        },
        invalidFabric: {
            responseType: 'fabric-invalid',
            description: 'Error Hyperledger Fabric inputs' 
        },
        internalError: {
            responseType: 'internal-error',
            description: 'Error changing password'
        },
        ipfs: {
            responseType: 'ipfs-error2',
            description: 'Error uploading the image'
        }
    },
  
    fn: async function (inputs, exits) {

        if ( inputs.hash === undefined )
            return exits.invalid();

        let owner = this.req.session.auth, pubKey = await ursa.getPublicKey(owner.privateKey), result, Args, prescription;
        try{
            Args = [pubKey, inputs.hash];
            result = await fabric.invokeTransaction('mychannel','Org1MSP','secureRec', 'consumePrescription', Args);
            // Get prescription
            prescription = await fabric.queryChaincode('mychannel','Org1MSP','secureRec', 'queryPrescription', [inputs.hash]);
            prescription = JSON.parse(prescription[0].toString());
            try {
                let patient = await User.findOne({publicKey: prescription.patient});
                prescription.patient = patient.emailAddress;
                prescription.doctor = (await User.findOne({publicKey: prescription.doctor})).emailAddress;
                if (prescription.insurance.length > 0 )
                    prescription.insurance = (await User.findOne({publicKey: prescription.insurance})).emailAddress;
                prescription.provider = owner.emailAddress;
                try {
                    let  ipfsHash = await ursa.decryptIpfsHash(patient.privateKey, prescription.hash);
                    // prescription.ipfsHash
                    try {
                        let data = await ipfs.asyncDownload(ipfsHash);
                        data = JSON.parse(data.toString());
                        prescription.ipfsHash = data.hashFile;
                        prescription.description = data.description;
                    }catch(err){
                        return exits.ipfs();
                    }
                }catch(err){
                    return exits.ursa();
                }
            }catch(err){
                return exits.internalError();
            }
        }catch(err){
            return exits.invalidFabric();
        }    
        return exits.success({
            success: true,
            message: 'Prescription updated successfully',
            hash: result.hash,
            prescription: prescription
        });
  
    }
  
};  