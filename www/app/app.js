(function () {
    "use strict";
    var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });

    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "/app/menu/menu.html",
            controller: 'menuController'
        })

        .state('app.test', {
            url: "/test",
            views: {
                'menuContent': {
                    templateUrl: "/app/test/test.html",
                    controller: 'testController'
                }
            }
        })
            
        .state('app.cubs', {
            url: "/cubs",
            views: {
                'menuContent': {
                    templateUrl: "/app/cubs/cubs.html",
                    controller: 'cubsController'
                }
            }
        })

        .state('app.cub', {
            url: "/cubs/:cubid",
            views: {
                'menuContent': {
                    templateUrl: "/app/cubs/cub.html",
                    controller: 'cubController'
                }
            }
        })

        .state('app.sixes', {
            url: "/sixes",
            views: {
                'menuContent': {
                    templateUrl: "/app/sixes/sixes.html",
                    controller: 'sixesController'
                }
            }
        })

        .state('app.six', {
            url: "/sixes/:sixid",
            views: {
                'menuContent': {
                    templateUrl: "/app/sixes/six.html",
                    controller: 'sixController'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/test');
    });

}());








