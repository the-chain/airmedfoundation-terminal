const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');

module.exports = {

    friendlyName: 'Secure Rec delete prescription',
  
    description: 'Secure Rec delete prescription.',
  
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

        if ( inputs.hash === undefined )
            return exits.invalid();

        let owner = this.req.session.auth, pubKey = await ursa.getPublicKey(owner.privateKey), result, Args;
        try{
            Args = [pubKey, inputs.hash];
            result = await fabric.invokeTransaction('mychannel','Org1MSP','secureRec', 'deletePrescription', Args);
        }catch(err){
            return exits.invalidFabric();
        }
        
        return exits.success({
            success: true,
            message: 'Deleted prescription',
            hash: result.hash
        });
  
    }
  
};  