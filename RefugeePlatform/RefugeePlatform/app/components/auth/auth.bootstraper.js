(function () {
    angular.module("auth.bootstraper", []).run(["$http",

    function ($http) {
        angular.element(document).ready(function () {

            $http.get('./resources/config.json').then(function (configData) {

                angular.module('rp.auth.shared')
                    .constant("config", configData.data);

                angular.bootstrap(document.body, ['rp.auth']);
            });
        });
    }]);
})();