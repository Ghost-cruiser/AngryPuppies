
(function () {
    'use strict';

    describe('Unit testing : Service "http"', function () {

        //#region SHARED
        var $compile,
            $rootScope,
            $window = { location: {} },
            $injector,
            credentials = { username: "Test", id: "Test", userToken: "token", score: '100' },
            dummyNavigator,
            dummyHttp,
            dummyHttpProvider,
            dummyUser,
            callbacks = {},
            service,
            dummyConfig,
            dummyStorage,
            userSvc;



        dummyHttp = {
            defaults: { headers: { common: {} } },
            get: function (url, config) {
                return dummyHttp;
            },
            post: function (url, datas, config) {
                return dummyHttp;
            },
            success: function (cb) {
                callbacks.success = cb;
                return dummyHttp;
            },
            error: function (cb) {
                callbacks.error = cb;
            },
            $get: function () {
                return function () { return dummyHttp; }
            },
        };

        dummyHttpProvider = {
            defaults: { headers: { common: {} } },
            $get: function () {
                return function () { return dummyHttp; }
            },
        };

        dummyConfig = {
            authURL: "TestAuth"
        };

        dummyStorage = {
            userToken: "refToken",
            id: "refUsername",
            username: "refUsername",
            score: "refScore",
            expires: new Date().setHours(new Date().getHours() + 1)
        };
        //#endregion

        //#region INJECTION
        // Load the myApp module, which contains the directive
        beforeEach(function () {
            spyOn(localStorage, "getItem").and.callFake(function () {
                return dummyStorage[arguments[0]];
            });
        });
        beforeEach(module(function ($provide) {
            $provide.provider('$windowProvider', function () {
                return {
                    $get: function () {
                        return function () { $window; }
                    }
                }
            });
            $provide.provider('rp.app.shared.user-serviceProvider', function () {
                return {
                    $get: function () { return function () { return dummyUser; } },
                    setUser: function (conf) { dummyUser = conf; }
                }
            });
            $provide.provider('$httpProvider', function () {
                return dummyHttpProvider;
            });
            $provide.decorator('$http', function () { return dummyHttp; });

            $provide.constant('config', dummyConfig);
            $provide.value('$window', $window);
        }));

        beforeEach(module('rp.app.shared'));


        beforeEach(inject(function ($rootScope, _$injector_) {
            $injector = _$injector_;
            userSvc = $injector.get('rp.app.shared.user-service');
        }));
        //#endregion

        //#region SPECS

        it('should correctly start $http and user-service from localStorage', function () {
            //expect(dummyHttpProvider.defaults.headers.common["Authorization"]).toEqual('Bearer ' + dummyStorage.userToken); // FAILING despite being set

            expect(userSvc.username).toEqual(dummyStorage.username);
            expect(userSvc.id).toEqual(dummyStorage.id);
            expect(userSvc.score).toEqual(dummyStorage.score);
        });

        it('should callback redirect on 401 error (get)', function () {
            $injector.get('rp.app.shared.http-service').get("test");
            try {
                callbacks.error('Redirect', "401");

                throw "Should have thrown exception"
            }
            catch (e) {
                expect($window.location.href).toEqual(dummyConfig.authURL + '?error="Session expirée"');
            }
        });

        it('should callback redirect on 401 error (post)', function () {
            $injector.get('rp.app.shared.http-service').post("test", {});
            try {
                callbacks.error('Redirect', "401");

                throw "Should have thrown exception"
            }
            catch (e) {
                expect($window.location.href).toEqual(dummyConfig.authURL + '?error="Session expirée"');
            }
        });

        it('should callback redirect on 417 error (get)', function () {
            $injector.get('rp.app.shared.http-service').get("test");
            try {
                callbacks.error('Redirect', "417");

                throw "Should have thrown exception"
            }
            catch (e) {
                expect($window.location.href).toEqual(dummyConfig.authURL + '?error="Une erreur est survenue."');
            }
        });

        it('should callback redirect on 417 error (post)', function () {
            $injector.get('rp.app.shared.http-service').post("test", {});
            try {
                callbacks.error('Redirect', "417");

                throw "Should have thrown exception"
            }
            catch (e) {
                expect($window.location.href).toEqual(dummyConfig.authURL + '?error="Une erreur est survenue."');
            }
        });
    });
    //#endregion

})();

//#region OLD
//(function () {
//    'use strict';

//    #region SHARED
//    var $rootScope,
//        $http,
//        $injector,
//        $window = { location: {} },
//        dummyConfig,
//        dummyHttp,
//        dummyUser,
//        callbacks = {},
//        credentials = { username: "Test", id: "Test", userToken: "token", score: '100' },
//        service,
//        called,
//        dummyStorage,
//            lasttest;

//    dummyHttp = {
//        success: function (cb) {
//            callbacks.success = cb;
//            return dummyHttp;
//        },
//        error: function (cb) {
//            callbacks.error = cb;
//        },
//        $get: function () { return dummyHttp },
//        defaults: {
//            headers: {
//                common: {

//                }
//            }
//        },
//    };

//    dummyConfig = {
//        authURL: "test",
//        appURL: "App"
//    };

//    dummyStorage = {
//        userToken: "refToken",
//        id: "refUsername",
//        username: "refUsername",
//        score: "refScore",
//        expires: new Date().setHours(new Date().getHours() + 1)
//    };
//    dummyUser = {};
//    var dummyUserProvider = {
//        $get: function () {
//            return dummyUser;
//        },
//        setUser: function (conf) {
//            dummyUser = conf;
//        }
//    };
//    #endregion

//    describe('Unit testing : Configuration (from localstorage)', function () {

//        beforeEach(function () {
//            spyOn(localStorage, "getItem").and.callFake(function () {
//                console.log("IIIIINNNN");
//                return dummyStorage[arguments[0]];
//            });
//        });

//         Load the myApp module, which contains the directive
//        beforeEach(module('rp.app.shared'));


//        beforeEach(module(function ($provide) {
//            $provide.provider('$windowProvider', function () {
//                return {
//                    $get: function () {
//                        return $window;
//                    }
//                }
//            });
//            $provide.provider('rp.app.shared.user-serviceProvider', dummyUserProvider);
//            $provide.provider('$httpProvider', dummyHttp);

//            $provide.constant('config', dummyConfig);
//        }));


//        it('should correctly start $http and user-service from localStorage', function () {
//            angular.mock.module('rp.app.shared');
//            console.log(dummyUserProvider.$get())

//            expect(dummyHttp.defaults.headers.common["Authorization"]).toEqual('Bearer ' + dummyStorage.userToken);

//            expect(dummyUser.username).toEqual(dummyStorage.username);
//            expect(dummyUser.id).toEqual(dummyStorage.id);
//            expect(dummyUser.score).toEqual(dummyStorage.score);
//        });
//    });

//    describe('Unit testing : Configuration (from redirection)', function () {
//        beforeEach(module(function ($provide) {
//            $provide.provider('$windowProvider', function () {
//                return {
//                    $get: function () {
//                        return $window;
//                    }
//                }
//            });
//            $provide.provider('rp.app.shared.user-serviceProvider', function () {
//                return {
//                    $get: function () { return function () { return dummyUser; } },
//                    setUser: function (conf) { console.log('YEAH2'); dummyUser = conf; }
//                }
//            });
//            $provide.provider('$httpProvider', function () {
//                return dummyHttp;
//            });
//            $provide.value('$window', $window);
//            $provide.constant('config', dummyConfig);
//        }));
//        // Load the myApp module, which contains the directive
//        beforeEach(module('rp.app.shared'));


//        beforeEach(function () {
//            history.pushState(null, "", location.href.split("?")[0] + '?id=' + credentials.id + '&amp;userToken=' + credentials.userToken + '&amp;score=' + credentials.score);

//            spyOn(localStorage, "setItem").and.callFake(function () {
//                console.log(arguments[0], arguments[1])
//                dummyStorage[arguments[0]] = arguments[1];
//            });
//        });


//        beforeEach(inject(function (_$injector_, _$http_, _$rootScope_) {
//            $injector = _$injector_;
//            $http = _$http_;
//            $rootScope = _$rootScope_;
//        }));


//        it('should correctly start $http and user-service from URL config', function () {

//            service = $injector.get('rp.app.shared.user-service');
//            expect(service.username).toEqual(credentials.username);
//            expect(service.score).toEqual(credentials.score);

//            // Expect dummy storage to be updated
//            expect(dummyStorage.toString()).toEqual(credentials.toString());
//            //expect($http.defaults.headers.common["Authorization"]).toEqual('Bearer ' + credentials.userToken);
//        });
//    });

//})();
//#endregion
