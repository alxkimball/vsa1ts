
module customers {

    'use strict';
    export interface ICustomerListControllerBindings {
        customers: models.ICustomerModel;
        onSelected(customerId: string): void;
    }

    export interface ICustomerListController extends ICustomerListControllerBindings {
        showOrders(customerId: number);
        selectedCustomerId: number;
        $onInit(): void;
    }

    class CustomerListController implements ICustomerListController {
        static $inject = [];

        customers: models.ICustomerModel;
        onSelected: (number) => void;
        selectedCustomerId: number;

        constructor() {
        }

        $onInit(): void {
            var list = this.customers;
        }

        $onChanges(changesObj: any): void {

        }

        // bubble selected customerId up to parent to display customer detail
        showOrders(customerId: number) {
            this.selectedCustomerId = customerId;
            this.onSelected({ selectedCustomerId: customerId });
        }

    }
    angular
        .module('customers')
        .controller('CustomerListController', CustomerListController);

}