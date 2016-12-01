
(function () {
    'use strict';

    describe('Unit testing : Directive "ht-login"', function () {
        //#region SHARED
        var $compile,
            $rootScope,
            click,
            dummyAuthSvc,
            dummyMd5,
            scope,
            directiveElem,
            callbacks = {},
            dummyLocation,
            urlError = {};

        
        dummyAuthSvc = {
            tryLogin: function(dataForm, callbackError){
                dummyAuthSvc.lastCred = dataForm;
                dummyAuthSvc.cbError = callbackError;
            }
        };

        dummyMd5 = {
            createHash: function (stuff) {
                return "Hashed";
            }
        };
        dummyLocation = {
            search: function () {
                return urlError;
            }
        }
        //#endregion

        //#region INJECT
        // Load the rp.app.nav module, which contains the directive
        beforeEach(module('rp.auth.login'));


        angular.module('rp.auth.shared', []);
        angular.module('angular-md5', []);

        beforeEach(module(function ($provide) {
            //    // provide factory, values, services and decorators
            $provide.factory('$location', function () { return dummyLocation; });
            $provide.factory('md5', function () { return dummyMd5; });
            $provide.factory('rp.auth.shared.authentication-service', function () { return dummyAuthSvc; });
        }));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

            scope = $rootScope.$new();

            directiveElem = getCompiledElement();
        }));

        function getCompiledElement() {
            var compiledDirective = $compile(angular.element('<div data-ht-login=""></div>'))(scope);
            scope.$digest();
            return compiledDirective;
        };


        function clickElem(el) {
            var ev = document.createEvent("MouseEvent");
            ev.initMouseEvent(
                "click",
                true /* bubble */, true /* cancelable */,
                window, null,
                0, 0, 0, 0, /* coordinates */
                false, false, false, false, /* modifier keys */
                0 /*left*/, null
            );
            el.dispatchEvent(ev);
        };
        //#endregion

        //#region INJECT
        it('should replace the content with the template (replace: true)', function () {
            // Check that the$compiled element contains the templated content
            expect(directiveElem[0].getAttribute("id")).toEqual("login-container");
        });

        it('should correctly try to hash then send the password with the usernamme when login button is clicked (scope: vm, login)', function () {
            directiveElem[0].querySelector('input[name="username"]').innerHTML = "Test";
            directiveElem[0].querySelector('input[name="password"]').innerHTML = "PassTest";

            scope.$digest();

            // Click the login button through the class btn (bootstrap)
            clickElem(directiveElem[0].querySelector(".btn"));

            // Check that the provided credentials were correctly hashed (password) and passed
            expect(dummyAuthSvc.lastCred.toString()).toEqual({ username: scope.vm.username, password: "Hashed" }.toString());

        });

        it('should handle and display the error when trying to login has failed (scope: vm)', function () {
            directiveElem[0].querySelector('input[name="username"]').innerHTML = "Test";
            directiveElem[0].querySelector('input[name="password"]').innerHTML = "PassTest";

            scope.$digest();

            var error = "Wrong password or username."

            // Click the login button through the class btn (bootstrap)
            clickElem(directiveElem[0].querySelector(".btn"));

            dummyAuthSvc.cbError(error);

            scope.$digest();

            // Check that the error is up to date in scope
            expect(scope.vm.error).toEqual(error);

            // Check that the error is displayed (WARN : element is supposed to be last)
            expect(directiveElem[0].lastElementChild.innerHTML).toEqual(error);

        });
        it('should display error from the URL (scope: vm.error)', function () {
            urlError = { error: "testing error" };

            var elem = getCompiledElement();

            expect(elem[0].lastElementChild.innerHTML).toEqual(urlError.error);

        });
        //#endregion
    });
    
})();
