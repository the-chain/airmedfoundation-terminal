const ipfs      = require('../../../../../ipfs-api/ipfs_api');
const fileType = require('file-type');
const fs = require('fs');
const sleep = require('sleep');


module.exports = {

    friendlyName: 'Download register',

    description: 'Download registers to IPFS and save in Hyperledger Fabric',
  
    inputs: {

        fileHash:{
            type: 'string',
            description: 'File Hash'
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
            description: 'Imagen no encontrada o hash inválido'
        },
    },

    fn: async function (inputs, exits) {
        if ( !inputs.fileHash )
            return exits.invalid();
        var file, type;
        // Get file from IPFS
        try{
            file = await ipfs.asyncDownload(inputs.fileHash);
        }catch(err){
            return exits.ipfs();
        }
        // Get file type
        type = fileType(file);
        if (!type) {
          type = {
            ext: 'unknownType',
            mime: 'file/unknownType'
          }
        }
        // Write file
        let response = { 
            success: true
        };
        var path, datetime;
        path = 'assets/images/' + inputs.fileHash + '.' + type.ext;
        response.image = '../../images/' + inputs.fileHash + '.' + type.ext;
        response.imageType = type.mime;
        fs.writeFile(path, file, 'binary', (err) => {
          if (err) 
            return exits.write();
          sleep.sleep(2);
          datetime = new Date();
          response.imageName = datetime + '.' + type.ext;
          // Send file
          return exits.success(response);
        });
    }   
}