
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name ht-nav
    * @description Directive of the navigation bar.
    */
    angular.module('rp.app.nav')
        .directive('htNav',
            [
                'config',
                'rp.app.shared.http-service',

                htNavBuilder
            ]);

    function htNavBuilder(config, http) {
        var directive = {};

        angular.extend(directive, {
            restrict: 'A', // please do not change

            replace: true,

            templateUrl: 'components/nav/nav.html',

            scope: false,

            link: link,
        });

        return directive;

        function link(scope, element, attrs, ctrl) {

            angular.extend(scope, {
                vm: {
                    // Build view-model properties here
                    menu: buildMenu()
                },
            });

            return scope;

            //#region PRIVATE
            function buildMenu() {
                return [
                    menuItem("Deconnexion", disconnect)
                ];

                function menuItem(name, action) {
                    return { name: name, action: action };
                }
            }

            function disconnect() {
                http.post(config.sessionURL);
            }
            //#endregion
        }

        //#region PUBLIC
        //function controller($scope, dependency) {

        //}
        //#endregion
    }
})();
