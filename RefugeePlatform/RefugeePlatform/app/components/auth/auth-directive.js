
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name htMain
    * @description Main directive of the app.
    */
    angular.module('rp.app.auth')
        .directive('htMain',
            [
                htAuthBuilder
            ]);

    function htAuthBuilder($interval) {
        var directive = {};

        angular.extend(directive, {
            restrict: 'A', // please do not change

            replace: true,

            templateUrl: 'app/components/auth/auth.html',

            scope: false,

            link: link,
        });

        return directive;

        //#region PRIVATE
        function link(scope, element, attrs, ctrl) {

            angular.extend(scope, {
                vm: {
                    login: true,

                },
            });

            return scope;

        }
        //#endregion
    }
})();
