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
            'orders',
            'services'
        ]);

    angular.module('app',
        [
            'vendor',
            'nwind'
        ])
        .config([
            '$locationProvider', '$routeProvider', ($locationProvider, $routeProvider) => {
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
        ])
        .config(['$mdThemingProvider', ($mdThemingProvider) => {
            $mdThemingProvider.definePalette('ternaderblue', {
                '50': 'e9f1f1',
                '100': 'c7dddc',
                '200': 'a2c7c5',
                '300': '7db0ae',
                '400': '619f9c',
                '500': '458e8b',
                '600': '3e8683',
                '700': '367b78',
                '800': '2e716e',
                '900': '1f5f5b',
                'A100': '9ffff9',
                'A200': '6cfff5',
                'A400': '39fff2',
                'A700': '1ffff0',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': [
                    '50',
                    '100',
                    '200',
                    '300',
                    '400',
                    'A100',
                    'A200',
                    'A400',
                    'A700'
                ],
                'contrastLightColors': [
                    '500',
                    '600',
                    '700',
                    '800',
                    '900'
                ]
            });
            $mdThemingProvider.definePalette('ternaderaccent', {
                '50': 'e9f1f8',
                '100': 'c9dbec',
                '200': 'a5c3e0',
                '300': '80abd4',
                '400': '6599ca',
                '500': '4a87c1',
                '600': '437fbb',
                '700': '3a74b3',
                '800': '326aab',
                '900': '22579e',
                'A100': 'dae9ff',
                'A200': 'a7caff',
                'A400': '74acff',
                'A700': '5b9dff',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': [
                    '50',
                    '100',
                    '200',
                    '300',
                    '400',
                    'A100',
                    'A200',
                    'A400',
                    'A700'
                ],
                'contrastLightColors': [
                    '500',
                    '600',
                    '700',
                    '800',
                    '900'
                ]
            });
            $mdThemingProvider.theme('default')
                .primaryPalette('ternaderblue')
                .accentPalette('ternaderaccent');            }
        ]);
})();
