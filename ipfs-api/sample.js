var ipfs = require("./ipfs_api");

var hash;

ipfs.upload("/home/alex/Escritorio/descarga.png", (err,data) => {
    if (err){
        console.log(err);
        return;
    }
    console.log(data);
    hash = data;
    ipfs.download(hash,(err,data) => {
        console.log(data);
    });
});