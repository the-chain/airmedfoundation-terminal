const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');
module.exports = {

    friendlyName: 'Secure Rec prescriptions',
    
    description: 'Secure Rec prescription.',
    
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'services/secure-rec/prescription/index'
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
        let user = this.req.session.auth;
        let result, pubKey = await ursa.getPublicKey(this.req.session.auth.privateKey);
        try{
          result = await fabric.queryChaincode('mychannel','Org1MSP','secureRec', 'queryPrescriptions', ['Papasito']);
        }catch(err){
          return exits.fabric();
        }
        result = JSON.parse(result[0].toString());
        let prescriptions = new Array(), unusedPrescriptions = new Array();
        if ( result.prescriptions !== undefined ) {
          for (let i = 0; i < result.prescriptions.length; i++ ) {
            if ( result.prescriptions[i].status === 'SPENT' ) {
              prescriptions.push(result.prescriptions[i])
            } else if ( result.prescriptions[i].status === 'UNSPENT' ){
              unusedPrescriptions.push(result.prescriptions[i]);
            } else if ( result.prescriptions[i].status === 'DELETED' ){
              // Veremos
            }
          }
        }
        if (user.type == 'patient'){
            let insuranceCompanies, pharmacies;
            insuranceCompanies = await Patient.findOne({ emailAddress: user.emailAddress }).populate('insurances');
            insuranceCompanies = insuranceCompanies.insurances;
            pharmacies = await Patient.findOne({ emailAddress: user.emailAddress }).populate('providers', { where: { type: 'pharmacy'}});
            pharmacies = pharmacies.providers;
            return exits.success({ 'insuranceCompanies': insuranceCompanies, 'pharmacies': pharmacies, 'unusedPrescriptions': unusedPrescriptions, 'prescriptions': prescriptions });
        }
        return exits.success({'unusedPrescriptions': unusedPrescriptions, 'prescriptions': prescriptions});
    }    
};