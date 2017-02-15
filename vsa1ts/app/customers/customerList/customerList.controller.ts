module customers {

    'use strict';
    export interface ICustomerListControllerBindings {
        customers: models.ICustomerModel;
        onSelected(customerId: number): void;
    }

    export interface ICustomerListController extends ICustomerListControllerBindings {
        showDetail(customerId: number);
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

        }

        $onChanges(changesObj: any): void {

        }

        // bubble selected customerId up to parent to display customer detail
        showDetail(customerId: number) {
            this.selectedCustomerId = customerId;
            this.onSelected({ selectedCustomerId: customerId });
        }

    }
    angular
        .module('customers')
        .controller('CustomerListController', CustomerListController);

}