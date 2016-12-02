(function () {
    'use strict';

    angular.module("rp.auth",
        [

            // App
            'rp.auth.shared',

            'rp.auth.login',
            'rp.auth.inscription',
        ]);
})();