
module orders {
    'use strict';

    export interface IOrdersController {
        message: string;
    }

    class OrdersController implements IOrdersController {

        message: string;

        constructor() {

        }

        // initialization logic runs after bindings complete
        $onInit(): void {
            this.message = "OrdersController reached";
        }
    }

    angular
        .module('orders')
        .controller('OrdersController', OrdersController);
}
