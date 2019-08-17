const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');

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
        }
    },
  
    fn: async function (inputs, exits) {

        if (inputs.hash === undefined || inputs.pharmacy === undefined || inputs.pharmacy === '' || inputs.selfPayment === undefined)
            return exits.invalid();
        
        let owner = this.req.session.auth, pubKey = await ursa.getPublicKey(owner.privateKey);
        let provider;
        let result, Args;
        try{
            provider = await User.findOne({ emailAddress: inputs.pharmacy});
            if ( inputs.selfPayment ) {
                Args = [pubKey, provider.publicKey, "", inputs.hash];
            }else{
                let insurance = await User.findOne({ emailAddress: inputs.insurance});
                Args = [pubKey, provider.publicKey, insurance.publicKey, inputs.hash];
            }
        }catch(err){
            return exits.internalError();
        }
        try {
            result = await fabric.invokeTransaction('mychannel','Org1MSP','secureRec', 'updatePrescription', Args);
        }catch(err){
            return exits.invalidFabric();
        }
        
        return exits.success({
            success: true,
            message: 'Prescription updated successfully',
            hash: result.hash
        });
  
    }
  
};  