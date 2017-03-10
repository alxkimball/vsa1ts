
module orders {

    'use strict';
    export interface IOrderListControllerBindings {
        orders: models.IOrderModel[];
        onSelected(orderId: number): void;
    }

    export interface IOrderListController extends IOrderListControllerBindings {
        showOrderDetail(orderId: number);
        selectedOrderId: number;
        $onInit(): void;
    }

    class OrderListController implements IOrderListController {
        static $inject = [];

        orders: models.IOrderModel[];
        onSelected: (string) => void;
        selectedOrderId: number;

        constructor() {
        }

        $onInit(): void {
        }

        $onChanges(changesObj: any): void {
            if (changesObj.orders && changesObj.orders.currentValue) {
                this.orders = changesObj.orders.currentValue;
                this.selectedOrderId = 0;
            }
        }

        // bubble selected customerId up to parent to display customer detail
        showOrderDetail(orderId: number) {
            this.selectedOrderId = orderId;
            this.onSelected({ selectedOrderId: orderId });
        }

    }
    angular
        .module('orders')
        .controller('OrderListController', OrderListController);

}