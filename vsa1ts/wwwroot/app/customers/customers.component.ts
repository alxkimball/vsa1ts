
module customers {
    'use strict';

    export class CustomersComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: any;

        constructor() {
            this.bindings = {};
            this.controller = 'CustomersController';
            this.templateUrl = '/wwwroot/app/customers/customers.template.html';
        }
    }

    angular
        .module('customers')
        .component('customers', new CustomersComponent());

}
