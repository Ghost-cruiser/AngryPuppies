(function () {
    // Implémente la logique LogIn/LogOut
    'use strict';
    angular.module('rp.app').controller('app-controller',
        ['$http', 'rp.shared.user-service', LoginController]);

    function LoginController($http, user) {

        var ctrl = this;

        angular.extend(ctrl, {
            vm: {
                connected: user.IsConnected()
            }
        });

        return ctrl;
    }
})();