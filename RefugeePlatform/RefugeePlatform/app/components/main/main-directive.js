
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
                '$interval',
                'rp.app.main.geolocation.geolocation-service',
                'rp.app.main.areas.areas-service',
                'rp.app.main.gmap.gmap-service',
                'rp.app.main.game.game-factory',
                htMainBuilder
            ]);

    function htMainBuilder($interval, geolocation, areasSvc, gmapSvc, Game) {
        var directive = {};

        angular.extend(directive, {
            restrict: 'A', // please do not change

            replace: true,

            templateUrl: 'components/main/main.html',

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
