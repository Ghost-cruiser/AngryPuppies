//(function () {
//    'use strict';

//    describe('Unit testing : Directive "ht-main"', function () {

//        //#region SHARED 
//        var $compile,
//            $rootScope,
//            dummyGeolocation,
//            dummyAreas,
//            dummyGmapService,
//            dummyFactory,
//            callbacks = {},
//            scope,
//            directiveElem,
//            testShape,
//            areas,
//            game,
//            pos;


//            areas = [
//                {
//                    id: 1,
//                    shapeId: "rectangle",
//                    center: { lat: 43.703952, lng: 7.207574 },
//                    shape: {
//                        paths: [
//                            { lat: 43.70395200000002, lng: 7.207573999999994 },
//                            { lat: 43.69378508269109, lng: 7.207573999999994 },
//                            { lat: 43.69378508269109, lng: 7.235699000000011 },
//                            { lat: 43.70395200000002, lng: 7.235699000000011 },
//                        ]
//                    }
//                },

//                {
//                    id: 2,
//                    shapeId: "rectangle",
//                    center: { lat: -14.30001, lng: -12.66666 },
//                    shape: {
//                        paths: [
//                            { lat: -14.300009999999995, lng: -12.666660000000007 },
//                            { lat: -14.313636369950236, lng: -12.666660000000007 },
//                            { lat: -14.313636369950236, lng: -12.638535000000019 },
//                            { lat: -14.300009999999995, lng: -12.638535000000019 },
//                        ]
//                    }
//                }
//            ];

//           pos = {
//                "lat": 14.30001,
//                "lng": 12.55478
//            };

//        function getCompiledElement() {
//            var compiledDirective = $compile(angular.element('<div data-ht-main=""></div>'))(scope);
//            scope.$digest();
//            return compiledDirective;
//        };



//        dummyGeolocation = {
//            HtmlLocation: function (callback, callbackError) {
//                callbacks["success"] = callback;
//                callbacks["error"] = callbackError;
//            }
//        };

//        dummyAreas = {
//            GetAllAreas: function (callback) {
//                callbacks['areas'] = callback;
//            },
//            GetAreaGame: function (areaId, position, callback) {
//                callbacks['getAreaGame'] = { cb: callback, areaId: areaId };
//            },
//            CaptureArea: function (area, answer, callback) {
//                callbacks['captureArea'] = { cb: callback, area: area, answer:answer };
//            },
//            BuildAreaVertices: function (area, callback) {
//                callback(area);
//            }
//        };

//        dummyGmapService = {
//            LoadApi: function () { return { then: function (success, error) { success(); } } },
//            IsPointInShape: function (shapeId, vertices, point) {
//                return testShape;
//            }
//        };

//        dummyFactory = function (area) {
//            var innerstate = "ask";
//            game = {
//                setState: function (state) {
//                    innerstate = state;
//                },
//                getState: function () {
//                    return innerstate;
//                },
//                start: function () {
//                    innerstate = "running";
//                },
//            }
//            return game;
//        }
//        //#endregion

//        // #region INJECTION
//        beforeEach(module('rp.app.main'));

//        // #region Modules dependencies
//        angular.mock.module('rp.app.main.areas', []);
//        angular.mock.module('rp.app.main.geolocation', []);
//        angular.mock.module('rp.app.main.gmap', []);
//        angular.mock.module('rp.app.main.game', []);
//        //#endregion

//        beforeEach(module('rp.app.main', function ($provide) {

//            $provide.decorator('rp.app.main.geolocation.geolocation-service', function () { return dummyGeolocation; });
//            $provide.factory('rp.app.main.areas.areas-service', function () { return dummyAreas; });
//            $provide.factory('rp.app.main.gmap.gmap-service', function () { return dummyGmapService; });
//            $provide.factory('rp.app.main.game.game-factory', function () { return dummyFactory; });

//            // Mocking nested directive 'ht-gmap'
//            $provide.factory('htGmapDirective', function () {
//                return {
//                    template: '<div>SUCCESS</div>',
//                    replace: false
//                };
//            }); $provide.factory('htGameDirective', function () {
//                return {
//                    template: '<div>SUCCESS</div>',
//                    replace: false
//                };
//            });
            
//            $provide.decorator('$interval',function(){ 
//                return function (fn, time, truc, turc, callbackSucc, callbackErr) {
//                    fn(callbackSucc, callbackErr);

//                    window.setInterval(fn(callbackSucc, callbackErr), 1000);

//                    window.setInterval(fn(callbackSucc, callbackErr), 1000);

//                }
//            });
//        }));

//        beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
//            // IMPORTANT : to put before every test implying app.shared
//            var $httpBackend = _$httpBackend_,
//                configRequestHandler = $httpBackend.when('GET', './resources/config.json')
//                                   .respond({/*conf URL*/ });

//            $compile = _$compile_;
//            $rootScope = _$rootScope_;

//            scope = $rootScope.$new();
//            directiveElem = getCompiledElement();
//        }));
//        //#endregion

//        //#region TESTS

//        //#region Geolocation
//        it('should replace the element with the template (replace: true)', function () {
//            // Check that the$compiled element contains the templated content
//            expect(directiveElem[0].getAttribute("id")).toEqual("geoc-main");
//        });

//        it('should handle unsupported geolocation error (scope: -handleError)', function () {
//            var options = {
//                "status": "UnsupportedFeature",
//                "message": 'Error: Your browser does not support geolocation.'
//            };

//            // Use decorator's filled callback object 
//            callbacks.error(options);

//           scope.$apply();

//            var errorElement = directiveElem[0].firstElementChild;
//            // Check that the template contains the correct <div>
//            expect(errorElement.getAttribute('id')).toEqual("error-message");

//            // Check that the class is correctly set by the function getErrorClassName();
//            expect(errorElement.getAttribute("class")).toContain("error-only");

//            // Check if the supposed error container has the message provided
//            expect(errorElement.innerHTML).toContain(options.message);
//        });

//        it('should handle geolocation error at connection (scope: -handleError)', function () {
//            var options = {
//                "status": "UnsupportedFeature",
//                "message": 'Error: Geolocation was lost.'
//            };

//            // Use decorator's filled callback object 
//            callbacks.error(options);

//           scope.$apply();

//            var errorElement = directiveElem[0].firstElementChild;
//            // Check that the template contains the correct <div>
//            expect(errorElement.getAttribute('id')).toEqual("error-message");

//            // Check that the class is correctly set by the function getErrorClassName();
//            expect(errorElement.getAttribute("class")).toContain("error-only");

//            // Check if the supposed error container has the message provided
//            expect(errorElement.innerHTML).toContain(options.message);
//        });

//        it('should handle successfull geolocation (scope: -updateLocation)', function () {

//            callbacks.success(pos);

//            scope.$apply();

//            // Check that the property UserLocation was updated
//            expect(scope.vm.userLocation).toEqual(pos);

//            // Check that the compiled element contains now the "map" element
//            expect(directiveElem[0].firstElementChild.getAttribute("id")).toEqual("map");

//            // Check that function checking for an area entered was called
//            expect(directiveElem[0].firstElementChild.getAttribute("id")).toEqual("map");
//        });

//        it('should handle error after successfull geolocation  (scope: -handleError)', function () {

//            callbacks.success(pos);

//            scope.$apply();

//            // Check if success

//            var options = {
//                "status": "UnsupportedFeature",
//                "message": 'Error: Geolocation was lost.'
//            };

//            callbacks.error(options);

//            scope.$apply();

//            // Check that the compiled element contains the templated content
//            var errorElement = directiveElem[0].lastElementChild,
//                element = directiveElem[0].firstElementChild;

//            // Check that the template contains the correct <div>
//            expect(errorElement.getAttribute('id')).toEqual("error-message");

//            // Check that the class is correctly set by the function getErrorClassName();
//            expect(errorElement.getAttribute("class")).toContain("error-over-map");

//            // Check if the supposed error container has the message provided
//            expect(errorElement.innerHTML).toContain(options.message);

//            // Check that the compiled element contains now the "map" element
//            expect(element.getAttribute("id")).toEqual("map");
//        });
//        //#endregion

//        //#region Game
//        it('should prompt the game when entering an area (scope: -updateLocation, -promptGame)', function () {
//            testShape = true;
//            callbacks.areas(areas);

//            callbacks.success(pos);

//            // Check that the game is correctly defined
//            expect(scope.vm.game).toBeDefined();
//            expect(scope.vm.game.load).toBeDefined();
//            // Check that the prompt is displayed
//            expect(directiveElem[0].querySelector("#game")).toBeDefined();
//        });

//        it('should load the game when user chooses it (-promptGame.load)', function () {
//            testShape = true;
            
//            callbacks.areas(areas);

//            callbacks.success(pos);
//            scope.vm.game.load();

//             //Check that the function getAreaGame was called
//            expect(callbacks.getAreaGame.cb).toBeDefined();
//            expect(callbacks.getAreaGame.areaId).toEqual(1);

//            callbacks.getAreaGame.cb({ prop: "test" });
//            // Check that the game datas are correctly loaded
//            expect(scope.vm.game.validate).toBeDefined();
//            expect(scope.vm.game.prop).toEqual("test");
//            expect(scope.vm.game.getState()).toEqual("running");
//        });

//        it('should check if leaving the area once inside (scope: AlreadyInArea)', function () {
//            // Will detect the area as entered
//            testShape = true;
//            callbacks.areas(areas);

//            callbacks.success(pos);
//            scope.vm.game.load();
//            callbacks.getAreaGame.cb({});
//            expect(scope.AlreadyInArea).toEqual(scope.vm.visibleAreas[0]);

//            var newPos = { // new position to trigger a change
//                "lat": 44.30001,
//                "lng": 42.55478
//            }; 
//            testShape = false; // Will detect the area as left 

//            callbacks.success(newPos);

//            // Check that the enteredArea was clean
//            expect(scope.AlreadyInArea).toEqual(null);

//        });

//        it('should try to validate the game when the it launches the function (scope: -promptGame.validate)', function () {
//            testShape = true;
//            callbacks.areas(areas);

//            callbacks.success(pos);
//            scope.vm.game.load();
//            callbacks.getAreaGame.cb({});
//            scope.vm.game.validate();

//            // Check that the captureArea method was correctly called
//            expect(callbacks.captureArea.cb).toBeDefined();
//            expect(callbacks.captureArea.answer).toEqual({ content: scope.vm.userLocation });
//            expect(callbacks.captureArea.area).toEqual(scope.AlreadyInArea);
//        });

//        it('should destroy the game viewport when game is finished', function () {
//            testShape = true;
//            callbacks.areas(areas);
//            callbacks.success(pos);
//            scope.vm.game.load();
//            callbacks.getAreaGame.cb({});
//            scope.vm.game.validate();
//            scope.vm.game = null;

//            // Check that the game viewport is no longer displayed
//            scope.$apply();
//            expect(directiveElem[0].querySelector("#game")).toEqual(null);
//        });
//        //#endregion

//        //#region SPRINT 1
//        it('should load all areas on initialization (scope: -loadAreas)', function () {

//            // Check that the template contains the correct <div>
//            expect(callbacks.areas).toBeDefined();

//            if (callbacks.areas) {

//                callbacks.areas(areas);

//                // Check that the visibleAreas have been filled properly
//                expect(scope.vm.visibleAreas.length).toEqual(areas.length);

//                // Check that scope.areas have been filled properly
//                expect(scope.areas.length).toEqual(areas.length);
//            }
//        });
//        //#endregion

//        //#endregion
//    });
    
//})();
