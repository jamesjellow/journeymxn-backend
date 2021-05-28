//command to run unit tests: "npm run test"

var should = require('should');
var app = require('../app');
var request = require('supertest')(app);
var session = require('supertest-session');

// //For testing Session-management
// var testSession = null;
// beforeEach(function(){
//     testSession = session(app);
// })

//TEST 1
describe('Login Test : Invalid Credentials', function() {
    it('null email : Returns statusCode 401', function() {
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

    it('null password : Returns statusCode 401', function() {
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

    it('null email and password : Returns statusCode 401', function() {
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
    it('User NOT an Admin : Returns statusCode 401', function() {
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

    it('Incorrect password : Returns statusCode 401', function() {
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
    it('User IS an Admin : Returns statusCode 200', function() {
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
describe('GET /admin : Admin NOT logged in', function() {
    it('Redirects to /login with statusCode 401', function() {
        request.get('/admin')
            .expect(401)
            .end(function(err, res){
                should(err).equal;(null);
            });
    });
});

//TEST 5
// describe('GET /admin : Admin IS logged in', function() {
//     var agent;

//     before(function (done) {
//         login.login(request, function (loginAgent) {
//             agent = loginAgent;
//             console.log("AGENT BODY: ", agent)
//             done();
//         });
//     });
    
//     it('Should allow access to /admin when logged in', function (done) {
//         var req = request.get('/admin');
//         agent.attachCookies(req)
//         console.log("REQ: ", req.cookies)
//         req.expect(200, done);
//       });
    
// });
    
   

//TEST 6
// describe('GET /admin : After login() and logout()', function() {
//     var authenticatedSession;
//     before(function(done){
//         request.post('/login')
//             .send({
//                 email: "newAdminTEST2@journeymxn.com",
//                 password: '222QWERTY'
//             })
//             .end(function(err, res){
//                 if (err) throw err;
//                 authenticatedSession = testSession;
//                 return done();
//             });
//     });
    
//     it('After Admin login : Directs to /admin with statusCode 200', function() {
//         authenticatedSession.get('/admin')
//             .expect(200)
//             .expect('Location', '/admin')
//     });

//     before(function(done){
//         request.post('/logout')
//             .send({
//                 email: "newAdminTEST2@journeymxn.com",
//                 password: '222QWERTY'
//             })
//             .end(function(err, res){
//                 if (err) throw err;
//                 authenticatedSession = testSession;
//                 return done();
//             });
//     });

//     it('After Admin logout : Directs to /login with statusCode 401', function() {
//         authenticatedSession.get('/admin')
//             .expect(401)
//             .expect('Location', '/login');
//     });
// });