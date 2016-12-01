
(function () {
    'use strict';

    describe('Unit testing : Directive "ht-profile"', function() {
        var $compile,
            $rootScope,
            click,
            dummyHttp,
            dummyUser,
            callbacks = {};

        // Load the rp.app.nav module, which contains the directive
        beforeEach(module('rp.app.profile'));

        dummyHttp = {
            // replace http service
        };

        dummyUser = {
            id: 1,
            username: "Jean",
            score: 1337,
        };

        beforeEach(module(function ($provide) {
            //    // provide factory, values, services and decorators
            $provide.service('rp.app.shared.user-service', function () { return dummyUser; });
            $provide.service('rp.app.shared.http-service', function () { return dummyHttp; });
        }));


        var scope, directiveElem;
        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

            scope = $rootScope.$new();

            directiveElem = getCompiledElement();
        }));

        function getCompiledElement() {
            var compiledDirective = $compile(angular.element('<div id="test" data-ht-profile=""></div>'))(scope);
            scope.$digest();
            return compiledDirective;
        };

        it('should set the content of the element with the template (replace: false)', function () {
            // Check that the$compiled element contains the templated content
            expect(directiveElem[0].getAttribute("id")).toEqual("test");
            expect(directiveElem[0].firstElementChild).not.toEqual(undefined);
        });

        it('should correctly interpret the name and the score (scope: vm)', function () {
            var isolatedScope = directiveElem.isolateScope();
            // Check that the template contains the correct values
            expect(directiveElem[0].querySelector("#user-name").innerHTML).toEqual(scope.vm.username);
            expect(directiveElem[0].querySelector("#user-score").innerHTML).toEqual(scope.vm.score.toString());

        });

        it('should bind once except for the score (scope: vm)', function () {

            scope.vm.username = "not changed";
            scope.vm.score = 684435;

            scope.$digest();

            // Check that the template contains the correct values
            expect(directiveElem[0].querySelector("#user-name").innerHTML).not.toEqual(scope.vm.username);
            expect(directiveElem[0].querySelector("#user-score").innerHTML).toEqual(scope.vm.score.toString());

        });

    });
    
})();
