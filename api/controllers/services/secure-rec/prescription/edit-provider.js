//const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');

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

        if ( inputs.hash === undefined )
            return exits.invalid();

        let owner = this.req.session.auth, pubKey = await ursa.getPublicKey(owner.privateKey), result, Args;
        try{
            Args = [pubKey, inputs.hash];
            result = await fabric.invokeTransaction('mychannel','Org1MSP','secureRec', 'consumePrescription', Args);
        }catch(err){
            return exits.fabric();
        }    
        return exits.success({
            success: true,
            message: 'Edit prescription',
            hash: result.hash
        });
  
    }
  
};  