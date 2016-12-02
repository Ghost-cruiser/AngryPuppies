(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name ht-login
    * @description Directive for logging in.
    */
    angular.module('rp.auth.login')
        .directive('htLogin',
            [
                '$location',
                'md5',
                'rp.auth.shared.authentication-service',

                htLoginBuilder
            ]);

    function htLoginBuilder($location, md5, http) {
        var directive = {};

        angular.extend(directive, {
            restrict: 'A', // please do not change

            replace: true,

            templateUrl: 'app/components/login/login.html',

            scope: false,

            link: link,
        });

        return directive;



        //#region LINK
        function link(scope, element, attrs, ctrl) {
            angular.extend(scope, {
                vm: {
                    username: "",
                    password: "",
                    login: login
                },

            });

            var error = $location.search()["error"];

            if (error)
                scope.vm.error = error;

            return scope;

            //#region PUBLIC
            /**
            * @ngdoc function
            * @name login
            * @description Hash the password then try to login through authentication-service
            */
            function login() {
                http.tryLogin({
                    username: scope.vm.username,
                    password: md5.createHash(scope.vm.password)
                }, handleConnectionError);
                
            }
            //#endregion
            //#region PRIVATE
            /**
            * @ngdoc function
            * @name handleConnectionError
            * @description Handles the error when login failed
            */
            function handleConnectionError(error) {
                scope.vm.error = error;
            }
            //#endregion
        }
        //#endregion
    }
})();