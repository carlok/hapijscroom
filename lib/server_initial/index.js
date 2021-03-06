'use strict';

const Env = require('node-env-file');
const Hapi = require('hapi');

Env(__dirname + './../../.env');

const server = new Hapi.Server();

server.connection({ host: process.env.HOST, port: process.env.PORT });

/*const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});*/

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {

    return reply({a: 'b'});
  }
});

// Start the server
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});