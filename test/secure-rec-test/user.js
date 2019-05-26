var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var fs = require('fs');
chai.use(chaiHttp)

function makeid(length, type) {
    var characters, result= '';
    if (type == 'hash')
        characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    else if (type == 'number')
        characters = '0123456789';
    else if (type == 'email')
        characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    else
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ )
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

const url = 'https://localhost';
var authenticated;
var patientEmail = 'patient_' + makeid(5, 'email') + '@gmail.com';
var doctorEmail = 'doctor_' + makeid(5, 'email') + '@gmail.com';
var insuranceEmail = 'insurance_' + makeid(5, 'email') + '@gmail.com';
var clinicEmail = 'clinic_' + makeid(5, 'email') + '@gmail.com';
var pharmacyEmail = 'pharmacy_' + makeid(5, 'email') + '@gmail.com';
var laboratoryEmail = 'laboratory_' + makeid(5, 'email') + '@gmail.com';
var password = 'testPassword';

module.exports = {
    newUserPatient(){
        describe('Create a new Patient', function(){
            it('Should create a new Patient', function(done){
                chai.request(url)
                    .post('/services/secure-rec/user/new')
                    .type('multipart/form-data')
                    .field('emailAddress', patientEmail)
                    .field('password', password)
                    .field('phone','02121234567')
                    .field('country','Venezuela')
                    .field('state', 'Caracas')
                    .field('address', 'Santa Rosa de Lima')
                    .field('type','patient')
                    .field('name', 'TestUser')
                    .field('lastName', 'DoubleTest')
                    .field('birthdate','2001-05-16')
                    .field('socialSecurityNumber','')
                    .field('bloodType', 'A+')
                    .field('allergies', 'none')
                    .field('donor', true)
                    .then(function(res){
                        expect(res.body.success).to.be.equal(true);
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    });
            });
        });
    },
    newUserDoctor(){
        describe('Create a new Doctor', function(){
            it ('Should create a new Doctor', function(done){
                chai.request(url)
                    .post('/services/secure-rec/user/new')
                    .type('multipart/form-data')
                    .field('emailAddress', doctorEmail)
                    .field('password', password)
                    .field('phone', '02121234567')
                    .field('country', 'Venezuela')
                    .field('state', 'Caracas')
                    .field('address', 'El Rosal, edif verde')
                    .field('type','doctor')
                    .field('name','Doctor')
                    .field('lastName', 'Strange')
                    .field('birthdate','2000-01-02')
                    .field('specialty', 'Octopediatria')
                    .field('socialSecurityNumber','')
                    .then(function(res){
                        expect(res.body.success).to.be.equal(true);
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    });
            });
        });
    },
    newUserInsurance(){
        describe('Create a new Insurance', function(){
            it('Should create a new Insurance', function(done){
                chai.request(url)
                    .post('/services/secure-rec/user/new')
                    .type('multipart/form-data')
                    .field('emailAddress', insuranceEmail)
                    .field('password', password)
                    .field('phone', '02121234567')
                    .field('country', 'Venezuela')
                    .field('state', 'Caracas')
                    .field('address', 'El Rosal, edif verde')
                    .field('type','insurance')
                    .field('name', 'Aseguradora mil')
                    .field('website', 'www.google.com')
                    .field('ein','')
                    .then(function(res){
                        expect(res.body.success).to.be.equal(true);
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    })
            });
        });
    },
    newUserProviderClinic(){
        describe('Create a new clinic', function(){
            it('Should create a new clinic', function(done){
                chai.request(url)
                    .post('/services/secure-rec/user/new')
                    .type('multipart/form-data')
                    .field('emailAddress', clinicEmail)
                    .field('password',password)
                    .field('phone','0212132457')
                    .field('country','Venezuela')
                    .field('state','Caracas')
                    .field('address','Caurimare, Baruta')
                    .field('type', 'provider')
                    .field('name', 'Metropolitana')
                    .field('providerType', 'clinic')
                    .field('ein','')
                    .field('website','www.google.com')
                    .then(function(res){
                        expect(res.body.success).to.be.equal(true);
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    });
            });
        })
    },
    newUserProviderPharmacy(){
        describe('Create a new pharmacy', function(){
            it('Should create a new pharmacy', function(done){
                chai.request(url)
                    .post('/services/secure-rec/user/new')
                    .type('multipart/form-data')
                    .field('emailAddress',pharmacyEmail)
                    .field('password',password)
                    .field('phone','0212132457')
                    .field('country','Venezuela')
                    .field('state','Caracas')
                    .field('address','Caurimare, Baruta')
                    .field('type', 'provider')
                    .field('name', 'Metropolitana')
                    .field('providerType', 'pharmacy')
                    .field('ein','')
                    .field('website','www.google.com')
                    .then(function(res){
                        expect(res.body.success).to.be.equal(true);
                        done();
                    })  
                    .catch(function(err){
                        done(err);
                    })  ;
            });
        })
    },
    newUserProviderLaboratory(){
        describe('Create a new laboratory', function(){
            it('Should create a new laboratory', function(done){
                chai.request(url)
                    .post('/services/secure-rec/user/new')
                    .type('multipart/form-data')
                    .field('emailAddress',laboratoryEmail)
                    .field('password',password)
                    .field('phone','0212132457')
                    .field('country','Venezuela')
                    .field('state','Caracas')
                    .field('address','Caurimare, Baruta')
                    .field('type', 'provider')
                    .field('name', 'Metropolitana')
                    .field('providerType', 'laboratory')
                    .field('ein','')
                    .field('website','www.google.com')
                    .then(function(res){
                        expect(res.body.success).to.be.equal(true);
                        done();
                    })  
                    .catch(function(err){
                        done(err);
                    })  ;
            });
        })
    },
    login() {
        describe('Login test', function(){
            it('Should Login', function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: doctorEmail, 
                    password: password 
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
                    emailAddress: doctorEmail, 
                    password: password 
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
    },
    profile() {
        describe('Profile test', function(){
            before(function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: doctorEmail, 
                    password: password 
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
                    emailAddress: doctorEmail, 
                    password: password 
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
                    oldPassword: password,
                    newPassword: password
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
                    oldPassword: password,
                    newPassword: password
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
    passwordRecovery(){
        var secretKey = '';
        var emailTest = 'patient_' + makeid(5,'email') + '@email.com';
        describe('Recovery password', function(){
            this.timeout(25000);
            before(function(done){
                chai.request(url)
                .post('/services/secure-rec/user/new')
                .type('multipart/form-data')
                .field('emailAddress', emailTest)
                .field('password', password)
                .field('phone','02121234567')
                .field('country','Venezuela')
                .field('state', 'Caracas')
                .field('address', 'Santa Rosa de Lima')
                .field('type','patient')
                .field('name', 'TestUser')
                .field('lastName', 'DoubleTest')
                .field('birthdate','2001-05-16')
                .field('socialSecurityNumber','')
                .field('bloodType', 'A+')
                .field('allergies', 'none')
                .field('donor', true)
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    secretKey = res.body.secretKey;
                    done();
                })
                .catch(function(err){
                    done(err);
                });

            });
            it('Should recovery password', function(done){
                chai.request(url)
                    .post('/services/secure-rec/password-recovery')
                    .type('multipart/form-data')
                    .field('privateKey', secretKey)
                    .then(function(res){
                        expect(res.body.status).to.be.equal('info');
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    })
            });
        });
    },
    newAuth() {
        describe('New authorization test', function(){
            before(function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: doctorEmail, 
                    password: password 
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
                    authorizationEmail: patientEmail
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
    uploadFile() {
        describe('Upload file (create transaccition)', function(){
            this.timeout(10000);
            before(function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: doctorEmail, 
                    password: password 
                })
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    expect(res.status).to.be.equal(200);
                    authenticated.post('/services/secure-rec/authorizations/new')
                    .send({
                        authorizationEmail: clinicEmail
                    })
                    .then(function(res){
                        expect(res.body.success).to.be.equal(true);
                        expect(res.status).to.be.equal(200);
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    });
                })
                .catch(function(err){
                    done(err);
                });
            });
            it('Should upload file', function(done){
                var array = {
                    patient: patientEmail,
                    insurances: [],
                    providers: [clinicEmail]
                }
                authenticated.post('/services/secure-rec/upload-register')
                .field('fileName', 'registro')
                .field('pay', false)
                .field('description', 'Test Test Test Test Test')
                .field('notes', 'Test Test Test Test Test2')
                .field('users', JSON.stringify(array))
                .attach('file','./test/secure-rec-test/files/test1.jpg')
                .then(function(res){
                    expect(res.body.success).to.be.equal(true);
                    done();
                })
                .catch(function(err){
                    console.log(err);
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
    downloadFile(){
        describe('Download register', function(){
            this.timeout(10000);
            before(function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: doctorEmail, 
                    password: password 
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
            it('Should download register', function(done){
                authenticated.post('/services/secure-rec/download-register')
                .send({
                    fileHash: 'QmejZcwERLuZJ5uUu4AUaPQVnPHHFhsoVeBGnTsBrXreMS'
                })
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
    editNote(){
        describe('Edit notes',function(){
            this.timeout(10000);
            before(function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: doctorEmail, 
                    password: password 
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
            it('Should edit note', function(done){
                authenticated.post('/services/secure-rec/edit-notes')
                .send({
                    notesId: 'QmejZcwERLuZJ5uUu4AUaPQVnPHHFhsoVeBGnTsBrXreMS',
                    newNote: 'New notes'
                })
                .then(function(res){
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
    deleteAuth() {
        describe('Delete authorization test', function(){
            before(function(done){
                authenticated = request.agent(url);
                authenticated.post('/services/secure-rec/session/new')
                .send({
                    emailAddress: doctorEmail, 
                    password: password 
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
                    emailAddress: patientEmail
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