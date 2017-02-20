
module orders {
    'use strict';

    class OrderListComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: any;

        constructor() {
            this.bindings = {
                orders: '<',
                onSelected: '&'
            };
            this.controller = 'OrderListController';
            this.templateUrl = '/app/orders/orderList/orderList.template.html';
        }
    }

    angular
        .module('orders')
        .component('orderList', new OrderListComponent());
}