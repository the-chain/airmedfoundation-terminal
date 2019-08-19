const fabric = require('../../../../../fabric-api/chaincodeTransactions');
const ursa = require('../../../../../crypto/keys');
const ipfs = require('../../../../../ipfs-api/ipfs_api');
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
      },
      serverError: {
        responseType: 'view',
        viewTemplatePath: '500'
      }
    },
    
    fn: async function (inputs, exits) {
        let user = this.req.session.auth;
        let result, pubKey = await ursa.getPublicKey(this.req.session.auth.privateKey);
        // Get prescriptions
        try{
          result = await fabric.queryChaincode('mychannel','Org1MSP','secureRec', 'queryPrescriptions', [pubKey]);
          result = JSON.parse(result[0].toString());
        }catch(err){
          return exits.serverError();
        }
        let prescriptions = new Array(), unusedPrescriptions = new Array();
        let patient, hash, data;
        if ( result.prescriptions !== undefined ) {
          for (let i = 0; i < result.prescriptions.length; i++ ) {
            // Get patient
            try {
              patient = await User.findOne({ publicKey: result.prescriptions[i].patient });
            }catch(err){ return exits.serverError(); }
            // Get description and ipfs hash
            try{
              hash = await ursa.decryptIpfsHash(patient.privateKey, result.prescriptions[i].hash);
              data = await ipfs.asyncDownload(hash);
              data = JSON.parse(data.toString());
            }catch(err) { 
              return exits.serverError();
            }
            // Prepare the prescription
            let provider = "", insurance = "", doctor = await User.findOne({ publicKey: result.prescriptions[i].doctor });
            if ( result.prescriptions[i].provider.length > 0 ){
              provider = await User.findOne({ publicKey: result.prescriptions[i].provider });
              provider = provider.emailAddress;
            }
            if ( result.prescriptions[i].insurance.length > 0 ){
              insurance = await User.findOne({ publicKey: result.prescriptions[i].insurance });
              insurance = insurance.emailAddress;
            }
            let prescription = {
              status: result.prescriptions[i].status,
              description: data.description,
              doctor: doctor.emailAddress,
              patient: patient.emailAddress,
              insurance: insurance,
              provider: provider,
              ipfsHash: data.hashFile,
              hash: result.prescriptions[i].hash
            }
            // Save the prescription
            if ( prescription.status === 'SPENT' ) {
              prescriptions.push(prescription);
            } else if ( prescription.status === 'UNSPENT' ){
              unusedPrescriptions.push(prescription);
            } else if ( prescription.status === 'DELETED' ){
              prescriptions.push(prescription);
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