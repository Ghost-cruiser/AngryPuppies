(function () {
    'use strict';

    angular.module("rp.auth").config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
})();