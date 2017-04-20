'use strict';

exports.register = function (server, options, next) {

    const aaa = 'ciao';

    const foo = function () {

        return aaa;
    };

    server.expose({
        foo: foo
    });

    next();
};

exports.register.attributes = {
    name: 'mplug'
};

