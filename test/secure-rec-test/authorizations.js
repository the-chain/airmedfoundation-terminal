var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp)

const url = 'https://localhost';
var authenticated, user;
user = {
    emailAddress: 'doctor@email.com',
    authorizationEmail: 'patient@email.com',
    password: 'Qtl1Xf.0'
}

module.exports = {
    new() {
        describe('New authorization test', function(){
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
            it('Should authorize the user', function(done){
                authenticated.post('/services/secure-rec/authorizations/new')
                .send({
                    authorizationEmail: user.authorizationEmail
                })
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal('Successfully authorized the patient');
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
    delete() {
        describe('Delete authorization test', function(){
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
            it('Should unauthorize the user', function(done){
                authenticated.delete('/services/secure-rec/authorizations/delete')
                .send({
                    emailAddress: user.authorizationEmail
                })
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal('Deleted patient authorized');
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
    }
}