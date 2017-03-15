
module hello {
    'use strict';

    export interface IHelloController {

        name: string;
    }

    class HelloController implements IHelloController {
        static $inject = ['$location'];
        name: string;
        cardExpanded: boolean = false;

        constructor(private $location: ng.ILocationService) {          
        }

        // initialization logic runs after bindings complete
        $onInit(): void {
            this.name = "World!";
            //this.name = "TLC Brown Bag Attendees";
        }

        goNorthwind(): void {
            this.$location.path('/customers');
        }
    }

    angular
        .module('hello')
        .controller('HelloController', HelloController);
}
