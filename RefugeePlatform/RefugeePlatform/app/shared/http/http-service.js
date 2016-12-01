(function () {
    'use strict';
    // TODO => this service is not yet implemented, functions are only example already named.

    /**
     * @ngdoc service
     * @name shared.http-service
     * @description Service used to communicate with the server with user-config provided at login.
     */
    //#region MODULE DECLARATION
    angular.module('rp.app.shared')
      .service('rp.app.shared.http-service',
        [
            '$http',
            '$q',
            '$window',
            'config',

            httpServiceBuilder,
        ]);
    //#endregion

    function httpServiceBuilder($http, $q, $window, appConfig) {
        //#region CTOR
        var service = {};

        angular.extend(service, {
            get: get,
            post: post
        });

        return service;


        //#region PUBLIC

        /**
         * @ngdoc function
         * @name get
         * @description HTTP GET with secure authentication
         * @returns Function, a promise containing the JSON data returned by the WebService
         */
        function get(url, config) {
            var deferred = $q.defer();
            $http.get(url, config)
              .success(function (data) {
                  deferred.resolve(data);
              })
              .error(function (error, status) {
                  analyzeStatus(status);
                  deferred.reject({ error: error, status: status });
              });
            return deferred.promise;
        };

        /**
        * @ngdoc function
        * @name post
        * @description HTTP POST with secure authentication
        * @returns Function, a promise containing the JSON data returned by the WebService
        */
        function post(url, datas, config) {
            var deferred = $q.defer();
            $http.post(url, datas, config)
              .success(function (data) {
                  deferred.resolve(data);
              })
              .error(function (error, status) {
                  analyzeStatus(status);
                  deferred.reject({ error: error, status: status });
              });
            return deferred.promise;
        };

        function analyzeStatus(status) {
            if (status == 401) {
                $window.location.href = appConfig.authURL + '?error="Session expirée"';
                throw "Session expired.";
            }
            if (status == 417) {
                $window.location.href = appConfig.authURL + '?error="Une erreur est survenue."';
                throw "Token missing.";
            }
        }
        //#endregion

    }
})();
