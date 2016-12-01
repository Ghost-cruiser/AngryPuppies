(function () {
    'use strict';
    // TODO => this service is not yet implemented, functions are only example already named.

    /**
     * @ngdoc service
     * @name rp.app.shared.user-service
     * @description Service used to communicate with the server with user-config provided at login.
     */
    //#region MODULE DECLARATION
    angular.module('rp.app.shared')
      .provider('rp.app.shared.user-service',
        [
            userServiceProvider,
        ]);
    //#endregion

    function userServiceProvider() {
        //#region CTOR

        var user;

        this.setUser = function (opts) {
            var errors = [];
            if (!opts.id) errors.push("Error : id missing");
            else if (!opts.username) opts.username = opts.id;

            if (!opts.score) errors.push("Error : score missing");
            if (errors.length) console.log(errors);
            user = opts;
        };

        //#endregion

        //#region Injector
        this.$get = [
            function userServiceFactory() {
                return user;
            }];
        //#endregion

    };
})();
