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
            .expect('Location', '/login')
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
            .expect('Location', '/login')
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
            .expect('Location', '/login')
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
            .expect('Location', '/login')
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
            .expect('Location', '/login')
            .end(function(err, res){
                should(err).equal;(null);
            });
    });
});

//TEST 3
describe('Login Test : Correct Credentials', function() {
    it('User IS an Admin : Directs to /admin with statusCode 200', function() {
        request.post('/login')
            .send({
                email: "newAdminTEST2@journeymxn.com",
                password: '222QWERTY'
            })
            .expect(200)
            .expect('Location', '/admin')
            .end(function(err, res){
                should(err).equal;(null);
            });
    });
});

//TEST 4
describe('GET /admin : Admin NOT logged in', function() {
    it('Redirects to /login with statusCode 401', function() {
        request.get('/admin')
            .send({
                email: "newAdminTEST2@journeymxn.com",
                password: '222QWERTY'
            })
            .expect(401)
            .expect('Location', '/login')
            .end(function(err, res){
                should(err).equal;(null);
            });
    });
});

//TEST 5
describe('GET /admin : Admin IS logged in', function() {
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
    
    it('Directs to /admin with statusCode 200', function() {
        authenticatedSession.get('/admin')
            .expect(200)
            .expect('Location', '/admin');
    });
});

//TEST 6
describe('GET /admin : After login() and logout()', function() {
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
    
    it('After Admin login : Directs to /admin with statusCode 200', function() {
        authenticatedSession.get('/admin')
            .expect(200)
            .expect('Location', '/admin')
    });

    before(function(done){
        request.post('/logout')
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

    it('After Admin logout : Directs to /login with statusCode 401', function() {
        authenticatedSession.get('/admin')
            .expect(401)
            .expect('Location', '/login');
    });
});