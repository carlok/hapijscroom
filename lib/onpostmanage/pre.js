'use strict';

const Boom = require('boom');
const Env = require('node-env-file');
const Hapi = require('hapi');

Env(__dirname + './../../.env');

const server = new Hapi.Server();

server.connection({ host: process.env.HOST, port: process.env.PORT });



// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  config: {
    pre: [
      {
        method: function (request, reply) {
          if (1 === 2) {
            return reply({ a: 'b' });
          } else {
            // throw new Error();
            //return reply(Boom.badRequest('my boom')).takeover();
            return reply(); // .takeover();
          }
        },
        assign: 'foo'
      }
    ],
    handler: function (request, reply) {

      console.log('request.pre.foo', request.pre.foo);

      // how it works with onPost AND error on handler...
      reply.continue();

    }
  }
});

server.ext('onPostHandler', function (request, reply) {
  console.log('onPostHandler...');

  return reply.continue();
});

// Start the server
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
