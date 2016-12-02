(function () {
    'use strict';
    // Eventually, add a try & catch here 
    // to catch absence of ui.bootstrap 
    // and launch without it
    angular.module("rp.app",
        [
            // Native
            //'ngRoute',    // in discussion
            //'ngCookies', // likely

            'ngMaterial',

            // App
            'rp.app.shared',

            'rp.app.nav',
            'rp.app.profile',
            'rp.app.main',
        ]);
})();





