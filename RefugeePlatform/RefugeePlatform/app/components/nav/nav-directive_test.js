
(function () {
    'use strict';

    describe('Unit testing : Directive "ht-nav"', function() {
        var $compile,
            $rootScope,
            click,
            dummyHttp,
            scope, 
            directiveElem,
            callbacks = {};

        // Load the rp.app.nav module, which contains the directive
        beforeEach(module('rp.app.nav'));

        dummyHttp = {
            // replace http service
            post: function (url) { console.log("URL : " + url); }
        };

        beforeEach(module(function ($provide) {
            // provide factory, values, services and decorators
            $provide.service('rp.app.shared.http-service', function () { return dummyHttp; });
            $provide.constant('config', { sessionURL: "/test" });
        }));



        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

            scope = $rootScope.$new();
            scope.test = "test";

            directiveElem = getCompiledElement();
            click = clickElem;
        }));

        function getCompiledElement() {
            var compiledDirective = $compile(angular.element('<div data-ht-nav=""></div>'))(scope);
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
        }

        it('should replace the element with the template (replace: true)', function () {
            // Check that the$compiled element contains the templated content
            expect(directiveElem[0].nodeName.toLowerCase()).toEqual("ul");
        });

        it('should have the same number of menuNode than the viewModel', function () {
            // Check that the template contains the correct amount of <li>
            expect(directiveElem[0].children.length).toEqual(scope.vm.menu.length);

        });
        it('should call the function associated to the menu - function disconnect()', function () {
            var menu = scope.vm.menu[0],
                children = directiveElem[0].children;

            spyOn(dummyHttp, "post").and.callFake(function() {
                expect(arguments[0]).toEqual("/test");
            });

            for (var i = 0; i < children.length; i++) {
                if (children[i].innerHTML.trim() == menu.name.trim()) {
                    click(children[i]);
                    break;
                }
            }
        });

    });
    
})();
