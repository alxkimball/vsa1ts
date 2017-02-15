// app.ts
/// reference path="../node_modules/@types/angular/index.d.ts";

((): void => {


    angular.module('app', ['ngRoute', 'hello', 'customers', 'models'])

    .config([
        '$locationProvider', '$routeProvider',
        ($locationProvider: ng.ILocationProvider, $routeProvider: any) => {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/',
                {
                    template: '<hello></hello>'
                })
                .when('/customers/',
                {
                    template: '<customers></customers>'
                })
/*
                .when('/orders/',
                {
                    template: '<orders></orders>'
                })
*/
                .otherwise({ redirectTo: '/' });
        }
    ]);

})();
