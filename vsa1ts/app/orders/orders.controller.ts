
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
                    this.order = this.populateOrderModel(results);
                }).catch(error => {
                    console.log(error);
                });
        }

        populateOrderModel(results: models.IOrderModel): models.IOrderModel {
            var localOrder: models.IOrderModel = new models.OrderModel();
            
            localOrder.id = results['Id'];
            localOrder.customerId = results['CustomerId'];
            localOrder.employeeId = results['EmployeeId'];
            localOrder.orderDate = new Date(parseInt(results['OrderDate'].substr(6))).toLocaleDateString();
            localOrder.requiredDate = new Date(parseInt(results['RequiredDate'].substr(6))).toLocaleDateString();
            localOrder.shippedDate = new Date(parseInt(results['ShippedDate'].substr(6))).toLocaleDateString();
            localOrder.shipVia = results['ShipVia'];
            localOrder.freight = results['Freight'];
            localOrder.shipName = results['ShipName'];
            localOrder.shipAddress = results['ShipAddress'];
            localOrder.shipCity = results['ShipCity'];
            localOrder.shipPostalCode = results['ShipPostalCode'];
            localOrder.shipCountry = results['ShipCountry'];
            
            return localOrder;
        }
    }

    angular
        .module('orders')
        .controller('OrdersController', OrdersController);
}
