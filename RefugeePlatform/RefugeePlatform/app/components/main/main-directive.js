
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name htMain
    * @description Main directive of the app.
    */
    angular.module('rp.app.main')
        .directive('htMain',
            [
                htMainBuilder
            ]);

    function htMainBuilder($interval) {
        var directive = {};

        angular.extend(directive, {
            restrict: 'A', // please do not change

            replace: true,

            templateUrl: 'app/components/main/main.html',

            scope: false,

            link: link,
        });

        return directive;

        //#region PRIVATE
        function link(scope, element, attrs, ctrl) {

            angular.extend(scope, {
                vm: {
                },
            });

            return scope;

        }
        //#endregion
    }
})();
