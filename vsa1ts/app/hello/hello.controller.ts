
module hello {
    'use strict';

    export interface IHelloController {

    }

    class HelloController implements IHelloController {

        name: string;

        constructor() {
            
        }

        // initialization logic runs after bindings complete
        $onInit(): void {
            this.name = "TLC Brown Bag Attendees";

        }
    }

    angular
        .module('hello')
        .controller('HelloController', HelloController);
}
