
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
            this.order = null;
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
                    this.order = this.populateOrderModel(results as models.IOrderModel);
                }).catch(error => {
                    console.log(error);
                });
        }

        populateOrderModel(results: models.IOrderModel): models.IOrderModel {
            // convert JSON dataset returned from CDN call to project model
            return new models.OrderModel(
                results['Id'] as number,
                results['CustomerId'] as any,
                results['EmployeeId'] as any,
                new Date(parseInt(results['OrderDate'].substr(6))).toLocaleDateString(),
                new Date(parseInt(results['RequiredDate'].substr(6))).toLocaleDateString(),
                results['ShippedDate'] !== undefined
                        ? new Date(parseInt(results['ShippedDate'].substr(6))).toLocaleDateString()
                        : 'Not Shipped',
                results['ShipVia'] as any,
                results['Freight'] as any,
                results['ShipName'] as any,
                results['ShipCity'] as any,
                results['ShipPostalCode'] as any,
                results['ShipCountry'] as any
            );

        }
    }

    angular
        .module('orders')
        .controller('OrdersController', OrdersController);
}
