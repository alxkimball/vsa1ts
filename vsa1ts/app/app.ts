// app.ts

((): void => {

    angular.module('vendor',
        [
            'ngRoute',
            'ngMaterial'
        ]);

    angular.module('nwind',
        [
            'hello',
            'customers',
            'models',
            'services'
        ]
    );

    angular.module('app',
        [
            'vendor',
            'nwind'
        ])

    .config([
        '$locationProvider', '$routeProvider',($locationProvider, $routeProvider) => {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/',
                {
                    template: '<hello></hello>'
                })
                .when('/customers',
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
