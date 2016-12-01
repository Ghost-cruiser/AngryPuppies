(function () {
    angular.module("app.bootstraper", []).run(["$http",

    function ($http) {
        angular.element(document).ready(function () {

            $http.get('./resources/config.json').then(function (configData) {

                angular.module('rp.app.shared')
                    .constant("config", configData.data);

                angular.bootstrap(document.body, ['rp.app']);
            });
        });
    }]);
})();