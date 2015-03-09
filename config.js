requirejs.config({
    "paths": {
        "jquery": "lib/jquery-2.1.3.min",
        "bootstrap": "lib/bootstrap.3.3.2.min"
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: "bootstrap"
        }
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});

require(['renderer'], function() {});