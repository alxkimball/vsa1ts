module customers {
    'use strict';

    class CustomerDetailComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: any;

        constructor() {
            this.bindings = class {

            };
            this.controller = 'CustomerDetailController';
            this.templateUrl = '/wwwroot/app/customers/customerDetail/customerDetail.template.html';
        }
    }

    angular
        .module('customers')
        .component('customerDetail', new CustomerDetailComponent());
}