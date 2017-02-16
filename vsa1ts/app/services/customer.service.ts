
module services {
    'use strict';

    export interface ICustomerService {
        getCustomers(): ng.IPromise<models.ICustomerModel[]>;
        getCustomer(customerId: string): ng.IPromise<models.ICustomerModel>;
        saveCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>;
        deleteCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>;
    }

    export class CustomerService implements ICustomerService {
        static $inject = ['$http', '$q','$sce','$location'];
        host: string;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $location: ng.ILocationProvider) {
            
        }

        getCustomers(): ng.IPromise<models.ICustomerModel[]>{
            var def = this.$q.defer();
            this.$http.get<models.ICustomerModel[]>('/data/customers.json', {cache: true})
                .then((data) => {
                    def.resolve(data);
                })
                .catch(() => {
                    def.reject('Failed to get customers');
                });
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
        .service('CustomerService', CustomerService);
}
