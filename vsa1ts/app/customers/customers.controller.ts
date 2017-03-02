
module customers {
    'use strict';

    export interface ICustomersController {
        customerId: string;
        customers: models.ICustomerModel[];

        $onInit(): void;
        loadCustomers(): void;
        loadCustomerId(string): void;

    }

    export class CustomersController implements ICustomersController {
        static $inject = ['CustomerService'];

        customers: models.ICustomerModel[];
        customerId: string = '';

        constructor(private customerService: services.ICustomerService) {
            
        }

        // initialization logic runs after bindings complete
        $onInit(): void {
            // load the current and electionCycle legislatures from lookupService
            this.loadCustomers();
        }

        // put the load in its own method in case you want to launch with a "refresh" button
        loadCustomers(): void {
            this.customerId = '';
            this.customerService.getCustomers()
                .then((result) => {
                    this.customers = result;
                }).catch(error => {
                console.log(error);
            });
        }

        // load customerId based upon selectedId from list
        loadCustomerId(customerId: string): void {
            this.customerId = customerId;
        }
    }

    angular
        .module('customers')
        .controller('CustomersController', CustomersController);
}
