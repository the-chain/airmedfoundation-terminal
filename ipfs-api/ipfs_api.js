var ipfsClient = require('ipfs-http-client');
var config = require('../appconfig.json');
const fs = require('fs');

var ipfs = ipfsClient( config.ipfs.host, config.ipfs.port, { protocol: 'http' });

module.exports = {
    /**
     * @async
     * @param {String} hash 
     * @description Async download
     */
    asyncDownload: async function(hash){
        var data = await ipfs.get(hash);
        return data[0].content;
    },
    /**
     * @param {string} data Buffer image
     * @description Upload fie to ipfs
     */
    uploadFromBuffer: function(data, cb){
        // Upload to ipfs
        ipfs.add(data, (err, file) => {
            // Error uploading the image
            if (err)
                cb(err,undefined);
            // Done.
            cb(undefined,file[0].hash);
        });
    },
    /**
     * @param {string} imagePath Image path
     * @callback cb Callback function (err,data)
     * @returns {string} Returns the hash of the file uploaded
     * @description Upload one file to ipfs
     */
    upload: function(imagePath, cb) {
        fs.readFile(imagePath, (err,image) => {
            // Error reading the image
            if (err)
                return cb(err, undefined);
            // Creating object image
            let data = {
                path: imagePath,
                content: new Buffer(image)
            }
            // Upload to ipfs
            ipfs.add(data, (err, file) => {
                // Error uploading the image
                if (err)
                    return cb(err, undefined);
                // Done.
                return cb(undefined,file[0].hash);
            });
        });
    },
    /**
     * @param {string} imageHash 
     * @callback cb Callback function (err,data)
     * @returns {Buffer} Returns the content of the image
     * @description Download file from ipfs
     */
    download: function(imageHash,cb){
        ipfs.get(imageHash, (err,file) =>{
            if ( err )
                return cb(err, undefined);
            return cb(undefined, file[0].content);
        })
    }
}

