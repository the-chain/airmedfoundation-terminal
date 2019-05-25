var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp)

const url = 'https://localhost';
var authenticated, user;
user = {
    emailAddress: 'doctor@email.com', 
    password: 'Qtl1Xf.0'
}

module.exports = {
    login() {
        describe('Login test', function(){
            it('Should Login', function(done){
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
        });
    },

    logout() {
        describe('Logout test', function(){
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
            it('Should Logout', function(done){
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