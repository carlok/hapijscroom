// references:
// https://github.com/dwyl/hapi-auth-jwt2
// https://github.com/dwyl/hapi-auth-jwt2/issues/222

// testing a not restricted route:
// http -j --verbose GET http://macone:8000/users/public

// testing a restricted route without a valid token:
// http -j --verbose GET http://macone:8000/users/restricted

// testing a restricted route with a valid token:
// (note the ":" at the end of the token)
// http --auth-type=jwt \
// --auth='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A:' \
// -j --verbose http://localhost:8000/users/restricted

const Hapi = require('hapi');

const people = { // our "users database"
    1: {
        id: 1,
        name: 'Jen Jones'
    }
};

// bring your own validation function
const validate = function (decoded, request, callback) {

    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
        return callback(null, false);
    }
    else {
        return callback(null, true);
    }
};

const server = new Hapi.Server();
server.connection({ port: 8000 });

// *** *** ***

const Users = exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/public',
            config: { auth: false },
            handler: function (request, reply) {
                reply({ text: 'Token not required' });
            }
        },
        {
            method: 'GET',
            path: '/restricted',
            handler: function (request, reply) {
                reply({ text: 'You used a Token!' })
                    .header('Authorization', request.headers.authorization);
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'users'
};

// *** *** ***

// include our module here ↓↓
server.register([
    require('hapi-auth-jwt2')
], function (err) {

    if (err) {
        console.log(err);
    }

    server.auth.strategy('jwt', 'jwt', true, {
        // so with the previous "true", JWT auth is required for all routes by default
        key: 'NeverShareYourSecret',
        validateFunc: validate,
        verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] }
    });

});

server.register([
    { register: Users, options: {}, routes: { prefix: '/users' } }
], (err) => {

    (err !== undefined) ? console.log(err) : null;
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
