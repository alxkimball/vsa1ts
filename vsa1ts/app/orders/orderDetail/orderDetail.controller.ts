
module orders {

    'use strict';
    export interface IOrderDetailControllerBindings {
        order: models.IOrderModel;
    }

    export interface IOrderDetailController extends IOrderDetailControllerBindings {
        $onInit(): void;
    }

    class OrderDetailController implements IOrderDetailController {
        static $inject = [];

        order: models.IOrderModel;

        constructor() {
        }

        $onInit(): void {
            
        }

        $onChanges(changesObj: any): void {
            if (changesObj.order && changesObj.order.currentValue) {
                this.order = changesObj.order.currentValue;
            }
        }

    }
    angular
        .module('orders')
        .controller('OrderDetailController', OrderDetailController);

}