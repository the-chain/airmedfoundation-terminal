const ipfs = require('../../../../../ipfs-api/ipfs_api');
const fileType = require('file-type');
const fs = require('fs');
const sleep = require('sleep');


module.exports = {

    friendlyName: 'Secure Rec download prescription',
  
    description: 'Secure Rec download prescription.',
  
    inputs: {
        ipfsHash: {
            type: 'string',
        }
    },

    exits: {
        invalid: {
            responseType: 'bad-combo',
            description: 'Los parámetros proporcionados son inválidos.'
        },
        write: {
            responseType: 'internal-error',
            description: 'Error escribiendo el archivo'
        },
        ipfs: {
            responseType: 'ipfs-error',
            description: 'Error downloading the image'
        }
    },
  
    fn: async function (inputs, exits) {

        if ( inputs.ipfsHash === undefined )
            return exits.invalid();
        
        // Download file from IPFS
        let file;
        try {
            file = await ipfs.asyncDownload(inputs.ipfsHash);
            let type = fileType(file);
            if (!type) {
                type = {
                    ext: 'unknownType',
                    mime: 'file/unknownType'
                }
            }
            const path = 'assets/images/prescriptions/' + inputs.ipfsHash + '.' + type.ext;
            const image = 'images/prescriptions/' + inputs.ipfsHash + '.' + type.ext;
            fs.writeFile(path, file, 'binary', (err)=>{
                if (err) 
                    return exits.write();
                sleep.sleep(2);
                const datetime = new Date();
                return exits.success({
                    success: true,
                    fileName: datetime + '.' + type.ext,
                    file: '../../../' + image
                });
            });
        }catch(err){
            return exits.ipfs();
        }
    }
  
};  