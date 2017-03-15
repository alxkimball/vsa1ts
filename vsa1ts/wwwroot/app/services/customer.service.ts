/// <reference path="../../../node_modules/@types/angular/index.d.ts" />

module services {
    'use strict';

    export interface ICustomerService {
        getCustomers(): ng.IPromise<models.ICustomerModel[]>;
        getCustomer(customerId: string): ng.IPromise<models.ICustomerModel>;
    }

    export class CustomerService implements ICustomerService {
        static $inject = ['$http', '$q','$location','$sce'];
        host: string;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService,
                    private $location: ng.ILocationService, private $sce: ng.ISCEService) {
            this.host = $location.host();
        }

        getCustomers(): ng.IPromise<models.ICustomerModel[]>{
            var def = this.$q.defer();
            var datapath = 'http://northwind.servicestack.net/customers.json';

            this.$http.get<models.ICustomerModel[]>(datapath, { cache: true })
                .then((results) => {
                    def.resolve(results.data['Customers']);
                })
                .catch((error) => {
                    var message = error;
                    def.reject('Failed to get customers: ' + message);
                });
            return def.promise;
        }
        getCustomer(customerId: string): ng.IPromise<models.ICustomerModel>{
            var def = this.$q.defer();

            return def.promise;
        }


    }
    angular
        .module('services')
        .service('CustomerService', CustomerService);
}
