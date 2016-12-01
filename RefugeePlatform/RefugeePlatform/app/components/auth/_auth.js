(function () {
    'use strict';

    angular.module("rp.auth",
        [
            // Lib
            'ui.bootstrap',

            // App
            'rp.auth.shared',

            'rp.auth.login',
            'rp.auth.inscription',
        ]);
})();