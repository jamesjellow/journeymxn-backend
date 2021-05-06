//command to run unit tests: "npm run test"

var should = require('should');
var app = require('../app');
var request = require('supertest')(app);
var session = require('supertest-session');

//For testing Session-management
var testSession = null;
beforeEach(function(){
    testSession = session(app);
})

//TEST 1
describe('Login Test : Invalid Credentials', function() {
    it('null email : Redirects to /login with statusCode 401', function() {
        request.post('/login')
            .send({
                email: " ",
                password: 'dummy_password'
            })
            .expect(401)
            .end(function(err, res){
                should(err).equal;(null);
            });
    });

    it('null password : Redirects to /login with statusCode 401', function() {
        request.post('/login')
            .send({
                email: "dummy_admin@journeymxn.com",
                password: ""
            })
            .expect(401)
            .end(function(err, res){
                should(err).equal;(null);
            });
    });

    it('null email and password : Redirects to /login with statusCode 401', function() {
        request.post('/login')
            .send({
                email: "   ",
                password: "   "
            })
            .expect(401)
            .end(function(err, res){
                should(err).equal;(null);
            });
    });
});

//TEST 2
describe('Login Test : Incorrect Credentials', function() {
    it('User NOT an Admin : Redirects to /login with statusCode 401', function() {
        request.post('/login')
            .send({
                email: "dummy_admin@journeymxn.com",
                password: 'dummy_password'
            })
            .expect(401)
            .end(function(err, res){
                should(err).equal;(null);
            });
    });

    it('Incorrect password : Redirects to /login with statusCode 401', function() {
        request.post('/login')
            .send({
                email: "newAdminTEST2@journeymxn.com",
                password: "chf53!hj"
            })
            .expect(401)
            .end(function(err, res){
                should(err).equal;(null);
            });
    });
});

//TEST 3
describe('Login Test : Correct Credentials', function() {
    it('User IS an Admin : Redirects to /admin with statusCode 200', function() {
        request.post('/login')
            .send({
                email: "newAdminTEST2@journeymxn.com",
                password: '222QWERTY'
            })
            .expect(200)
            .end(function(err, res){
                should(err).equal;(null);
            });
    });
});

//TEST 4
describe('GET /admin TEST : Testing session management', function() {
    it('Admin Credentials are valid, but Admin NOT logged in : Redirects to /login with statusCode 401', function() {
        request.get('/admin')
            .send({
                email: "newAdminTEST2@journeymxn.com",
                password: '222QWERTY'
            })
            .expect(401)
            .end(function(err, res){
                should(err).equal;(null);
            });
    });
});

//TEST 5
describe('GET /admin TEST : Testing session management', function() {
    var authenticatedSession;
    before(function(done){
        request.post('/login')
            .send({
                email: "newAdminTEST2@journeymxn.com",
                password: '222QWERTY'
            })
            .end(function(err, res){
                if (err) throw err;
                authenticatedSession = testSession;
                return done();
            });
    });
    
    it('Admin Credentials are valid, and  Admin IS logged in : Renders /admin with statusCode 200', function() {
        authenticatedSession.get('/admin')
            .expect(200);
    });
});