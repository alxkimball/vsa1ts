
module hello {
    'use strict';

    export interface IHelloController {

        name: string;
    }

    class HelloController implements IHelloController {

        name: string;

        constructor() {
            
        }

        // initialization logic runs after bindings complete
        $onInit(): void {
            this.name = "World";
//            this.name = "TLC Brown Bag Attendees";
        }
    }

    angular
        .module('hello')
        .controller('HelloController', HelloController);
}
