
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name ht-profile
    * @description Directive for the user's profile.
    */
    angular.module('rp.app.profile')
        .directive('htProfile',
            [
                'rp.app.shared.user-service',
                'rp.app.shared.http-service',

                htNavBuilder
            ]);

    function htNavBuilder(user, http) {
        var directive = {};

        angular.extend(directive, {
            restrict: 'A', // please do not change

            replace: false,

            templateUrl: 'app/components/profile/profile.html',

            scope: false,

            link: link,
        });

        return directive;

        //#region LINK
        function link(scope, element, attrs, ctrl) {

            angular.extend(scope, {
                vm: {
                    // Build view-model properties here
                    username: user.username,
                    score: user.score,
                },
            });

            return scope;
        }
        //#endregion
    }
})();
