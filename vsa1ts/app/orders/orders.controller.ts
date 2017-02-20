
module orders {
    'use strict';

    export interface IOrderControllerBindings {
        customerId: string
    }
    export interface IOrdersController extends IOrderControllerBindings {
        message: string;
        orderCount: number;
        orders: models.IOrderModel[];
        order: models.IOrderModel;
    }

    class OrdersController implements IOrdersController {
        static $inject = ['OrderService'];
        message: string;
        orderCount: number = 0;
        orders: models.IOrderModel[];
        order: models.IOrderModel;
        customerId: string;
        orderNumber: number;

        constructor(private orderService: services.IOrderService) {

        }

        // initialization logic runs after bindings complete
        $onInit(): void {
        }

        $onChanges(changesObj: any): void {
            if (changesObj.customerId && changesObj.customerId.currentValue) {
                this.customerId = changesObj.customerId.currentValue;
                if (this.customerId !== '') {
                    this.loadOrders(this.customerId);
                }
            }
        }

        // load single customer based upon selectedId from list
        loadOrders(customerId: string): void {
            this.orderService.getOrders(customerId)
                .then((results) => {
                    this.orders = results;
                    this.orderCount = this.orders.length;
                }).catch(error => {
                    console.log(error);
                });
        }

        loadDetail(orderId: number): void {
            this.orderNumber = orderId;
            this.orderService.getOrderDetail(orderId)
                .then((results) => {
                    this.order = results;
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    angular
        .module('orders')
        .controller('OrdersController', OrdersController);
}
