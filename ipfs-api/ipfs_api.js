var ipfsClient = require('ipfs-http-client');
var config = require("./config_ipfs.json");
const fs = require('fs');

var ipfs = ipfsClient( config.host, config.port, { protocol: 'http' });

module.exports = {
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
                return cb(err, null);
            // Creating object image
            let data = {
                path: imagePath,
                content: new Buffer(image)
            }
            // Upload to ipfs
            ipfs.add(data, (err, file) => {
                // Error uploading the image
                if (err)
                    return cb(err, null);
                // Done.
                return cb(null,file[0].hash);
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
                return cb(err, null);
            return cb(null, file[0].content);
        })
    }
}

