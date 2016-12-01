
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name NavbarCtrl
    * @description Directive of the navigation bar.
    */
    angular.module('rp.auth.inscription')
        .directive('htInscription',
            [htInscriptionBuilder]);

    function htInscriptionBuilder() {
        var directive = {};

        angular.extend(directive, {
            restrict: 'A', // please do not change

            replace: true,

            templateUrl: 'components/inscription/inscription.html',

            scope: {
                attrOptionnal: '=?',
                attrMandatory: "=attrName" // will look for attr-name or data-attr-name on the directive ; please use the second
            },

            link: link,

            //controller: [ // Not mandatory, only needed if functions need to be exposed
            //    '$scope',
            //    'dependency',
            //    controller
            //], 
            //controllerAs: 'ctrl',
        });

        return directive;

        //#region PRIVATE
        function link(scope, element, attrs, ctrl) {

            angular.extend(scope, {
                vm: {
                    // Build view-model properties here
                    property: "property",
                    secondProp: "property",

                    getClass: getClass,
                },
                //cmd: { ignore : in discussion

                //}
            });

            return scope;

            function getClass(condition) {
                return condition ? 'ht-nice' : 'ht-less-nice';
            }
        }
        //#endregion

        //#region PUBLIC
        //function controller($scope, dependency) {

        //}
        //#endregion
    }
})();
