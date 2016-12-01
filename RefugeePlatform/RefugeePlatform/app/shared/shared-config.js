(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name shared.http-service
     * @description Service used to communicate with the server with user-config provided at login.
     */
    //#region MODULE DECLARATION
    angular.module('rp.app.shared')
      .config(
        [
            'rp.app.shared.user-serviceProvider',
            '$httpProvider',
            '$windowProvider',
            'config',

            userConfigBuilder,
        ]);
    //#endregion

    function userConfigBuilder(userProvider, $httpProvider, $windowProvider, config) {

        //#region CTOR
        var params = searchURL(),
            userConfig = {};

        if (!params) {
            var expires = localStorage.getItem("expires");

            if (!expires || new Date(expires) < new Date()) {
                var $window = $windowProvider.$get();
                $window.location = config.authURL;
                throw "Session ended";
            }
            else {
                $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("userToken");
                userConfig.score = localStorage.getItem("score"),
                userConfig.username = localStorage.getItem("username");
                userConfig.id = localStorage.getItem("id");
            }
        }
        else {
            angular.forEach(params, function (value, key) {
                if (key != "userToken") {
                    userConfig[key] = value;
                } else {
                    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + value;
                };

                localStorage.setItem(key, value);
            });
            var expires = new Date();
            localStorage.setItem("expires", expires.setHours(expires.getHours() + 1));
            searchURL({}); //erase 
        }

        userProvider.setUser(userConfig);

        return;
        //#endregion

        //#region PRIVATE

        /**
         * @ngdoc function
         * @name loadJSON
         * @description retrieve a json file local repository
         * @returns Function, a promise containing the data from the .json file
         */
        function searchURL(clean) {
            if (!clean) {
                var parsed = location.search.replace("?", "").split("&amp;"),
                    params = {};
                if (parsed.length && parsed[0]) {
                    angular.forEach(parsed, function (value) {
                        var valueKey = value.split("=");

                        params[valueKey[0]] = valueKey[1];
                    })

                    return params;
                }
                return null
            }
            else {
                history.pushState(null, "", location.href.split("?")[0]);
            }
        }
        //#endregion
    };
})();
