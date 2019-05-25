var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp)

const url = 'https://localhost';
var authenticated, user;
user = {
    emailAddress: 'doctor@email.com', 
    password: 'Qtl1Xf.0',
    newPassword: 'A56789.c'
}

module.exports = {
    new(){
        // Sin sesion
    },
    profile() {
        describe('Profile test', function(){
            before(function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: user.emailAddress, 
                    password: user.password 
                })
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    expect(res.status).to.be.equal(200);
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
            it('Should get profile data', function(done){
                authenticated.get('/services/secure-rec/profile')
                .then(function(res){
                    expect(res.status).to.be.equal(200);
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
            after(function(done) {
                authenticated.get('/services/secure-rec/session/destroy')
                .then(function(res){
                    expect(res).to.redirectTo('/services/secure-rec');
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
        });
    },
    changePassword() {
        describe('Change password test', function(){
            before(function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: user.emailAddress, 
                    password: user.password 
                })
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    expect(res.status).to.be.equal(200);
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
            it('Should change actual password', function(done){
                authenticated.post('/services/secure-rec/change-password')
                .send({
                    oldPassword: user.password,
                    newPassword: user.newPassword
                })
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal('Password change successfully.');
                    expect(res.status).to.be.equal(200);
                    done();
                })
                .catch(function(err){
                    done(err);
                })
            });
            afterEach(function(done) {
                authenticated.post('/services/secure-rec/change-password')
                .send({
                    oldPassword: user.newPassword,
                    newPassword: user.password
                })
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal('Password change successfully.');
                    expect(res.status).to.be.equal(200);
                    done();
                })
                .catch(function(err){
                    done(err);
                })
            });
            after(function(done) {
                authenticated.get('/services/secure-rec/session/destroy')
                .then(function(res){
                    expect(res).to.redirectTo('/services/secure-rec');
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
        });
    },
    verifyEmail(){
        // Sin sesion
    },
    passwordRecovery(){
        // Sin sesion
    }
}