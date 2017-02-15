
module services {
    'use strict';

    export interface ICustomersService {
        getCustomers(): ng.IPromise<models.ICustomerModel[]>;
        getCustomer(customerId: string): ng.IPromise<models.ICustomerModel>;
        saveCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>;
        deleteCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>;
    }

    export class CustomersService implements ICustomersService {
        static $inject = ['$http', '$q'];
        host: string;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService){
            
        }

        getCustomers(): ng.IPromise<models.ICustomerModel[]>{
            var def = this.$q.defer();
            var customers: models.CustomerModel[] = [];

            return def.promise;
        }
        getCustomer(customerId: string): ng.IPromise<models.ICustomerModel>{
            var def = this.$q.defer();

            return def.promise;
        }

        saveCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>{
            var def = this.$q.defer();

            return def.promise;
        }

        deleteCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>{
            var def = this.$q.defer();

            return def.promise;
        }

    }
    angular
        .module('services')
        .service('CustomersService', CustomersService);
}
