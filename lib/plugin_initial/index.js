'use strict';

const Env = require('node-env-file');
const Hapi = require('hapi');

// my plugins
const Mplug = require('./plugin/mplug.helper.js');

Env(__dirname + './../../.env');

const server = new Hapi.Server();

server.connection({ host: process.env.HOST, port: process.env.PORT });

server.register([
    { register: Mplug, options: {} }
], (err) => {

    (err !== undefined) ? console.log(err) : null;
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {

    console.log('aaa', server.plugins.mplug.foo());

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