
module customers {
    'use strict';

    export interface ICustomersController {
        customers: models.ICustomerModel[];
        customer: models.ICustomerModel;
        loadCustomers(): void;
        loadCustomer(number): void;
    }

    export class CustomersController implements ICustomersController {
        static $inject = ['CustomerService'];

        customers: models.ICustomerModel[];
        customer: models.ICustomerModel = null;

        constructor(private customerService: services.ICustomerService) {
            
        }

        // initialization logic runs after bindings complete
        $onInit(): void {
            // load the current and electionCycle legislatures from lookupService
            this.loadCustomers();
        }

        // putting the actual load in its own method in case we want to launch with a "refresh" button
        loadCustomers(): void {
            this.customerService.getCustomers()
                .then((result) => {
                    this.customers = result;
                }).catch(error => {
                console.log(error);
            });
        }

        // load single customer based upon selectedId from list
        loadCustomer(customerId: string): void {
            this.customerService.getCustomer(customerId)
                .then((result) => {
                    this.customer = result;
                }).catch(error => {
                console.log(error);
            });
        }

        // save current customer record
        saveCustomer(customer: models.CustomerModel): void {

            // call service to save record
            this.customerService.saveCustomer(customer).then((result) => {
                // update detail region and reload list with new customer
                this.customer = result;
                this.loadCustomers();
                }).catch(error => {
                console.log(error);
            });
        }

        // delete currently displayed customer
        deleteCandidate(customer: models.CustomerModel): void {
            this.customerService.deleteCustomer(customer).then(() => {
                // Clear deleted customer and Reload customer list
                this.customer = null;
                this.loadCustomers();
                }).catch(error => {
                console.log(error);
            });
        }

    }

    angular
        .module('customers')
        .controller('CustomersController', CustomersController);
}
