var ipfs = require('../../ipfs-api/ipfs_api');


module.exports = {
    async testUploadFromPath(){
        describe('testUploadFromPath', function() {
            it('Should upload without error', function(done) {
                ipfs.upload(process.cwd() + '/test/ipfs-test/files/test1.jpg',function(err,data){
                    if (err)
                        done(err);
                    else
                        done();
                }); 
            });
        });
    },
    async testUploadFromBuffer(){
        describe('uploadFromBuffer', function() {
            it('Should upload without error', function(done) {
                ipfs.uploadFromBuffer(new Buffer('Upload string'), function(err,data){
                    if (err)
                        done(err)
                    else
                        done()
                });
            });
        });
    },
    async testDownloadCallback(){
        describe('testDownloadCallback', function() {
            it('Should download without error', function(done) {
                ipfs.download('QmejZcwERLuZJ5uUu4AUaPQVnPHHFhsoVeBGnTsBrXreMS', function(err,data){
                    if (err)
                        done(err);
                    else
                        done();
                });
            });
        });
    },
    async testDownloadAsync(){
        describe('testDownloadAsync', function() {
            it('Should download without error', function(done) {
                ipfs.asyncDownload('QmejZcwERLuZJ5uUu4AUaPQVnPHHFhsoVeBGnTsBrXreMS')
                .then(function(data){
                    done();
                })
                .catch(function(err){
                    done(err);
                })
            });
        });
    }
}