
module customers {
    'use strict';

    class CustomerListComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: any;

        constructor() {
            this.bindings = class {
                customers: '<'
            };
            this.controller = 'CustomerListController';
            this.templateUrl = '/app/customers/customerList/customerList.template.html';
        }
    }

    angular
        .module('customers')
        .component('customerList', new CustomerListComponent());
}