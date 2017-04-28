'use strict';

// try different combinations:
// activated the pre and deactivate the takeover in the handler
// viceversa
// etc
// the onPostHandler always runs

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ host: '127.0.0.1', port: '1337' });

server.route({
  method: 'GET',
  path: '/hello',
  config: {
    pre: [
      {
        method: (request, reply) => {
          if (1 === 1) {
            return reply({a: 'b1'}).takeover();
          } else {
            return reply({ a: 'b' });
          }
        },
        assign: 'foo'
      }
    ],
    handler: function (request, reply) {

      console.log('request.pre.foo', request.pre.foo);

      if (1 === 2) {
        return reply({ a: 'b' });
      } else {
        return reply().continue(); //.takeover();
      }

      // return reply.continue();
    }
  }
});

server.ext('onPostHandler', function (request, reply) {
  console.log('onPostHandler...');

  return reply.continue();
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
