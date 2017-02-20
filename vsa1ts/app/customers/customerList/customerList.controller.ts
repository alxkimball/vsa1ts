
module customers {

    'use strict';
    export interface ICustomerListControllerBindings {
        customers: models.ICustomerModel[];
        onSelected(customerId: string): void;
    }

    export interface ICustomerListController extends ICustomerListControllerBindings {
        showOrders(customerId: string);
        selectedCustomerId: string;
        $onInit(): void;
    }

    class CustomerListController implements ICustomerListController {
        static $inject = [];

        customers: models.ICustomerModel[];
        onSelected: (string) => void;
        selectedCustomerId: string;

        constructor() {
        }

        $onInit(): void {
            var list = this.customers;
        }

        $onChanges(changesObj: any): void {
            if (changesObj.customers && changesObj.customers.currentValue) {
                this.customers = changesObj.customers.currentValue;
            }
        }

        // bubble selected customerId up to parent to display customer detail
        showOrders(customerId: string) {
            this.selectedCustomerId = customerId;
            this.onSelected({ selectedCustomerId: customerId });
        }

    }
    angular
        .module('customers')
        .controller('CustomerListController', CustomerListController);

}