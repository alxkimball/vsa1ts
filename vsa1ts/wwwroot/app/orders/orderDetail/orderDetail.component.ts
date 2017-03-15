
module orders {
    'use strict';

    class OrderDetailComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: any;

        constructor() {
            this.bindings = {
                order: '<'
            };
            this.controller = 'OrderDetailController';
            this.templateUrl = '/wwwroot/app/orders/orderDetail/orderDetail.template.html';
        }
    }

    angular
        .module('orders')
        .component('orderDetail', new OrderDetailComponent());
}